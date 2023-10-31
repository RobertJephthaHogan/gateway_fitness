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
            Nutrition Card

        </div>
    )
}