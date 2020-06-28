import React, { useEffect, useState } from 'react';
import GeneralTable from '../table/generaltable/GeneralTable';
import WithTableWrapper from './WithTableWrapper';
import DataLoader from '../common/DataLoader';
import ErrorPage from '../common/ErrorPage';
import styled from 'styled-components';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';


const RatioTab = (props) => {

    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        setHeaderData(props.headerData);
        setBodyData(props.bodyData);
        setLoading(props.loading);
        setError(props.error);

    }, [props]);


    return (
        <div>

            <CompanyName>
                <h3>Axis Bank</h3>
            </CompanyName>
            <div style={{ border: '1px solid orange', padding: '5px' , margin : '10px' , borderRadius :'5px' }}>
                <InfoSection>
                    <div className='tin-1'>
                        <div className='att'>MHDC :</div>
                        <div>00-8349-8299</div>
                    </div>
                    <div className='tin-1'>
                        <div className='att'>ISIN :</div>
                        <div>00-8349-8299</div>
                    </div>
                    <div className='tin-1'>
                        <div className='att'>MHDC :</div>
                        <div>00-8349-8299</div>
                    </div>
                    <div className='tin-1'>
                        <div className='att'>ISIN :</div>
                        <div>00-8349-8299</div>
                    </div>
                </InfoSection>
                <InfoSection>
                    <div className='tin-1'>
                        <div className='att'>MHDC :</div>
                        <div>00-8349-8299</div>
                    </div>
                    <div className='tin-1'>
                        <div className='att'>ISIN :</div>
                        <div>00-8349-8299</div>
                    </div>
                    <div className='tin-1'>
                        <div className='att'>MHDC :</div>
                        <div>00-8349-8299</div>
                    </div>
                    <div className='tin-1'>
                        <div className='att'>ISIN :</div>
                        <div>00-8349-8299</div>
                    </div>
                </InfoSection>
            </div>

            {
                loading &&
                <DataLoader message='Ratio Loading...' />
            }

            {
                !loading && error &&
                <ErrorPage error={error} />
            }

            {
                (!loading && !error && headerData.length > 0 && bodyData.length > 0) &&
                <GeneralTable
                    _headerData={headerData}
                    _bodyData={bodyData}
                    _height='500px'
                    _type='ratio_table'
                    setting={
                        {
                            sorting: true,
                            toggle_column: true,
                            search_column: true
                        }}
                    {...props}
                />
            }

        </div >
    )
}

let CompanyName = styled.div`

    width: 98%;       
    Xborder-bottom :1px solid orange;
    margin : 0 auto;
    h3{
        color : orange;
        margin : 5px 0;
        Xpadding:10px; 
        text-align: center;
        font-size:25px;
    }

`;

let InfoSection = styled.div`
    display : flex;
    align-items : center;
    justify-content :space-around;
    padding : 7px;    
    margin : 5px 0;
    color : #fff;
    
    .tin-1{        
        font-size:16px;
        display : flex;
        flex-direction : column;
        .att{
            color : orange;
            font-size:18px;
            letter-spacing:0.4px;
        }
    }    
`;

const mapStateToProps = (state) => {
    let { loading, error, ratioData } = state.ratio;
    return {
        loading, error, ratioData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRatioData: (obj) => dispatch(actions.getRatioData(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithTableWrapper(RatioTab)); 
