import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../components/Home';

class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact={ true } path="/" component={ Home } />
            </Switch>
        );
    }
}

export default AppRoutes;
