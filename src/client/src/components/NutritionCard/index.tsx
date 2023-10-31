import React from 'react'
import './styles.css'
import { PlusSquareOutlined } from '@ant-design/icons'

export default function NutritionCard() {

    return (
        <div className='nutrition-card'>
            <div className='nutrition-card-topbar'>
                <div className='nc-topbar-left'>
                    <span className='nc-tb-text nc-tb-title'>Today's Nutrients</span>
                    <span className='nc-tb-text nc-tb-sub'>Calories Planned : 2750</span>
                    <span className='nc-tb-text nc-tb-sub'>Meals Planned: 6 </span>
                </div>
                <div className='nc-topbar-right'>
                    <PlusSquareOutlined className='nc-tb-plus'/>
                </div>
            </div>
            Nutrition Card

        </div>
    )
}