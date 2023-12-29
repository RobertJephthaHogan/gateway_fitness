from beanie import Document
from typing import Optional
from pydantic import BaseModel, Field



class WorkoutRoutine(Document):
    id: Optional[str] = Field(...)
    title: Optional[str] = Field(...)
    exercises: Optional[list] = Field(...)
    createdByUserId: str = Field(...)
    type: Optional[str] = Field(...)
    
    class Settings:
        name = "WorkoutRoutine"
        
    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": 'Pull Day',
                "exercises": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "type": "gym-routine"
            }
        }
        

class UpdateWorkoutRoutineModel(BaseModel):
    id: Optional[str]
    title: Optional[str] 
    exercises: Optional[list]
    createdByUserId: Optional[str]
    type: Optional[str] 

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": 'Push Day',
                "exercises": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "type": "gym-routine"
            }
        }

