import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLogin } from '../utils/helper';
const Private = (props) => {
    const { component: Component, ...rest } = props;

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route
            {...rest}
            render={(matchProps) =>
                isLogin() ? (
                    <Component {...matchProps} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

Private.propTypes = {
    component: PropTypes.any.isRequired,
    path: PropTypes.string,
};

export default Private;
