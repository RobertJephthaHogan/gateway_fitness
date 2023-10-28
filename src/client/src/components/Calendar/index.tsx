import React, { useState } from 'react'
import './styles.css'
import { Button, DatePicker } from 'antd'
import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import dayjs from 'dayjs'



export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState<any>(dayjs())

    const handleDateChange = (value: any) => {
        console.log('value', value.format('YYYY-MM-DD'))
        setSelectedDate(value)
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
                    <Button size='small'>
                        <LeftOutlined/>
                    </Button>
                    <DatePicker 
                        value={selectedDate}
                        size='small'
                        //onChange={onChange} 
                        picker="week" 
                        className='calendar-datepicker'
                        onChange={handleDateChange}
                    />
                    <Button size='small'>
                        <RightOutlined/>
                    </Button>
                </div>
            </div>
            <div className='calendar-date-bar'>
            
            </div>
            Calendar
        </div>
    )
}