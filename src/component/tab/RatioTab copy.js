import React, { useEffect, useState } from 'react';
import GeneralTable from '../table/generaltable/GeneralTable';
import { onlyRoundedInteger } from '../../util';
import WithTableWrapper from './WithTableWrapper';

import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

const RatioTab = (props) => {

    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);


    useEffect(() => {

        if (!props.ratioDataLoading && !props.ratioDataError && props.ratioData) {

            let year_array = [];
            props.ratioData.data.forEach(v => {
                v.ratioValue.forEach(v1 => {
                    if (year_array.indexOf(v1.date.substring(0, 10)) === -1) {
                        year_array.push(v1.date.substring(0, 10));
                    }
                });
            });

            // Convert header array into object using 'key' as index.
            year_array.sort((a, b) => {
                if (a < b) { return 1 }
                else if (a > b) { return -1 }
                else { return 0 }
            });

            year_array.unshift('title', 'action');

            /*
            * Create Header Array
            */

            let final_year = year_array.map((v, i) => {
                let obj = {};
                obj.Header = v;
                obj.accessor = v.toLowerCase();                
                obj.visible = true;

                if (v == 'title') {
                    obj.position = 'left';                    
                    obj.Header = 'Ratio Name';
                }
                if (v === 'action') {
                    obj.position = 'left';                    
                }
                return obj;
            });


            /*
            * Create Body Array
            */

            let makeData = null;

            makeData = (data, new_temp_headerArray) => {
                let temp = {};
                new_temp_headerArray.forEach(v => {
                    let d = data.find(v1 => v1.date.substring(0, 10) === v.accessor);
                    if (d) {
                        temp[v.accessor] = onlyRoundedInteger(d.data.value);
                    } else {
                        temp[v.accessor] = 0;
                    }
                });
                return temp;
            }

            let bodyD = props.ratioData.data.map(v => {
                return {
                    ...makeData(v.ratioValue, final_year),
                    title: v.ratioShortName ? v.ratioShortName : v.ratioKey
                }
            });

            console.log('ratio data');
            console.log(final_year);
            console.log(bodyD);

            setHeaderData(final_year);
            setBodyData(bodyD);

        }
        else {
            setHeaderData([]);
            setBodyData([]);
        }

    }, [props.ratioDataLoading, props.ratioDataError, props.ratioData]);


    return (
        <div>
            {props.user}
            {
                props.ratioDataLoading &&
                <div className='table_loading'>Ratio Loading...</div>
            }

            {
                props.ratioDataError &&
                <div className='table_error'>{props.ratioDataError}</div>
            }

            {
                (!props.ratioDataLoading && !props.ratioDataError) &&
                <>
                    {
                        (headerData.length > 0 && bodyData.length > 0) &&
                        <GeneralTable
                            _headerData={headerData}
                            _bodyData={bodyData}
                            _height='500px'
                            _type='ratio_table'
                            setting={
                                {
                                    sorting: true,
                                    toggle_column: true,
                                    search_column: true
                                }}
                        />
                    }

                </>
            }

        </div >
    )
}

const mapStateToProps = (state) => {
    let { ratioDataLoading, ratioDataError, ratioData } = state.ratio;
    return {
        ratioDataLoading, ratioDataError, ratioData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRatioData: (obj) => dispatch(actions.getRatioData(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithTableWrapper(RatioTab)); 
