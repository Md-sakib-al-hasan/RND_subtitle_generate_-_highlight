import sys
import warnings
warnings.filterwarnings("ignore")

import whisper
import subprocess
import os
import json

input_path = sys.argv[1]


base, ext = os.path.splitext(input_path)
audio_path = base + "_converted.mp3"


subprocess.run([
    "ffmpeg", "-y",
    "-i", input_path,
    "-vn",
    "-acodec", "mp3",
    audio_path
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

model = whisper.load_model("base")
result = model.transcribe(audio_path)

print(json.dumps(result["segments"]))
