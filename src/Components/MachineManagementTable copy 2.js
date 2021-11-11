import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import '../App.css'
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
// import TableSortLabel from '@mui/material/TableSortLabel';
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
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FormControl } from '@mui/material';
import AddorEditModal from './partialsMachineManagement/AddOrEditModal';

import { ThemeContext } from '../context/ThemeContext'


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

export const MachineManagementTable = (props) => {

    console.log("Props: ", props);
    const themeContext = useContext(ThemeContext);
    const { themeState } = themeContext;

    useEffect(() => {
        document.body.classList.toggle(`bg-${themeState}`)
    }, [])

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
                    String(val).toLowerCase().includes(searchQuery.toString().toLowerCase())
                ));
        }
        setDatas(filtered)

    }, [cpu, nodeType, searchQuery])


    // Add or Edit Modal -------------------------------------------------------
    const [modal, setModal] = React.useState({
        open: false,
        addOrEdit: ""
    })
    const handleOpen = (data) => setModal({
        addOrEdit: "Edit",
        open: true,
        data: data
    });
    const handleClose = () => setModal({
        addOrEdit: "Edit",
        open: false
    });
    // Add or Edit Modal -------------------------------------------------------

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
        if (fs_status() === -1) {
            props.setFullScreen(false)
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
        console.log("Result : ", result)
        return result.map(val => {
            console.log("Val is this : ", val)
            return (
                <option value={val}>
                    {val}
                </option>
            )
        })
    }

    const lightStyle = {
        background: "#f2f2f2"
    }
    const darkStyle = {
        background: "#212529",
        color: "#fff"
    }

    return (
        <>
            {modal.open &&
                <AddorEditModal
                    open={modal.open}
                    handleClose={handleClose}
                    addOrEdit={modal.addOrEdit}
                    data={modal.data}
                />}

            <div className={`card bg-${themeState === 'light' ? `light` : `darker`}`} id="tableContainer">
                <div className="card-header" style={themeState === 'light' ? lightStyle : darkStyle}>
                    <div className="row">
                        <div style={{ marginBottom: "0px" }} className="col-lg-6 col-md-6 col-sm-12 col-xs-12 align-self-end">
                            <div className="row justify-content-lg-start">
                                <div style={{ marginBottom: "0px" }} className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                    <label>CPU:</label>
                                    &nbsp;&nbsp;&nbsp;
                                    <select
                                        className="mr-0 mr-md-3 filterSelect form-select w-100 p-2"
                                        value={cpu}
                                        size="small"
                                        label="CPU"
                                        labelId="CPU"
                                        onChange={(event) => {
                                            setCpu(event.target.value)
                                        }}
                                    >
                                        <option value=" ">
                                            None
                                        </option>
                                        {renderDropDown("CPU")}
                                    </select>
                                </div>
                                <div style={{ marginBottom: "0px" }} className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-3 mt-md-0">
                                    <label>Node Type:</label>
                                    &nbsp;&nbsp;&nbsp;
                                    <select
                                        className="mr-0 mr-md-3 filterSelect w-100 p-2"
                                        value={nodeType}
                                        label="Node Type"
                                        onChange={(event) => {
                                            setNodeType(event.target.value)
                                        }}
                                    >
                                        <option value=" ">
                                            None
                                        </option>
                                        {renderDropDown("Node_Type")}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "0px" }} className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pr-4 mt-4 mt-md-0 d-flex justify-content-end">
                            <div className="row align-items-end justify-content-md-end">
                                <div className="col-lg-5 col-md-6 col-12">
                                    <TextField
                                        style={{ marginLeft: "auto" }}
                                        // className={`font-${themeState}`}
                                        sx={{
                                            backgroundColor: "transparent",
                                        }} size="small"
                                        label="Search"
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-lg-5 col-md-6 col-9 mt-4 mt-md-0">
                                    <button
                                        className="btnsHover btn btn-md btn-block"
                                        style={{ width: "100%", backgroundColor: "#00bdf2", color: "#fff", verticalAlign: "middle" }}
                                    > <AddIcon style={{ verticalAlign: "text-top" }} /> Add New </button>
                                </div>
                                {
                                    props?.fullScreen &&
                                    <div className="col-lg-2 col-md-6 col-3 mt-4 mt-md-0 ">
                                        <Button className="btnsHover" variant="contained" sx={{ py: 1 }} style={{ backgroundColor: "#00bdf2", color: "#000" }} onClick={() => {
                                            props.exitFullScreen(props.setFullScreen)
                                        }}><CloseFullscreenIcon /> </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className={`table table-responsive align-middle table-nowrap table-check ${themeState === 'light' ? `` : `table-dark`} font-${themeState}`}>
                        <thead className={`table-${themeState === 'light' ? `light` : `darker`}`}>
                            <tr>
                                {headCells.map((headCell, i) => <th scope="col" style={{ width: "auto" }}>{headCell}</th>)}
                            </tr>
                        </thead>
                        <tbody style={{ borderBottom: "1px solid #f0f0f0" }}>
                            {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className={`td td-${themeState}`} >{row.display_Name}</td>
                                            <td className={`td td-${themeState}`} >{row.node_Name}</td>
                                            <td className={`td td-${themeState}`} >{row.node_IP}</td>
                                            <td className={`td td-${themeState}`} >{row.RAM}</td>
                                            <td className={`td td-${themeState}`} >{row.CPU}</td>
                                            <td className={`td td-${themeState}`} >{row.Rack}</td>
                                            <td className={`td td-${themeState}`} >{row.Mac_Address}</td>
                                            <td className={`td td-${themeState}`} >{row.Node_Type}</td>
                                            <td className={`td td-${themeState}`} style={{ paddingLeft: "0px !important" }}>
                                                <Button onClick={() => handleOpen(row)}>
                                                    <EditIcon />
                                                    <span style={{ paddingTop: "-10px" }}>&nbsp;Edit</span>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <TablePagination
                        className={`bg-${themeState} font-${themeState}`}
                        style={{ fontFamily: "acumin-pro, sans-serif !important" }}
                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                        component="div"
                        count={datas.length}
                        labelRowsPerPage={"Rows: "}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            <br />
            {/* <TableContainer>
                        <Table className={`${themeState === 'light' ? `table-striped` : `table-dark`} font-${themeState}`}>
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
                                                    <TableCell className={`td td-${themeState}`} >{row.display_Name}</TableCell>
                                                    <TableCell className={`td td-${themeState}`} >{row.node_Name}</TableCell>
                                                    <TableCell className={`td td-${themeState}`} >{row.node_IP}</TableCell>
                                                    <TableCell className={`td td-${themeState}`} >{row.RAM}</TableCell>
                                                    <TableCell className={`td td-${themeState}`} >{row.CPU}</TableCell>
                                                    <TableCell className={`td td-${themeState}`} >{row.Rack}</TableCell>
                                                    <TableCell className={`td td-${themeState}`} >{row.Mac_Address}</TableCell>
                                                    <TableCell className={`td td-${themeState}`} >{row.Node_Type}</TableCell>
                                                    <TableCell className={`td td-${themeState}`}>
                                                        <Button onClick={() => handleOpen(row)}>
                                                            <EditIcon />
                                                            <span style={{ paddingTop: "-10px" }}>&nbsp;Edit</span>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
            {/* <TablePagination
                    className={`bg-${themeState} font-${themeState}`}
                    style={{ fontFamily: "acumin-pro, sans-serif !important" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={datas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            {/* </Paper> */}
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
            <TableRow style={{ background: "#00bdf2" }}>
                {headCells.map((headCell, i) => (
                    <TableCell
                        style={{ fontFamily: "acumin-pro, sans-serif", fontWeight: "700" }}
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
