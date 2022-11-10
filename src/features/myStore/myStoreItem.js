import React from 'react'
import { useSelector } from 'react-redux'
import { myStoreItemSlice, selectMyStoreItem } from './myStoreItemSlice'
import TextField from '@mui/material/TextField';

export const MyStoreItem = (obj) => {
    let name, img, price = ''
    if (obj && Object.keys(obj).length > 0 && Object.getPrototypeOf(obj) === Object.prototype) {
        name = obj.item.name;
        img = obj.item.item_image.item_image;
        price = obj.item.unit_price;
    }
    return (
        <>
            <td class="item">
                <table>
                    <tr>
                        <td><b>{name}</b></td>
                    </tr>
                    <tr>
                        <td><img height="100" src={img} /></td>
                    </tr>
                    <tr>
                        <td>$ {price}</td>
                    </tr>
                    <tr>
                        <td><TextField
                            id="outlined-number"
                            label="Quantity"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /></td>
                    </tr>
                    <tr>
                        <td><a href="#">Details</a></td>
                    </tr>
                </table>
            </td>
        </>
    )
}