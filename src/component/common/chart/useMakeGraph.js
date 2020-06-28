import { useState, useEffect } from 'react';

const UseMakeGraph = (data, type) => {

    const [graph_data, setGraph_data] = useState({
        datasets: []
    });
    const [ frmlStr , setFrmlStr ] = useState(null);


    useEffect(() => {
        console.log('props data in useMakeGraph ', data);

        if (data) {

            let temp_data = JSON.parse(JSON.stringify(data));

            setFrmlStr(temp_data.title)

            // delete temp_data['action'];
            // delete temp_data['name'];


            let only_year_keys = Object.keys(temp_data).filter(v => {

                if (!['frml_id', 'title', 'children', 'action', 'data'].includes(v)) {
                    return true
                }
                return false;

            })

            var final_data = [];
            if (type == 'ratio_table') {

                final_data = only_year_keys.map(v => {
                    return {
                        x: v,
                        y: temp_data[v]
                    }
                });
            }

            if (type == 'finance_table') {

                final_data = only_year_keys.map(v => {
                    return {
                        x: v,
                        y: temp_data[v].value
                    }
                });

            }

            //console.log('final  ', final_data);

            let data_obj = {
                label: 'Company Name',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                fill: false,
                lineTension: 0.5,
                data: final_data,
            }

            setGraph_data({
                datasets: [data_obj]
            });

        }

    }, [data]);

    useEffect(() => {

        // console.log('new graph data');
        // console.log(graph_data);

        // setGraph_data({
        //     datasets: [
        //         {
        //             label: 'Hcl Technology',
        //             backgroundColor: 'rgba(255,99,132,0.2)',
        //             borderColor: 'rgba(255,99,132,1)',
        //             borderWidth: 1,
        //             fill: false,
        //             lineTension: 0.5,
        //             data: [
        //                 { x: "2000-06-30", y: 100 },
        //                 { x: "2001-06-30", y: 200 },
        //                 { x: "2002-06-30", y: 700 }
        //             ]
        //         },
        //         {
        //             label: 'Reliance Industry',
        //             backgroundColor: 'yellow',
        //             borderColor: 'yellow',
        //             borderWidth: 1,
        //             fill: false,
        //             data: [
        //                 { x: "2000-06-30", y: 200 },
        //                 { x: "2001-06-30", y: 450 },
        //                 { x: "2002-06-30", y: 590 }
        //             ]
        //         }

        //     ]
        // })

    }, [graph_data]);



    return {
        graph_data,
        frmlStr
    }

}

export default UseMakeGraph;

