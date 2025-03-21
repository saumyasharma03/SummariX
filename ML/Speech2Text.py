from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
import soundfile as sf
import librosa
from pydub import AudioSegment
import warnings

# Suppress Wav2Vec2 warnings
warnings.filterwarnings("ignore", category=UserWarning)

def convert_to_wav(input_path, output_path):
    """Convert .webm to .wav format."""
    audio = AudioSegment.from_file(input_path, format="webm")
    audio.export(output_path, format="wav")
    return output_path

def Speech_to_Text(audio_path):
    """Transcribe audio file to text using Wav2Vec2."""
    # Convert .webm to .wav if necessary
    if audio_path.endswith(".webm"):
        audio_path = convert_to_wav(audio_path, "temp_audio.wav")
    
    model_name = "facebook/wav2vec2-base-960h"
    processor = Wav2Vec2Processor.from_pretrained(model_name)
    model = Wav2Vec2ForCTC.from_pretrained(model_name)

    print("Model is ready for inference.")

    # Read audio file
    speech, sample_rate = sf.read(audio_path)

    # Resample to 16000 Hz
    if sample_rate != 16000:
        speech = librosa.resample(speech, orig_sr=sample_rate, target_sr=16000)
        sample_rate = 16000

    # Ensure audio format is compatible
    input_values = processor(speech, sampling_rate=sample_rate, return_tensors="pt").input_values

    # Perform inference
    with torch.no_grad():
        logits = model(input_values).logits

    # Decode logits to text
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)[0]

    return transcription

# Example usage
audio_file_path = "/home/saumya03/Downloads/summariX/SummariX/server/uploads/1736885650082-recording.webm"  # Replace with your file path
try:
    transcription = Speech_to_Text(audio_file_path)
    print("Transcribed text:", transcription)
except Exception as e:
    print("An error occurred:", e)
