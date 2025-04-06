from flask import Flask, request, send_file, jsonify
from my_supabase import supabase
from image_analysis import get_text_description_and_attributes, preprocess_for_supabase
from flask_cors import CORS  
from image_generation import recommend_outfit_multimodal, dressup_time, dressup_time_human
import uuid
import io
import traceback
from pillow_heif import register_heif_opener
register_heif_opener()

app = Flask(__name__)
CORS(app)

@app.route("/upload-multiple", methods=["POST"])
def upload_multiple():
    if "files" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    files = request.files.getlist("files")
    bucket = request.form.get("bucket")
    results = []

    for i, file in enumerate(files):
        file_name = file.filename
        file_bytes = file.read()
        file_path = f"uploads/{file_name}"

        try:
            supabase.storage.from_(bucket).upload(file_path, file_bytes)
            public_url = supabase.storage.from_(bucket).get_public_url(file_path)

            # Call Gemini model
            description_and_attrs = get_text_description_and_attributes(public_url)
            supabase_object = preprocess_for_supabase(public_url, description_and_attrs)

            supabase.table("image_text").insert({
                "image_url": public_url,
                "metadata": supabase_object,
                "types": supabase_object["main_category"]
            }).execute()

            results.append({"file": file_name, "status": "uploaded"})

        except Exception as e:
            results.append({"file": file_name, "status": "error", "error": str(e)})

    return jsonify(results)

@app.route("/get-clothing-items", methods=["GET"])
def get_clothing_items():
    category = request.args.get("category")

    if category not in ["Tops", "Bottoms", "Outerwear"]:
        return jsonify({"error": "Invalid or missing category. Use 'Tops', 'Bottoms', or 'Outerwear'."}), 400

    try:
        items = supabase.table("image_text").select("*").eq("types", category).execute()
        return jsonify(items.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/get-rec", methods=["POST"])
def get_rec():
    prompt = request.args.get("style")
    temp3 = recommend_outfit_multimodal(prompt)

    try:
        top = supabase.table("image_text").select("*").eq("id", temp3['outfit']['top_id']).execute().data[0]
        bottom = supabase.table("image_text").select("*").eq("id", temp3['outfit']['bottom_id']).execute().data[0]

        top_url = top['image_url']
        bottom_url = bottom['image_url']

        manequin_image = dressup_time(top_url,bottom_url)
        buffer = io.BytesIO()
        manequin_image.save(buffer, format="JPEG")
        buffer.seek(0)
        img_bytes = buffer.read()

        filename = f"mannequin_{uuid.uuid4()}.jpg"
        supabase.storage.from_("finalcodi").upload(filename, img_bytes, {"content-type": "image/jpeg"})

        public_url = supabase.storage.from_("finalcodi").get_public_url(filename)

        result = supabase.table("codi_rec").insert({
            "image_url-top": top_url,
            "image_url-bottom": bottom_url,
            "final_codi": public_url
        }).execute()


        return jsonify({
            "status": "success",
            "image_url-top": top_url,
            "image_url-bottom": bottom_url,
            "final_codi": public_url,
            "inserted": result.data
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)})    

if __name__ == "__main__":
    app.run(debug=True)
