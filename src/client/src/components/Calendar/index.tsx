import React from 'react'
import './styles.css'
import { Button, DatePicker } from 'antd'
import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'



export default function Calendar() {

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
                        size='small'
                        //onChange={onChange} 
                        picker="week" 
                        className='calendar-datepicker'
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