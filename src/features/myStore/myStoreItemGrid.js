import React from 'react'
import { useSelector } from 'react-redux';
import { selectMyStoreItem } from './myStoreItemSlice';
import { MyStoreItem } from './myStoreItem';
import './myStoreItemGrid.css';

export const MyStoreItemGrid = () => {
    const items = useSelector(selectMyStoreItem)
    const itemsPerRow = 5
    let itemList = []

    if (items != '') {
        let totalItemsCount = Object.keys(items).length;
        let totalRows = Math.floor(totalItemsCount / itemsPerRow);
        let itemNo = 0;

        let itemsForRow = [];
        for (var i = 0; i < totalRows; i++) {
            itemsForRow = [];
            for (var j = 0; j < itemsPerRow; j++) {
                itemsForRow.push(<MyStoreItem item={items[itemNo]} />)
                itemNo += 1;
            }
            itemList.push(<tr>{itemsForRow}</tr>)
        }

        // Render last row
        let lastRowItemsCount = totalItemsCount - (itemsPerRow * totalRows);
        let itemsForLastRow = [];
        for (var i = 0; i < lastRowItemsCount; i++) {
            itemsForLastRow.push(<MyStoreItem item={items[itemNo]} />)
            itemNo += 1;
        }
        itemList.push(<tr>{itemsForLastRow}</tr>)
    }

    return (
        <table>
            {itemList}
        </table>
    )
}