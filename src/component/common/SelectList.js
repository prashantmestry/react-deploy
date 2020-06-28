import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const { Option } = Select;

const SelectList = ({ display, list, title, onChange }) => {

    return (
        <FrmlStrSelect
            defaultValue={title[display]}
            onChange={(v) => {
                onChange(v);
            }}
        >
            {
                list.map(v1 => {
                    return (
                        <Option
                            key={title[v1]}
                            value={title[v1]}>
                            {title[v1]}
                        </Option>
                    )
                })
            }
        </FrmlStrSelect>
    )
}


let FrmlStrSelect = styled(Select)`
color : #fff;
height:27px;
width: 220px;

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

export default SelectList;