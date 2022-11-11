import React from 'react'
import { useSelector } from 'react-redux'
import { selectMyStore } from '../myStore/myStoreSlice'
import { styled } from '@mui/material/styles';

export const Logo = () => {
    const myStore = useSelector(selectMyStore)
    let menuImg, shopName = ''
    if (myStore != '') {
        menuImg = myStore.shop.kiosk_menu_banner;
        shopName = myStore.shop.business_name;
    }

    const Img = styled('img')({
        margin: 'auto',
        maxWidth: '100%',
        height: 'auto',
        display: 'block'
    });

    return (
        <div>
            <Img src={menuImg} />
            <h3>{shopName}</h3>
        </div>
    )
}