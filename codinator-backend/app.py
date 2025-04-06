from flask import Flask, request, send_file, jsonify
from my_supabase import supabase
from image_analysis import get_text_description_and_attributes, preprocess_for_supabase
from flask_cors import CORS  

import io

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
        file_path = f"{bucket}/{file_name}"

        try:
            supabase.storage.from_("closet").upload(file_path, file_bytes)
            public_url = supabase.storage.from_("closet").get_public_url(file_path)

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
    
if __name__ == "__main__":
    app.run(debug=True)