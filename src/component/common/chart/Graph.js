import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

const data1 = {
    datasets: [
        {
            label: 'Hcl Technology',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            fill: false,
            lineTension: 0.5,
            data: [
                { x: "2000-06-30", y: 100 },
                { x: "2001-06-30", y: 200 },
                { x: "2002-06-30", y: 700 }
            ]
        },
        {
            label: 'Reliance Industry',
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderWidth: 1,
            fill: false,
            data: [
                { x: "2000-06-30", y: 200 },
                { x: "2001-06-30", y: 450 },
                { x: "2002-06-30", y: 590 }
            ]
        }

    ]
};

let Option = {
    legend: {
        display: true,
        position: 'left'
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
const Graph = () => {


    const data2 = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
                data: [65, 59, 80, 81, 56],
            }
        ]
    }


    return (
        <GraphContainer>
            <div style={{ border: '1px solid #1c3036', padding: '10px' }}>
                <Line
                    options={Option}
                    data={data1}
                    width={100}
                    height={30}
                />
            </div>

            <div style={{ border: '1px solid #1c3036', padding: '10px' , marginTop : '20px' }}>
                <Bar
                    data={data1}
                    width={100}
                    height={30}
                    options={Option}
                />
            </div>

            <div style={{ border: '1px solid #1c3036', padding: '10px' , marginTop : '20px' }}>
                <Pie
                    data={data2}
                    width={100}
                    height={30}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'left'
                        }
                    }}
                />
            </div>

            <div style={{ border: '1px solid #1c3036', padding: '10px' , marginTop : '20px' }}>
                <Doughnut
                    data={data2}
                    width={100}
                    height={30}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'left'
                        }
                    }}
                />
            </div>

        </GraphContainer>
    )
}

let GraphContainer = styled.div`
    margin : 10px;
`;

export default Graph;