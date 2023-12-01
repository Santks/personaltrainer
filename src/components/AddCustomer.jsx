import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

function AddCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason !== "backDropClick")
            setOpen(false);
    }

    const handleInput = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const save = () => {
        props.addNewCustomer(customer)
        setOpen(false)
    }

    return (
        <>
            <Button style={{ marginTop: "5px", marginBottom: "5px", background: "green" }} variant="contained" onClick={() => setOpen(true)}>
                New customer <PersonAddIcon /></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new customer to the list</DialogTitle>
                <DialogContent>
                    <TextField style={{ marginBottom: "8pxx", marginRight: "5px", marginTop: "8px" }}
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px", marginTop: "8px" }}
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px", marginRight: "5px" }}
                        label="Street address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px" }}
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px", marginRight: "5px" }}
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px" }}
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Phone number"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="error">Close <CancelIcon /></Button>
                    <Button onClick={save} variant="contained" color="success">Add customer <SaveIcon /></Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCustomer;