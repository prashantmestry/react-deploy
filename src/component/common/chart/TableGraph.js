import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import useMakeGraph from './useMakeGraph';
import styled from 'styled-components';
import { Icon } from 'antd';

let Option = {
    legend: {
        display: true,
        position: 'top'
    },
    responsive: true,
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                parser: 'YYYY-MM-DD',
            },
        }]
    },
    plugins: {
        datalabels: {
            display: false
        }
    }
}

const Graph = ({ data, type }) => {

    const { graph_data, frmlStr } = useMakeGraph(data, type);
    const [graphformat, setGraphFormat] = useState('line');

    console.log('Table Graph render');

    return (
        <GraphContainer>
            <div style={{ textAlign: 'right' }}>
                <Icon
                    style={{ margin: '0 5px 0 5px' }}
                    className={`format_icon ${graphformat == 'line' && 'active'}`}
                    type="line-chart"
                    onClick={() => {
                        setGraphFormat('line')
                    }} />
                <Icon
                    style={{ margin: '0 5px 0 5px' }}
                    className={`format_icon ${graphformat == 'bar' && 'active'}`}
                    type="bar-chart"
                    onClick={() => {
                        setGraphFormat('bar')
                    }} />
            </div>
            {
                graph_data ?
                    <>
                        <GraphTitle >Graph : {frmlStr}</GraphTitle>
                        {
                            graphformat == 'line'&&
                            <div className='inner_div'>
                                <Line
                                    options={Option}
                                    data={graph_data}
                                    width={100}
                                    height={30}
                                />
                            </div>
                        }
                        {
                            graphformat == 'bar' &&
                            <div className='inner_div'>
                                <Bar
                                    data={graph_data}
                                    width={100}
                                    height={30}
                                    options={Option}
                                />
                            </div>
                        }
                    </>
                    :
                    <div>Graph Data</div>
            }
        </GraphContainer>
    )
}

let GraphTitle = styled.h3`
    text-align : center;
    color : #333;
    margin-top : 10px;
    font-size : 14px;
`;

let GraphContainer = styled.div`    
    width : 100%; 
    margin : 0 auto;
    .inner_div {
        border : 1px solid #1c3036;
        border-radius : 5px;
        margin:20px;
        padding:10px;
    }
    .format_icon{
        font-size : 25px;
        color : #999;
        .active , :hover{ 
            color : #000;
        }
    }
    .active{ 
        color : #000;
    }

`;

export default Graph;