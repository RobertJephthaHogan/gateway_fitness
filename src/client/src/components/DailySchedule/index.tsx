import { DeleteOutlined, EditOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { 
    Button, 
    Col, 
    Modal, 
    Popconfirm, 
    Row, 
    message 
} from 'antd';
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react';

import './styles.css'
import { store } from '../../redux/store';
import mealActions from '../../redux/actions/meal';
import snackActions from '../../redux/actions/snack';

type Props = {
  selectedCalendarDate?: any;
  setDailyScheduleView?: any
  eventsOnSelectedDay?: any
  hasDeactiveTime?: any
  deactivateTimeBefore?: any
  deactivateTimeAfter?: any
  deactivateTimeBetween?: any
  isCollapsible?:any
  showHeader?: any
  idPartial?: any
};

const DailySchedule: React.FC<Props> = ({
    selectedCalendarDate,
    setDailyScheduleView,
    eventsOnSelectedDay,
    hasDeactiveTime,
    isCollapsible,
    showHeader,
    idPartial

}) => {
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const confirmEdit = () => {
        message.info('Editing mode enabled.');
        setIsModalVisible(true)
    };

    const confirmDelete = (eventData: any) => {

        if (eventData.type === 'meal') {
            store.dispatch(mealActions.delete(eventData.id))
        }

        if (eventData.type === 'snack') {
            store.dispatch(snackActions.delete(eventData.id))
        }

    };

    let onTheHourTimes : any[] = [];

    //Generates an Array of of times formatted for clean rendering ex. "12:00AM", 
    //returns all times of day, also populates onTheHourTimes Array 
    const timesGenerator = () => {
        let minutesInterval = 1;
        let times = []; 
        let hourIndex = 0;
        let startTime = 0; 
        let ap = ['AM', 'PM']; 

        for (let i=0;startTime<24*60; i++) { 
            let hourOfDay = Math.floor(startTime/60); // Getting hour 
            let minuteOfHour = (startTime%60); // Getting Minute
            let convertToTwelve = hourOfDay === 0 || hourOfDay === 12 ? 12 : hourOfDay% 12 // Convert 0-23 to 12 hour time format and replace 00 hours with 12
            let formattedHourString = ("0" + (convertToTwelve)).slice(-2) // Converts hours from 1, 2, 3... to 01, 02, 03 for proper time string formatting
            let formattedMinuteString = ("0" + minuteOfHour).slice(-2) // Converts minutes from 1, 2, 3... to 01, 02, 03 for proper time string formatting
            let determineAMorPM = ap[Math.floor(hourOfDay/12)] // "[Math.floor(hourOfDay/12)]" evaluates to either 0 or 1, accessing either AM or PM by index from ap array
            times[i] = `${formattedHourString}:${formattedMinuteString}${determineAMorPM}`; // pushing data in array in [00:00 - 12:00 AM/PM format]
            
            if (minuteOfHour === 0) {
                onTheHourTimes[hourIndex] =  `${formattedHourString}:${formattedMinuteString}${determineAMorPM}`
                hourIndex++
            }
            startTime = startTime + minutesInterval;
        }
        return times
    }

    const timeDifferenceInMinutes = (date_one: any, date_two: any) => Math.ceil(Math.abs(Date.parse(date_one) - Date.parse(date_two)) / (1000 * 60 ));

    // Converting timestring formatted for render to parsable datetime string
    const timeConverter = (timeToConvert: any, dateString: any) => { 
        let convertedHourNumber;
        let hourNumber = timeToConvert.split(":")[0]
        let amOrPm = timeToConvert.slice(-2)

        if (hourNumber === "12" && amOrPm === "AM") { 
            convertedHourNumber = "00"
        } else if (amOrPm === "PM" && hourNumber !== "12") { 
            convertedHourNumber = (parseInt(hourNumber, 10) + 12).toString()
        } else { 
            hourNumber = hourNumber[0] === '0' ? hourNumber.slice(1) : hourNumber
            convertedHourNumber = (hourNumber.length <= 1 ? `0${parseInt(hourNumber, 10) }` : parseInt(hourNumber, 10)).toString()
        }
        return `${dateString}T${convertedHourNumber}:00:00`
    }

    // function to format event present on selected day with some info that helps clean up the cell render functions
    const getSelectedEventsIfExist = () => {
            let entriesOnSelectedDay =
                eventsOnSelectedDay?.map((entry: any) => (
                    {
                        startDateTime: entry.startTime,
                        endDateTime: entry.endTime,
                        isValidDailyTimeRange:  (Date.parse(entry.startTime) < Date.parse(entry.endTime)) && (entry.startTime.split("T")[0] === entry.endTime.split("T")[0]),
                        eventLengthInMinutes : timeDifferenceInMinutes(entry.startTime, entry.endTime),
                        event: entry
                    }
            )) || []
        return entriesOnSelectedDay
    }

    const timesArray = timesGenerator(); //times generator needs to be called by this point for proper variables to be set, even if timesArray is not used
    const timesObjArray = timesArray.map((date: any) => ({ 'time' : date}));
    const hoursObjArray = onTheHourTimes.map((date: any) => ({ 'time' : date}));
    


    const TimeCellRenderer = ({time, eventsOnSelectedDay} : any) => {
        let eventStartTimeOffsetFromTopOfHour : any;
        let eventEntries;
        let isTimeBlockContainingEventStart = false;
        let thisBlocksEvent;
        let timeBlockEvents : any = [];
        let isInactiveTime = false;
        let eventDuration;

        if (hasDeactiveTime){
            let timeint = time.split(':')[0]
            let timetail = time.slice(-2,)
            if (timeint <= 7 && timetail === 'AM' || timeint >= 12 && timetail === 'AM') {
                isInactiveTime = true
            } else if (timeint >= 5 && timetail ==='PM' && timeint != '12') {
                isInactiveTime = true
            } else {
                isInactiveTime = false
            }
        }

        // If the selected day has events, check if valid event range (start and end time on same date & Start Time is before End Time) 
        // if valid event found, verify event start time is within event range being checked and < 60 min difference from start to render on correct nearest hr
        let validEntries = [];
        if (eventsOnSelectedDay?.length) {
            eventEntries =  getSelectedEventsIfExist()
            
            // filter for valid event entries
            for (let item in eventEntries) {
                let isValidEvent = eventEntries[item].isValidDailyTimeRange;
                if (isValidEvent) {
                    validEntries.push(eventEntries[item])
                    continue
                }
            }


            for (let entry in validEntries) {
                if (validEntries[entry]) {
                    let eventStart = validEntries[entry].startDateTime;
                    eventDuration = validEntries[entry].eventLengthInMinutes;
                    let eventEnd = validEntries[entry].endDateTime;
                    let dateString = eventStart.split("T")[0];
                    let startTimeString = eventStart.split("T")[1].slice( 0, 6);
                    let endTimeString = eventEnd.split("T")[1].slice( 0, 6);
                    let convertedTime = timeConverter(time, dateString);
                    eventStartTimeOffsetFromTopOfHour = timeDifferenceInMinutes(eventStart, convertedTime) // Find how far the event tile should render from top of time block
                    let startTimeHour = parseInt(startTimeString.split(":")[0], 10) // Get the events's start tie
                    startTimeHour = startTimeHour > 12 ? startTimeHour - 12 : startTimeHour // if startTime is in 24 hour time, adjust to 12 hour time for rendering logic
                    const timeBlockHour = (parseInt(time.split(":")[0], 10)) // Get the timeBlock's hour
                    const startTimeMatchTimeBlock : boolean = startTimeHour === timeBlockHour // Check if event start time matches time block

                    if (
                        (timeDifferenceInMinutes(eventStart, convertedTime) < 60) 
                        && startTimeMatchTimeBlock
                        ) {
                        isTimeBlockContainingEventStart = true //triggers cell event render in if else following this
                        thisBlocksEvent = validEntries[entry] //define a variable for renderers to reference this events info
                        
                        const thisEvent = validEntries[entry]

                        // this events data with render values
                        const eventData = {
                            ...thisEvent,
                            eventStartTimeOffsetFromTopOfHour,
                            eventDuration,
                        }

                        timeBlockEvents.push(eventData)

                        // legacy - keep for debugging - single event render 
                        //validEntries = validEntries.pop(validEntries[entry]) // only last event cell renders without this with legacy logic
                    } 
                }
            } 
        }


        // return cell with rendered event tile for a valid time block containing event startTime
        if (isTimeBlockContainingEventStart) { 
            return (
                <div className='schedule-time-block'>
                    <div className='offset-wrapper' style={{height:"60px"}}>
                        

                        {
                            timeBlockEvents?.map((evt: any, i: number) => {

                                return (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            // If the event is not the first in the time block, offset it from the top of the div
                                            top: i != 0 ? evt.eventStartTimeOffsetFromTopOfHour + "px" : 'unset',
                                            width: '100%',
                                        }}
                                        key={`evt.event?.title-${i}`}
                                    >
                                        {
                                            // If the event is the first in the time block, render space for minutes before event
                                            i === 0 && <div style={{height:evt.eventStartTimeOffsetFromTopOfHour + "px"}} />
                                        }
                                        <div 
                                            className='w-100 event-tile' 
                                            style={{
                                                height:evt.eventDuration + "px", 
                                                position: "relative",
                                            }}
                                        > 
                                            <div className='event-tile-content'>
                                                <div>
                                                    <h5 className='event-tile-title'>{evt.event?.title}</h5>
                                                </div>
                                                <div className='event-actions-container'>
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title={"Edit Event Details?"}
                                                        onConfirm={confirmEdit}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    > 
                                                        <EditOutlined className='event-beginning-icon' />
                                                    </Popconfirm>
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title={"Are you sure you want to delete this event?"}
                                                        onConfirm={() => confirmDelete(evt?.event)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    > 
                                                        <DeleteOutlined className='event-beginning-icon' /> 
                                                    </Popconfirm>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }) || []
                        }

                    </div>
                </div>
            )
        } else if (isInactiveTime) { // return cell with inactive time cell styling
            return (
                <div className=' w-100 schedule-time-block' style={{height: "60px"}}>
                    <div className='inactiveCourtTime w-100 ' style={{height: "60px"}}></div>
                </div>
            )
        }  else { // else return empty cell
            return (
                <div className=' w-100 schedule-time-block' style={{height: "60px"}}>
                    <div className='w-100 ' style={{height: "60px"}}>
                        <span className='event-time-txt'>
                            {time}
                        </span>
                    </div>
                </div>
            )
        }        
    }



    function ScheduleRenderer() {
        return (
            <div className='w-100' style={{height:"1440px"}}>
                {hoursObjArray.map(({ time } : any) => {

                    return (
                        <div className='w-100 flex' key={time}>
                            <Row className='flex w-100 schedule-row'>
                                <div className='w-100 '>
                                    <TimeCellRenderer
                                        time={time}
                                        eventsOnSelectedDay={eventsOnSelectedDay}
                                    />
                                </div>
                            </Row>
                        </div>
                    )
                }
            )}
        </div>
        )
    }

    const ConditionalCollapseButton = () => {
        if (isCollapsible) {
            return <Button 
                    type="primary"
                    onClick={() => setDailyScheduleView()}
                    >
                        <MenuUnfoldOutlined />
                    </Button>
        } else {
            return <></>;
        }
    }


    const date = dayjs(selectedCalendarDate).format("MM-DD-YYYY")
    
    useEffect(() => {
        ScrollToEightAM()
        }, [])

    function ScrollToEightAM() {
        const elementToTarget: any = document.getElementById(`schedule-content-${idPartial}`)
        // eslint-disable-next-line no-restricted-globals
        elementToTarget?.addEventListener("overflow", scroll())
        const v_shift = elementToTarget.scrollHeight / 3 
        elementToTarget.scrollTo(0, v_shift)
    }

    return(
        <div className='daily-schedule' id='daily-schedule' >
            <div className='bordered bg-white'>
                {
                    showHeader
                    ? <div>
                        <Row className='flex w-100 space-between'>
                            <Col>
                                <div className='pl-2 pt-2'>
                                    Daily Schedule <br />
                                    For Day Of: {date}
                                </div>
                            </Col>
                            <Col className='pr-8'>
                                <div className='vertical-center'>
                                    <ConditionalCollapseButton />
                                </div>
                            </Col>
                        </Row>
                        <div className=' w-100 mt-4 ml-2 mr-2' >
                            <Row className='w-100 flex'>
                                <div className='w-100 flex'>
                                <Row className='flex w-100 mr-1'>
                                    <Col span={6} className='w-100'>
                                    <div className='flex w-100 bordered'>
                                        Time
                                    </div>
                                    </Col>
                                    <Col span={18}>
                                        <div className='pr-4'>
                                            <div className='flex w-100 bordered '>
                                                {date}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </Row>
                        </div>
                    </div>
                    : null
                }
                <div className=' w-100' >
                    <Col 
                        span={24} 
                        className={`schedule-content`} 
                        id={`schedule-content-${idPartial}`}
                    >
                        <ScheduleRenderer />
                    </Col>
                </div>
            </div>
            <Modal title="View Event Details " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Event Modal contents...</p>
            </Modal>
        </div>
    )
}

export default DailySchedule;

