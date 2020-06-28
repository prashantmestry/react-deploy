//import { API5001 } from '../../../config/';
import { company_detail_601 } from '../../dum/company_detail_601';
import * as types from './financeType';
import axios from 'axios';

export const getStatementList = () => {
    return {
        type: types.GET_STATEMENT_LIST
    }
}

export const getStatementType = () => {
    return {
        type: types.GET_STATEMENT_TYPE
    }
}

export const setCompanyInfo = (data) => {
    return {
        type: types.SET_COMPANY_INFO,
        payload: data
    }
}

export const getTableDataStart = () => {
    return {
        type: types.FETCH_TABLE_DATA_START
    }
}
const getTableDataSucces = (data) => {
    return {
        type: types.FETCH_TABLE_DATA_SUCCESS,
        payload: data
    }
}
export const getTableDataFail = (error) => {
    return {
        type: types.FETCH_TABLE_DATA_ERROR,
        payload: error
    }
}

export const getTableData = (obj) => {

    console.log('obj ', obj);

    return (dispatch) => {

        dispatch(getTableDataStart());
        setTimeout(() => {
            dispatch(getTableDataSucces(company_detail_601));

            //dispatch(getTableDataFail('Error in Company fetch api...'));

        }, 1000)

        //const url = `${API5001}/getCompanyData`;        
        // const body = JSON.stringify({
        //     comp_id: obj.comp_id,
        //     stmt_type: obj.stmt_type,
        //     stmt_id: obj.stmt_id,
        //     schema_id: obj.schema_id
        // });        
        // axios.post(url, body)
        //     .then(res => {
        //         const data = res.data;
        //         console.log(res);
        //         if (data && data.company_detail) {
        //             dispatch(getTableDataSucces(data));
        //         }
        //         else {
        //             dispatch(getTableDataFail('Error in Company fetch api...'));
        //         }
        //     })
        //     .catch(err => {
        //         dispatch(getTableDataFail('Error in Company fetch api...'));
        //     });

    }

}