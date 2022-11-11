import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyStoreItemModalItem, getMyStoreItemModalStatus, setMyStoreItemModalStatus } from '../global/myStoreItemModalSlice';
import { getDevice } from '../global/deviceInfoSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
    margin: 'auto',
    maxWidth: '400px',
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
    const open = useSelector(getMyStoreItemModalStatus);
    const item = useSelector(getMyStoreItemModalItem);
    const device = useSelector(getDevice);
    const dispatch = useDispatch();

    // Change modal width dynamically.
    let modalWidth = 550;
    if (device == 'Mobile') modal_style.width = 300;
    else if (device == 'Tablet') modal_style.width = 550;
    else modal_style.width = 500;

    const handleOpen = () => {
        dispatch(setMyStoreItemModalStatus(true));
    }
    const handleClose = () => {
        dispatch(setMyStoreItemModalStatus(false));
        setQty(1);
    }
    const handleAdd = () => {
        alert(qty + ' added to the cart.');
        setQty(1);
    }
    const decrementQty = () => {
        let newQty = qty - 1;
        if (newQty < 1) {
            newQty = 1;
        }
        setQty(newQty);
    }
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={modal_style}>
                    <Button sx={{ width: 30, height: 30, minWidth: 0, padding: 0, margin: 0 }} onClick={() => { handleClose() }}>X</Button>
                    <Img src={item != null ? item.item_image.item_image : ''} />
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
                    &nbsp;<Button variant="contained" sx={{ height: 40 }} onClick={() => { handleAdd() }}>Add</Button>
                </Box>
            </Modal>
        </div>
    );
}