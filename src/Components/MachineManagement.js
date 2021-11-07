import React from 'react'
import { MachineManagementTable } from './MachineManagementTable'
import { Button, TextField } from '@mui/material';

export const MachineManagement = () => {
    return (
        <div>
            <div className="row mt-5 mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    <h5 style={{
                        fontWeight: "bold"
                    }}>Machine Management</h5>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-end">
                        <div className="col-6 col-md-5 col-lg-4 col-xl-3 my-1">
                            <Button className="btn-block" variant="contained"
                                sx={{ pl: 1, pr: 1 }}
                                style={{ backgroundColor: "#ad8ec0", color: "#fff" }}
                            >  Upload CSV  </Button>
                        </div>
                        <div className="col-6 col-md-5 col-lg-4 col-xl-3 my-1">
                            <Button variant="contained"
                                className="btn-block"
                                style={{ backgroundColor: "#6483a1", color: "#fff" }}
                            >  Add New </Button>
                        </div>
                    </div>
                </div>
            </div>
            <MachineManagementTable />
        </div>
    )
}
