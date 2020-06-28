import React from 'react';
import styled from 'styled-components';

const PageTitle = (props) => {
    return (
        <Title>{props.children}</Title>
    )
}

let Title = styled.h2`   
   text-align :right;
   font-size : 14px;
   margin :0;
   padding:10px;
   border-bottom : 1px solid  #032531;
   color : orange;
`
export default PageTitle;