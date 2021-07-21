import React, {useEffect, useReducer} from "react";
import {reducer} from '../store/reducer';
import * as Actions from '../store/action';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {initialState} from "../store/state";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CompanyStockPrices() {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        Actions.getStockPrices(dispatch);
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        Actions.setUpdateAlertOpen(dispatch, false);
        Actions.setDeleteAlertOpen(dispatch, false);
    };

    return (
        <>
            <Snackbar open={state.updateAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Company Stock Data updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={state.deleteAlertOpen} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Company Stock Data deleted successfully!
                </Alert>
            </Snackbar>

            <MaterialTable
                title=""
                columns={[
                    {title: 'ID', field: 'id'},
                    {title: 'Created At', field: 'created_at'},
                    {title: 'High', field: 'high', type: 'numeric'},
                    {title: 'Low', field: 'low', type: 'numeric'},
                    {title: 'Open', field: 'open', type: 'numeric'},
                    {title: 'Volume', field: 'volume', type: 'numeric'},
                    {title: 'Transaction Date', field: 'transaction_date'},
                    {title: 'Ticker', field: 'ticker'},
                ]}
                data={state.stock_prices}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...state.stock_prices];
                                const index = oldData['tableData'].id;
                                dataUpdate[index] = newData
                                Actions.setStockPrices(dispatch, dataUpdate, Actions.UPDATE);
                                resolve(0);
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                // TODO Check flow
                                Actions.deleteStockPrice(dispatch, oldData)
                                let dataDelete = [...state.stock_prices];
                                const index = oldData['tableData'].id;
                                dataDelete.splice(index, 1);

                                Actions.setStockPrices(dispatch, dataDelete, Actions.DELETE);
                                resolve(0);
                            }, 1000)
                        }),
                }}
                options={{
                    actionsColumnIndex: -1
                }}
            />
        </>
    );
}
