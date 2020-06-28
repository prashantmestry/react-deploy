import React, { useEffect, useState } from 'react';
import FinanceTable from '../table/financeTable/FinanceTable';
import { connect } from 'react-redux';
import WithTableWrapper from './WithTableWrapper';
import DataLoader from '../common/DataLoader';
import ErrorPage from '../common/ErrorPage';

const FinanceTab = (props) => {

    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {

        setHeaderData(props.headerData);
        setBodyData(props.bodyData);
        setLoading(props.loading);
        setError(props.error);        

    }, [props]);


    console.log('Data Table render ', props.dataLoading);

    return (
        <div>                        
             {
                loading &&
                <DataLoader message='Finance Table Loading...' />
            }

            {
                !loading && error &&
                <ErrorPage error={error} />
            }

            {
                (!loading && !error) &&
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
                    {...props}
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