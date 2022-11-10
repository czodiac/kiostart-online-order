import React from 'react'
import { useSelector } from 'react-redux'
import { selectMyStore } from '../myStore/myStoreSlice'

export const Logo = () => {
    const myStore = useSelector(selectMyStore)
    let menuImg = ''
    if (myStore != '') {
        menuImg = myStore.shop.kiosk_menu_banner;
    }
    return (
        <div>
            <img src={menuImg} />
        </div>
    )
}