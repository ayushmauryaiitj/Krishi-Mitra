from fastapi import APIRouter, HTTPException
from typing import List
from app.models.livestock_model import Animal, AnimalCreate, AnimalUpdate, HealthRecord, AskLivestockAIRequest, DailyCare, FeedingRecord
from app.core import livestock_db
from app.core.ai_services import ask_livestock_ai

router = APIRouter()

@router.get("/", response_model=List[Animal])
def get_livestock():
    return livestock_db.get_all_animals()

@router.get("/{animal_id}", response_model=Animal)
def get_single_livestock(animal_id: str):
    animals = livestock_db.get_all_animals()
    for a in animals:
        if a["id"] == animal_id:
            return a
    raise HTTPException(status_code=404, detail="Animal not found")

@router.post("/", response_model=Animal)
def create_livestock(animal_in: AnimalCreate):
    animal = Animal(**animal_in.model_dump())
    return livestock_db.add_animal(animal)

@router.put("/{animal_id}", response_model=Animal)
def update_livestock(animal_id: str, animal_in: AnimalUpdate):
    updated = livestock_db.update_animal(animal_id, animal_in.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Animal not found")
    return updated

@router.delete("/{animal_id}")
def delete_livestock(animal_id: str):
    success = livestock_db.delete_animal(animal_id)
    if not success:
        raise HTTPException(status_code=404, detail="Animal not found")
    return {"message": "Deleted successfully"}

@router.post("/{animal_id}/health", response_model=Animal)
def add_health_record(animal_id: str, record_in: HealthRecord):
    updated = livestock_db.add_health_record(animal_id, record_in.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="Animal not found")
    return updated

@router.post("/{animal_id}/daily_care", response_model=Animal)
def add_daily_care_record(animal_id: str, record_in: DailyCare):
    updated = livestock_db.add_daily_care(animal_id, record_in.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="Animal not found")
    return updated

@router.post("/{animal_id}/feeding", response_model=Animal)
def add_feeding_record(animal_id: str, record_in: FeedingRecord):
    updated = livestock_db.add_feeding_record(animal_id, record_in.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="Animal not found")
    return updated

@router.post("/ask")
async def ask_ai(request: AskLivestockAIRequest):
    response = await ask_livestock_ai(
        question=request.question,
        animal_context=request.animal_context,
        symptoms=request.symptoms
    )
    return {"answer": response}