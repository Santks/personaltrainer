import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";

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
            <Button style={{ marginTop: "5px" }} variant="outlined" onClick={() => setOpen(true)}>New customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new customer to the list</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Street address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInput}
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleInput}
                    />
                    <TextField
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
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={save}>Add customer</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCustomer;