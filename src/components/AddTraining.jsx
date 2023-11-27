import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select } from "@mui/material";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function AddTraining(props) {

    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: props.customer.links[0].href
    });

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason !== "backDropClick")
            setOpen(false);
    }

    const handleInput = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleDateTimeChange = (date) => {
        setTraining({ ...training, date });
    };

    const save = () => {
        props.addNewTraining(training)
        console.log(training)
        setOpen(false)
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Button style={{ marginTop: "5px" }} variant="outlined" onClick={() => setOpen(true)}>New training</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add new training to the list</DialogTitle>
                    <DialogContent>
                        <DateTimePicker
                            label="Date"
                            name="date"
                            value={training.date}
                            onChange={handleDateTimeChange}

                        />
                        <TextField
                            label="Duration"
                            name="duration"
                            value={training.duration}
                            onChange={handleInput}
                        />
                        <TextField
                            label="Activity"
                            name="activity"
                            value={training.activity}
                            onChange={handleInput}
                        />
                        <TextField
                            label="Customer"
                            name="customer"
                            value={training.customer}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={save}>Add training</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </>
    );
}


export default AddTraining;