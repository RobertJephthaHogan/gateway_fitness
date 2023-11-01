import React, { useState } from 'react'
import './styles.css'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import NutritionForm from '../forms/NutritionForm'

export default function NutritionCard() {

    const [entryModalOpen, setEntryModalOpen] = useState<boolean>(false)

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
            Nutrition Card Content

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
            >
                <NutritionForm/>
            </Modal>

        </div>
    )
}