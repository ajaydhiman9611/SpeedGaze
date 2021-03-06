import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import './modal.css'
import { ThemeContext } from '../../context/ThemeContext'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #000',
    boxShadow: 24,
    fontFamily: "acumin-pro, sans-serif",
};

export default function AddorEditModal({ open, handleClose, addOrEdit, data }) {

    const themeContext = useContext(ThemeContext);
    const { themeState } = themeContext;

    const [modalData, setModalData] = React.useState(data);
    const handleChange = (e) => {
        // console.log("Handle Change: ", e.target.name, e.target.value)
        setModalData({
            ...modalData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: "flex", justifyContent: "center" }}
        >
            <Box sx={style} id="modalBox" className={`bg-${themeState}`}>
                <Typography id="modal-modal-title" style={{ background: "#00bdf2", paddingLeft: "10px", padding: "2%" }} variant="h6" component="h2">
                    {addOrEdit} a Machine.
                </Typography>
                <br />
                <div id="modal-modal-description" className={`bg-${themeState}`} sx={{ mt: 2 }} style={{ padding: "0 5% 0% 5%" }}>
                    <div className="row onSmallScreen" style={{ paddingTop: "20px" }}>
                        <div className="col-lg-6 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField`} onChange={handleChange} id="outlined-basic" label="Display Name" name="display_Name" variant="outlined" value={modalData.display_Name || ""} />
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField` } onChange={handleChange} id="outlined-basic" label="Node Name" name="node_Name" variant="outlined" value={modalData.node_Name || ""} />
                        </div>
                        <br />
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField` } onChange={handleChange} id="outlined-basic" label="Node IP" name="node_IP" variant="outlined" value={modalData.node_IP || ""} />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField` } onChange={handleChange} id="outlined-basic" label="RAM" name="RAM" variant="outlined" value={modalData.RAM || ""} />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField` } onChange={handleChange} id="outlined-basic" label="CPU" name="CPU" variant="outlined" value={modalData.CPU || ""} />
                        </div>
                        {/* </div> */}
                        <br />
                        {/* <div className="row"> */}
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField` } onChange={handleChange} id="outlined-basic" label="Rack" name="Rack" variant="outlined" value={modalData.Rack || ""} />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField` } onChange={handleChange} id="outlined-basic" label="Mac Address" name="Mac_Address" variant="outlined" value={modalData.Mac_Address || ""} />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <TextField className={`font-${themeState} smallScreenTextField` } onChange={handleChange} id="outlined-basic" label="Node Type" name="Node_Type" variant="outlined" value={modalData.Node_Type || ""} />
                        </div>
                    </div>
                </div>
                <div align="right" style={{ padding: "3% 5% 3% 5%" }}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button> &nbsp; &nbsp; &nbsp;
                    <Button variant="contained" onClick={handleClose}>Submit</Button>
                </div>
            </Box>
        </Modal>
    )
}