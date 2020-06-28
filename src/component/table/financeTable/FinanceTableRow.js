import React from 'react';
//import business from '../../images/business.svg';
import { business_icon } from '../../../images';
import styled from 'styled-components';

class FinanceTableRow extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showChild: false
        }

        this.returnModalData = this.returnModalData.bind(this);
    }

    // componentDidMount() {

    //     if (this.props.currentCompany.stmtId == 'user_schema') {
    //         this.setState({
    //             showChild: true
    //         })
    //     }
    // }

    handleCollapse = () => {
        this.setState({
            showChild: !this.state.showChild
        })
    }

    returnModalData(item) {
        this.props.getEveryRowData(item);
    }

    render() {

        //console.log('FinanceTableRow comp render');

        let { headerArrayData, theme, item, depth, currentCompany, addNewRecored, removeRecored, tableEdit } = this.props;

        return (
            <>
                <tr>
                    {
                        headerArrayData.map((obj, i) => {
                            if (obj.visible) {

                                if (obj.position == 'left') {
                                    return (
                                        <th key={i}>
                                            {
                                                obj.accessor === 'title' &&
                                                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{
                                                        textAlign: 'left',
                                                        margin: '5px',
                                                        cursor: `${(item.children && item.children.length > 0) ? 'pointer' : 'auto'}`,
                                                        width: '100%', paddingLeft: `${depth * 15}px`
                                                    }}
                                                        onClick={(item.children && item.children.length > 0) ? this.handleCollapse : null}
                                                    >
                                                        {
                                                            (item.children && item.children.length > 0) ?
                                                                <span>{item.title}</span>
                                                                :
                                                                item.title
                                                        }

                                                        {
                                                            (item.children && item.children.length > 0) &&
                                                            <span style={{ marginLeft: '10px' }}>
                                                                {
                                                                    !this.state.showChild ? '+' : '-'
                                                                }
                                                            </span>
                                                        }
                                                        {/* {item.frml_id} */}
                                                    </div>
                                                    {
                                                        (!item.type || item.type != 'parent' || item.group_id == 'Ratios') &&
                                                        <div onClick={() => this.returnModalData(item)}>
                                                            <span>
                                                                <img src={business_icon}
                                                                    alt="graph"
                                                                    style={{ cursor: 'pointer', width: '15px', margin: '5px' }} />
                                                            </span>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </th>
                                    )
                                }
                                else {
                                    return (
                                        <td key={i} style={{ padding: '2px' }}>
                                            <TdInnerDiv theme={theme}>
                                                <div>
                                                    {
                                                        //(item[obj.accessor] && item[obj.accessor].value) ? item[obj.accessor].value : ''
                                                        item[obj.accessor] && item[obj.accessor].value
                                                    }
                                                </div>
                                                {
                                                    (item[obj.accessor] && item[obj.accessor].value_new) &&
                                                    <div style={{ display: 'flex', marginTop: '5px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                        <div style={{ color: theme.typeIconHoverColor }}>{item[obj.accessor].value_new}</div>
                                                    </div>
                                                }
                                            </TdInnerDiv>
                                        </td>
                                    )
                                }

                            }
                        })
                    }
                </tr>
                {
                    this.state.showChild &&
                    (item.children && item.children.map((item, i) =>
                        <FinanceTableRow key={i}
                            item={item}
                            depth={depth + 1}
                            headerArrayData={headerArrayData}
                            theme={theme}                         
                            tableEdit={tableEdit}
                            addNewRecored={addNewRecored}
                            removeRecored={removeRecored}
                            currentCompany={currentCompany}
                            getEveryRowData={() => this.returnModalData(item)}
                        />
                    ))
                }
            </>
        )
    }

}


let TdInnerDiv = styled.div`
                display : flex;
                flex-direction : column;
                Xborder : 1px solid yellow;
                margin: 10px 5px;
    : hover {
                    Xborder : 1px solid ${props => props.theme.bg}; 
                border : red;   
            }
        `;

export default FinanceTableRow;


