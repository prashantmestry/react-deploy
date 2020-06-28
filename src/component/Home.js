import React, { useState, useEffect } from 'react';
//import DataTable from '../component/table/DataTable';
import FinanceTab from './tab/FinanceTab';
import RatioTab from './tab/RatioTab';
import Graph from '../component/common/chart/Graph';
import StatementList from './common/StatementList';
//import StatementType from './common/StatementType';
import StatementTypeFun from './common/StatementTypeFun';
import ExcelRead from '../component/excelread/ExcelRead';
import ProgressUpload from './progressUpload/ProgressUpload';
import Hr from './common/Hr';
import PageTitle from './common/PageTitle';
import { Button, Modal } from 'antd'
import moment from 'moment';

import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import './Home.css';


const Home = (props) => {

    useEffect(() => {
        props.setCompanyInfo({
            stmt_id: 'ratio_data',
            stmt_type: 'sa'
        });

//        console.log('sort array =========');
        let input = ["10-01-2017", "30-01-2017", "05-01-2017", "10-01-2020", "15-01-2017", "05-01-2011"];


        input.sort(function (a, b) {

            return moment(a).format("x") - moment(b).format("x")

            //return moment.utc(b.timeStamp).diff(moment.utc(a.timeStamp))

        });


        // input.sort((a, b) => {
        //     if (a > b) {
        //         return 1
        //     }
        //     else if (a < b) {
        //         return -1
        //     }
        //     else {
        //         return 0;
        //     }
        // })


    }, []);


    useEffect(() => {

        if ([1, 2, 4, 5].includes(props.stmt_id) && props.stmt_type) {
            props.getTableData({
                comp_id: 12234,
                schemaId: props.schema_id,
                stmtId: props.stmt_id,
                stmtType: props.stmt_type
            });
        }

        if (props.stmt_id && props.stmt_id === 'ratio_data') {
            //console.log('other then finance data ==========');
            let data = { name: 'prashnt' }
            props.getRatioData(data);
        }

    }, [props.schema_id, props.stmt_id, props.stmt_type])

//    console.log('home comp render');

    return (
        <>
            <div className='parent-section'>

                <div className='section-head'>
                    <PageTitle>Home  - {process.env.NODE_ENV}</PageTitle>
                </div>

                <div className='side-statement'>
                    <StatementList />
                    <Button style={{ marginBottom: '10px', width: '100%' }} variant="contained" color="primary"
                        onClick={() => props.getStatementType()}>Type</Button>
                    <StatementTypeFun />
                </div>

                <div className='side-display'>
                    {
                        props.stmt_id && [1, 2, 4, 5].includes(props.stmt_id) &&
                        <FinanceTab type='finance_table' />
                    }
                    {
                        props.stmt_id && props.stmt_id === 'ratio_data' &&
                        <RatioTab type='ratio_data' />
                    }

                    {
                        props.stmt_id && props.stmt_id === 'fundware' &&
                        <div style={{ width: '100%', margin: '0 auto' }}>
                            <Graph />
                        </div>
                    }

                    {
                        props.stmt_id && props.stmt_id === 'external' &&
                        <div>
                            <ExcelRead />
                            <Hr />
                            <ProgressUpload />
                        </div>
                    }
                </div>

            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    let { stmt_id, stmt_type, schema_id } = state.finance;
    return {
        stmt_id, stmt_type, schema_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatementType: () => dispatch(actions.getStatementType()),
        setCompanyInfo: (obj) => dispatch(actions.setCompanyInfo(obj)),
        getTableData: (obj) => dispatch(actions.getTableData(obj)),
        getRatioData: (obj) => dispatch(actions.getRatioData(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
