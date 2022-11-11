import React from 'react'
import { useSelector } from 'react-redux'
import { myStoreItemSlice, selectMyStoreItem } from './myStoreItemSlice'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import { getDevice } from '../global/deviceInfoSlice';
import './myStoreItem.css';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export const MyStoreItem = (obj) => {
    const device = useSelector(getDevice);

    let name, img, price, desc = ''
    if (obj && Object.keys(obj).length > 0 && Object.getPrototypeOf(obj) === Object.prototype) {
        name = obj.item.name;
        if (name.length > 25) {
            name = name.substring(0, 23) + '...';
        }
        img = obj.item.item_image.item_image;
        price = obj.item.unit_price;
        desc = obj.item.description;
    }
    const Img = styled('img')({
        margin: 'auto',
        maxWidth: '100px',
        maxHeight: '100px',
        display: 'block'
    });

    let deviceName = 'normal'
    if (device == 'Tablet') {
        deviceName = 'tablet'
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <table className='itemTable'>
                    <tr><td><p className={`itemName ${deviceName}`}>{name}</p></td></tr>
                    <tr><td><p className={deviceName}>{desc}</p></td></tr>
                    <tr><td className='itemPrice'>${price}</td></tr>
                </table>
            </Grid>
            <Grid item className='imgContainer'>
                <Img src={img} />
            </Grid>
        </Grid>
    )
}