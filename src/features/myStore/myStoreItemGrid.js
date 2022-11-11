import React from 'react'
import { useSelector } from 'react-redux';
import { selectMyStoreItem } from './myStoreItemSlice';
import { MyStoreItem } from './myStoreItem';
import './myStoreItemGrid.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getDevice } from '../global/deviceInfoSlice';

export const MyStoreItemGrid = () => {
    const device = useSelector(getDevice)
    const items = useSelector(selectMyStoreItem)
    const ShopItem = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
    }));

    let containerId = 'itemsContainer';
    if (device == 'Mobile') containerId = 'itemsContainerForMobile'

    return (
        <div id={containerId}>
            {device}
            <Grid className="shop_item" container spacing={2}>
                {(items != '') ? items.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index} zeroMinWidth>
                        <ShopItem><MyStoreItem item={item} /></ShopItem>
                    </Grid>
                )) : 'Loading...'}
            </Grid>
        </div>
    )
}