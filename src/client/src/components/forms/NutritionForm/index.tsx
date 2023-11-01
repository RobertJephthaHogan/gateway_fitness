import React, { useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { Button, DatePicker, Form, Input } from 'antd'



export default function NutritionForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>()

    const handleInputChange = (field: string, value: any) => {

        const workingObj = {...formValues}
        workingObj[field] = value
        console.log('workingObj', workingObj)
        setFormValues(workingObj)
    }

    const onFinish = (data: any) => {
        console.log('data', data)
        console.log('formValues', formValues)

    }

    return (
        <div>
            <Form 
                onFinish={onFinish}
            >
                <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input
                        placeholder='Title'
                        onChange={
                            (e) => handleInputChange(
                                'title', 
                                e?.target?.value
                                )
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="time"
                    rules={[{ required: true }]}
                >
                    <DatePicker 
                        showTime
                        onChange={
                            (v) => handleInputChange(
                                'time', v?.format('YYYY-MM-DD HH:mm:ss')
                            )
                        } 
                        className='nutrition-form-datepicker'
                        placeholder='Time'
                    />
                </Form.Item>
                <div>
                    ToDo: Ingredients component here
                </div>
                <div>
                    <Button 
                        //onClick={onFinish}
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}