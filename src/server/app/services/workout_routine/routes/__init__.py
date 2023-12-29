import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.workout_routine_operations import WorkoutRoutineOperations
from app.models.WorkoutRoutine import WorkoutRoutine, UpdateWorkoutRoutineModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="WorkoutRoutine data retrieved", response_model=Response)
async def get_workout_routine_data(id: PydanticObjectId):
    workout_routine = await WorkoutRoutineOperations.retrieve_workout_routine(id)
    if workout_routine:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "WorkoutRoutine data retrieved successfully",
            "data": workout_routine
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "WorkoutRoutine doesn't exist",
    }

@router.get("/user/{user_id}", response_description="WorkoutRoutine data retrieved", response_model=Response)
async def get_workout_routines_for_user(user_id):
    workout_routines = await WorkoutRoutineOperations.retrieve_workout_routines_for_user(user_id)
    schData = WorkoutRoutine.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : workout_routines,
        "schema": schData
    }
    if workout_routines:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all", response_description="WorkoutRoutine data retrieved", response_model=Response)
async def get_workout_routines():
    workout_routines = await WorkoutRoutineOperations.retrieve_all_workout_routines()
    if workout_routines:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "WorkoutRoutines retrieved successfully",
            "data": workout_routines
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No WorkoutRoutines exist",
    }


@router.post("/new", response_description="WorkoutRoutine data added into the database", response_model=Response)
async def add_workout_routine_data(workout_routine: WorkoutRoutine = Body(...)):
    new_workout_routine = await WorkoutRoutineOperations.add_workout_routine(workout_routine)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "WorkoutRoutine created successfully",
        "data": new_workout_routine
    }


@router.delete("/{id}", response_description="WorkoutRoutine data deleted from the database")
async def delete_workout_routine_data(id: PydanticObjectId):
    deleted_workout_routine = await WorkoutRoutineOperations.delete_workout_routine(id)
    if deleted_workout_routine:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "WorkoutRoutine with ID: {} removed".format(id),
            "data": deleted_workout_routine
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "WorkoutRoutine with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_workout_routine(id: PydanticObjectId, req: UpdateWorkoutRoutineModel = Body(...)):
    updated_workout_routine = await WorkoutRoutineOperations.update_workout_routine_data(id, req.dict())
    if updated_workout_routine:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "WorkoutRoutine with ID: {} updated".format(id),
            "data": updated_workout_routine
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. WorkoutRoutine with ID: {} not found".format(id),
        "data": False
    }
