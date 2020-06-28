import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LeftNavigation from './component/navigation/LeftNavigation';
import TopLinks from './component/navigation/TopLinks';
import Home from './component/Home';
import HomeFun from './component/HomeFun';
import About from './component/about/About';
import User from './component/user/User';
import Header from './component/common/header/Header';

// function roundNumber(num) {
//   return Math.round(num * 100) / 100;
// }

function App(props) {

  useEffect(() => {

    console.log('start coding ...');
    console.log('end coding ...');

  }, [])

  return (
    <div>
      <BrowserRouter>
        <LeftNavigation />
        <section style={{ border: '1px solid #fff' }}>
          <Header />
          {/* <TopLinks /> */}

          <Switch>
            <Route exact path='/' ><Home /></Route>
            <Route exact path='/about' ><About /></Route>
            <Route exact path='/shop' ><User /></Route>
            <Route exact path='/homefun' ><HomeFun /></Route>
          </Switch>

        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
