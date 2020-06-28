import React, { useState, useEffect } from 'react';
import TableGraph from '../../common/chart/TableGraph';
import FinanceRowGenerator from './FinanceRowGenerator';
import DisplayModal from '../../common/modal/DisplayModal';
import TableHeader from '../TableHeader';
import TableSetting from '../tableSetting/TableSetting';
import './FinanceTable.css';

const FinanceTable = ({ _headerData, _bodyData, _height, _type, setting }) => {

    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);
    const [itemData, setItemData] = useState(null);
    const [visibleModel, setVisibleModel] = useState(false);

    useEffect(() => {
        setHeaderData(_headerData);
        setBodyData(_bodyData);
    }, [_headerData, _bodyData])

    let getRowData = (rowData) => {
        setVisibleModel(true);
        setItemData(rowData);
    }

    return (
        <>
            <div className='tableBox'>
                <TableSetting setting={setting} />
                <div className='table_scroll' style={{ height: _height }}>
                    {
                        <table>
                            <thead>
                                <TableHeader
                                    headerArrayData={headerData}
                                />
                            </thead>
                            <tbody>
                                {
                                    bodyData.length > 0 ?
                                        <FinanceRowGenerator
                                            bodyData={bodyData}
                                            headerData={headerData}
                                            getRow={getRowData}
                                        />
                                        :
                                        <tr>
                                            <td colSpan={headerData.length}>No Record  Found</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>

            <DisplayModal
                title="Finance Graph"
                width='1000px'
                visible={visibleModel}
                onCancel={() => setVisibleModel(false)}
                footer={null}
            >
                <TableGraph data={itemData} type='finance_table' />
            </DisplayModal>


        </>
    )

}

export default FinanceTable;

