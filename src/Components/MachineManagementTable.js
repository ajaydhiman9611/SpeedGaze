import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { data } from '../data'
// import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Download from '@mui/icons-material/Download';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FormControl } from '@mui/material';


// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }


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

const headCells = ["Display Name", "Node name", "Node IP", "RAM", "CPU", "Rack", "Mac Address", "Node type", "Actions"];

export const MachineManagementTable = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [fullScreen, setFullScreen] = useState(false); //state to manage Fullscreen buttons

    const [datas, setDatas] = useState(data);

    const [cpu, setCpu] = useState(" ");
    const [nodeType, setNodeType] = useState(" ");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let filtered = data
        if (cpu !== " ") {
            filtered = filtered.filter(x => x["CPU"] == cpu);
        }
        if (nodeType !== " ") {
            filtered = filtered.filter(x => x["Node_Type"] == nodeType);
        }
        if (searchQuery) {
            filtered = filtered.filter(x =>
                Object.values(x).some(val =>
                    String(val).toLowerCase().includes(searchQuery)
                ));
        }
        setDatas(filtered)

    }, [cpu, nodeType, searchQuery])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = datas.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    // function to handle if fullscreen mode is exited by "esc" key 
    // it calls every time when we exit from fullscreen and set "setFullScreen()" to false
    function onExitFullScreen() {
        if (fs_status() == -1) {
            setFullScreen(false)
        }
    }


    // here we are adding fullscreenchange listner to the document to detect the change in fullScreen mode.
    // and perform any action if needed insde onExitFullScreen function.
    useEffect(() => {
        if (document.addEventListener) {
            document.addEventListener('fullscreenchange', onExitFullScreen, false);
            document.addEventListener('mozfullscreenchange', onExitFullScreen, false);
            document.addEventListener('MSFullscreenChange', onExitFullScreen, false);
            document.addEventListener('webkitfullscreenchange', onExitFullScreen, false);
        }
        return () => {
            document.removeEventListener('fullscreenchange', onExitFullScreen, false);
            document.removeEventListener('mozfullscreenchange', onExitFullScreen, false);
            document.removeEventListener('MSFullscreenChange', onExitFullScreen, false);
            document.removeEventListener('webkitfullscreenchange', onExitFullScreen, false);
        }
    }, [])

    const renderDropDown = (id) => {
        let result = data.map(a => a[id])
            .filter((value, index, self) => self.indexOf(value) === index)
        return result.map((val, id) => {
            return (
                <MenuItem value={val}>
                    <em>{val}</em>
                </MenuItem>
            )
        })
    }
    return (
        <>

            <Box id="tableContainer" sx={{
                width: '100%',
                height: fullScreen ? "100%" : "auto",
                backgroundColor: "#fff",
                overflowY: fullScreen ? "auto" : "unset",
                padding: fullScreen ? "20px" : "0"
            }}>
                <Box sx={{ width: '100%', mb: 3, justifyContent: "space-between", display: "flex" }} >
                    {/* <div> */}
                    {/* ---------------------------- TODO: Filters for NodeType and CPU --------------------------- */}
                    {/* <label>Filter1</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Filter1</label> */}
                    {/* ---------------------------- TODO: Filters for NodeType and CPU --------------------------- */}

                    <Grid container>
                        <Grid xs={12} sm={12} md={3} lg={3} xl={2}>
                            <FormControl fullWidth sx={{
                                mb: 2
                            }} >
                                <InputLabel id="CPU">CPU</InputLabel>
                                <Select
                                    sx={{
                                        backgroundColor: "#e9eeff",
                                        mr: 2
                                    }}
                                    value={cpu}
                                    size="small"
                                    label="CPU"
                                    labelId="CPU"
                                    onChange={(event) => {
                                        setCpu(event.target.value)
                                    }}
                                >
                                    <MenuItem value=" ">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FilterAltIcon />
                                            <div>None</div>
                                        </div>
                                    </MenuItem>
                                    {renderDropDown("CPU")}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={3} xl={2}>
                            <FormControl fullWidth sx={{
                                mb: 2
                            }}>
                                <InputLabel id="node">Age</InputLabel>
                                <Select
                                    sx={{
                                        backgroundColor: "#e9eeff",
                                        mr: 2
                                    }}
                                    labelId="node"
                                    id="demo-simple-select"
                                    size="small"
                                    value={nodeType}
                                    label="CPU"
                                    onChange={(event) => {
                                        setNodeType(event.target.value)
                                    }}
                                >
                                    <MenuItem value=" ">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FilterAltIcon />
                                            <div>None</div>
                                        </div>
                                    </MenuItem>
                                    {renderDropDown("Node_Type")}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6} xl={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <TextField sx={{
                                backgroundColor: "#e9eeff",
                                mr: 2,
                                mb: 2
                            }} size="small"
                                label="Search"
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                            />
                            {
                                fullScreen ?
                                    <Button variant="contained" sx={{ mb: 2 }} style={{ backgroundColor: "#e9eeff", color: "#000" }} onClick={() => {
                                        exitFullScreen(setFullScreen)
                                    }}><CloseFullscreenIcon /> </Button> : <Button variant="contained" sx={{ mb: 2 }} style={{ backgroundColor: "#e9eeff", color: "#000" }} onClick={() => {
                                        goFullScreen("tableContainer", setFullScreen)
                                    }}>  <OpenInFullIcon />  </Button>
                            }
                            <Button variant="contained"
                                sx={{ ml: 2, mb: 2 }}
                                style={{ backgroundColor: "#e9eeff", color: "#000" }}
                            >  <Download />  </Button>
                        </Grid>
                    </Grid>
                    {/* </div> */}
                    {/* <div>
                        <TextField sx={{
                            backgroundColor: "#e9eeff",
                            mr: 2
                        }} size="small"
                            label="Search"
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                        />
                        {
                            fullScreen ?
                                <Button variant="contained" style={{ backgroundColor: "#e9eeff", color: "#000" }} onClick={() => {
                                    exitFullScreen(setFullScreen)
                                }}><CloseFullscreenIcon /> </Button> : <Button variant="contained" style={{ backgroundColor: "#e9eeff", color: "#000" }} onClick={() => {
                                    goFullScreen("tableContainer", setFullScreen)
                                }}>  <OpenInFullIcon />  </Button>
                        }
                        <Button variant="contained"
                            sx={{ ml: 2 }}
                            style={{ backgroundColor: "#e9eeff", color: "#000" }}
                        >  <Download />  </Button>
                    </div> */}
                </Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={datas.length}
                            />
                            <TableBody>
                                {
                                    // stableSort(datas, getComparator(order, orderBy))
                                    datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.name}
                                                >
                                                    <TableCell >{row.display_Name}</TableCell>
                                                    <TableCell >{row.node_Name}</TableCell>
                                                    <TableCell >{row.node_IP}</TableCell>
                                                    <TableCell >{row.RAM}</TableCell>
                                                    <TableCell >{row.CPU}</TableCell>
                                                    <TableCell >{row.Rack}</TableCell>
                                                    <TableCell >{row.Mac_Address}</TableCell>
                                                    <TableCell >{row.Node_Type}</TableCell>
                                                    <TableCell>
                                                        <EditIcon />
                                                        <span style={{ paddingTop: "-10px" }}>Edit</span>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={datas.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    )
}



const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                //   ...(numSelected > 0 && {
                //     bgcolor: (theme) =>
                //       alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                //   }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

//   =============================================================================================================

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{ background: "#e9eeff" }}>
                {headCells.map((headCell, i) => (
                    <TableCell
                        key={i}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    // sortDirection={orderBy === i ? order : false}
                    >
                        {/* <TableSortLabel
                            active={orderBy === i}
                            direction={orderBy === i ? order : 'asc'}
                            onClick={createSortHandler(i)}
                        > */}
                        {headCell}
                        {/* {orderBy === i ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel> */}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
