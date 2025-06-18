import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity } from './cartSlice'
import { CircleMinus, CirclePlus } from 'lucide-react'

function UpdateItemQuantity({ pizzaId }) {
    const dispatch = useDispatch()
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

    return (
    
    <div className='flex flex-row gap-2 mx-2' >
        <CirclePlus color='black' onClick={()=>dispatch(increaseItemQuantity(pizzaId))} className='fill-amber-300 outline-amber-300'>+</CirclePlus>
        <span>{currentQuantity}</span>
        <CircleMinus color='black' onClick={()=>dispatch(decreaseItemQuantity(pizzaId))} className='fill-amber-300 outline-amber-300'  >-</CircleMinus>
    </div >
  )
}

export default UpdateItemQuantity