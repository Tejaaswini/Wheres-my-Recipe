import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';

import { editRecipe } from '../../actions/recipes';

class RecipeEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.recipe.name }
    }

    handleInputChange = (event) => {
        this.setState({ value: event.target.value });
    }
    // submiting form values
    _submit = (values) => {
        const { recipe, reload } = this.props;
        this.props.editRecipe(values, recipe.cat_id, recipe.id, () => {
            document.querySelector('#close').click();
            reload();
        });
    }
    // handle form submition
    _onhandleSubmit = (event) => {
        event.preventDefault();
        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].value;
        }
        this._submit(formData);
    }

    renderModalForm() {
        const { recipe } = this.props;
        return (
            <div>
                <form id="recipeForm" onSubmit={ this._onhandleSubmit }>
                <div className="form-group row">
                    <label for="name" className="col-sm-3 col-form-label" name="name">Name</label>
                    <div className="col-sm-9">
                        <input ref="name" type="text" className="form-control" value={ this.state.value } id="name" onChange = { this.handleInputChange } />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="description" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-9">
                        <textarea ref="description" className="form-control" id="description" name="description">{ recipe.description }</textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="ingredients" className="col-sm-3 col-form-label">Ingredients</label>
                    <div className="col-sm-9">
                        <textarea ref="ingredients" className="form-control" id="ingredients" name="ingredients">{ recipe.ingredients }</textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="directions" className="col-sm-3 col-form-label">Directions</label>
                    <div className="col-sm-9">
                        <textarea ref="directions" className="form-control" id="directions" name="directions">{ recipe.directions }</textarea>
                    </div>
                </div>
            </form>
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
                            <h5 className="modal-title" id="recipeModalLongTitle">Edit Recipe</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            { this.renderModalForm() }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-info" form="recipeForm">Edit</button>
                        </div>
                        </div>
                    </div>
                </div>
                <Notifications />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { recipe: state.recipe.recipe_item };
}

export default connect(mapStateToProps, { editRecipe })(RecipeEditModal);
