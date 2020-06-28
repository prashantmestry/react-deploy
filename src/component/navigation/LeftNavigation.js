import React from 'react';
import { menu_icon } from '../../images';
import { Link } from 'react-router-dom';
import './LeftNavigation.css';

const LeftNavigation = (props) => {
    return (
        <>
            <input type="checkbox" id="check" />
            <label htmlFor="check">
                {/* <i className="fas " id="btn"> */}
                <span id="btn">
                    <img src={menu_icon} alt='menu' style={{ background: 'orange', width: '15px' }} />
                </span>
                {/* </i> */}
                <i className="fas " id="cancel">X</i>
            </label>

            <div className='sidebar'>
                <header>My App</header>
                <ul>
                    <li><Link to='/'  ><span><i className="fas">D</i>Dashbord</span></Link></li>
                    {/* <li><Link to='/'  ><span><i className="fas fa-adjust"></i>Dashbord</span></Link></li> */}
                    <li><Link to='/about'  ><span><i className="fas">A</i>About</span></Link></li>
                    <li><Link to='/shop'  ><span><i className="fas ">S</i>Shop</span></Link></li>
                    <li><Link to='/career'  ><span><i className="fab ">C</i>Career</span></Link></li>
                    <li><Link to='/contact'  ><span><i className="fas ">C</i>Contact</span></Link></li>
                    <li><Link to='/homefun'  ><span><i className="fas ">H</i>Home Fun</span></Link></li>
                </ul>
            </div>
        </>
    )
}

export default LeftNavigation

