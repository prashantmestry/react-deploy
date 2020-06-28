import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const DataLoader = (props) => {

    return (

        <Loader>
            <Spin style={{ width: '100%' }} />
            {
                props.message &&
                <div className='loader_txt'>{props.message}</div>
            }
        </Loader>
    )
}

let Loader = styled.div`
    display : flex;
    width :100%;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    padding:10px;
    .loader_txt
    {
        margin:5px;
    }
`;

export default DataLoader;