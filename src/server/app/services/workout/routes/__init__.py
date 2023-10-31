import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.workout_operations import WorkoutOperations
from app.models.Workout import Workout, UpdateWorkoutModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Workout data retrieved", response_model=Response)
async def get_workout_data(id: PydanticObjectId):
    workout = await WorkoutOperations.retrieve_workout(id)
    if workout:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Workout data retrieved successfully",
            "data": workout
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Workout doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Workout data retrieved", response_model=Response)
async def get_workouts_for_user(user_id):
    workouts = await WorkoutOperations.retrieve_workouts_for_user(user_id)
    schData = Workout.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : workouts,
        "schema": schData
    }
    if workouts:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all", response_description="Workout data retrieved", response_model=Response)
async def get_workouts():
    workouts = await WorkoutOperations.retrieve_all_workouts()
    if workouts:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Workouts retrieved successfully",
            "data": workouts
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Workouts exist",
    }


@router.post("/new", response_description="Workout data added into the database", response_model=Response)
async def add_workout_data(workout: Workout = Body(...)):
    new_workout = await WorkoutOperations.add_workout(workout)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Workout created successfully",
        "data": new_workout
    }


@router.delete("/{id}", response_description="Workout data deleted from the database")
async def delete_workout_data(id: PydanticObjectId):
    deleted_workout = await WorkoutOperations.delete_workout(id)
    if deleted_workout:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Workout with ID: {} removed".format(id),
            "data": deleted_workout
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Workout with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_workout(id: PydanticObjectId, req: UpdateWorkoutModel = Body(...)):
    updated_workout = await WorkoutOperations.update_workout_data(id, req.dict())
    if updated_workout:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Workout with ID: {} updated".format(id),
            "data": updated_workout
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Workout with ID: {} not found".format(id),
        "data": False
    }
