from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Meal import Meal, UpdateMealModel


meal_collection = Meal

class MealOperations:

    async def add_meal(new_meal: Meal) -> Meal:
        new_meal.id = str(ObjectId())
        meal = await new_meal.create()
        return meal


    async def retrieve_all_meals() -> List[Meal]:
        meals = await meal_collection.all().to_list()
        return meals

    
    async def retrieve_meals_for_user(user_id) -> List[Meal]:
        print('user_id', user_id)
        meals = await meal_collection.find(Meal.createdByUserId == user_id).to_list()
        return meals


    async def retrieve_meal(id: Meal) -> Meal:
        meal = await meal_collection.get(str(id))
        if meal:
            return meal
        

    async def delete_meal(id: PydanticObjectId) -> bool:
        try:
            meal = await meal_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if meal:
            await meal.delete()
            return True


    async def update_meal_data(id: PydanticObjectId, data: dict) -> Union[bool, Meal]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        meal = await meal_collection.get(str(id))
        if meal:
            await meal.update(update_query)
            return meal
        return False

