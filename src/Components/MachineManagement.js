import React from 'react'
import { MachineManagementTable } from './MachineManagementTable copy'
import { Button, TextField } from '@mui/material';
import '../App.css'

export const MachineManagement = () => {
    return (
        <div className="marginTopOnSmallerScreen">
            <div className="row mt-5 mb-2">
                <div className="col-md-6 mb-3 mb-md-0">
                    <h5 style={{
                        fontWeight: "bold"
                    }}>Machine Management</h5>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-end">
                        <div className="col-2 col-md-2 col-lg-2 col-xl-1"></div>
                        <div className="col-5 col-md-5 col-lg-4 col-xl-3 my-1">
                            <Button className="btnsHover btn-block" variant="contained"
                                sx={{
                                    backgroundColor: "#00bdf2",
                                    pl: 1,
                                    pr: 1
                                }}
                                style={{ color: "#fff" }}
                            >  Upload CSV  </Button>
                        </div>
                        <div className="col-5 col-md-5 col-lg-4 col-xl-3 my-1">
                            <Button variant="contained"
                                className="btnsHover btn-block"
                                style={{ backgroundColor: "#00bdf2", color: "#fff" }}
                            >  Add New </Button>
                        </div>
                    </div>
                </div>
            </div>
            <MachineManagementTable />
        </div>
    )
}
