import React from 'react';
import { setCompanyInfo } from '../../redux/actions';
import { connect } from 'react-redux';

const StatementTypeFun = (props) => {

    //console.log('statementFun type render');

    return (
        <div className='list'>
            {
                props.statement_type &&
                <ul>
                    {
                        props.statement_type.map(v => {
                            return (
                                <li
                                    className={props.stmt_type && props.stmt_type == v.id ? 'active' : null}
                                    key={v.id}
                                    onClick={() => {
                                        if (props.stmt_type != v.id) {
                                            props.setCompanyInfo({ stmt_type: v.id })
                                        }
                                    }}
                                > {v.name}</li>
                            )
                        })
                    }
                </ul>
            }
        </div >
    )
}

const mapStateToProps = (state) => {
    let { statement_type, stmt_type } = state.finance;
    return {
        statement_type,
        stmt_type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCompanyInfo: (obj) => dispatch(setCompanyInfo(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatementTypeFun);
