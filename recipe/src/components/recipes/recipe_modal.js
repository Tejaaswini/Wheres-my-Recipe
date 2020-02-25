import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import {Col, Form, FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';

import { createRecipe } from '../../actions/recipes';

class RecipeModal extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const isValid = touched && error ? false : '';
        return (
            <FormGroup row>
                <Label htmlFor={ field.htmlfor } md={3}>{ field.label }</Label>
                <Col md={9}>
                    <FormText color="muted">
                        { field.text }
                    </FormText>
                    <Input 
                        ref = { field.name }
                        type={ field.type }
                        id={ field.id }
                        { ...field.input }
                        valid = { isValid }
                    />
                    <FormFeedback>{ touched ? error : '' }</FormFeedback>
                </Col>
            </FormGroup>
        );
    }

    onSubmitForm = (values) => {
        const { category, reloadItems } = this.props;
        this.props.createRecipe(values, category.id, () => {
            document.querySelector('#close').click();
            reloadItems();
        });
    }

    renderModalForm() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={ handleSubmit(this.onSubmitForm.bind(this)) } id="recipeForm" name="recipeForm">
                    <Field 
                        label="Recipe name"
                        name="name"
                        htmlfor="recipe_name"
                        id="recipe_name"
                        type="text"
                        component={ this.renderField }
                    />
                    <Field 
                        label="Description"
                        name="description"
                        htmlfor="description"
                        id="description"
                        type="textarea"
                        component={ this.renderField }
                    />
                    <Field 
                        label="Ingredients"
                        name="ingredients"
                        htmlfor="ingredients"
                        id="iingredients"
                        type="textarea"
                        text="Type with space and each on new line."
                        component={ this.renderField }
                    />
                    <Field 
                        label="Directions"
                        name="directions"
                        htmlfor="directions"
                        id="directions"
                        type="textarea"
                        text="Type with space and each on new line."
                        component={ this.renderField }
                    />
                </Form>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="recipeModal" tabindex="-1" role="dialog" aria-labelledby="recipeModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="recipeModalLongTitle">Create New Recipe</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            { this.renderModalForm() }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-success" form="recipeForm">Save</button>
                        </div>
                        </div>
                    </div>
                </div>
                <Notifications />
            </div>
        );
    }
}

// validate input form field from values
const validate = (values) => {
    const errors = {};
    if (!values.recipe_name){
        errors.recipe_name = 'Name is required!';
    }

    if (!values.description) {
        errors.description = 'Type Description!'
    }

    if (!values.ingredients) {
        errors.ingredients = 'Recipe must have ingredients'
    }

    if (!values.directions) {
        errors.directions = 'Directions must be filled!'
    }

    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('RecipeForm'));


const mapStateToProps = (state) => {
    return { category: state.category.category_item };
}

const RecipeForm =  reduxForm({
    validate,
    form: 'RecipeForm',
    onSubmitSuccess: afterSubmit
})(
    connect(mapStateToProps, { createRecipe })(RecipeModal)
);

export default RecipeForm;