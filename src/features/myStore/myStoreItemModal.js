import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalWidth, getMyStoreItemModalItem, getMyStoreItemModalStatus, setMyStoreItemModalStatus } from '../../slices/modalSlice';
import { incrementCartCount, addItem } from '../../slices/cartSlice';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
    margin: 'auto',
    maxWidth: '300px',
    maxHeight: '200px',
    display: 'block'
});

const item_desc_style = {
    maxHeight: 200,
    overflow: 'auto',
};

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '3px',
    boxShadow: 24,
    padding: 15,
    p: 4,
    outline: 'none',
};

export const MyStoreItemModal = () => {
    const [qty, setQty] = useState(1);
    const [itemAdded, setItemAdded] = useState(false);
    const isMyStoreModalOpen = useSelector(getMyStoreItemModalStatus);
    const item = useSelector(getMyStoreItemModalItem);
    const dispatch = useDispatch();
    useSelector(setModalWidth(modal_style)); // Change modal width dynamically.

    const handleClose = () => {
        dispatch(setMyStoreItemModalStatus(false));
        setItemAdded(false);
        setQty(1);
    }
    const handleAdd = () => {
        dispatch(incrementCartCount(1));
        const itemID = item.id;
        dispatch(addItem({ itemID, qty }));
        setItemAdded(true);
        setQty(1);
        setTimeout(() => {
            setItemAdded(false);
        }, "3000");
    }
    const decrementQty = () => {
        let newQty = qty - 1;
        if (newQty < 1) {
            newQty = 1;
        }
        setQty(newQty);
    }
    return (
        <>
            <Modal
                keepMounted
                open={isMyStoreModalOpen}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={modal_style}>
                    <Button className="closeButton" variant="contained" onClick={handleClose}>X</Button>
                    <Img src={item != null ? item.item_image.item_image : ''} />
                    {itemAdded && (
                        <Alert severity="success">
                            Added to the cart successfully.
                        </Alert>
                    )}
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        {item != null ? item.name : ''}
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <p style={item_desc_style}>{item != null ? item.description : ''}</p>
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <b>{item != null ? '$' + item.unit_price : ''}</b>
                    </Typography>
                    <br></br>
                    <ButtonGroup>
                        <Button onClick={() => { decrementQty() }}>-</Button>
                        <TextField sx={{
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                        }} size="small" style={{ width: 55 }} value={qty} onChange={(e) => { setQty(parseInt(e.target.value)) }} />
                        <Button onClick={() => { setQty(qty + 1) }}>+</Button>
                    </ButtonGroup>
                    &nbsp;<Button variant="contained" className='floatRight' sx={{ height: 40 }} onClick={handleAdd}>Add</Button>
                </Box>
            </Modal>
        </>
    );
}