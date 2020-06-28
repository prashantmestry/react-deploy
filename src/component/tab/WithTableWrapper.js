import React  , { useState , useEffect} from 'react';
import { onlyRoundedInteger } from '../../util';

const WithTableWrapper = (WrapperComponent) => {

    const NewComponent = (props) => {

        //console.log('props in hoc ' , props);

        const [headerData, setHeaderData] = useState([]);
        const [bodyData, setBodyData] = useState([]);
        const [loading , setLoading] = useState(false);
        const [error , setError] = useState('');

        const [ counter , setCounter ] = useState(0);

        let increment = () =>{
            setCounter(counter+1);
        }

        useEffect(() =>{

            setLoading(props.loading);
            setError(props.error);     
            

            if (props.type == 'finance_table') 
            {

           // console.log('inside making data');

            let financeData = props.tableData && props.tableData.company_detail.data[0].stmt_data || [];
            let year_array = [];            
            financeData.forEach(v => {
                v.frml_data.forEach(v => {
                    if (year_array.indexOf(v.rprt_dt.substring(0, 10)) === -1) {
                        year_array.push(v.rprt_dt.substring(0, 10));
                    }
                })
            });

            // sort array
            year_array.sort((a, b) => {
                if (a < b) { return 1 }
                else if (a > b) { return -1 }
                else { return 0 }
            });

            year_array.unshift('title', 'action');

            let final_year = year_array.map(v => {
                let obj = {};
                obj.Header = v;
                obj.accessor = v;
                obj.visible = true;
                obj.position = 'right';

                if (v == 'title') {
                    obj.Header = 'Amount In Cr.'
                }

                if (v == 'title' || v == 'action') {
                    obj.position = 'left'
                }
                if (v == 'action') {
                    obj.visible = false;
                }
                return obj;
            });


            // get those formulas which has property displayElement true.
            let schema =  props.tableData && props.tableData.schema_detail.schema.map(v => {

                let obj = {};

                if ((!v.displayElement && v.displayElement !== false) || v.displayElement == true) {
                    obj.frml_id = v.frml_id;
                    obj.title = v.frml_str ? v.frml_str.trim() : '';
                    obj.children = v.children || null;
                }
                return obj;
            }).filter(v1 => Object.keys(v1).length > 0);


            let getFinanceData = (id) => {
                let out = [];
                let dd = financeData.find(fd => fd.frml_id == id);

                if (dd) {
                    dd.frml_data.forEach(v => {
                        out[v.rprt_dt.substring(0, 10).toString()] = {
                            rprt_date: v.rprt_dt.substring(0, 10),
                            dscl_date: v.dscl_dt.substring(0, 10),
                            value: onlyRoundedInteger(v.value),
                            value_new: null,
                            remarks: '',
                            edit_by: ''
                        }
                    })
                }
                return out;
            }

            let loopSchema = (schema, level) => {
                if (schema && schema.length > 0) {
                    return schema.map(schemaObj => {
                        return {
                            ...schemaObj,
                            title: schemaObj.title && schemaObj.title.trim(),
                            children: loopSchema(schemaObj.children, level + 1),
                            ...getFinanceData(schemaObj.frml_id),
                        }
                    })
                }
                else { return null }
            }

            let out = loopSchema(schema, 1);

            console.log('final body data');
            console.log(final_year);
            console.log(out);
            setHeaderData(final_year);
            setBodyData(out);

        }



         if(props.type == 'ratio_data')
         {
            if(!props.ratioDataLoading && !props.ratioDataError && props.ratioData)
            {                    
                let year_array = [];
                props.ratioData.data.forEach(v => {
                    v.ratioValue.forEach(v1 => {
                        if (year_array.indexOf(v1.date.substring(0, 10)) === -1) {
                            year_array.push(v1.date.substring(0, 10));
                        }
                    });
                });
                
                year_array.sort((a, b) => {
                    if (a < b) { return 1 }
                    else if (a > b) { return -1 }
                    else { return 0 }
                });

                year_array.unshift('title', 'action');

                let final_year = year_array.map((v, i) => {
                    let obj = {};
                    obj.Header = v;
                    obj.accessor = v.toLowerCase();                
                    obj.visible = true;

                    if (v == 'title') {
                        obj.position = 'left';                    
                        obj.Header = 'Ratio Name';
                    }
                    if (v === 'action') {
                        obj.position = 'left';                    
                    }
                    return obj;
                });

                //console.log('final_yearfinal_yearfinal_yearfinal_year' ,final_year);



            let makeData = null;

            makeData = (data, new_temp_headerArray) => {
                let temp = {};
                new_temp_headerArray.forEach(v => {
                    let d = data.find(v1 => v1.date.substring(0, 10) === v.accessor);
                    if (d) {
                        temp[v.accessor] = onlyRoundedInteger(d.data.value);
                    } else {
                        temp[v.accessor] = 0;
                    }
                });
                return temp;
            }

            let bodyD = props.ratioData.data.map(v => {
                return {
                    ...makeData(v.ratioValue, final_year),
                    title: v.ratioShortName ? v.ratioShortName : v.ratioKey
                }
            });

                setHeaderData(final_year);
                setBodyData(bodyD);

            }

         }



    },[props]);


        return (
            <WrapperComponent 
                loading ={ loading }
                error={error}    
                headerData = {headerData}
                bodyData={bodyData}
                
                counter={counter}
                increment={increment}
                user={props.type} 
             />
        )

    }

    return NewComponent;

}

export default WithTableWrapper;