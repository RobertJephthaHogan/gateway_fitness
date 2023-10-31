from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Workout import Workout, UpdateWorkoutModel


workout_collection = Workout

class WorkoutOperations:

    async def add_workout(new_workout: Workout) -> Workout:
        new_workout.id = str(ObjectId())
        workout = await new_workout.create()
        return workout


    async def retrieve_all_workouts() -> List[Workout]:
        workouts = await workout_collection.all().to_list()
        return workouts

    
    async def retrieve_workouts_for_user(user_id) -> List[Workout]:
        print('user_id', user_id)
        workouts = await workout_collection.find(Workout.createdByUserId == user_id).to_list()
        return workouts


    async def retrieve_workout(id: Workout) -> Workout:
        workout = await workout_collection.get(str(id))
        if workout:
            return workout
        

    async def delete_workout(id: PydanticObjectId) -> bool:
        try:
            workout = await workout_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if workout:
            await workout.delete()
            return True


    async def update_workout_data(id: PydanticObjectId, data: dict) -> Union[bool, Workout]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        workout = await workout_collection.get(str(id))
        if workout:
            await workout.update(update_query)
            return workout
        return False

