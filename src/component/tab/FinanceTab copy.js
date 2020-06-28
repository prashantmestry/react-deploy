import React, { useEffect, useState } from 'react';
import FinanceTable from '../table/financeTable/FinanceTable';
import { connect } from 'react-redux';
import { onlyRoundedInteger } from '../../util';
import WithTableWrapper from './WithTableWrapper';

const FinanceTab = (props) => {

    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);

    useEffect(() => {

        if (!props.dataLoading && !props.dataError) {

            console.log('inside making data');

            let financeData = props.tableData.company_detail.data[0].stmt_data || [];
            let year_array = [];
            // create unique date
            financeData.forEach(v => {
                v.frml_data.forEach(v => {
                    if (year_array.indexOf(v.rprt_dt.substring(0, 10)) === -1) {
                        year_array.push(v.rprt_dt.substring(0, 10));
                    }
                })
            });

            // sort array
            year_array.sort((a, b) => {
                if (a < b) { return 1 }
                else if (a > b) { return -1 }
                else { return 0 }
            });

            year_array.unshift('title', 'action');

            let final_year = year_array.map(v => {
                let obj = {};
                obj.Header = v;
                obj.accessor = v;
                obj.visible = true;
                obj.position = 'right';

                if (v == 'title') {
                    obj.Header = 'Amount In Cr.'
                }

                if (v == 'title' || v == 'action') {
                    obj.position = 'left'
                }
                if (v == 'action') {
                    obj.visible = false;
                }
                return obj;
            });


            // get those formulas which has property displayElement true.
            let schema = props.tableData.schema_detail.schema.map(v => {

                let obj = {};

                if ((!v.displayElement && v.displayElement !== false) || v.displayElement == true) {
                    obj.frml_id = v.frml_id;
                    obj.title = v.frml_str ? v.frml_str.trim() : '';
                    obj.children = v.children || null;
                }
                return obj;
            }).filter(v1 => Object.keys(v1).length > 0);


            let getFinanceData = (id) => {
                let out = [];
                let dd = financeData.find(fd => fd.frml_id == id);

                if (dd) {
                    dd.frml_data.forEach(v => {
                        out[v.rprt_dt.substring(0, 10).toString()] = {
                            rprt_date: v.rprt_dt.substring(0, 10),
                            dscl_date: v.dscl_dt.substring(0, 10),
                            value: onlyRoundedInteger(v.value),
                            value_new: null,
                            remarks: '',
                            edit_by: ''
                        }
                    })
                }
                return out;
            }

            let loopSchema = (schema, level) => {
                if (schema && schema.length > 0) {
                    return schema.map(schemaObj => {
                        return {
                            ...schemaObj,
                            title: schemaObj.title && schemaObj.title.trim(),
                            children: loopSchema(schemaObj.children, level + 1),
                            ...getFinanceData(schemaObj.frml_id),
                        }
                    })
                }
                else { return null }
            }

            let out = loopSchema(schema, 1);

            console.log('final body data');
            console.log(final_year);
            console.log(out);
            setHeaderData(final_year);
            setBodyData(out);

        }

    }, [props.dataLoading, props.dataError, props.tableData]);

    console.log('Data Table render ', props.dataLoading);

    return (
        <div>                        
            {
                props.dataLoading &&
                <div className='table_loading'>Loading...</div>
            }

            {
                props.dataError &&
                <div className='table_error'>{props.dataError}</div>
            }

            {
                (!props.dataLoading && !props.dataError) &&
                <FinanceTable
                    _headerData={headerData}
                    _bodyData={bodyData}
                    _height='500px'
                    _type='finance_table'
                    setting={
                        {
                            sorting: true,
                            toggle_column: true,
                            search_column : true
                        }
                    }
                />
            }

        </div >
    )

}


const mapStateToProps = (state) => {
    let { stmt_id, stmt_type, schema_id, loading, error, tableData } = state.finance;
    return {
        stmt_id, stmt_type, schema_id,
        loading, error, tableData
    }
}

export default connect(mapStateToProps, null)( WithTableWrapper(FinanceTab)); 