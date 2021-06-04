import React, { Suspense, lazy } from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import Public from './public';
import Private from './private';
import Loader from '../components/Loader/Loader';

import { LoginForm } from "../components/user/Login";
import { HomeComponent } from "../components/Home";
import { AddCustomer } from '../components/customer/AddCustomer'
import { GoogleCallbackComponent } from '../components/GoogleCallback'

const Routes = () => {
    return (
        <Suspense fallback={<Loader showLoader={true} />}>
            <Switch>
                <Route path="/" exact>
                    <Redirect to='/home' />
                </Route>
                <Public path="/login" component={LoginForm} restricted={true}/>
                <Private path="/add-customer" component={AddCustomer}/>
                <Private path="/home" component={HomeComponent} />
                <Private path="/callback" component={GoogleCallbackComponent} />
                <Route path="*" exact>
                    <Redirect to='/home' />
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
