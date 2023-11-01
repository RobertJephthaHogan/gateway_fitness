import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const snackService = {
    getSnacks,
    getUserSnacks,
    createSnack,
    getASnack,
    updateSnack, 
    deleteSnack
}


async function getSnacks() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/snack/get_all`)
            .then((response) => {
                const resp = response.data
                return resolve(resp)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getUserSnacks(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/snack/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createSnack(snackData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/snack/new`, snackData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getASnack(snackID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/snack/${snackID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateSnack(snackID, newSnack) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/snack/${snackID}`, newSnack)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteSnack(snackID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/snack/${snackID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

