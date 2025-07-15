import React from 'react'
import Button from '../../ui/Button'
import { useFetcher } from 'react-router'
import { updateOrder } from '../../services/apiRestaurant'

function UpdateOrder({order}) {
    const fetcher = useFetcher()
    return (
        //special type of forms allows to update without navigation, we need to use that to send handle forms by react-router
        <fetcher.Form method='PATCH' className='text-left'>
            <Button type='primary'>Make Priority</Button>
        </fetcher.Form>
    )
}

export default UpdateOrder

//this action will catch the order at router level and update the priority, we use the updateOrder fn to do so from services  
export async function action({request, params}) {
    const data = {priority : true}
    await updateOrder(params.orderId, data)
    console.log('update');
    return null;
}