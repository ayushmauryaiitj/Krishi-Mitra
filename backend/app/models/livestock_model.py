from pydantic import BaseModel, Field
from typing import List, Optional
import uuid

class DailyCare(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: str
    feeding_done: bool = False
    water_done: bool = False
    cleaning_done: bool = False
    exercise_done: bool = False
    medicine_done: bool = False
    observation_done: bool = False

class FeedingRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    feed_type: str
    quantity: str
    time: str
    notes: Optional[str] = None

class HealthRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    record_type: str = "Checkup" # "Vaccination", "Medicine", "Checkup", "Treatment"
    date: str
    status: Optional[str] = None # Legacy/Optional
    symptoms: Optional[str] = None
    treatment: Optional[str] = None
    notes: Optional[str] = None
    next_due_date: Optional[str] = None
    photo_url: Optional[str] = None

class Animal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    tag_number: str
    type: str
    breed: str
    age: str
    gender: str
    health_status: str = "Healthy"
    vaccination_status: str = "Up to Date"
    notes: Optional[str] = None
    photo_url: Optional[str] = None
    
    # New Care & Management Fields
    feed_type: Optional[str] = None
    daily_quantity: Optional[str] = None
    feeding_frequency: Optional[str] = None
    
    last_checkup_date: Optional[str] = None
    next_checkup_date: Optional[str] = None
    current_symptoms: Optional[str] = None
    
    last_vaccination: Optional[str] = None
    next_vaccination_due: Optional[str] = None
    
    current_medication: Optional[str] = None
    medication_due_date: Optional[str] = None
    
    water_status: Optional[str] = None
    cleaning_status: Optional[str] = None
    activity_behaviour: Optional[str] = None
    additional_care_notes: Optional[str] = None

    daily_care_records: List[DailyCare] = []
    feeding_records: List[FeedingRecord] = []
    health_records: List[HealthRecord] = []

class AnimalCreate(BaseModel):
    tag_number: str
    type: str
    breed: str
    age: str
    gender: str
    health_status: str = "Healthy"
    vaccination_status: str = "Up to Date"
    notes: Optional[str] = None
    photo_url: Optional[str] = None

    feed_type: Optional[str] = None
    daily_quantity: Optional[str] = None
    feeding_frequency: Optional[str] = None
    last_checkup_date: Optional[str] = None
    next_checkup_date: Optional[str] = None
    current_symptoms: Optional[str] = None
    last_vaccination: Optional[str] = None
    next_vaccination_due: Optional[str] = None
    current_medication: Optional[str] = None
    medication_due_date: Optional[str] = None
    water_status: Optional[str] = None
    cleaning_status: Optional[str] = None
    activity_behaviour: Optional[str] = None
    additional_care_notes: Optional[str] = None

class AnimalUpdate(BaseModel):
    tag_number: Optional[str] = None
    type: Optional[str] = None
    breed: Optional[str] = None
    age: Optional[str] = None
    gender: Optional[str] = None
    health_status: Optional[str] = None
    vaccination_status: Optional[str] = None
    notes: Optional[str] = None
    photo_url: Optional[str] = None

    feed_type: Optional[str] = None
    daily_quantity: Optional[str] = None
    feeding_frequency: Optional[str] = None
    last_checkup_date: Optional[str] = None
    next_checkup_date: Optional[str] = None
    current_symptoms: Optional[str] = None
    last_vaccination: Optional[str] = None
    next_vaccination_due: Optional[str] = None
    current_medication: Optional[str] = None
    medication_due_date: Optional[str] = None
    water_status: Optional[str] = None
    cleaning_status: Optional[str] = None
    activity_behaviour: Optional[str] = None
    additional_care_notes: Optional[str] = None

class AskLivestockAIRequest(BaseModel):
    animal_context: Optional[dict] = None
    symptoms: Optional[List[str]] = None
    question: str