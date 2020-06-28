import React, { useState } from 'react';
import PageTitle from '../common/PageTitle';
import './about.style.css';

const About = React.memo(() => {

    const [counter, setCounter] = useState(0);

    let increment = () => {
        setCounter(Math.floor(Math.random() * 3));
    }
    console.log('Parent render')
    return (

        <div style={{ border: '1px solid yellow', paddingTop: '20px' }}>

            <div className='flag-box'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
                <div>12</div>
            </div>


            {/* <div className='section-head'>
                <PageTitle>About  - {process.env.NODE_ENV}</PageTitle>
            </div>

            <div className='box-holder'>
                <div className='box-parent'>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                    <div className='box-child'></div>
                </div>
            </div> */}

        </div>
    )
});


// class About extends React.PureComponent {
//     state = {
//         counter: 0
//     }
//     increment = () => {
//         this.setState({
//             counter: Math.floor(Math.random() * 3)
//         })
//     }
//     render() {
//         console.log('Parent render');
//         return (
//             < div >
//                 <div>Count : {this.state.counter}</div>
//                 <button onClick={this.increment} >Increment</button>
//                 <InnerAbout value={this.state.counter} />
//             </div >
//         )
//     }
// }

export default About;

