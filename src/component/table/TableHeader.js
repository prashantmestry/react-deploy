import React from 'react';

const TableHeader = ({ headerArrayData }) => {

    //console.log('table header render');
    return (
        <tr>
            {
                headerArrayData.length > 0 && headerArrayData.map((obj, i) => {

                    if (obj.visible) {
                        return (
                            <th scope='col'
                                key={i}>
                                <div className='date_box'>
                                    {obj.Header}
                                </div>
                            </th>
                        )
                    }
                })
            }
        </tr>
    )
}

export default React.memo(TableHeader);

//export default TableHeader;