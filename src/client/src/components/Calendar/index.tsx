import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, DatePicker } from 'antd'
import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import DailySchedule from '../DailySchedule'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import mealActions from '../../redux/actions/meal'
import snackActions from '../../redux/actions/snack'

// Extend Day.js with the UTC plugin
dayjs.extend(utc);

export default function Calendar() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userMeals = useSelector((state: any) => state.meals?.queryResult ?? [])
    const userSnacks = useSelector((state: any) => state.snacks?.queryResult ?? [])
    const [selectedDate, setSelectedDate] = useState<any>(dayjs())
    const [weekViewDates, setWeekViewDates] = useState<any>([])
    const [weekDates, setWeekDates] = useState<any>()


    useEffect(() => {
        setComponentData()
    }, [])
    
    function setComponentData() {
        store.dispatch(mealActions.setMeals(currentUser?._id))
        store.dispatch(snackActions.setSnacks(currentUser?._id))
    }


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

        setWeekDates(thisWeeksDays)
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
                            <div 
                                className='date-bar-cell'
                                key={`date-bar-cell-${d}`}
                            >
                                <span className='date-cell-text'>{d}</span>
                            </div>
                        )
                    }) || []
                }
            </div>
            <div className='calendar-body'>
                {
                    weekDates?.map((d: any, i: number) => {

                        // Find all meals whose time on this iterations the date
                        const mealsMatchingDay = userMeals.filter((meal: any) => meal.time?.split('T')[0] == d )

                        // Find all snacks whose time on this iterations the date
                        const snacksMatchingDay = userSnacks.filter((snack: any) => snack.time?.split('T')[0] == d )


                        // iterate through meal items and add end date for event rendering purposes (15 min after start date)
                        const formattedMeals = mealsMatchingDay?.map((m: any) => {

                            // Time set from form is always utc, ensure it can be parsed as such (includes Z) - edge case
                            const confirmedUTC = (m.time.charAt(m.time.length - 1) === 'Z') ? m.time : m.time + 'Z'

                            // Create UTC start and end dates
                            let date = new Date(confirmedUTC);
                            const letDateAsTS = date.getTime();
                            const dateAsTsPlusFifteenMin = letDateAsTS + 15 * 60 * 1000
                            const plusFifteen = new Date(dateAsTsPlusFifteenMin)?.toISOString()

                            // Detect the user's local timezone
                            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                            // Parse the ISO strings and convert it to UTC time
                            const utcStartDate = dayjs(confirmedUTC).utc();
                            const utcEndDate = dayjs(plusFifteen).utc();

                            // Format the dates with the user's timezone offset
                            const formattedStartDate = utcStartDate.local().format('YYYY-MM-DDTHH:mm:ssZ');
                            const formattedEndDate = utcEndDate.local().format('YYYY-MM-DDTHH:mm:ssZ');          

                            return {
                                ...m, 
                                startTime: formattedStartDate,
                                endTime: formattedEndDate
                            };
                        })|| [];

                        // iterate through snack items and add end date for event rendering purposes (15 min after start date)
                        const formattedSnacks = snacksMatchingDay.map((m: any) => {
                            
                            // Time set from form is always utc, ensure it can be parsed as such (includes Z) - edge case
                            const confirmedUTC = (m.time.charAt(m.time.length - 1) === 'Z') ? m.time : m.time + 'Z'

                            // Create UTC start and end dates
                            let date = new Date(confirmedUTC);
                            const letDateAsTS = date.getTime();
                            const dateAsTsPlusFifteenMin = letDateAsTS + 15 * 60 * 1000
                            const plusFifteen = new Date(dateAsTsPlusFifteenMin)?.toISOString()

                            // Detect the user's local timezone
                            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                            // Parse the ISO strings and convert it to UTC time
                            const utcStartDate = dayjs(confirmedUTC).utc();
                            const utcEndDate = dayjs(plusFifteen).utc();

                            // Format the dates with the user's timezone offset
                            const formattedStartDate = utcStartDate.local().format('YYYY-MM-DDTHH:mm:ssZ');
                            const formattedEndDate = utcEndDate.local().format('YYYY-MM-DDTHH:mm:ssZ'); 

                            return {
                                ...m, 
                                startTime: formattedStartDate,
                                endTime: formattedEndDate
                            };
                        });


                        //ToDo: iterate through workout items items and add to calendar events 

                        let calendarEvents : any[] = [...formattedMeals, ...formattedSnacks]

                        return (
                            <div 
                                className='calendar-body-column'
                                key={`calendar-body-column-${d}`}
                            >
                                <DailySchedule
                                    selectedCalendarDate={d}
                                    idPartial={i}
                                    eventsOnSelectedDay={calendarEvents}
                                />
                            </div>
                        )
                    }) || []
                }
            </div>
        </div>
    )
}