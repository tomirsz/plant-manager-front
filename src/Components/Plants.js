import React, {Component} from 'react'
import MaterialTable from 'material-table';
import {forwardRef} from 'react';
import Zoom from '@material-ui/core/Zoom';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import AddBox from '@material-ui/icons/AddBox';
import ChevronRight from '@material-ui/icons/ChevronRight';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import {TextField} from '@material-ui/core';
import AuthHeader from "../Services/AuthHeader";
import hokidachi from '../img/formation-types/hokidachi.jpg';
import chokkan from '../img/formation-types/chokkan.jpg';
import moyogi from '../img/formation-types/moyogi.jpg';
import shakkan from '../img/formation-types/shakkan.jpg';
import kengai from '../img/formation-types/kengai.jpg';
import hankengai from '../img/formation-types/han-kengai.jpg';
import bunjingi from '../img/formation-types/bunjingi.jpg';
import fukinagashi from '../img/formation-types/fukinagashi.jpg';
import kabudachi from '../img/formation-types/kabudachi.jpg';
import sokan from '../img/formation-types/sokan.jpg';
import yoseue from '../img/formation-types/yose-ue.jpg';
import sekijoju from '../img/formation-types/seki-joju.jpg';
import ishisuki from '../img/formation-types/ishisuki.jpg';
import ikadabuki from '../img/formation-types/ikadabuki.jpg';
import sharimiki from '../img/formation-types/sharimiki.jpg';

const URL = process.env.REACT_APP_URL

const formationTypeEnum = [
    {
        value: 'HOKIDACHI',
        label: 'HOKIDACHI',
        imgLink: hokidachi
    },
    {
        value: 'CHOKKAN',
        label: 'CHOKKAN',
        imgLink: chokkan
    },
    {
        value: 'MOYOGI',
        label: 'MOYOGI',
        imgLink: moyogi
    },
    {
        value: 'SHAKAN',
        label: 'SHAKAN',
        imgLink: shakkan
    },
    {
        value: 'KENGAI',
        label: 'KENGAI',
        imgLink: kengai
    },
    {
        value: 'HANKENGAI',
        label: 'HAN - KENGAI',
        imgLink: hankengai
    },
    {
        value: 'BUNJINGI',
        label: 'BUNJINGI',
        imgLink: bunjingi
    },
    {
        value: 'FUKINAGASHI',
        label: 'FUKINAGASHI',
        imgLink: fukinagashi
    },
    {
        value: 'SOKAN',
        label: 'SOKAN',
        imgLink: sokan
    },
    {
        value: 'KABUDACHI',
        label: 'KABUDACHI',
        imgLink: kabudachi
    },
    {
        value: 'YOSEUE',
        label: 'YOSE - UE',
        imgLink: yoseue
    },
    {
        value: 'SEKIJOJU',
        label: 'SEKI - JOJU',
        imgLink: sekijoju
    },
    {
        value: 'ISHISUKI',
        label: 'ISHISUKI',
        imgLink: ishisuki
    },
    {
        value: 'IKADABUKI',
        label: 'IKADABUKI',
        imgLink: ikadabuki
    },
    {
        value: 'SHARIMIKI',
        label: 'SHARIMIKI',
        imgLink: sharimiki
    },
]

export class Plants extends Component {

    state = {
        columns: [
            {title: 'Nazwa', field: 'name'},
            {title: 'Łacińska nazwa', field: 'latinName'},
            {
                title: 'Nasłonecznienie',
                field: 'insolation',
                lookup: {'LOW': 'NISKIE', 'MODERATE': 'UMIARKOWANE', 'HIGH': 'WYSOKIE'}
            },
            {
                title: 'Nawodnienie',
                field: 'irrigation',
                lookup: {'LOW': 'NISKIE', 'MODERATE': 'UMIARKOWANE', 'HIGH': 'WYSOKIE'}
            },
            {
                title: 'Rodzaj rośliny',
                field: 'plantType',
                lookup: {'SEED': 'NASIONO', 'SEEDLING': 'SADZONKA', 'TREE': 'DRZEWKO', 'PLANT': 'ROŚLINA'}
            },
            {
                title: 'Rodzaj gleby',
                field: 'soilType',
                lookup: {'ALKALINE': 'ZASADOWA', 'NEUTRAL': 'NEUTRALNA', 'ACIDIC': 'KWAŚNA'}
            }],

        data: [],
        tableIcons: {
            MoreVertIcon: forwardRef((props, ref) => <MoreVertIcon {...props} ref={ref}/>),
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>)
        },
        pruneToggleOn: false,
        fertilizationToggleOn: false,
        formationToggleOn: false,
        sprayingToggleOn: false,
        irrigationToggleOn: false,
        repottingToggleOn: false,
        plantStatusDateFrom: '',
        plantStatusDateTo: '',
        plantNotes: '',
        amount: '',
        formationType: '',
    }

    addPrune(rowData) {
        new Promise((resolve) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthHeader().Authorization
                },
                body: JSON.stringify({
                    id: rowData.id,
                    note: rowData.note,
                    dateFrom: rowData.dateFrom,
                    dateTo: rowData.dateTo,
                })
            }
            let url = URL + '/add/prune?id=' + rowData.id
            fetch(url, requestOptions)
                .then(this.handleClose)
                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                .then(resolve())
                .then(this.resetForm)
        }).catch((error => {
            console.log(error)
        }))
    }

    addFertilization(rowData) {
        new Promise((resolve) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthHeader().Authorization
                },
                body: JSON.stringify({
                    id: rowData.id,
                    name: rowData.name,
                    amount: rowData.amount,
                    dateFrom: rowData.dateFrom,
                    dateTo: rowData.dateTo,
                })
            }
            let url = URL + '/add/fertilization?id=' + rowData.id
            fetch(url, requestOptions)
                .then(this.handleClose)
                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                .then(resolve())
                .then(this.resetForm)
        }).catch((error => {
            console.log(error)
        }))
    }

    changeFormation(rowData) {
        new Promise((resolve) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthHeader().Authorization
                },
                body: JSON.stringify({
                    id: rowData.id,
                    formationType: rowData.formationType,
                    dateFrom: rowData.dateFrom,
                    dateTo: rowData.dateTo,
                })
            }
            let url = URL + '/add/formation?id=' + rowData.id
            fetch(url, requestOptions)
                .then(this.handleClose)
                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                .then(resolve())
                .then(this.resetForm)
        }).catch((error => {
            console.log(error)
        }))
    }

    addSpraying(rowData) {
        new Promise((resolve) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthHeader().Authorization
                },
                body: JSON.stringify({
                    id: rowData.id,
                    name: rowData.name,
                    amount: rowData.amount,
                    dateFrom: rowData.dateFrom,
                    dateTo: rowData.dateTo,
                })
            }
            let url = URL + '/add/spraying?id=' + rowData.id
            fetch(url, requestOptions)
                .then(this.handleClose)
                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                .then(resolve())
                .then(this.resetForm)
        }).catch((error => {
            console.log(error)
        }))
    }

    addIrritgation(rowData) {
        new Promise((resolve) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthHeader().Authorization
                },
                body: JSON.stringify({
                    id: rowData.id,
                    note: rowData.note,
                    date: rowData.date,
                })
            }
            let url = URL + '/add/irrigation-date?id=' + rowData.id
            fetch(url, requestOptions)
                .then(this.handleClose)
                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                .then(resolve())
                .then(this.resetForm)
        }).catch((error => {
            console.log(error)
        }))
    }

    addRepotting(rowData) {
        new Promise((resolve) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthHeader().Authorization
                },
                body: JSON.stringify({
                    id: rowData.id,
                    note: rowData.note,
                    date: rowData.date,
                })
            }
            let url = URL + '/add/repotting?id=' + rowData.id
            fetch(url, requestOptions)
                .then(this.handleClose)
                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                .then(resolve())
                .then(this.resetForm)
        }).catch((error => {
            console.log(error)
        }))
    }

    resetForm = () => {
        this.setState({plantStatusDateFrom: ""});
        this.setState({plantStatusDateTo: ""});
        this.setState({plantNotes: ""});
        this.setState({amount: ""});
        this.setState({formationType: ""});
    }

    addPruneOpen = () => {
        this.setState({pruneToggleOn: true});
    }

    addFertilizationOpen = () => {
        this.setState({fertilizationToggleOn: true});
    }

    addFormationOpen = () => {
        this.setState({formationToggleOn: true})
    }

    addIrrigationDateOpen = () => this.setState({irrigationToggleOn: true})

    addRepottingOpen = () => this.setState({repottingToggleOn: true})

    addSprayingOpen = () => {
        this.setState({sprayingToggleOn: true})
    }

    handleClose = () => {
        this.setState({pruneToggleOn: false});
        this.setState({fertilizationToggleOn: false});
        this.setState({formationToggleOn: false});
        this.setState({sprayingToggleOn: false});
        this.setState({irrigationToggleOn: false});
        this.setState({repottingToggleOn: false});
    };

    handleChangePSdateFrom = event => {
        this.setState({plantStatusDateFrom: event.target.value});
    };

    handleChangePSdateTo = event => {
        this.setState({plantStatusDateTo: event.target.value});
    };


    handleChangePlantNotes = event => {
        this.setState({plantNotes: event.target.value});
    }

    handleChangeAmount = event => {
        this.setState({amount: event.target.value});
    }

    handleChangeFormation = event => {
        this.setState({formationType: event.target.value})
    }
    tableRef = React.createRef();

    render() {
        return (
            <MaterialTable
                style={{backgroundColor: '#938E94'}}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                tableRef={this.tableRef}
                options={{
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                    sorting: false
                }}
                title="Rośliny"
                columns={this.state.columns}
                data={() =>
                    new Promise((resolve, reject) => {
                        let url = URL + '/find'
                        fetch(url, {
                            headers: AuthHeader()
                        })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result)
                                this.setState({data: result});
                                resolve({
                                    data: this.state.data
                                })
                            })
                    })
                }
                icons={this.state.tableIcons}
                detailPanel={rowData => {
                    return (
                        <template style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <table style={{
                                width: '100%',
                                textAlign: 'center'
                            }}>
                                <Zoom in={true} style={{transitionDelay: true ? '100ms' : '0ms'}}>
                                    <th>
                                        Przycinanie
                                    </th>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '150ms' : '0ms'}}>
                                    <th>
                                        Nawożenie
                                    </th>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '200ms' : '0ms'}}>
                                    <th>
                                        Styl drzewka
                                    </th>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '250ms' : '0ms'}}>
                                    <th>
                                        Opryski
                                    </th>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '300ms' : '0ms'}}>
                                    <th>
                                        Nawodnienie
                                    </th>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '350ms' : '0ms'}}>
                                    <th>
                                        Przesadzanie
                                    </th>
                                </Zoom>
                                <thead>
                                <Zoom in={true} style={{transitionDelay: true ? '100ms' : '0ms'}}>
                                    <td>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={this.addPruneOpen}>Dodaj przycinanie</Button>
                                        <Modal
                                            open={this.state.pruneToggleOn}
                                            onClose={this.handleClose}
                                            aria-labelledby="Add prune"
                                            style={{
                                                position: 'absolute',
                                                margin: '0 auto',
                                                width: '50%',
                                                padding: '100px'
                                            }}
                                        >
                                            <div style={{
                                                background: '#ffffff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '100px',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TextField fullWidth value={this.state.plantNotes} variant="outlined"
                                                           label="Notes" onChange={this.handleChangePlantNotes}
                                                           type="text"></TextField>
                                                <TextField value={this.state.plantStatusDateFrom}
                                                           label="Date from"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateFrom}
                                                           type="date"></TextField>
                                                <TextField value={this.state.plantStatusDateTo}
                                                           label="Date to"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateTo} type="date"></TextField>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    const reqData = {
                                                        id: rowData.id,
                                                        note: this.state.plantNotes,
                                                        dateFrom: this.state.plantStatusDateFrom,
                                                        dateTo: this.state.plantStatusDateTo
                                                    }
                                                    this.addPrune(reqData)
                                                }}
                                                        fullWidth
                                                >Dodaj</Button>
                                            </div>
                                        </Modal>
                                    </td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '150ms' : '0ms'}}>
                                    <td>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={this.addFertilizationOpen}>Dodaj nawożenie</Button>
                                        <Modal
                                            open={this.state.fertilizationToggleOn}
                                            onClose={this.handleClose}
                                            aria-labelledby="Add prune"
                                            style={{
                                                position: 'absolute',
                                                margin: '0 auto',
                                                width: '50%',
                                                padding: '100px'
                                            }}
                                        >
                                            <div style={{
                                                background: '#ffffff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '100px',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TextField fullWidth value={this.state.plantNotes} variant="outlined"
                                                           label="Notes" onChange={this.handleChangePlantNotes}
                                                           type="text"></TextField>
                                                <TextField fullWidth value={this.state.amount} variant="outlined"
                                                           label="Amount" onChange={this.handleChangeAmount}
                                                           type="number"></TextField>
                                                <TextField value={this.state.plantStatusDateFrom}
                                                           label="Date from"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateFrom}
                                                           type="date"></TextField>
                                                <TextField value={this.state.plantStatusDateTo}
                                                           label="Date to"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateTo} type="date"></TextField>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    const reqData = {
                                                        id: rowData.id,
                                                        name: this.state.plantNotes,
                                                        amount: this.state.amount,
                                                        dateFrom: this.state.plantStatusDateFrom,
                                                        dateTo: this.state.plantStatusDateTo
                                                    }
                                                    this.addFertilization(reqData)
                                                }}
                                                        fullWidth
                                                >Dodaj</Button>
                                            </div>
                                        </Modal>
                                    </td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '200ms' : '0ms'}}>
                                    <td>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={this.addFormationOpen}>Dodaj styl drzewka</Button>
                                        <Modal
                                            open={this.state.formationToggleOn}
                                            onClose={this.handleClose}
                                            aria-labelledby="Add spraying"
                                            style={{
                                                position: 'absolute',
                                                margin: '0 auto',
                                                width: '50%',
                                                padding: '100px'
                                            }}
                                        >
                                            <div style={{
                                                background: '#ffffff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '100px',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TextField
                                                    fullWidth
                                                    value={formationTypeEnum}
                                                    select
                                                    variant="outlined"
                                                    label="Formation type"
                                                    onChange={this.handleChangeFormation}
                                                >
                                                    {formationTypeEnum.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                            <img src={option.imgLink} alt='img'
                                                                 style={{width: '50px'}}/>
                                                        </MenuItem>
                                                    ))}

                                                </TextField>
                                                <TextField value={this.state.plantStatusDateFrom}
                                                           label="Date from"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateFrom}
                                                           type="date"></TextField>
                                                <TextField value={this.state.plantStatusDateTo}
                                                           label="Date to"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateTo} type="date"></TextField>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    const reqData = {
                                                        id: rowData.id,
                                                        formationType: this.state.formationType,
                                                        dateFrom: this.state.plantStatusDateFrom,
                                                        dateTo: this.state.plantStatusDateTo
                                                    }
                                                    this.changeFormation(reqData)
                                                }}
                                                        fullWidth
                                                >Dodaj</Button>
                                            </div>
                                        </Modal>
                                    </td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '250ms' : '0ms'}}>
                                    <td>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={this.addSprayingOpen}>Dodaj oprysk</Button>
                                        <Modal
                                            open={this.state.sprayingToggleOn}
                                            onClose={this.handleClose}
                                            aria-labelledby="Add prune"
                                            style={{
                                                position: 'absolute',
                                                margin: '0 auto',
                                                width: '50%',
                                                padding: '100px'
                                            }}
                                        >
                                            <div style={{
                                                background: '#ffffff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '100px',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TextField fullWidth value={this.state.plantNotes} variant="outlined"
                                                           label="Notes" onChange={this.handleChangePlantNotes}
                                                           type="text"></TextField>
                                                <TextField fullWidth value={this.state.amount} variant="outlined"
                                                           label="Amount" onChange={this.handleChangeAmount}
                                                           type="number"></TextField>

                                                <TextField value={this.state.plantStatusDateFrom}
                                                           label="Date from"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateFrom}
                                                           type="date"></TextField>
                                                <TextField value={this.state.plantStatusDateTo}
                                                           label="Date to"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateTo} type="date"></TextField>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    const reqData = {
                                                        id: rowData.id,
                                                        name: this.state.plantNotes,
                                                        amount: this.state.amount,
                                                        dateFrom: this.state.plantStatusDateFrom,
                                                        dateTo: this.state.plantStatusDateTo
                                                    }
                                                    this.addSpraying(reqData)
                                                }}
                                                        fullWidth
                                                >Dodaj</Button>
                                            </div>
                                        </Modal>
                                    </td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '300ms' : '0ms'}}>
                                    <td>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={this.addIrrigationDateOpen}>Dodaj podlewanie</Button>
                                        <Modal
                                            open={this.state.irrigationToggleOn}
                                            onClose={this.handleClose}
                                            aria-labelledby="Add prune"
                                            style={{
                                                position: 'absolute',
                                                margin: '0 auto',
                                                width: '50%',
                                                padding: '100px'
                                            }}
                                        >
                                            <div style={{
                                                background: '#ffffff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '100px',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TextField fullWidth value={this.state.plantNotes} variant="outlined"
                                                           label="Notes" onChange={this.handleChangePlantNotes}
                                                           type="text"></TextField>
                                                <TextField value={this.state.plantStatusDateFrom}
                                                           label="Date"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateFrom}
                                                           type="date"></TextField>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    const reqData = {
                                                        id: rowData.id,
                                                        note: this.state.plantNotes,
                                                        date: this.state.plantStatusDateFrom,
                                                    }
                                                    this.addIrritgation(reqData)
                                                }}
                                                        fullWidth
                                                >Dodaj</Button>
                                            </div>
                                        </Modal>
                                    </td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '350ms' : '0ms'}}>
                                    <td>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={this.addRepottingOpen}>Dodaj Przesadzanie</Button>
                                        <Modal
                                            open={this.state.repottingToggleOn}
                                            onClose={this.handleClose}
                                            aria-labelledby="Add prune"
                                            style={{
                                                position: 'absolute',
                                                margin: '0 auto',
                                                width: '50%',
                                                padding: '100px'
                                            }}
                                        >
                                            <div style={{
                                                background: '#ffffff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '100px',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TextField fullWidth value={this.state.plantNotes} variant="outlined"
                                                           label="Notes" onChange={this.handleChangePlantNotes}
                                                           type="text"></TextField>
                                                <TextField value={this.state.plantStatusDateFrom}
                                                           label="Date"
                                                           defaultValue=""
                                                           variant="outlined"
                                                           fullWidth
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           onChange={this.handleChangePSdateFrom}
                                                           type="date"></TextField>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    const reqData = {
                                                        id: rowData.id,
                                                        note: this.state.plantNotes,
                                                        date: this.state.plantStatusDateFrom,
                                                    }
                                                    this.addRepotting(reqData)
                                                }}
                                                        fullWidth
                                                >Dodaj</Button>
                                            </div>
                                        </Modal>
                                    </td>
                                </Zoom>
                                </thead>
                                <thead>
                                <Zoom in={true} style={{transitionDelay: true ? '200ms' : '0ms'}}>
                                    <td>{rowData.prune.map(pr =>
                                        <div key={pr.id} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <table>
                                                <thead>{pr.note}</thead>
                                                <tbody>
                                                <tr>{pr.dateFrom}</tr>
                                                <tr>{pr.dateTo}</tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}</td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '250ms' : '0ms'}}>
                                    <td>{rowData.fertilization.map(fertilization =>
                                        <div key={fertilization.id} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                <table>
                                                    <thead>{fertilization.name}</thead>
                                                    <tbody>
                                                    <tr>{fertilization.amount}</tr>
                                                    <tr>{fertilization.dateFrom}</tr>
                                                    <tr>{fertilization.dateTo}</tr>
                                                    </tbody>
                                                </table>
                                        </div>
                                    )}</td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '300ms' : '0ms'}}>
                                    <td>{rowData.formation.map(formation =>
                                        <div key={formation.id} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                <table>
                                                    <thead>{formation.formationType}</thead>
                                                    <tbody>
                                                    <tr>{formation.dateFrom}</tr>
                                                    <tr>{formation.dateTo}</tr>
                                                    </tbody>
                                                </table>
                                        </div>
                                    )}</td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '350ms' : '0ms'}}>
                                    <td>{rowData.spraying.map(spraying =>
                                        <div key={spraying.id} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                <table>
                                                    <thead>{spraying.name}</thead>
                                                    <tbody>
                                                    <tr>{spraying.amount}</tr>
                                                    <tr>{spraying.dateFrom}</tr>
                                                    <tr>{spraying.dateTo}</tr>
                                                    </tbody>
                                                </table>
                                        </div>
                                    )}</td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '400ms' : '0ms'}}>
                                    <td>{rowData.irrigationDate.map(irrigation =>
                                        <div key={irrigation.id} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <table>
                                                <thead>{irrigation.note}</thead>
                                                <tbody>
                                                <tr>{irrigation.date}</tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}</td>
                                </Zoom>
                                <Zoom in={true} style={{transitionDelay: true ? '450ms' : '0ms'}}>
                                    <td>{rowData.repottings.map(repotting =>
                                        <div key={repotting.id} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <table>
                                                <thead>{repotting.note}</thead>
                                                <tbody>
                                                <tr>{repotting.date}</tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}</td>
                                </Zoom>
                                </thead>
                            </table>
                        </template>
                    )
                }}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            const requestOptions = {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': AuthHeader().Authorization
                                },
                                body: JSON.stringify({
                                    name: newData.name,
                                    latinName: newData.latinName,
                                    insolation: newData.insolation,
                                    irrigation: newData.irrigation,
                                    plantType: newData.plantType,
                                    soilType: newData.soilType
                                })
                            }
                            let url = URL + '/add'
                            fetch(url, requestOptions)
                                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                                .then(resolve())
                        }),
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            const requestOptions = {
                                method: 'PUT',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': AuthHeader().Authorization
                                },
                                body: JSON.stringify({
                                    id: newData.id,
                                    name: newData.name,
                                    latinName: newData.latinName,
                                    insolation: newData.insolation,
                                    irrigation: newData.irrigation,
                                    plantType: newData.plantType,
                                    spraying: newData.spraying,
                                    fertilization: newData.fertilization,
                                    formation: newData.formation,
                                    prune: newData.prune,
                                    soilType: newData.soilType,
                                    irrigationDate: newData.irrigationDate,
                                    repottings: newData.repottings
                                })
                            }
                            let url = URL + '/edit'
                            fetch(url, requestOptions)
                                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                                .then(resolve())
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            const requestOptions = {
                                method: 'DELETE',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': AuthHeader().Authorization
                                }
                            }
                            let url = URL + '/delete?id=' + oldData.id
                            fetch(url, requestOptions)
                                .then(() => this.tableRef.current && this.tableRef.current.onQueryChange())
                                .then(resolve())
                        }),
                }}
            />
        )
    }
}

export default Plants