import React, { useState, useEffect } from 'react';
import TableHeader from '../TableHeader';
import TableGraph from '../../../component/common/chart/TableGraph';
import RowGenerator from './RowGenerator';
import DisplayModal from '../../common/modal/DisplayModal';
import TableSetting from '../tableSetting/TableSetting';

import styled from 'styled-components';
import { Modal, Button, message, Icon } from 'antd';


const GeneralTable = ({ _headerData, _bodyData, _height, _type , setting , ...props }) => {

    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);

    const [allRowData, setAllRowData] = useState([]);
    const [itemData, setItemData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [visibleModel, setVisibleModel] = useState(false);

    // useEffect(() => {
    //     setHeaderData(_headerData);
    //     setBodyData(_bodyData);
    // }, [_headerData, _bodyData]);

    let getRow = (rowData) => {
        setItemData(rowData);
    }

    let getAllRowData = (allData) => {
        //console.log('allData ', allData);
        setAllRowData(allData);
    }

    useEffect(() => {
        setItemData(allRowData[activeIndex]);
    }, [activeIndex]);

    //console.log('General table render');

    return (
        <>
            <div style={{ padding: '10px', textAlign: 'center' }} >
                <Button onClick={() => {
                    setActiveIndex(0);
                    setVisibleModel(true);
                }}>Show Graph</Button>   

                <Button onClick={ props.increment }>InCrease :  {props.counter }</Button>             
            </div>
            <div className='tableBox'>
                <TableSetting   setting={setting}/>
                <div className='table_scroll' style={{ height: _height }}>
                    {
                        <table>
                            <thead>
                                <TableHeader
                                    headerArrayData={_headerData}
                                />
                            </thead>
                              
                            <tbody>
                                {
                                    _bodyData.length > 0 ?
                                        <RowGenerator
                                            bodyData={_bodyData}
                                            headerData={_headerData}
                                            getRow={getRow}
                                            getAllRowData={getAllRowData}
                                        />
                                        :
                                        <tr>
                                            <td colSpan={_headerData.length}>No Record  Found</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>

            <DisplayModal
                title="Graph"
                width='1000px'
                visible={visibleModel}
                onCancel={() => setVisibleModel(false)}
                footer={null}                
            >
                <TableGraph data={itemData} type={_type} />
                <div style={{ textAlign: 'center' }}>
                    {
                        activeIndex != 0 &&
                        <GraphArrowIcon
                            type="left-circle"
                            onClick={() => {
                                setActiveIndex(activeIndex - 1);
                            }} />
                    }

                    {
                        activeIndex != allRowData.length - 1 &&
                        <GraphArrowIcon
                            type="right-circle"
                            onClick={() => {
                                setActiveIndex(activeIndex + 1);
                            }} />
                    }
                </div>
            </DisplayModal>
        </>
    )
}

let GraphArrowIcon = styled(Icon)`
    font-size: 25px;
    color : #999;
    margin : 0 10px 0 10px;
    
    :hover{
        color : #000;
    }
`;

export default GeneralTable;