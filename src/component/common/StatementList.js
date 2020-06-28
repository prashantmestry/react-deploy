import React, { useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import { setCompanyInfo, getStatementList } from '../../redux/actions';
import { connect } from 'react-redux';


class StatementList extends React.Component {

    componentDidMount() {
        this.props.getStatementList();
    }

    render() {

        const { statement_list, setCompanyInfo, stmt_id } = this.props;

        //console.log('statement list render ');

        return (

            <div className='list'>
                {
                    statement_list &&
                    <ul>
                        {
                            statement_list.map(v => {
                                return (
                                    <li
                                        className={stmt_id && stmt_id == v.id ? 'active' : null}
                                        key={v.id}
                                        onClick={() => {
                                            if (stmt_id != v.id) {
                                                setCompanyInfo({ stmt_id: v.id })
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
    let { statement_list, stmt_id } = state.finance;
    return {
        statement_list,
        stmt_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCompanyInfo: (obj) => dispatch(setCompanyInfo(obj)),
        getStatementList: () => dispatch(getStatementList())

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(StatementList);


// export const StatementList = React.memo(() => {

//     const { statement_list, stmt_id } = useSelector(state => state.finance);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getStatementList());
//     }, []);

//     console.log('statement list render');

//     return (

//         <div className='list'>
//             {
//                 statement_list &&
//                 <ul className='notop'>
//                     {
//                         statement_list.map(v => {
//                             return (
//                                 <li
//                                     className={stmt_id && stmt_id == v.id ? 'active' : null}
//                                     key={v.id}
//                                     onClick={() => dispatch(setCompanyInfo({ stmt_id: v.id }))
//                                     }>{v.name}
//                                 </li>
//                             )
//                         })
//                     }
//                 </ul>
//             }
//         </div>
//     )
// })