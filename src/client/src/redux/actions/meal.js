import { openNotification } from '../../helpers/notifications'
import { mealService } from '../../services/meal.service'
import * as types from '../types'



const mealActions = {
    setMeals: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                mealService
                    .getUserMeals(user_id)
                    .then((response) => {
                        if (response) {
                            dispatch({
                                type: types.SET_MEALS,
                                payload: response?.data,
                            })
                            resolve(response)
                        } else {
                            reject()
                        }
                    })
                    .catch((error) => reject(error))
            })
        }
    },

    add: (payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                mealService
                .createMeal(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Meal ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_MEAL, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Meal:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Meal ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (mealID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return mealService
                    .deleteMeal(mealID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Meal ${mealID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_MEAL, mealID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Meal:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Meal ${mealID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (mealID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return mealService
                    .updateMeal(mealID, payload)
                    .then((resp) => {
                        console.log('resp', resp)
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Meal ${mealID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_MEAL, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Meal:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Meal ${mealID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default mealActions
