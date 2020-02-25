import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import CarouselComponent from '../universal/carousel';
import { signInAction } from '../../actions/index';
import { activateLoading } from '../../actions/loaders';
import { Loading } from '../universal/loader';

class Signin extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const isValid = touched && error ? false : '';
        return (
            <FormGroup>
                <Label htmlFor={ field.htmlfor }>{ field.label }</Label>
                <Input 
                    type={ field.type }
                    id={ field.id }
                    { ...field.input }
                    valid={ isValid }
                />
                <FormFeedback>{ touched ? error : '' }</FormFeedback>
            </FormGroup>
        );
    }

    onSubmitForm = (values, dispatch) => {
        this.props.signInAction(values, this.props.history);
        dispatch(activateLoading());  
    }

    errorMessage = ()=> {
        if (this.props.errorMessage) {
            return (
                <div className="info-red">
                    { this.props.errorMessage }
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, loader } = this.props;
        console.log("Loader: ", loader);
        return (
            <div>
                <CarouselComponent />
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            { this.errorMessage }
                            <h3>SIGN IN</h3>
                            <hr />
                            <Form onSubmit={ handleSubmit(this.onSubmitForm) }>
                                <Field 
                                    label="Email"
                                    name="email"
                                    htmlfor="email"
                                    id="email"
                                    type="email"
                                    component={ this.renderField }
                                />
                                <Field 
                                    label="Password"
                                    name="password"
                                    htmlfor="password"
                                    type="password"
                                    id="password"
                                    component={ this.renderField }
                                />
                                { loader ? <Loading /> :
                                    <Button type="submit" color="primary">Sign in</Button>
                                }
                            </Form>
                            <Link to="/signup">DON'T HAVE AN ACCOUNT? SIGN UP <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                    <hr className="featurette-divider" />
                </div>
                
                <Notifications />
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.email){
        errors.email = 'Email is required!';
    }

    if (!values.password) {
        errors.password = 'Enter your password please!'
    }

    return errors
}

const mapStateToProps = (state) => {
    return { 
        errorMessage: state.auth.error,
        loader: state.loader.isLoading
    };
}

const reduxFormSignin = reduxForm({
    validate, 
    form: 'Signin'
})(Signin);

export default connect(mapStateToProps, { signInAction })(reduxFormSignin);