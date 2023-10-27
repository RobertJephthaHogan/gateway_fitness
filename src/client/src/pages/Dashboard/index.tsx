import React from 'react'
import './styles.css'
import Calendar from '../../components/Calendar'

export default function Dashboard() {

    return (
        <div className='dashboard'>
            <div className='calendar-and-card-container'>
                <div className='calendar-container'>
                    <Calendar/>
                </div>
                <div className='card-container'>
                    Card Container
                </div>
            </div>
        </div>
    )
}