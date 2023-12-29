from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.WorkoutRoutine import WorkoutRoutine, UpdateWorkoutRoutineModel


workout_routine_collection = WorkoutRoutine

class WorkoutRoutineOperations:

    async def add_workout_routine(new_workout_routine: WorkoutRoutine) -> WorkoutRoutine:
        new_workout_routine.id = str(ObjectId())
        workout_routine = await new_workout_routine.create()
        return workout_routine


    async def retrieve_all_workout_routines() -> List[WorkoutRoutine]:
        workout_routines = await workout_routine_collection.all().to_list()
        return workout_routines

    
    async def retrieve_workout_routines_for_user(user_id) -> List[WorkoutRoutine]:
        print('user_id', user_id)
        workout_routines = await workout_routine_collection.find(WorkoutRoutine.createdByUserId == user_id).to_list()
        return workout_routines


    async def retrieve_workout_routine(id: WorkoutRoutine) -> WorkoutRoutine:
        workout_routine = await workout_routine_collection.get(str(id))
        if workout_routine:
            return workout_routine
        

    async def delete_workout_routine(id: PydanticObjectId) -> bool:
        try:
            workout_routine = await workout_routine_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if workout_routine:
            await workout_routine.delete()
            return True


    async def update_workout_routine_data(id: PydanticObjectId, data: dict) -> Union[bool, WorkoutRoutine]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        workout_routine = await workout_routine_collection.get(str(id))
        if workout_routine:
            await workout_routine.update(update_query)
            return workout_routine
        return False

