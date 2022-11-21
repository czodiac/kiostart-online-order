import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDevice } from '../../slices/deviceInfoSlice';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export const CartItem = (obj) => {
    const dispatch = useDispatch();
    const device = useSelector(getDevice);

    let itemId, name, img, price, qty = ''
    if (obj && Object.keys(obj).length > 0 && Object.getPrototypeOf(obj) === Object.prototype) {
        const item = obj.cartItem.item[0];
        itemId = item.id;
        name = item.name;
        if (name.length > 25) {
            name = name.substring(0, 23) + '...';
        }
        qty = obj.cartItem.qty;
        price = (item.unit_price * qty).toFixed(2);
    }

    let deviceName = 'normal'
    if (device === 'Tablet') {
        deviceName = 'tablet'
    }

    return (
        <>
            <tr>
                <td width="80">{qty}</td>
                <td width="250">{name}</td>
                <td width="80">${price}</td>
            </tr>
        </>
    )
}