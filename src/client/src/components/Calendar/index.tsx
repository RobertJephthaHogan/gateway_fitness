import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, DatePicker } from 'antd'
import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import dayjs from 'dayjs'
import DailySchedule from '../DailySchedule'



export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState<any>(dayjs())
    const [weekViewDates, setWeekViewDates] = useState<any>([])


    useEffect(() => {

        const weekDates = generateWeekDates()
        setWeekViewDates(weekDates)

    }, [selectedDate])


    const handleDateChange = (value: any) => {
        setSelectedDate(value)
    }

    const formatDateArray = (dateArray: any) => {
        return dateArray.map((d: any) => dayjs(d).format('ddd - MM/DD'));
    };

    const incrementWeek = () => {
        setSelectedDate(dayjs(selectedDate.add(1, 'week')))
    }

    const decrementWeek = () => {
        setSelectedDate(dayjs(selectedDate.subtract(1, 'week')))
    }

    const generateWeekDates = () => {

        const dayOfWeek = new Date(selectedDate).getDay()

        let thisWeeksDays = []
        let precedingDates = []
        let followingDates = []

        // Loop to get the preceding days in the week
        for (var i = 0; i < dayOfWeek; i++) {
            const date = new Date(selectedDate);
            date.setDate(date.getDate() - i - 1);
            precedingDates.push(date.toISOString().split('T')[0]);
        }

        // Loop to get the following days in the week
        for (var i = 0; i < (6 - dayOfWeek); i++) {
            const date = new Date(selectedDate);
            date.setDate(date.getDate() + i + 1);
            followingDates.push(date.toISOString().split('T')[0]);
        }
        
        precedingDates = precedingDates.reverse()

        thisWeeksDays = [
            ...precedingDates, 
            new Date(selectedDate).toISOString().split('T')[0], 
            ...followingDates
        ]

        thisWeeksDays = formatDateArray(thisWeeksDays)

        return thisWeeksDays
    }

    return (
        <div className='calendar'>
            <div className='calendar-top-bar'>
                <div className='calendar-top-bar-left'>
                    <span className='calendar-date-text'>
                        2023 - Week 39
                    </span>
                </div>
                <div className='calendar-top-bar-right'>
                    <Button size='small' onClick={decrementWeek}>
                        <LeftOutlined/>
                    </Button>
                    <DatePicker 
                        value={selectedDate}
                        size='small'
                        picker="week" 
                        className='calendar-datepicker'
                        onChange={handleDateChange}
                    />
                    <Button size='small' onClick={incrementWeek}>
                        <RightOutlined/>
                    </Button>
                </div>
            </div>
            <div className='calendar-date-bar'>
                {
                    weekViewDates?.map((d: any) => {

                        return (
                            <div className='date-bar-cell'>
                                <span className='date-cell-text'>{d}</span>
                            </div>
                        )
                    }) || []
                }
            </div>
            <div className='calendar-body'>
                {
                    weekViewDates?.map((d: any) => {

                        return (
                            <div className='calendar-body-column'>
                                <DailySchedule
                                    selectedCalendarDate={d}
                                />
                            </div>
                        )
                    }) || []
                }
            </div>
        </div>
    )
}