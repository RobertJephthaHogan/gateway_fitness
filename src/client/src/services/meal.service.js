import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const mealService = {
    getMeals,
    getUserMeals,
    createMeal,
    getAMeal,
    updateMeal, 
    deleteMeal
}


async function getMeals() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/meal/get_all`)
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

async function getUserMeals(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/meal/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createMeal(mealData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/meal/new`, mealData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAMeal(mealID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/meal/${mealID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateMeal(mealID, newMeal) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/meal/${mealID}`, newMeal)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteMeal(mealID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/meal/${mealID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

