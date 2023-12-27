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
            <div style={{height: '1000px'}}>
                {/* 
                    Space to confirm dashboard scroll until 
                    this space is needed
                */}
            </div>
        </div>
    )
}