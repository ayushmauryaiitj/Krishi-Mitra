import json
import os
from typing import List, Optional
from app.models.livestock_model import Animal

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'data', 'livestock.json')

def ensure_file_exists():
    if not os.path.exists(DATA_FILE):
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)

def get_all_animals() -> List[dict]:
    ensure_file_exists()
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def save_all_animals(animals: List[dict]):
    ensure_file_exists()
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(animals, f, indent=4)

def add_animal(animal: Animal) -> dict:
    animals = get_all_animals()
    animal_dict = animal.model_dump()
    animals.append(animal_dict)
    save_all_animals(animals)
    return animal_dict

def update_animal(animal_id: str, update_data: dict) -> Optional[dict]:
    animals = get_all_animals()
    for i, a in enumerate(animals):
        if a['id'] == animal_id:
            for k, v in update_data.items():
                if v is not None:
                    a[k] = v
            animals[i] = a
            save_all_animals(animals)
            return a
    return None

def delete_animal(animal_id: str) -> bool:
    animals = get_all_animals()
    new_animals = [a for a in animals if a['id'] != animal_id]
    if len(animals) != len(new_animals):
        save_all_animals(new_animals)
        return True
    return False

def add_health_record(animal_id: str, record: dict) -> Optional[dict]:
    animals = get_all_animals()
    for i, a in enumerate(animals):
        if a['id'] == animal_id:
            if 'health_records' not in a:
                a['health_records'] = []
            a['health_records'].append(record)
            if 'status' in record and record['status']:
                a['health_status'] = record['status']
            animals[i] = a
            save_all_animals(animals)
            return a
    return None

def add_daily_care(animal_id: str, record: dict) -> Optional[dict]:
    animals = get_all_animals()
    for i, a in enumerate(animals):
        if a['id'] == animal_id:
            if 'daily_care_records' not in a:
                a['daily_care_records'] = []
            a['daily_care_records'].append(record)
            animals[i] = a
            save_all_animals(animals)
            return a
    return None

def add_feeding_record(animal_id: str, record: dict) -> Optional[dict]:
    animals = get_all_animals()
    for i, a in enumerate(animals):
        if a['id'] == animal_id:
            if 'feeding_records' not in a:
                a['feeding_records'] = []
            a['feeding_records'].append(record)
            animals[i] = a
            save_all_animals(animals)
            return a
    return None