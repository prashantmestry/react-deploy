import React, { useContext } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';


const ErrorPage = (props) => {


    switch (props.type) {

        case '101':
            return (
                <ErrorContainer>
                    <div>{props.error}</div>
                </ErrorContainer>
            );
        default:
            return (
                props.error ?
                    <ErrorContainer>
                        <div style={{ margin: '20px 0' }}>
                            <Icon type="frown" style={{ fontSize: '4em', color: '#fff' }} />
                        </div>
                        <div style={{ color: '#fff', fontSize: '15px' }}>{props.error}</div>
                    </ErrorContainer>
                    :
                    null
            )
    }

}


let ErrorContainer = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
    align-items : center;
    margin : 10px;
`;

export default ErrorPage;