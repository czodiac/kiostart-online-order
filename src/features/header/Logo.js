import React from 'react'
import { useSelector } from 'react-redux'
import { selectMyStore } from '../myStore/myStoreSlice'

export const Logo = () => {
    const myStore = useSelector(selectMyStore)
    return (
        <div>Logos : {myStore}

        </div>
    )
}