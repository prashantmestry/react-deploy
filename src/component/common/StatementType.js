import React from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import { setCompanyInfo } from '../../redux/actions';
import { connect } from 'react-redux';

class StatementType extends React.Component {

    render() {

        const { statement_type, setCompanyInfo, stmt_type } = this.props;
        console.log('statement Type render ');
        return (
            <div className='list'>
                {
                    statement_type &&
                    <ul>
                        {
                            statement_type.map(v => {
                                return (
                                    <li
                                        className={stmt_type && stmt_type == v.id ? 'active' : null}
                                        key={v.id}
                                        onClick={() => {
                                            if (stmt_type != v.id) {
                                                setCompanyInfo({ stmt_type: v.id })
                                            }
                                        }}>
                                        {v.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(StatementType);
