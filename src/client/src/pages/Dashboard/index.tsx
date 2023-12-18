import React from 'react'
import './styles.css'
import Calendar from '../../components/Calendar'
import NutritionCard from '../../components/NutritionCard'

export default function Dashboard() {

    return (
        <div className='dashboard'>
            <div className='calendar-and-card-container'>
                <div className='calendar-container'>
                    <Calendar/>
                </div>
                <div className='card-container'>
                    <NutritionCard/>
                </div>
            </div>
        </div>
    )
}