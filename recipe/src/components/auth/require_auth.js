import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* checking for protected routes and components
   redirects to signin once not authenticated
*/ 
export default (ComposedComponent) => {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }
        
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/signin');
            }
        }

        PropTypes = {
            router: PropTypes.object,
        }

        render() {
            return (<ComposedComponent { ...this.props } />);
        }
    }

    const mapStateToProps = (state) => {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
}