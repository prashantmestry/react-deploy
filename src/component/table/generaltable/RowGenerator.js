import React, { useCallback , useEffect } from 'react';
import GeneralTableRow from './GeneralTableRow';

const RowGenerator = ({ bodyData, headerData, getRow , getAllRowData }) => {

    const getEveryRowData = useCallback((rowData) => {
        getRow(rowData);
    }, []);

    useEffect(() => {
        var temp = [];
        bodyData.forEach(v => {
            temp.push(v);
        });
        getAllRowData(temp);
    }, [])

    //console.log('Row generator table render');

    return (
        <>
            {
                bodyData.map((item, i) => {
                    return (
                        <GeneralTableRow
                            item={item}
                            depth={0}
                            key={i}
                            headerArrayData={headerData}
                            getEveryRowData={getEveryRowData}
                        />
                    )
                })
            }
        </>
    )

}

export default RowGenerator;