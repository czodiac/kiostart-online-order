import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myStoreItemSlice, selectMyStoreItem } from './myStoreItemSlice'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import { getDevice } from '../global/deviceInfoSlice';
import './myStoreItem.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { openMyStoreItemModal } from '../global/myStoreItemModalSlice'
const Img = styled('img')({
    margin: 'auto',
    maxWidth: '100px',
    maxHeight: '100px',
    display: 'block'
});

export const MyStoreItem = (obj) => {
    const dispatch = useDispatch();
    const device = useSelector(getDevice);

    let itemId, name, img, price, desc = ''
    if (obj && Object.keys(obj).length > 0 && Object.getPrototypeOf(obj) === Object.prototype) {
        itemId = obj.item.id;
        name = obj.item.name;
        if (name.length > 25) {
            name = name.substring(0, 23) + '...';
        }
        img = obj.item.item_image.item_image;
        price = obj.item.unit_price;
        desc = obj.item.description;
    }

    const showItemDetailsModal = () => {
        dispatch(openMyStoreItemModal(obj.item));
    }

    let deviceName = 'normal'
    if (device == 'Tablet') {
        deviceName = 'tablet'
    }

    return (
        <Grid container className='itemContainer' spacing={2} onClick={() => showItemDetailsModal()} >
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