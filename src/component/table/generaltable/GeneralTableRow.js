import React, { useCallback } from 'react';
import { Select, Icon } from 'antd';
import styled from 'styled-components';
import { business_icon } from '../../../images';

const { Option } = Select;

const GeneralTableRow = (props) => {

//    console.log('GeneralTableRow  render ');

    return (
        <tr>
            {
                props.headerArrayData && props.headerArrayData.map(v => {

                    if (v.position == 'left') {
                        return (
                            <th key={v.accessor}>
                                <div
                                    style={{
                                        textAlign: 'left',
                                        Xmargin: '5px',
                                        cursor: `${(props.item.children && props.item.children.length > 0) ? 'pointer' : 'auto'}`,
                                        width: '100%', paddingLeft: `${props.depth * 15}px`,
                                    }}>
                                    {
                                        props.type == 'excel_table' ?
                                            <>
                                                {
                                                    v.accessor == 'title' && (
                                                        <FrmlStrSelect
                                                            style={{ width: 220 }}
                                                            defaultValue={props.item[v.accessor].matched_frml_str}
                                                            onChange={(v) => {
                                                                props.changeTitle({
                                                                    row_id: props.item.row_id,
                                                                    new_title: v
                                                                });
                                                            }}>
                                                            {
                                                                Object.keys(props.item[v.accessor]).map(v1 => {
                                                                    return (
                                                                        <Option key={props.item[v.accessor][v1]}
                                                                            value={props.item[v.accessor][v1]}>
                                                                            {props.item[v.accessor][v1]}
                                                                        </Option>
                                                                    )
                                                                })
                                                            }
                                                        </FrmlStrSelect>
                                                    )
                                                }
                                                {
                                                    v.accessor == 'status' &&
                                                    (
                                                        <div style={{ textAlign: 'center', width: '80px' }}>
                                                            <StatusIcon
                                                                type={props.item[v.accessor].message == 'success' ? 'check-circle' : 'warning'}
                                                                color={props.item[v.accessor].message == 'success' ? 'green' : '#de4c4c'}
                                                            />
                                                            {
                                                                <span style={{ fontWeight: '200', textTransform: 'capitalize' }}>
                                                                    {props.item[v.accessor].message}
                                                                </span>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </>
                                            :
                                            <div>
                                                {
                                                    v.accessor == 'action' ?
                                                        <div style={{ textAlign: 'center' }}
                                                            onClick={() => props.getEveryRowData(props.item)}>
                                                            <img src={business_icon}
                                                                alt="graph"
                                                                style={{ cursor: 'pointer', width: '15px', margin: '5px' }} />
                                                        </div>
                                                        :
                                                        <div>{props.item[v.accessor]}</div>
                                                }
                                            </div>
                                    }
                                </div>
                            </th>
                        )
                    }
                    return (
                        <td key={v.accessor}>
                            <div
                                style={{
                                    textAlign: 'right',
                                    padding: '8px 10px 8px 10px',
                                }}>
                                {
                                    props.type && props.type == 'excel_table' ?
                                        <StatusSpan
                                            error={props.item[v.accessor].validation_status && props.item[v.accessor].validation_status == 'SUCCESS' ? 'false' : 'true'}
                                        >
                                            {props.item[v.accessor].value}
                                        </StatusSpan>
                                        :
                                        <div>
                                            <span>{props.item[v.accessor]}</span>
                                        </div>
                                }
                            </div>
                        </td>
                    )
                })
            }
        </tr>
    )

}


let StatusIcon = styled(Icon)`    
    margin-right : 10px;
    font-size : 16px;
    color : ${props => props.color};    
`;

let StatusSpan = styled.span`
    color : ${props => props.error && props.error == 'true' ? '#de4c4c' : '#fff'}
`;

let FrmlStrSelect = styled(Select)`
color : #fff;
height:27px;

.ant-select-selection
{
    background : none;
    border : none;
    outline : none;
}
.ant-select-arrow{
    color : #fff;
}

`;

export default React.memo(GeneralTableRow);
