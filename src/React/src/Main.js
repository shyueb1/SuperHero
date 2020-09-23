import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Character from './pages/Character';

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/character' component={Character}></Route>
            {/* <Route exact path="/superpower" component={Superpower}></Route>
            <Route exact path="/location" component={Locations}></Route>
            <Route exact path="/organisation" component={Organisation}></Route>
            <Route exact path="/sighting" component={Sighting}></Route> */}
        </Switch>
    );
}

export default Main;