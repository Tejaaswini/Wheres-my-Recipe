import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';

import { deleteRecipe } from '../../actions/recipes'

class DeleteRecipeModal extends Component {

    // method to handle delete of recipe
    handleDelete = () => {
        const { recipe, redirect } = this.props;
        this.props.deleteRecipe(recipe.cat_id, recipe.id, () => {
            document.querySelector('#close').click();
            redirect();
        });
    }

    render () {
        return (
            <div>
                <div className="modal fade" id="deleteRecipe" tabindex="-1" role="dialog" aria-labelledby="deleteRecipeTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="recipeModalLongTitle">Delet Recipe</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-danger">Are you sure you want to delete this recipe?</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button onClick={ this.handleDelete } type="submit" className="btn btn-danger" form="recipeForm">Delete</button>
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

export default connect(mapStateToProps, { deleteRecipe })(DeleteRecipeModal);