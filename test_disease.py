import requests
import io
from PIL import Image

# Create a dummy image
img = Image.new('RGB', (100, 100), color = 'green')
img_byte_arr = io.BytesIO()
img.save(img_byte_arr, format='JPEG')
img_byte_arr = img_byte_arr.getvalue()

url = "http://127.0.0.1:8000/api/v1/disease/detect"
files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}

print("--- Disease Detection ---")
try:
    response = requests.post(url, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
