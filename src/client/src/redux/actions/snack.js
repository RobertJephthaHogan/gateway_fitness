import { openNotification } from '../../helpers/notifications'
import { snackService } from '../../services/snack.service'
import * as types from '../types'



const snackActions = {
    setSnacks: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                snackService
                    .getUserSnacks(user_id)
                    .then((response) => {
                        if (response) {
                            dispatch({
                                type: types.SET_SNACKS,
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
                snackService
                    .createSnack(payload)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Snack ${resp?.data?.data?._id} Created Successfully`
                            )
                            dispatch({ type: types.ADD_SNACK, payload: resp?.data })
                            resolve(resp)
                        } else {
                            reject()
                        }
                    })
                    .catch((error) => {
                        console.error('Error Creating Snack:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Creating Snack ${error?.data?.data?._id}`
                        )
                        reject(error)
                    })
            })
        }
    },

    delete: (snackID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return snackService
                    .deleteSnack(snackID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Snack ${snackID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_SNACK, snackID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Snack:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Snack ${snackID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (snackID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return snackService
                    .updateSnack(snackID, payload)
                    .then((resp) => {
                        console.log('resp', resp)
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Snack ${snackID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_SNACK, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Snack:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Snack ${snackID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default snackActions
