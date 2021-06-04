import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLogin } from '../utils/helper';
const Public = (props) => {
    const { component: Component, restricted, ...rest } = props;

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route
            {...rest}
            render={(matchProps) =>
                isLogin() && restricted ? (
                    <Redirect to="/home" />
                ) : (
                    <Component {...matchProps} />
                )
            }
        />
    );
};

Public.propTypes = {
    restricted: PropTypes.bool.isRequired,
    component: PropTypes.any.isRequired,
    path: PropTypes.string.isRequired,
};

export default Public;
