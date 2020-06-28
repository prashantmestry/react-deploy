import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import XLSX from 'xlsx';
import { Icon, Upload, Button, message } from 'antd';
import { excel_dum_json } from './excel_dum_json';

import GeneralTable from '../table/generaltable/GeneralTable';

const ExcelRead = () => {

    const [excelJson, setExcelJson] = useState(null);
    const [final, setFinal] = useState(null);

    let convertJson = (resp) => {
        let temp_json = JSON.parse(JSON.stringify(resp));
        let output = temp_json.map(v => {
            let obj = {};
            obj = { ...v }
            let temp_entity_data = obj.entity_data.map((v1, i) => {
                return ({
                    ...v1,
                    row_id: `${v.entity_id}_${i}`
                })
            })
            obj.entity_data = temp_entity_data;
            return obj;
        })

        console.log('modified excel data', output);
        setExcelJson(output);        
    }

    useEffect(() => {
        if (excelJson) {
            makeFinalDisplayData();
        }
    }, [excelJson]);


    let makeFinalDisplayData = () => {

        let out = [];
        excelJson.forEach(v1 => {
            let entity_data = v1['entity_data'];
            let year_array = [];
            entity_data.forEach(v => {
                v.frml_data.forEach(v => {
                    if (year_array.indexOf(v.rprt_date.substring(0, 10)) === -1) {
                        year_array.push(v.rprt_date.substring(0, 10));
                    }
                })
            });

            year_array.sort((a, b) => {
                if (b < a) { return 1 }
                else if (b > a) { return -1 }
                else { return 0 }
            });

            year_array.unshift('status');
            year_array.unshift('title');

            let final_year = year_array.map(v => {
                let obj = {};
                obj.Header = v;
                obj.accessor = v;
                obj.visible = true;
                obj.position = 'right';

                if (v == 'title' || v == 'status') {
                    obj.position = 'left'
                    obj.Header = v.toUpperCase();
                }
                return obj;
            });


            let makeData = (data, new_temp_headerArray) => {
                let temp = {};
                new_temp_headerArray.forEach(v => {
                    let d = data.find(hdata => hdata.rprt_date === v.accessor);

                    if (d) {
                        temp[v.accessor] = {
                            ...d
                        };
                    } else {
                        temp[v.accessor] = {
                            ...d
                        };
                    }
                });
                return temp;
            }

            let body_temp = entity_data.map(v2 => {
                return {
                    ...makeData(v2.frml_data, final_year),
                    frml_id: v2.frml_id,
                    title: {
                        matched_frml_str: v2.matched_frml_str,
                        original_frml_str: v2.original_frml_str
                    },
                    display_frml_str: ''
                }
            })

            out.push({
                entity_type: v1.entity_type,
                entity_id: v1.entity_id,
                entity_name: v1.entity_name,
                entity_name_original: v1.entity_name_original,
                header: final_year,
                body: body_temp
            })

        })

        setFinal(out);
        console.log('out', out);

    }



    let getExcelData = () => {
        return JSON.parse(JSON.stringify(excelJson));
    }

    let changeTitle = (newTitle) => {

        let temp = getExcelData();
        console.log('json ', temp);

        console.log('change title ', newTitle);
    }

    let submitExternalData = () => {
        console.log('submitExternalData fun');
    }



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <UploadContainer>
                    <h3 style={{ margin: '10px' }}>Upload File</h3>
                    <Upload
                        name='file'
                        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                        headers={{
                            authorization: 'authorization-text'
                        }}

                        onRemove={(file) => {
                            console.log('remove ', file);
                        }}

                        beforeUpload={() => {
                            console.log('before upload');
                        }}

                        onChange={(info) => {

                            console.log('on chagne ', info);
                            var f = info.file.originFileObj;

                            if (info.file.status !== 'uploading') {
                                console.log(info.file, info.fileList);
                            }
                            if (info.file.status === 'done') {
                                message.success(`${info.file.name} file uploaded successfully`);

                            } else if (info.file.status === 'error') {
                                message.error(`${info.file.name} file upload failed.`);
                            }
                            
                            setTimeout(() => {
                                convertJson(excel_dum_json);
                            }, 3000)                            


                            // var reader = new FileReader();
                            // reader.onload = function (e) {
                            //     var data = e.target.result;
                            //     let readedData = XLSX.read(data, { type: 'binary', cellText: false, cellDates: true });
                            //     const wsname = readedData.SheetNames[0];
                            //     const ws = readedData.Sheets[wsname];
                            //     const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd/mm/yyyy' });

                            //     setExcelJson(dataParse);
                            //     setShow(true);
                            //     console.log('dataParse ', dataParse);

                            // }
                            // reader.readAsBinaryString(f)
                        }}

                    >
                        <Button> <Icon type="upload" /> Upload</Button>
                    </Upload>
                </UploadContainer>
            </div>
            <div style={{ marginRight: '20px', textAlign: 'right' }}>
                <Button type="primary" onClick={submitExternalData}>Submit</Button>
            </div>

            <div>
                {
                    (final && final.length > 0) && final.map((v, i) => {
                        return (
                            <GeneralBox key={i}>
                                <div className='org-detail'>
                                    <Icon type="desktop" className='ico' />{v.entity_type} - {v.entity_id} - {v.entity_name}
                                </div>
                                <GeneralTable
                                    headerData={v.header}
                                    bodyData={v.body}
                                    changeTitle={changeTitle}
                                    entity_id={v.entity_id}
                                    type='excel_table'
                                />
                            </GeneralBox>
                        )
                    })
                }
            </div>

        </>

    )

}



let UploadContainer = styled.div`
    text-align: center;
    padding: 10px;
    color : #fff;
    h3{
        color : #fff;
    }

    .ant-upload-list-item-info{
        color : #fff;
        .anticon{
            color : #fff;
        }
    }
`;

let GeneralBox = styled.div`
    margin : 15px 20px;    
    .org-detail{
        padding : 10px;
        text-transform : uppercase;
        .ico{
            margin-right : 10px;
        }
    }
`;

export default ExcelRead;