import requests

url = "http://127.0.0.1:8000/api/v1/yield/predict"
data = {
    "crop": "Wheat",
    "area": 2.5,
    "season": "Summer",
    "state": "Maharashtra",
    "annual_rainfall": 800,
    "fertilizer": 0,
    "pesticide": 0,
    "ph": 6.5,
    "n": 140,
    "p": 50,
    "k": 200,
    "organic_carbon": 0.5,
    "latitude": "",
    "longitude": "",
    "location_name": ""
}

try:
    response = requests.post(url, json=data)
    print(response.status_code)
    print(response.text)
except Exception as e:
    print(f"Error: {e}")
