import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Workout(Document):
    id: Optional[str] = Field(...)
    title: Optional[str] = Field(...)
    exercises: Optional[list] = Field(...)
    createdByUserId: str = Field(...)
    time: datetime.datetime = Field(...)
    type: Optional[str] = Field(...)
    
    class Settings:
        name = "Workout"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": 'Pull Day',
                "exercises": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
                "type": "gym-routine"
            }
        }


class UpdateWorkoutModel(BaseModel):
    id: Optional[str]
    title: Optional[str] 
    exercises: Optional[list]
    createdByUserId: Optional[str]
    time: Optional[datetime.datetime]
    type: Optional[str] 

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": 'Push Day',
                "exercises": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
                "type": "gym-routine"
            }
        }

