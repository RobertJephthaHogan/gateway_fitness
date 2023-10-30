import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.snack_operations import SnackOperations
from app.models.Snack import Snack, UpdateSnackModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Snack data retrieved", response_model=Response)
async def get_snack_data(id: PydanticObjectId):
    snack = await SnackOperations.retrieve_snack(id)
    if snack:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Snack data retrieved successfully",
            "data": snack
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Snack doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Snack data retrieved", response_model=Response)
async def get_snacks_for_user(user_id):
    snacks = await SnackOperations.retrieve_snacks_for_user(user_id)
    schData = Snack.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : snacks,
        "schema": schData
    }
    if snacks:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all", response_description="Snack data retrieved", response_model=Response)
async def get_snacks():
    snacks = await SnackOperations.retrieve_all_snacks()
    if snacks:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Snacks retrieved successfully",
            "data": snacks
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Snacks exist",
    }


@router.post("/new", response_description="Snacks data added into the database", response_model=Response)
async def add_snack_data(snack: Snack = Body(...)):
    new_snack = await SnackOperations.add_snack(snack)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Snack created successfully",
        "data": new_snack
    }


@router.delete("/{id}", response_description="Snack data deleted from the database")
async def delete_snack_data(id: PydanticObjectId):
    deleted_snack = await SnackOperations.delete_snack(id)
    if deleted_snack:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Snack with ID: {} removed".format(id),
            "data": deleted_snack
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Snack with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_snack(id: PydanticObjectId, req: UpdateSnackModel = Body(...)):
    updated_snack = await SnackOperations.update_snack_data(id, req.dict())
    if updated_snack:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Snack with ID: {} updated".format(id),
            "data": updated_snack
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Snack with ID: {} not found".format(id),
        "data": False
    }
