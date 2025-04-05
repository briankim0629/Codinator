from flask import Flask, request, send_file, jsonify
from my_supabase import supabase
from image_analysis import get_text_description_and_attributes, preprocess_for_supabase

#from convert_heic_to_jpeg import convert_heic
import io

app = Flask(__name__)

@app.route("/upload-multiple", methods=["POST"])
def upload_multiple():
    if "files" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    files = request.files.getlist("files")
    #texts = request.form.get("texts", "").splitlines()

    results = []

    for i, file in enumerate(files):
        file_name = file.filename
        file_bytes = file.read()
        #file_bytes, file_name = convert_heic(file.filename, file_bytes)
        file_path = f"uploads/{file_name}"

        try:
            supabase.storage.from_("closet").upload(file_path, file_bytes)
            public_url = supabase.storage.from_("closet").get_public_url(file_path)

            # Call Gemini model
            description_and_attrs = get_text_description_and_attributes(public_url)
            supabase_object = preprocess_for_supabase(public_url, description_and_attrs)

            # text = texts[i] if i < len(texts) else ""
            supabase.table("image_text").insert({
                "image_url": public_url,
                "metadata": supabase_object,
                "types": supabase_object["main_category"]
            }).execute()

            results.append({"file": file_name, "status": "uploaded"})

        except Exception as e:
            results.append({"file": file_name, "status": "error", "error": str(e)})

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)