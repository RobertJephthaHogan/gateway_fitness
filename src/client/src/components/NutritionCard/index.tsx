import React, { useEffect, useState } from 'react'
import './styles.css'
import DownOutlined from '@ant-design/icons/DownOutlined'
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined'
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import UndoOutlined from '@ant-design/icons/UndoOutlined'
import { Button, Dropdown, MenuProps, Modal, Progress, message } from 'antd'
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
    const [nutrientStatus, setNutrientStatus] = useState<any>()
    
    useEffect(() => {
        setComponentData()
    }, [currentUser])

    useEffect(() => {
        const selectedMeals = filterForSelectedDaysNutrition()
    }, [selectedDate, userMeals, userSnacks])

    function setComponentData() {
        store.dispatch(mealActions.setMeals(currentUser?._id))
        store.dispatch(snackActions.setSnacks(currentUser?._id))
    }

    useEffect(() => {
        const oNutrients = organizeNutritionData()
        setNutrientStatus(oNutrients)
    }, [selectedDatesNutrients])

    function organizeNutritionData() {

        // Aggregate all the ingredients to fond total nutrients for each meal/ snack
        const organizedNutrients = selectedDatesNutrients?.map((n: any) => {
            
            let calories = 0
            let protein = 0
            let carbs = 0
            let fat = 0

            n?.ingredients?.forEach((i: any) => {
                calories = calories += parseInt(i?.calories, 10)
                protein = protein += parseInt(i?.protein, 10)
                carbs = carbs += parseInt(i?.carbs, 10)
                fat = fat += parseInt(i?.fat, 10)
            })

            return (
                {
                    hasBeenConsumed: n.hasBeenConsumed,
                    calories,
                    protein,
                    carbs,
                    fat
                }
            )
        }) || []

        let consumed : any = []

        organizedNutrients?.forEach((on: any) => {
            if (on?.hasBeenConsumed) {
                consumed.push(on)
            }
        })

        const allAggregated = aggregateNutritionValues(organizedNutrients)
        const consumedAggregated = aggregateNutritionValues(consumed)

        return {
            totalNutrients: allAggregated,
            consumedNutrients: consumedAggregated,
        }

    }

    function aggregateNutritionValues(nutritionEntries: any) {
        let calories = 0
        let protein = 0
        let carbs = 0
        let fat = 0

        nutritionEntries.forEach((e: any) => {
            calories = calories += parseInt(e?.calories, 10)
            protein = protein += parseInt(e?.protein, 10)
            carbs = carbs += parseInt(e?.carbs, 10)
            fat = fat += parseInt(e?.fat, 10)
        })

        return {
            calories,
            protein,
            carbs,
            fat
        }

    }

    function filterObjectsByDate(array: any, date: any) {
        return array.filter((obj: any) => {
            const objDate = new Date(obj.time);
            return objDate.toDateString() === date.toDateString();
        });
    }

    function sortByTime(array: any) {
        return array.sort((a: any, b: any) => a.time - b.time);
    }

    function addKeyValuePair(array: any, key: any, value: any) {
        const arr = array?.map((obj: any) => {
            obj[key] = value;
          return (
            obj
          )
        }) || []
        return arr;
    }

    function filterForSelectedDaysNutrition() {

        let selectedMeals = filterObjectsByDate(userMeals, selectedDate)
        let selectedSnacks = filterObjectsByDate(userSnacks, selectedDate)
        selectedMeals = addKeyValuePair(selectedMeals, 'type', 'meal')
        selectedSnacks = addKeyValuePair(selectedSnacks, 'type', 'snack')
        const aggregatedNutrition = [...selectedMeals, ...selectedSnacks]
        const sortedNutrients = sortByTime(aggregatedNutrition)
        setSelectedDatesNurtients(sortedNutrients)
    }


    interface NutritionRowProps {
        nutritionItems?: any
    }

    function NutritionRows(props: NutritionRowProps) {

        function aggregateValues(array: any) {
            return array?.reduce((result: any, obj: any) => {
              for (let key in obj) {
                let trimmed = obj[key]
                trimmed = parseInt(trimmed, 10)
                if (result[key]) {
                    result[key] += trimmed;
                } else {
                    result[key] = trimmed;
                }
              }
              return result;
            }, {});
        }

        const handleMenuClick: MenuProps['onClick'] = (e) => {
            message.info('Click on menu item.');
            console.log('click', e);

            const actionInfo = e.key.split('-')
            
            const actionData = {
                actionType: actionInfo[0],
                targetType: actionInfo[0],
                targetId: actionInfo[0]
            }

            if (actionData.actionType === 'consumed') {
                // TODO: Mark the item as consumed (isConsumed: true)
            }

            if (actionData.actionType === 'unconsumed') {
                // TODO: Mark the item as unConsumed (isConsumed: false)
            }
            
            if (actionData.actionType === 'edit') {
                // TODO: Handle item editing
            }
            
            if (actionData.actionType === 'edit') {
                // TODO: Delete the item
            }

        };


        const rows = props.nutritionItems?.map((item: any, i: any) => {

            const aggregatedNutrientValues = aggregateValues(item?.ingredients)

            const items: MenuProps['items'] = [
                {
                  label: <span>Mark Consumed</span>,
                  key: `consumed-${item.type}-${item.id}`,
                  icon: <CheckOutlined />,
                  disabled: item.isConsumed
                },
                {
                    label: <span>Mark Un-Consumed</span>,
                    key: `unconsumed-${item.type}-${item.id}`,
                    icon: <UndoOutlined />,
                    disabled: !item.isConsumed
                  },
                {
                  label: <span>Edit item</span>,
                  key: `edit-${item.type}-${item.id}`,
                  icon: <EditOutlined />,
                },
                {
                  label:  <span>Delete item</span>,
                  key: `delete-${item.type}-${item.id}`,
                  icon: <DeleteOutlined />,
                },
            ];

            const menuProps = {
                items,
                onClick: handleMenuClick,
            };
            
            return (
                <div 
                    className='nutrition-row'
                    key={`nutrition-row-${i}`}
                >
                    <div className='nutrition-row-title-box'>
                        <div>
                            <span className='nutrition-row-title'>
                                {item?.title}
                            </span>
                        </div>
                        <div className='nutrition-row-type'>
                            {item?.type}
                        </div>
                    </div>
                    <div className='nutrition-row-macro-box'>
                        <div className='nutrition-row-macro-item'>
                            <span className='macro-item-text'>
                                {aggregatedNutrientValues?.protein}
                            </span>
                        </div>
                        <div className='nutrition-row-macro-item'>
                            <span className='macro-item-text'>
                                {aggregatedNutrientValues?.carbs}
                            </span>
                        </div>
                        <div className='nutrition-row-macro-item'>
                            <span className='macro-item-text'>
                                {aggregatedNutrientValues?.fat}
                            </span>
                        </div>
                        <div className='nutrition-row-macro-item'>
                            <span className='macro-item-text'>
                                {aggregatedNutrientValues?.calories}
                            </span>
                        </div>
                    </div>
                    <div className='nutrition-row-select-box'>
                        <Dropdown 
                            menu={menuProps} 
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Button size='small'>
                                    <DownOutlined 
                                        className='down-outlined-icon'
                                    />
                                </Button>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            )
        })

        return (
            <div className='nutrition-rows-container'>
                {rows}
            </div>
        )
    }

    return (
        <div className='nutrition-card'>
            <div className='nc-top'>
                <div className='nutrition-card-topbar'>
                    <div className='nc-topbar-left'>
                        <span className='nc-tb-text nc-tb-title'>Today's Nutrients</span>
                        <span className='nc-tb-text nc-tb-sub'>Calories Planned : 2750</span>
                        <span className='nc-tb-text nc-tb-sub'>Meals Planned: {selectedDatesNutrients?.length} </span>
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
                    <div className='mtb-center'>
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
                    <div className='mtb-right'>

                    </div>
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
                        <Progress 
                            percent={30} 
                            size="small" 
                            className='footer-progress-bar'
                        />
                    </div>
                </div>
                <div className='nc-footer-row'>
                    <div className='nc-footer-row-left'>
                        <span className='footer-status-title'>
                            Carb Status:
                        </span>
                    </div>
                    <div className='nc-footer-row-right'>
                        <Progress 
                            percent={30} 
                            size="small" 
                            className='footer-progress-bar'
                        />
                    </div>
                </div>
                <div className='nc-footer-row'>
                    <div className='nc-footer-row-left'>
                        <span className='footer-status-title'>
                            Fat Status:
                        </span>
                    </div>
                    <div className='nc-footer-row-right'>
                        <Progress 
                            percent={30} 
                            size="small" 
                            className='footer-progress-bar'
                        />
                    </div>
                </div>
                <div className='nc-footer-row'>
                    <div className='nc-footer-row-left'>
                        <span className='footer-status-title'>
                            Calories Status:
                        </span>
                    </div>
                    <div className='nc-footer-row-right'>
                        <Progress 
                            percent={30} 
                            size="small" 
                            className='footer-progress-bar'
                        />
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
                <NutritionForm
                    setComponentData={setComponentData}
                    setEntryModalOpen={setEntryModalOpen}
                />
            </Modal>

        </div>
    )
}