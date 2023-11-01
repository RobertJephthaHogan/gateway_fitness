import initialState from '../initialState'
import * as types from '../types'


export const snackReducer = (state = initialState.snacks, action) => {
    switch (action.type) {

        case types.SET_SNACKS: {
            return {...action.payload?.data}
        }

        case types.ADD_SNACK: {
            let initial = {...state}
            let newSnacks = [...initial?.queryResult, action.payload?.data]
            initial.queryResult = newSnacks
            return initial
        }

        case types.DELETE_SNACK: {
            let initial = {...state}
            let filtered = state?.queryResult?.filter(
                (c) => String(c?.id) !== String(action.snackID)
            )
            initial.queryResult = filtered
            return initial
        }
            
        case types.UPDATE_SNACK: {

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

            const data =  state?.queryResult?.map((snack) => {
                if (snack?.id === action?.payload?.data?._id) {
                    return action.payload.data
                }
                return snack
            })

            initial.queryResult = data

            return initial
        }

        default:
            return state
    }
}
  
export default snackReducer
  