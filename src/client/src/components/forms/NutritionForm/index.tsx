import React, { useEffect, useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { Button, DatePicker, Form, Input, Radio } from 'antd'
import { ObjectID } from 'bson'
import { store } from '../../../redux/store'
import mealActions from '../../../redux/actions/meal'
import snackActions from '../../../redux/actions/snack'



export default function NutritionForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>({
        'nutritionType': 'meal',
        'ingredients': []
    })
    const [form] = Form.useForm();


    const handleInputChange = (field: string, value: any) => {
        const workingObj = {...formValues}
        workingObj[field] = value
        console.log('workingObj', workingObj)
        setFormValues(workingObj)
    }

    const onFinish = (data: any) => {
        // Using state managed form values for submission for better 
        // handling over the data

        const dto = {...formValues}
            dto['id'] = new ObjectID().toString()
            dto['createdByUserId'] = currentUser?._id
            dto['hasBeenConsumed'] = false

        if (formValues.nutritionType === 'meal') {
            console.log('Submitting as Meal', dto)
            store.dispatch(mealActions.add(dto))
            setFormValues({
                'nutritionType': 'meal',
                'ingredients': [],
            })
            form.resetFields();
        }

        if (formValues.nutritionType === 'snack') {
            console.log('Submitting as Snack')
            store.dispatch(snackActions.add(dto))
            setFormValues({
                'nutritionType': 'meal',
                'ingredients': [],
            })
            form.resetFields();
        }

    }

    return (
        <div>
            <Form 
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="nutrition-type"
                >
                    <Radio.Group 
                        onChange={(e) => handleInputChange('nutritionType', e?.target?.value)} 
                        defaultValue={'meal'}
                    >
                        <Radio value={'meal'}>Meal</Radio>
                        <Radio value={'snack'}>Snack</Radio>
                    </Radio.Group>
                </Form.Item>
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