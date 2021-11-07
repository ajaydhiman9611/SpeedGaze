import React from 'react'
import { MachineManagementTable } from './MachineManagementTable'
import { Button, TextField } from '@mui/material';

export const MachineManagement = () => {
    return (
        <div>
            <br />
            <br />

            <br />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                    alignItems: "center"
                }}>
                <div>
                    <h5
                        style={{
                            fontWeight: "bold"
                        }}>
                        Machine Management
                    </h5>
                </div>
                <div>
                    <Button variant="contained"
                        sx={{ ml: 2 }}
                        style={{ backgroundColor: "#ad8ec0", color: "#fff" }}
                    >  Upload CSV  </Button>
                    <Button variant="contained"
                        sx={{ ml: 2 }}
                        style={{ backgroundColor: "#6483a1", color: "#fff" }}
                    >  Add New </Button>
                </div>
            </div>
            <MachineManagementTable />
        </div>
    )
}
