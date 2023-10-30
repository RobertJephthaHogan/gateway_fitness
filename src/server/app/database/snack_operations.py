from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Snack import Snack, UpdateSnackModel


snack_collection = Snack

class SnackOperations:

    async def add_snack(new_snack: Snack) -> Snack:
        new_snack.id = str(ObjectId())
        snack = await new_snack.create()
        return snack


    async def retrieve_all_snacks() -> List[Snack]:
        snacks = await snack_collection.all().to_list()
        return snacks

    
    async def retrieve_snacks_for_user(user_id) -> List[Snack]:
        print('user_id', user_id)
        snacks = await snack_collection.find(Snack.createdByUserId == user_id).to_list()
        return snacks


    async def retrieve_snack(id: Snack) -> Snack:
        snack = await snack_collection.get(str(id))
        if snack:
            return snack
        

    async def delete_snack(id: PydanticObjectId) -> bool:
        try:
            snack = await snack_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if snack:
            await snack.delete()
            return True


    async def update_snack_data(id: PydanticObjectId, data: dict) -> Union[bool, Snack]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        snack = await snack_collection.get(str(id))
        if snack:
            await snack.update(update_query)
            return snack
        return False

