import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import XLSX from 'xlsx';
import { Icon, Modal, Upload, Button } from 'antd';
import { excel_dum_json } from './excel_dum_json';

// const ShowInModal = (props) => {

//     let actionHandler = () => {
//         props.toggleShow(false)
//     }

//     return (
//         <Modal
//             title='Excel Content'
//             visible={props.show}
//             onOk={actionHandler}
//             onCancel={actionHandler}
//             width='80%'
//             cancelButtonProps={null}
//         >
//             {props.children}
//         </Modal>
//     )
// }


const ExcelRead = () => {

    const [excelJson, setExcelJson] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() =>{

        
        setExcelJson(excel_dum_json)
        

    })

    
    return (
        <div>

            <div style={{ display: 'flex', margin: '20px 0', justifyContent: 'center', alignItems: 'center' }}>
                <h3 style={{ color: '#fff', margin: '0 10px 0 10px', fontSize: '16px' }}>Upload File</h3>
                <Upload
                    onRemove={(file) => {
                        console.log('remove ', file);
                    }}

                    beforeUpload={() => {
                        console.log('before upload');
                    }}

                    onChange={(info) => {

                        console.log('on chagne ', info);
                        var f = info.file.originFileObj;

                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            let readedData = XLSX.read(data, { type: 'binary', cellText: false, cellDates: true });
                            const wsname = readedData.SheetNames[0];
                            const ws = readedData.Sheets[wsname];
                            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd/mm/yyyy' });

                            setExcelJson(dataParse);
                            setShow(true);
                            console.log('dataParse ', dataParse);

                        }
                        reader.readAsBinaryString(f)
                    }}

                >
                    <Button> <Icon type="upload" /> Upload</Button>
                </Upload>

            </div>

            <div style={{ maxHeight: '400px', overflowY: 'scroll', padding: '5px' }}>
                <TableDisplay >
                    {
                        excelJson && excelJson.map((parent, pindex) => {

                            if (pindex == 0) {
                                return (
                                    <thead key={pindex}>
                                        <tr>
                                            {
                                                parent.map((child, cindex) => {
                                                    return (
                                                        <th className='child' key={cindex}>{child}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </thead>
                                )
                            }
                            else {
                                return (
                                    <tbody key={pindex}>
                                        <tr key={pindex}>
                                            {
                                                (parent.length > 0) &&
                                                parent.map((child, cindex) => {
                                                    return (
                                                        <td className='child' key={cindex}>{child}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </tbody>
                                )
                            }
                        })
                    }
                </TableDisplay>
            </div>

        </div >
    )
}



let TableDisplay = styled.table`
    margin-top:20px;
    width:100%;    

    thead tr{
        background :  #f1f1f1;
    }
    tr{
        th , td{
            padding:10px;
            border : 1px solid gray;
            text-align : center;
        }    
}
`;

export default ExcelRead;