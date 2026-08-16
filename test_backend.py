import requests

print("--- Yield Prediction ---")
try:
    response = requests.post("http://127.0.0.1:8000/api/v1/yield/predict", json={
        "crop": "Wheat",
        "area": 10,
        "state": "Maharashtra",
        "season": "Rabi",
        "annual_rainfall": 800,
        "fertilizer": 100,
        "pesticide": 10,
        "ph": 6.5,
        "n": 100,
        "p": 50,
        "k": 100,
        "organic_carbon": 0.5
    })
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")

print("\n--- Market Prices ---")
try:
    response = requests.get("http://127.0.0.1:8000/api/v1/market/prices")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")

print("\n--- AI Chat ---")
try:
    response = requests.post("http://127.0.0.1:8000/api/v1/chat/message", json={"message": "Hello"})
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")
