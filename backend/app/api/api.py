from fastapi import APIRouter

# Ensure the imported module names match the filenames
from app.api.endpoints import disease, yield_endpoint, market, voice, chat, tts, multilingual_chat, microfarm_main, weather, health, livestock

api_router = APIRouter()

# Include routers from endpoint modules with prefixes
api_router.include_router(disease.router, prefix="/disease", tags=["Disease Detection"])
api_router.include_router(yield_endpoint.router, prefix="/yield", tags=["Yield Prediction"])
api_router.include_router(market.router, prefix="/market", tags=["Market Access"])
api_router.include_router(voice.router, prefix="/voice", tags=["Voice Interaction"])
api_router.include_router(chat.router, prefix="/chat", tags=["AI Chat Assistant"])
api_router.include_router(tts.router, prefix="/tts", tags=["Text to Speech"])
api_router.include_router(multilingual_chat.router, prefix="/multilingual_chat", tags=["Multilingual Gemini Chat"])
api_router.include_router(microfarm_main.router, prefix="/microfarm", tags=["Microfarm"])
api_router.include_router(weather.router, prefix="/weather", tags=["Weather Info"])
api_router.include_router(health.router, prefix="/health", tags=["Health Check"])
api_router.include_router(livestock.router, prefix="/livestock", tags=["Livestock Management"])