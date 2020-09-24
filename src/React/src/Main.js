import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Character from './pages/Character';
import Superpower from './pages/Superpower';
import Organisation from './pages/Organisation';
import Sighting from './pages/Sightings';
import AboutUs from './pages/AboutUs';
import FAQs from './pages/FAQs';

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/character' component={Character}></Route>
            <Route exact path="/superpower" component={Superpower}></Route>
            <Route exact path="/organisation" component={Organisation}></Route>
            <Route exact path='/aboutus' component={AboutUs}></Route>
            <Route exact path='/faqs' component={FAQs}></Route>
            {/* <Route exact path="/location" component={Locations}></Route>*/}

            <Route exact path="/sighting" component={Sighting}></Route>
        </Switch>
    );
}

export default Main;