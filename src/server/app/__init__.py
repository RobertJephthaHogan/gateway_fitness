from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import initiate_database

from app.services.user import router as UserRouter
from app.services.meal import router as MealRouter


# Create the App
app = FastAPI()

# Apply CORS Middleware / Allow Origins
origins = [ 
           'http://localhost:3000',
           'http://localhost:3003',
           'https://gateway-fitness.roberthogan.io',
           'https://www.gateway-fitness.roberthogan.io' 
        ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# Start Up Events
@app.on_event("startup")
async def startup_event():
    await initiate_database()
    print("Starting Server...")


# Root Render
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Hello Task Manager."}




app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(MealRouter, tags=["Meal"], prefix="/meal")