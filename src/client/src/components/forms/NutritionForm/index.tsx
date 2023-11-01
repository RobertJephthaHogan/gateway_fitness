import React, { useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { Button, DatePicker, Form, Input, Radio } from 'antd'



export default function NutritionForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>({
        'nutrition-type': 'meal'
    })

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
                <Radio.Group 
                    onChange={(e) => handleInputChange('nutrition-type', e?.target?.value)} 
                    defaultValue={'meal'}
                >
                    <Radio value={'meal'}>Meal</Radio>
                    <Radio value={'snack'}>Snack</Radio>
                </Radio.Group>
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
                <div className='submission-button-container'>
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