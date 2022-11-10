import React from 'react'
import { useSelector } from 'react-redux'
import { myStoreItemSlice, selectMyStoreItem } from './myStoreItemSlice'

export const MyStoreItem = () => {
    const myStoreItem = useSelector(selectMyStoreItem)
    return (
        <div>
            Items:

        </div>
    )
}