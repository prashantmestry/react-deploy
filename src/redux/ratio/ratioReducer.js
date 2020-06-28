import * as types from './ratioType';

const initialState = {
    loading: false,
    error: '',
    ratioData: null
}

const ratioReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.FETCH_RATIO_DATA_START:
            return { ...state, loading: true, error: null, ratioData: null }

        case types.FETCH_RATIO_DATA_SUCCESS:
            return { ...state, loading: false, error: null, ratioData: action.payload }

        case types.FETCH_RATIO_DATA_ERROR:
            return { ...state, loading: false, error: action.payload, ratioData: null }

        default:
            return { ...state }
    }

}

export default ratioReducer;