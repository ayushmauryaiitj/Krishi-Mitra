from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.yield_prediction_service import get_weather_data, get_geocode_data

router = APIRouter()

@router.get("/", status_code=200)
async def get_current_weather(
    lat: Optional[float] = None, 
    lon: Optional[float] = None,
    location: Optional[str] = None
):
    """
    Returns current weather data for the given coordinates or location name.
    """
    try:
        if location and (not lat or not lon):
            # Try to geocode the location
            geocode_data = get_geocode_data(f"{location}, India")
            if geocode_data:
                lat = geocode_data['lat']
                lon = geocode_data['lon']
            else:
                raise HTTPException(status_code=404, detail=f"Could not find coordinates for location: {location}")
                
        if not lat or not lon:
            # Default to somewhere central if nothing provided
            lat, lon = 19.7515, 75.7139 # Maharashtra
            
        weather_data = get_weather_data(lat, lon)
        
        if not weather_data:
            raise HTTPException(status_code=503, detail="Weather data currently unavailable. Please try again later.")
            
        return {"weather": weather_data}
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching weather: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while fetching weather data.")
