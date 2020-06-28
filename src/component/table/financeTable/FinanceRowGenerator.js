import React, { useCallback } from 'react';
import FinanceTableRow from './FinanceTableRow';

const FinanceRowGenerator = ({ bodyData, headerData, getRow }) => {

    const getEveryRowData = useCallback((rowData) => {        
        getRow(rowData);
    }, []);    


    //console.log('FinanceRowGenerator comp render');

    return (
        <>
            {
                bodyData.map((item, i) => {
                    return (
                        <FinanceTableRow
                            item={item}
                            depth={0}
                            key={i}
                            show={item.displayElement}
                            headerArrayData={headerData}
                            getEveryRowData={getEveryRowData}
                        />
                    )
                })
            }
        </>
    )

}


export default FinanceRowGenerator;

