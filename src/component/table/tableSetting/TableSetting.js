import React from 'react';


const TableSetting = ({ setting }) => {
    return (
        <div>TableSetting

            <div>
                {
                    setting.sorting ? 'yes' : 'no'                    
                }
            </div>
        </div>
    )
}


export default TableSetting;