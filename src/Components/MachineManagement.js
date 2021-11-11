import React, { useState } from 'react'
import { MachineManagementTable } from './MachineManagementTable copy 2'
import { Button, TextField } from '@mui/material';
import '../App.css'

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Download from '@mui/icons-material/Download';


// function to go into fullscreen on button click
function goFullScreen(temp, setState) {

    var elem = document.getElementById(temp);

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    setState(true)
}

// function to exit from fullscreen on button click
function exitFullScreen(setState) {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    setState(false)
}

// function to check the status of full screen is enabled or disabled
function fs_status() {
    if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement)
        return 1;
    else
        return -1;
}
export const MachineManagement = () => {
    const [fullScreen, setFullScreen] = useState(false); //state to manage Fullscreen buttons

    return (
        <div className="marginTopOnSmallerScreen">
            <div className="row mt-2 mb-2">
                <div className="col-md-6 col-sm-12 mb-md-0 align-self-center">
                    <h5 style={{
                        fontWeight: "bold"
                    }}>Machine Management</h5>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-end">
                        <div className="col-sm-12 col-xs-12 col-md-2 col-lg-2 col-xl-1"></div>
                        <div className="col-6 col-md-5 col-lg-4 col-xl-3 mt-1 align-self-center">
                            <button className="btnsHover btn btn-block" style={{
                                backgroundColor: "#00bdf2",
                                color: "#fff",
                                verticalAlign: "text-top"
                            }}
                            >  Upload CSV  </button>
                        </div>
                        <div className="col-6 col-md-5 col-lg-4 col-xl-3 pt-3 align-self-center d-flex justify-content-end">
                            {
                                fullScreen ?
                                    <Button className="btnsHover" variant="contained" sx={{ mb: 2, py: 1 }} style={{ backgroundColor: "#00bdf2", color: "#000" }} onClick={() => {
                                        exitFullScreen(setFullScreen)
                                    }}><CloseFullscreenIcon /> </Button> : <Button className="btnsHover" variant="contained" sx={{ mb: 2, py: 1 }} style={{ backgroundColor: "#00bdf2", color: "#000" }} onClick={() => {
                                        goFullScreen("tableContainer", setFullScreen)
                                    }}>  <OpenInFullIcon />  </Button>
                            }
                            <Button className="btnsHover" variant="contained"
                                sx={{ ml: 2, mb: 2, py: 1 }}
                                style={{ backgroundColor: "#00bdf2", color: "#000" }}
                            >  <Download />  </Button>
                        </div>
                    </div>
                </div>
            </div>
            <MachineManagementTable />
        </div>
    )
}
