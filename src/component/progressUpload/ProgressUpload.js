import React from 'react';
import styled from 'styled-components';
import { Upload, message, Button, Icon } from 'antd';


const ProgressUpload = () => {

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            console.log('...', info);

            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        showUploadList: {
            showPreviewIcon: true,
            showRemoveIcon: false,
            showDownloadIcon: false
        }
    };

    return (
        <Container>
            <h3>Progress Upload</h3>

            <Upload {...props}>
                <Button><Icon type="upload" /> Click to Upload</Button>
            </Upload>

        </Container>
    )
}


let Container = styled.div`
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

export default ProgressUpload;