from supabase import create_client
from google import genai
from google.genai import types
import re
import requests
import PIL
import io
from pillow_heif import register_heif_opener
import base64
register_heif_opener()

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

client = genai.Client(api_key="AIzaSyA9J6aFkMpRJ9gFvRxTa2RE58HL_JfEvGU")

def format_item_text(item):
    item_id = item.get("id", "unknown")
    metadata = item.get("metadata", {})
    description = metadata.get("description", "No description")
    primary_color = metadata.get("primary_color", "unknown")
    style = metadata.get("style", "unknown")
    formality_score = metadata.get("formality_score", "unknown")
    pattern = metadata.get("pattern", "unknown")
    return (
        f"ID: {item_id} - {primary_color} {pattern} item, {style} style, formality: {formality_score}/10.\n"
        f"Description: {description}"
    )

def recommend_outfit_multimodal(tops_list, bottoms_list, outerwear_list, context):
    
    contents = [
        f"You are a fashion assistant. The user wants an outfit recommendation for a **{context}** occasion.",
        "Choose ONE top, ONE bottom, and ONE outerwear item from the items below. Each is shown with an image URL and description.",
        "Return the outfit like this:\n"
        "OUTFIT:\n- top_id: [ID]\n- bottom_id: [ID]\n- outerwear_id: [ID]\nREASONING: [Why you chose them together]"
    ]
    
    def add_items_to_contents(label, items):
        contents.append(f"### {label.upper()} ###")
        for item in items.data:
            response = requests.get(item.get('image_url'))
            image = PIL.Image.open(io.BytesIO(response.content))
            contents.append(image)
            # contents.append(f"Image URL: {item.get('image_url', 'No image available')}")
            contents.append(format_item_text(item))
    
    add_items_to_contents("tops", tops_list)
    add_items_to_contents("bottoms", bottoms_list)
    add_items_to_contents("outerwear", outerwear_list)
    
    response = client.models.generate_content(
        model="gemini-1.5-pro",
        contents=contents,
        config=types.GenerateContentConfig(response_modalities=["Text"])
    )
    
    response_text = response.text
    
    # Update the regex patterns to match the new output format
    top_match = re.search(r'top_id:\s*(\S+)', response_text)
    bottom_match = re.search(r'bottom_id:\s*(\S+)', response_text)
    outerwear_match = re.search(r'outerwear_id:\s*(\S+)', response_text)
    reasoning_match = re.search(r'REASONING:\s*(.*?)($|\n\n)', response_text, re.DOTALL)
    
    return {
        "outfit": {
            "top_id": top_match.group(1) if top_match else None,
            "bottom_id": bottom_match.group(1) if bottom_match else None,
            "outerwear_id": outerwear_match.group(1) if outerwear_match else None
        },
        "reasoning": reasoning_match.group(1).strip() if reasoning_match else "No reasoning provided",
        "raw_response": response_text
    }

Tops_list = supabase.table("image_text").select("*").eq("types", "Tops").execute()
Bottoms_list = supabase.table("image_text").select("*").eq("types", "Bottoms").execute()
Outerwear_list = supabase.table("image_text").select("*").eq("types", "Outerwear").execute()

temp3 = recommend_outfit_multimodal(Tops_list, Bottoms_list,Outerwear_list, "Casual")

top_recommended = supabase.table("image_text").select("*").eq("id", temp3['outfit']['top_id']).execute()
bottom_recommended = supabase.table("image_text").select("*").eq("id", temp3['outfit']['bottom_id']).execute()
outerwear_recommended = supabase.table("image_text").select("*").eq("id", temp3['outfit']['outerwear_id']).execute()

response = requests.get(top_recommended.data[0].get('image_url'))
imagetop = PIL.Image.open(io.BytesIO(response.content))
response = requests.get(bottom_recommended.data[0].get('image_url'))
imagebottom = PIL.Image.open(io.BytesIO(response.content))
response = requests.get(outerwear_recommended.data[0].get('image_url'))
imageouter = PIL.Image.open(io.BytesIO(response.content))


def dressup_time(top_recommended, bottom_recommended, outwear_recommended):
    # base_text = "Generate an image of this man with the following clothes: a top (second image), bottoms (third image), and outerwear (fourth image). Place each item appropriately on his body.Make sure to dress the manequinn with ALL pieces of clothing provided"
    # base_text = "Generate an image of this man with the following clothes: a top (second image), bottoms (third image). Place each item appropriately on his body.Make sure to dress the manequinn with ALL pieces of clothing provided"
    base_text = "Generate an image of a man wearing ALL of these exact clothing items: 1) the shirt/top from image #2, 2) the pants/bottoms from image #3, and 3) the jacket/outerwear from image #4. The manequinn in image #1 must be completely dressed with ALL THREE clothing items properly placed on his body. It is ESSENTIAL that the pants/bottoms are clearly visible and properly worn."
    base_image = PIL.Image.open('./human.png')
    
    def get_clothing_image(recommended):
        response = requests.get(recommended.data[0].get('image_url'))
        return PIL.Image.open(io.BytesIO(response.content))
    
    top_image = get_clothing_image(top_recommended)
    bottom_image = get_clothing_image(bottom_recommended)
    outwear_image = get_clothing_image(outwear_recommended)
    
    # contents = [
    #     {"text": base_text},
    #     {"image": base_image},
    #     {"text": "Top clothing item:"},
    #     {"image": top_image},
    #     {"text": "Bottom clothing item:"},
    #     {"image": bottom_image},
    #     {"text": "Outerwear item:"},
    #     {"image": outwear_image}
    # ]
    contents = [base_text,base_image,
                'Top clothing item:', top_image,
                'Bottom clothing item:', bottom_image,
                'Outerwear item:',outwear_image,
    ]
    
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp-image-generation",
        contents=contents,
        config=types.GenerateContentConfig(
            response_modalities=['Text', 'Image']
        )
    )
    

    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print(part.text)
        elif part.inline_data is not None:
            image_data = base64.b64decode(part.inline_data.data)
            image = PIL.Image.open(io.BytesIO(image_data))
            # image.save('gemini-native-image.png')
            image.show()

dressup_time(top_recommended, bottom_recommended,outerwear_recommended)