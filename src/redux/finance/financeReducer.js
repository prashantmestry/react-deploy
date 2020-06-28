import * as types from './financeType';
import { _statement_list, _statement_type } from './finance_data';

const initialState = {
    statement_list: null,
    statement_type: null,
    stmt_id: '',
    stmt_type: '',
    schema_id: null,
    loading: false,
    error: 'Select Statement',
    tableData: null
}

const financeReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GET_STATEMENT_LIST:
            return { ...state, statement_list: _statement_list }
        case types.GET_STATEMENT_TYPE:
            return { ...state, statement_type: _statement_type }
        case types.SET_COMPANY_INFO:
            return { ...state, ...action.payload }
            
        case types.FETCH_TABLE_DATA_START:
            return { ...state, loading: true, error: null, tableData: null }
        case types.FETCH_TABLE_DATA_SUCCESS:
            return { ...state, loading: false, tableData: action.payload, error: null }
        case types.FETCH_TABLE_DATA_ERROR:
            return { ...state, loading: false, tableData: null, error: action.payload }

        default:
            return { ...state }
    }

}

export default financeReducer;