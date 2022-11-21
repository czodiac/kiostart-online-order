import React from 'react'
import { useSelector } from 'react-redux';
import { selectMyStoreItem } from '../../slices/myStoreItemSlice';
import { CartItem } from './cartItem';
import './cartItemGrid.css'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getDevice } from '../../slices/deviceInfoSlice';
import { MyStoreItemModal } from './myStoreItemModal';
import { selectCartItems } from '../../slices/cartSlice';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const ShopItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

export const CartItemGrid = () => {
    const device = useSelector(getDevice);
    const items = useSelector(selectCartItems);
    const storeItems = useSelector(selectMyStoreItem);
    let cartItems = [];
    items.forEach((item, idx, arr) => {
        let itemToAdd = storeItems.filter(x => x.id === item.itemID);
        let qty = item.qty;
        cartItems.push({ 'item': itemToAdd, 'qty': qty });
    });

    let containerId = 'cartContainer';
    if (device === 'Mobile') containerId = 'cartContainerForMobile'

    return (
        <>
            <div id="pageHeader">
                Cart
            </div>
            <div id={containerId}>
                {(cartItems !== null && cartItems.length > 0) ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <td class="tdHeader">Quantity</td>
                                    <td class="tdHeader">Item</td>
                                    <td class="tdHeader">Price</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((cartItem, index) => (
                                    <CartItem cartItem={cartItem} />
                                ))}
                            </tbody>
                        </table>
                        <hr />
                        <table>
                            <tr><td width="355">Cart</td><td width="80">$0</td></tr>
                        </table>
                        <hr />
                        <table>
                            <tr><td width="355">TAX(10%)</td><td width="80">$0</td></tr>
                        </table>
                        <hr />
                        <table>
                            <tr><td width="355"><strong>Total</strong></td><td width="80"><strong>$0</strong></td></tr>
                        </table>
                        <div class="sectionHeader">
                            Add an order tip
                        </div>
                        <table className="cartTable">
                            <tr>
                                <td>
                                    <Input placeholder="Tip" sx={{ width: 100 }} onChange={() => { }} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                                </td>
                                <td>
                                    <RadioGroup
                                        row
                                        onChange={() => { }}>
                                        <FormControlLabel value="10" control={<Radio size="small" className='tipRadio' />} label="10%" />
                                        <FormControlLabel value="15" control={<Radio size="small" className='tipRadio' />} label="15%" />
                                        <FormControlLabel value="20" control={<Radio size="small" className='tipRadio' />} label="20%" />
                                    </RadioGroup></td>
                            </tr>
                        </table>
                        <div class="sectionHeader">
                            Promo Code
                        </div>
                        <table className="cartTable">
                            <tr>
                                <td>
                                    <Input placeholder="Enter promo code" onChange={() => { }} />
                                </td>
                                <td>
                                    <IconButton color="primary">
                                        <AddIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        </table>
                        <div className="cartContainer cartButtons">
                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                                Delete All
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Checkout
                            </Button>
                        </div>
                    </>
                ) : <div className="noItemFound">Nothing in the cart.</div>
                }
                <MyStoreItemModal />
            </div>
        </>
    )
}