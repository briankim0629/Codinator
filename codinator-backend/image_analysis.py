from google import genai
from google.genai import types
#from app.py import upload_multiple
import base64
from dotenv import load_dotenv
import os
import requests
import io

import PIL.Image
from pillow_heif import register_heif_opener
register_heif_opener()

load_dotenv()

client = genai.Client(api_key=os.getenv("SUPABASE_KEY2"))
wardrobe = []

def get_text_description_and_attributes(image_url):
    # image = PIL.Image.open(img_location)
    
    #if response.status_code != 200:
    #    raise Exception(f"Failed to download image from URL: {image_url}")

    response = requests.get(image_url)
    image = PIL.Image.open(io.BytesIO(response.content))

    prompt = [
        """Analyze this clothing item and provide:
        1. A detailed description (2-3 sentences)
        2. Structured attributes in JSON format with these fields:
           - main_category (MUST be one of: 'Tops', 'Bottoms', 'Outerwear')
           - primary_color
           - secondary_colors (list)
           - pattern (e.g., solid, striped, graphic, etc.)
           - style (e.g., casual, sporty, formal)
           - occasion_tags (list of suitable occasions)
           - formality_score (0-10, where 0 is very casual and 10 is very formal)
           
        Format your response as:
        DESCRIPTION: [detailed description]
        ATTRIBUTES: [JSON data]""",
        image
    ]
    

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    
    response_text = response.text

    import re

    desc_match = re.search(r'DESCRIPTION:(.*?)ATTRIBUTES:', response_text, re.DOTALL)
    description = desc_match.group(1).strip() if desc_match else ""
    
    json_match = re.search(r'```json\s*(.*?)\s*```', response_text, re.DOTALL)
    if json_match:
        json_str = json_match.group(1)
        try:
            import json
            attributes = json.loads(json_str)
        except json.JSONDecodeError:
            attributes = {}
    else:
        attributes = {}
    
    return {
        "description": description,
        "attributes": attributes,
        "raw_response": response_text 
    }

def preprocess_for_supabase(image_url, description_and_attributes):

    description = description_and_attributes.get("description", "")
    attributes = description_and_attributes.get("attributes", {})
    raw_response = description_and_attributes.get("raw_response", "")
    
    valid_categories = ['Tops', 'Bottoms', 'Outerwear']
    main_category = attributes.get('main_category')
    
    if not main_category or main_category not in valid_categories:
        main_category = 'Tops'
    

    secondary_colors = attributes.get('secondary_colors', [])
    if isinstance(secondary_colors, str):
        secondary_colors = [color.strip() for color in secondary_colors.split(',')]
    
    occasion_tags = attributes.get('occasion_tags', [])
    if isinstance(occasion_tags, str):
        occasion_tags = [tag.strip() for tag in occasion_tags.split(',')]
    
    formality_score = attributes.get('formality_score')
    if isinstance(formality_score, str):
        try:
            formality_score = int(float(formality_score))
        except (ValueError, TypeError):
            formality_score = 5 
    
    if not isinstance(formality_score, (int, float)) or formality_score < 0 or formality_score > 10:
        formality_score = 5 
    
    supabase_object = {
        'description': description,
        'main_category': main_category,
        'primary_color': attributes.get('primary_color', ''),
        'secondary_colors': secondary_colors,
        'pattern': attributes.get('pattern', ''),
        'style': attributes.get('style', ''),
        'occasion_tags': occasion_tags,
        'formality_score': formality_score,
        'image_url': image_url,
        'raw_ai_response': raw_response
    }
    
    return supabase_object


def upload_to_supabase(img_loc):

    image = PIL.Image.open(img_loc)
    description_and_attributes = get_text_description_and_attributes(image)
    # supabase = create_client(supabase_url, supabase_key)
    
    img_buffer = io.BytesIO()
    image.save(img_buffer, format=image.format if image.format else "JPEG")
    img_bytes = img_buffer.getvalue()
    

    import uuid
    image_filename = f"{uuid.uuid4()}.jpg"
    
    try:
        storage_response = supabase.storage.from_(bucket_name).upload(
            image_filename,
            img_bytes,
            {"content-type": "image/jpeg"}
        )

        image_url = supabase.storage.from_(bucket_name).get_public_url(image_filename)

        supabase_object = preprocess_for_supabase(image_url, description_and_attributes)

        db_response = supabase.table('Cloths').insert(supabase_object).execute()
        
        return {
            "status": "success",
            "data": db_response.data,
            "supabase_object": supabase_object  
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }