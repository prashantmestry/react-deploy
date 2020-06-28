import React from 'react';
import { Link } from 'react-router-dom';
import './TopLinks.css';

const TopLinks = (props) => {
    return (
        <div className='top_links'>            
                <ul>
                    <li><Link to='/'  >Dashbord</Link></li>
                    <li><Link to='/about'  >About</Link></li>
                    <li><Link to='/shop'  >Shop</Link></li>
                    <li><Link to='/career'  >Career</Link></li>
                    <li><Link to='/contact'  >Contact</Link></li>
                </ul>            
        </div>
    )
}


export default TopLinks;

