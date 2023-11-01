import React, { useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'

export default function NutritionForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>()

    return (
        <div>
            Nutrition Form
        </div>
    )
}