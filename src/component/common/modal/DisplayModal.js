import React from 'react';
import { Modal } from 'antd';

const DisplayModal = ({ title, width, visible, onCancel, footer, children }) => {

    return (
        <Modal
            title={title || 'Modal'}
            width={width || '1000px'}
            visible={visible}
            onCancel={onCancel}
            footer={footer || null}
        >
            {children}
        </Modal>
    )
}



export default DisplayModal;