import React, { useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { DatePicker, Input } from 'antd'

export default function NutritionForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>()

    const handleInputChange = (field: string, value: any) => {

        const workingObj = {...formValues}
        workingObj[field] = value
        console.log('workingObj', workingObj)
        setFormValues(workingObj)
    }

    const onFinish = () => {

    }

    return (
        <div>
            <Input
                placeholder='Title'
                onChange={
                    (e) => handleInputChange(
                        'title', 
                        e?.target?.value
                        )
                }
            />
            <DatePicker 
                showTime
                onChange={
                    (v) => handleInputChange(
                        'time', v?.format('YYYY-MM-DD HH:mm:ss')
                        )
                } 
                className='nutrition-form-datepicker'
            />
            <div>
                ToDo: Ingredients component here
            </div>
        </div>
    )
}