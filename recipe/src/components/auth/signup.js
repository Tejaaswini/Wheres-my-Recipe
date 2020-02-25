import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import CarouselComponent from '../universal/carousel';
import { signUpAction } from '../../actions';

class Signup extends Component {

    // method for rendering form field on the component
    renderField(field) {
        //de-structuring from the field object
        const { meta: { touched, error } } = field;
        const isValid = touched && error ? false : true;
        return (
            <FormGroup>
                <Label htmlFor={ field.htmlfor }>{ field.label }</Label>
                <Input 
                    type={ field.type }
                    id={ field.id }
                    { ...field.input }
                    valid = { isValid }
                />
                <FormFeedback>{ touched ? error : '' }</FormFeedback>
            </FormGroup>
        );
    }

    // method callback on form submission
    onSubmitForm = (values) => {
        this.props.signUpAction(values, () => {
            this.props.history.push('/signin');
        });

    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <CarouselComponent />
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <h3>CREATE ACCOUNT</h3>
                            <hr />
                            <Form onSubmit={ handleSubmit(this.onSubmitForm.bind(this)) }>
                                <Field 
                                    label="Firstname"
                                    name="first_name"
                                    htmlfor="firstname"
                                    id="firstname"
                                    type="text"
                                    component={ this.renderField }
                                />
                                <Field 
                                    label="Lastname"
                                    name="last_name"
                                    htmlfor="lastname"
                                    id="lastname"
                                    type="text"
                                    component={ this.renderField }
                                />
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
                                <Button type="submit" color="primary">Sign up</Button>
                            </Form>
                            <Link to="/signin">ALREADY A MEMBER! SIGN IN <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                    <hr className="featurette-divider" />
                </div>
                {/* // <!-- container --> */}

                <Notifications />
            </div>
        );
    }
}

// validate input form field from values
const validate = (values) => {
    const errors = {};
    if (!values.email){
        errors.email = 'Email is required!';
    }

    if (!values.password) {
        errors.password = 'Enter your password please!'
    }

    if (!values.first_name) {
        errors.first_name = 'Field is required!'
    }

    if (!values.last_name) {
        errors.last_name = 'Field is required!'
    }

    return errors
}

export default reduxForm({
    validate,
    form: 'Signup'
})(
    connect(null, { signUpAction })(Signup)
);