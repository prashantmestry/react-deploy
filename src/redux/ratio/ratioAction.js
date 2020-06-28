//import { API5001 } from '../../../config/';
import { ratio_data } from '../../dum/ratio_data';
import * as ratio_types from './ratioType';
import axios from 'axios';


const getRatioDataStart = () => {
    return {
        type: ratio_types.FETCH_RATIO_DATA_START
    }
}

const getRatioDataSuccess = (data) => {
    return {
        type: ratio_types.FETCH_RATIO_DATA_SUCCESS,
        payload: data
    }
}

const getRatioDataError = (error) => {
    return {
        type: ratio_types.FETCH_RATIO_DATA_ERROR,
        payload: error
    }
}

export const getRatioData = () => {

    return (dispatch) => {

        dispatch(getRatioDataStart());

        setTimeout(() => {

            dispatch(getRatioDataSuccess(ratio_data));

        }, 1000);

    }
}