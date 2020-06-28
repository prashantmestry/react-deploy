import React, { useEffect } from 'react';
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import PageTitle from './common/PageTitle';
import styled from 'styled-components';
import { Button } from 'antd';

const HomeFun = (props) => {

    useEffect(() => {
        props.getStatementList();
    }, []);


    let setInfoStmtId = (id) => {
        console.log('stmt id ', id);
        props.setCompanyInfo({ ...props.company, stmt_id: id });
    }

    let setInfoStmtType = (id) => {
        console.log('stmt type ', id);
        props.setCompanyInfo({ ...props.company, stmt_type: id });
    }

    console.log('home fun comp render');

    return (
        <div>
            <PageTitle>Home Fun</PageTitle>
            <div className='list'>
                {
                    props.statement_list &&
                    <ul>
                        {
                            props.statement_list.map(v => {
                                return (
                                    <li
                                        className={props.stmt_id && props.stmt_id == v.id ? 'active' : null}
                                        key={v.id}
                                        onClick={() => setInfoStmtId(v.id)}>{v.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
                <Button style={{ marginBottom: '10px' }} variant="contained" color="primary" onClick={() => props.getStatementType()}>Type</Button>
                {
                    props.statement_type &&
                    <ul>
                        {
                            props.statement_type.map(v => {
                                return (
                                    <li
                                        className={props.stmt_type && props.stmt_type == v.id ? 'active' : null}
                                        key={v.id}
                                        onClick={() => setInfoStmtType(v.id)}>
                                        {v.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                }

            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    let { statement_list, statement_type, stmt_id, stmt_type } = state.finance;
    return { statement_list, statement_type, stmt_id, stmt_type }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatementList: () => dispatch(actions.getStatementList()),
        getStatementType: () => dispatch(actions.getStatementType()),
        setCompanyInfo: (obj) => dispatch(actions.setCompanyInfo(obj))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeFun);
