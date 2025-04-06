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
            try:
                image = PIL.Image.open(io.BytesIO(response.content))
            except:
                print(response.content)
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


def dressup_time(imagetop, imagebottom):
    # base_text = "Generate an image of this man with the following clothes: a top (second image), bottoms (third image), and outerwear (fourth image). Place each item appropriately on his body.Make sure to dress the manequinn with ALL pieces of clothing provided"
    
    # base_text = "Generate an image of this man with the following clothes: a top (second image), bottoms (third image). Place each item appropriately on his body.Make sure to dress the manequinn with ALL pieces of clothing provided"
    # base_text = "Geneerate an image of these clothes with a clear background,not overlapped"
    # base_text = (
    #     # "Create one **photo‑realistic flat‑lay** image on a clean, neutral studio background.  \n"
    #     # "• Arrange the two garments from the reference images below so they are **fully visible and do not overlap**.  \n"
    #     # "   1. Shirt / top – image #1  \n"
    #     # "   2. Pants / bottoms – image #2  \n"
    #     # "• Lay them neatly (not folded), keeping natural scale and straight orientation.  \n"
    #     # "Return only one final image"
    #     "show me both of these clothes in one image, not folded"
    # )
    base_text = (
        "Generate a realistic image of a **standing mannequin** wearing two pieces of clothing from the images below.  \n"
        "• The mannequin should be front-facing, with arms at its sides and legs slightly apart.  \n"
        "• Carefully place each clothing item in the correct position on the mannequin’s body:  \n"
        "   1. Shirt or Top (Image #1) — should go on the upper body  \n"
        "   2. Pants or Bottoms (Image #2) — should go on the lower body  \n"
        "• Do **not overlap** the top and bottoms unnaturally — both should be clearly visible and fit naturally.  \n"
        "• Ensure realistic proportions and a clean studio background.  \n"
        "Return only the final image, with no extra objects or text."
    )
    # base_image = PIL.Image.open('./human.jpeg')
    top_image = imagetop
    bottom_image = imagebottom

    contents = [
                # base_text,base_image,
                base_text,
                'Top clothing item:', top_image,
                'Bottom clothing item:', bottom_image,
                # 'Outerwear item:',outwear_image,
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


dressup_time(imagetop, imagebottom)

def dressup_time_human(imagetop, imagebottom):
    base_text = (
        "Generate a realistic image of the person in the first photo, wearing two clothing items from the reference images below.  \n"
        "The Person should be front-facing, with arms at its sides and legs slightly apart."
        "• Apply the clothing items naturally and realistically:  \n"
        "   1. Shirt or Top (Image #2) — place on the upper body  \n"
        "   2. Pants or Bottoms (Image #3) — place on the lower body  \n"
        "• The clothes should be well-fitted, aligned with the body, and **not overlap unnaturally**.  \n"
        "• Maintain realistic lighting and shadows. Avoid adding any extra objects, backgrounds, or people.  \n"
        "Return only the final image of the person's full body wearing both garments."
    )

    # base_text = (
    #     "Create **one full‑body, front‑facing, photo‑realistic image** of the person in **image #1**.  \n"
    #     "• Keep the same pose: arms relaxed at the sides, legs slightly apart.  \n"
    #     "• Dress the person in **both** garments below and nothing else:  \n"
    #     "   1. **Top / shirt** – image #2 (fit naturally on the torso, buttons closed if present)  \n"
    #     "   2. **Pants / bottoms** – image #3 (waistband at the natural waist, legs straight, fully visible)  \n"
    #     "• The clothing must be well‑fitted, with no clipping, warping, or unnatural overlap.  \n"
    #     "• Preserve realistic lighting and shadows that match the person’s original lighting.  \n"
    #     "• Use a clean, neutral studio backdrop (or the original plain backdrop from image #1).  \n"
    #     "• Do **not** add extra objects, text, or additional people.  \n"
    #     "Return only the final dressed image—no captions or other output."
    # )

    base_image = PIL.Image.open('./karina.jpeg')

    top_image = imagetop
    bottom_image = imagebottom

    contents = [
                base_text, 'Image of the person:',base_image,
                'Top clothing item:', top_image,
                'Bottom clothing item:', bottom_image,
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


def dressup_time_human(imagetop, imagebottom,baseimg_loc):
    base_text = (
        "Generate a realistic image of the person in the first photo, wearing two clothing items from the reference images below.  \n"
        "The Person should be front-facing, with arms at its sides and legs slightly apart."
        "• Apply the clothing items naturally and realistically:  \n"
        "   1. Shirt or Top (Image #2) — place on the upper body  \n"
        "   2. Pants or Bottoms (Image #3) — place on the lower body  \n"
        "• The clothes should be well-fitted, aligned with the body, and **not overlap unnaturally**.  \n"
        "• Maintain realistic lighting and shadows. Avoid adding any extra objects, backgrounds, or people.  \n"
        "Return only the final image of the person's full body wearing both garments."
    )

    # base_text = (
    #     "Create **one full‑body, front‑facing, photo‑realistic image** of the person in **image #1**.  \n"
    #     "• Keep the same pose: arms relaxed at the sides, legs slightly apart.  \n"
    #     "• Dress the person in **both** garments below and nothing else:  \n"
    #     "   1. **Top / shirt** – image #2 (fit naturally on the torso, buttons closed if present)  \n"
    #     "   2. **Pants / bottoms** – image #3 (waistband at the natural waist, legs straight, fully visible)  \n"
    #     "• The clothing must be well‑fitted, with no clipping, warping, or unnatural overlap.  \n"
    #     "• Preserve realistic lighting and shadows that match the person’s original lighting.  \n"
    #     "• Use a clean, neutral studio backdrop (or the original plain backdrop from image #1).  \n"
    #     "• Do **not** add extra objects, text, or additional people.  \n"
    #     "Return only the final dressed image—no captions or other output."
    # )

    base_image = PIL.Image.open(baseimg_loc)

    top_image = imagetop
    bottom_image = imagebottom

    contents = [
                base_text, 'Image of the person:',base_image,
                'Top clothing item:', top_image,
                'Bottom clothing item:', bottom_image,
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
            """
            push the image to supabase database
            """
            # image.save('gemini-native-image.png')
            image.show()

dressup_time_human(imagetop, imagebottom,'./karina.jpeg')