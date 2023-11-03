import React, { useEffect, useState } from 'react'
import './styles.css'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import NutritionForm from '../forms/NutritionForm'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import mealActions from '../../redux/actions/meal'
import snackActions from '../../redux/actions/snack'

export default function NutritionCard() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userMeals = useSelector((state: any) => state.meals?.queryResult ?? [])
    const userSnacks = useSelector((state: any) => state.snacks?.queryResult ?? [])
    const [selectedDate, setSelectedDate] = useState<any>(new Date())
    const [selectedDatesNutrients, setSelectedDatesNurtients] = useState<any>([])
    const [entryModalOpen, setEntryModalOpen] = useState<boolean>(false)

    
    useEffect(() => {
        store.dispatch(mealActions.setMeals(currentUser?._id))
        store.dispatch(snackActions.setSnacks(currentUser?._id))
    }, [currentUser])

    useEffect(() => {
        const selectedMeals = filterForSelectedDaysNutrition()
    }, [selectedDate])

    function filterObjectsByDate(array: any, date: any) {
        return array.filter((obj: any) => {
            const objDate = new Date(obj.time);
            return objDate.toDateString() === date.toDateString();
        });
    }

    function sortByTime(array: any) {
        return array.sort((a: any, b: any) => a.time - b.time);
    }

    function filterForSelectedDaysNutrition() {

        const selectedMeals = filterObjectsByDate(userMeals, selectedDate)
        const selectedSnacks = filterObjectsByDate(userSnacks, selectedDate)
        const aggregatedNutrition = [...selectedMeals, ...selectedSnacks]
        const sortedNutrients = sortByTime(aggregatedNutrition)
        setSelectedDatesNurtients(sortedNutrients)

    }


    interface NutritionRowProps {
        nutritionItems?: any
    }

    function NutritionRows(props: NutritionRowProps) {

        const rows = props.nutritionItems?.map((item: any) => {
            
            return (
                <div>
                    {item?.title}
                </div>
            )
        })

        return (
            <div>
                NutritionRows
                {rows}
            </div>
        )
    }

    return (
        <div className='nutrition-card'>
            <div className='nutrition-card-topbar'>
                <div className='nc-topbar-left'>
                    <span className='nc-tb-text nc-tb-title'>Today's Nutrients</span>
                    <span className='nc-tb-text nc-tb-sub'>Calories Planned : 2750</span>
                    <span className='nc-tb-text nc-tb-sub'>Meals Planned: 6 </span>
                </div>
                <div className='nc-topbar-right'>
                    <PlusSquareOutlined 
                        className='nc-tb-plus'
                        onClick={() => setEntryModalOpen(true)}
                    />
                </div>
            </div>
            <div className='macro-title-bar'>
                <div className='mtb-left'>

                </div>
                <div className='mtb-right'>
                    <span className='macro-title'>
                        Protein
                    </span>
                    <span className='macro-title'>
                        Carbs
                    </span>
                    <span className='macro-title'>
                        Fats
                    </span>
                    <span className='macro-title'>
                        Calories
                    </span>
                </div>
            </div>
            
            <NutritionRows
                nutritionItems={selectedDatesNutrients}
            />

            <div className='nutrition-card-footer'>
                <div className='nc-footer-row'>
                    <div className='nc-footer-row-left'>
                        <span className='footer-status-title'>
                            Protein Status:
                        </span>
                    </div>
                    <div className='nc-footer-row-right'>
                        (progress bar)
                    </div>
                </div>
                <div className='nc-footer-row'>
                    <div className='nc-footer-row-left'>
                        <span className='footer-status-title'>
                            Carb Status:
                        </span>
                    </div>
                    <div className='nc-footer-row-right'>
                        (progress bar)
                    </div>
                </div>
                <div className='nc-footer-row'>
                    <div className='nc-footer-row-left'>
                        <span className='footer-status-title'>
                            Fat Status:
                        </span>
                    </div>
                    <div className='nc-footer-row-right'>
                        (progress bar)
                    </div>
                </div>
                <div className='nc-footer-row'>
                    <div className='nc-footer-row-left'>
                        <span className='footer-status-title'>
                            Calories Status:
                        </span>
                    </div>
                    <div className='nc-footer-row-right'>
                        (progress bar)
                    </div>
                </div>
            </div>

            <Modal 
                title="Add Snack or Meal" 
                open={entryModalOpen} 
                //onOk={handleOk} 
                onCancel={() => setEntryModalOpen(false)}
                footer={null}
            >
                <NutritionForm/>
            </Modal>

        </div>
    )
}