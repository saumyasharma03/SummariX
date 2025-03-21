from flask import Flask, request, jsonify
import os
from Speech2Text import Speech_to_Text
from Text2Text import compare_texts

app = Flask(__name__)

@app.route('/process_audio', methods=['POST'])
def process_audio():
    data = request.json
    audio_path = data.get("audio_path")
    expected_text = data.get("expected_text", "")

    if not audio_path or not os.path.exists(audio_path):
        return jsonify({"error": "Invalid or missing audio file"}), 400

    try:
        # Transcribe the audio
        transcribed_text = Speech_to_Text(audio_path)
        similarity_score = compare_texts(expected_text, transcribed_text)

        return jsonify({
            "message": "File processed successfully",
            "transcribed_text": transcribed_text,
            "similarity_score": similarity_score
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
