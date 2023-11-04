import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { Button, DatePicker, Empty, Form, Input, Radio } from 'antd'
import { ObjectID } from 'bson'
import { store } from '../../../redux/store'
import mealActions from '../../../redux/actions/meal'
import snackActions from '../../../redux/actions/snack'
import PlusOutlined from '@ant-design/icons/PlusOutlined'


interface NutritionFormProps {
    setComponentData?: any
    setEntryModalOpen?: any
}

export default function NutritionForm(props: NutritionFormProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [editingIndex, setEditingIndex] = useState<any>(null)
    const [formValues, setFormValues] = useState<any>({
        'nutritionType': 'meal',
        'ingredients': []
    })
    const [ingredients, setIngredients] = useState<any>([])
    const [form] = Form.useForm();


    const handleInputChange = (field: string, value: any) => {
        const workingObj = {...formValues}
        workingObj[field] = value
        console.log('workingObj', workingObj)
        setFormValues(workingObj)
    }

    const addNewIngredient = () => {
        const workingIngredients = [...ingredients, {}]
        setIngredients(workingIngredients)
        setEditingIndex(workingIngredients?.length)
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

        // Set New Meal / Snack items to global state after creation
        props?.setComponentData()
        props?.setEntryModalOpen(false)
        

    }

    function IngredientInput() {

        const [editingSubject, setEditingSubject] = useState<any>({})

        const onIngredientChange = (value: any, field: string) => {
            const workingObj = {...editingSubject}
            workingObj[field] = value
            console.log('workingObj', workingObj)
            setEditingSubject(workingObj)
        }

        const handleAddIngredient = () => {
            const existing = {...formValues}
            existing.ingredients = [...existing?.ingredients, editingSubject]
            setFormValues(existing)
            setIngredients([])
            setEditingIndex(null)
        }

        return (
            <div>
                <div className='ingredient-input-row'>
                    <Input
                        placeholder='Title'
                        className='input-item'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'title')}
                    />
                    <Input
                        placeholder='Serving Size'
                        className='input-item'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'servingSize')}
                    />
                    <Input
                        placeholder='Calories'
                        className='input-item'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'calories')}
                    />
                    <Input
                        placeholder='Protein'
                        className='input-item'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'protein')}
                    />
                    <Input
                        placeholder='Carbs'
                        className='input-item'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'carbs')}
                    />
                    <Input
                        placeholder='Fat'
                        className='input-item'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'fat')}
                    />
                </div>
                <div className='add-ingredient-button-wrapper'>
                    <Button className='w-100' size='small' onClick={handleAddIngredient}>
                        Add Ingredient to Intake
                    </Button>
                </div>
            </div>
        )
    }

    interface IngredientRowProps {
        ingredientRowData?: any
    }

    function IngredientRows(props: IngredientRowProps) {

        const [rows, setRows] = useState<any>()

        useMemo(() => {

            const iRows = props?.ingredientRowData?.map((r: any) => {
                console.log('r', r)

                return (
                    <div className='ingredient-row'>
                        <div className='ingredient-row-cell'>
                            <h5>{r?.title}</h5>
                        </div>
                        <div className='ingredient-row-cell'>
                            {r?.servingSize}
                        </div>
                        <div className='ingredient-row-cell'>
                            {r?.calories}
                        </div>
                        <div className='ingredient-row-cell'>
                            {r?.protein}
                        </div>
                        <div className='ingredient-row-cell'>
                            {r?.carbs}
                        </div>
                        <div className='ingredient-row-cell'>
                            {r?.fat}
                        </div>
                    </div>
                )
            })
            setRows(iRows)
        }, [props?.ingredientRowData?.length])


        return (
            <div className='w-100'>
                <div className='label-row'>
                    <div className='label-row-cell'>
                        <h4 className='brdr-b'>title</h4>
                    </div>
                    <div className='label-row-cell'>
                        <h4 className='brdr-b'>servingSize</h4>
                    </div>
                    <div className='label-row-cell'>
                        <h4 className='brdr-b'>calories</h4>
                    </div>
                    <div className='label-row-cell'>
                        <h4 className='brdr-b'>protein</h4>
                    </div>
                    <div className='label-row-cell'>
                        <h4 className='brdr-b'>carbs</h4>
                    </div>
                    <div className='label-row-cell'>
                        <h4 className='brdr-b'>fat</h4>
                    </div>
                </div>
                {rows}
            </div>
        )

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
                    <div className='p-2'>
                        <h2>Ingredients:</h2>
                        <div className='divider'/>
                        {
                            formValues?.ingredients?.length
                            ? (
                                <IngredientRows
                                    ingredientRowData={formValues?.ingredients}
                                />
                            )
                            : null
                        }
                        {
                            !ingredients?.length 
                            && !formValues?.ingredients?.length
                            && <Empty/>
                        }
                        {
                            editingIndex !== null
                            ? (
                                <IngredientInput/>
                            )
                            : null
                        }
                    </div>
                    <div className='p-1'>
                        {
                            editingIndex === null
                            ? (
                                <Button 
                                    className='w-100'
                                    onClick={() => addNewIngredient()}
                                >
                                    <PlusOutlined/>
                                </Button>
                            )
                            : null
                        }
                    </div>
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