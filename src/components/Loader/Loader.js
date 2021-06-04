import React from 'react';
import './Loader.css';
import PropTypes from 'prop-types';

const Loader = (props) => {
    return (
        <React.Fragment>
            {props.showLoader ? (
                <div className="overlay">
                    <div className="overlay__inner">
                        <div className="overlay__content">
                            <span className="spinner"></span>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </React.Fragment>
    );
};

Loader.propTypes = {
    showLoader: PropTypes.bool.isRequired,
};

export default Loader;
