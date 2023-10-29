import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.meal_operations import MealOperations
from app.models.Meal import Meal, UpdateMealModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Meal data retrieved", response_model=Response)
async def get_meal_data(id: PydanticObjectId):
    meal = await MealOperations.retrieve_meal(id)
    if meal:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Meal data retrieved successfully",
            "data": meal
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Meal doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Meal data retrieved", response_model=Response)
async def get_meals_for_user(user_id):
    meals = await MealOperations.retrieve_meals_for_user(user_id)
    schData = Meal.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : meals,
        "schema": schData
    }
    if meals:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all_meals", response_description="Meal data retrieved", response_model=Response)
async def get_meals():
    meals = await MealOperations.retrieve_all_meals()
    if meals:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Meals retrieved successfully",
            "data": meals
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Meals exist",
    }


@router.post("/new", response_description="Meal data added into the database", response_model=Response)
async def add_meal_data(meal: Meal = Body(...)):
    new_meal = await MealOperations.add_meal(meal)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Meal created successfully",
        "data": new_meal
    }


@router.delete("/{id}", response_description="Meal data deleted from the database")
async def delete_meal_data(id: PydanticObjectId):
    deleted_meal = await MealOperations.delete_meal(id)
    if deleted_meal:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Meal with ID: {} removed".format(id),
            "data": deleted_meal
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Meal with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_meal(id: PydanticObjectId, req: UpdateMealModel = Body(...)):
    updated_meal = await MealOperations.update_meal_data(id, req.dict())
    if updated_meal:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Meal with ID: {} updated".format(id),
            "data": updated_meal
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Meal with ID: {} not found".format(id),
        "data": False
    }
