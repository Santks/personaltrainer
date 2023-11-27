import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

function EditCustomer(props) {

    const [customer, setCustomer] = useState(props.customer);
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason !== "backDropClick")
            setOpen(false);
    }

    const handleInput = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const saveChanges = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        setOpen(false)
    }

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add customer information</DialogTitle>
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
                    <Button onClick={saveChanges}>Save changes</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default EditCustomer;