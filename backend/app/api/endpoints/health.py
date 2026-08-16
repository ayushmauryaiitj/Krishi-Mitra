from fastapi import APIRouter, Depends
from app.core.config import get_settings, Settings
import httpx

router = APIRouter()

@router.get("/status", status_code=200)
async def get_system_health(settings: Settings = Depends(get_settings)):
    """
    Returns the health status of various system dependencies.
    """
    health_status = {
        "status": "online",
        "message": "KrishiMitra Backend is running optimally.",
        "services": {
            "gemini_api": "ok" if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "YOUR_GEMINI_API_KEY_NOT_SET" else "missing",
            "weather_api": "ok" if settings.OPENWEATHER_API_KEY and settings.OPENWEATHER_API_KEY != "YOUR_OPENWEATHER_API_KEY_NOT_SET" else "missing",
            "maps_api": "ok" if getattr(settings, 'GOOGLE_MAPS_API_KEY', None) else "missing"
        }
    }
    
    # Check if any critical service is missing
    if health_status["services"]["gemini_api"] == "missing":
        health_status["status"] = "degraded"
        health_status["message"] = "Some AI features may be unavailable."
        
    return health_status
