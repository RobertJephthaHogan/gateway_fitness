import initialState from '../initialState'
import * as types from '../types'


export const mealReducer = (state = initialState.meals, action) => {
    switch (action.type) {

        case types.SET_MEALS: {
            return {...action.payload?.data}
        }

        case types.ADD_MEAL: {
            let initial = {...state}
            let newMeals = [...initial?.queryResult, action.payload?.data]
            initial.queryResult = newMeals
            return initial
        }

        case types.DELETE_MEAL: {
            let initial = {...state}
            let filtered = state?.queryResult?.filter(
                (c) => String(c?.id) !== String(action.mealID)
            )
            initial.queryResult = filtered
            return initial
        }
            
        case types.UPDATE_MEAL: {

            let initial = {...state}

            if (!action?.payload?.data?._id) {
                return state
            }

            const found = state?.queryResult?.find(
                (c) => c?.id === action?.payload?.data?._id
            )

            if (!found && action?.payload) {
                let workingObj = {...state}
                let workingQR = [...workingObj?.queryResult] 
                workingQR = [...workingQR, action?.payload?.data]
                workingObj.queryResult = workingQR
                return workingObj
            }

            const data =  state?.queryResult?.map((meal) => {
                if (meal?.id === action?.payload?.data?._id) {
                    return action.payload.data
                }
                return meal
            })

            initial.queryResult = data

            return initial
        }

        default:
            return state
    }
}
  
export default mealReducer
  