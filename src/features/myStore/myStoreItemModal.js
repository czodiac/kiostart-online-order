import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyStoreItemModalItem, getMyStoreItemModalStatus, setMyStoreItemModalStatus } from '../global/myStoreItemModalSlice';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const MyStoreItemModal = () => {
    const open = useSelector(getMyStoreItemModalStatus);
    const item = useSelector(getMyStoreItemModalItem);
    const dispatch = useDispatch();
    const handleOpen = () => {
        dispatch(setMyStoreItemModalStatus(true));
    }
    const handleClose = () => {
        dispatch(setMyStoreItemModalStatus(false));
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        {item != null ? item.name : ''}
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        {item != null ? item.description : ''}
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        {item != null ? '$' + item.unit_price : ''}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}