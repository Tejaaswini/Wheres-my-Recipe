import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';

import { fetchRecipe } from '../../actions/recipes';
import RecipeEditModal from './recipe_edit_modal';
import DeleteRecipeModal from './delete_recipe_modal';
import recipeListImg from '../../img/recipe_detail.png'

export class RecipeDetail extends Component {
    componentDidMount() {
        this.loadItem();
    }

    loadItem = () => {
        const { cat_id, recipe_id } = this.props.match.params;
        this.props.fetchRecipe(cat_id, recipe_id);
    }

    redirectTo = () => {
        const { cat_id } = this.props.match.params;
        this.props.history.push(`/categories/${cat_id}`)
    }

    renderItems(items) {
        return _.map(_.split(items, '\n'), item => {
            return (
                <li>
                    <i className="fa fa-plus-circle"></i> { item }
                </li>
            );
        });
    }

    render() {
        const { recipe } = this.props;
        const imgSrc = recipeListImg;
        if (!recipe){
            return (
                <div>Loading...</div>
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <img className="card-img-top" src={ imgSrc } />
                            <div className="card-body">
                                <h5 className="card-title">
                                    { recipe.name } in category {'  '}   
                                    <small><a href={`/categories/${recipe.cat_id}`}>{ recipe.cat_name }</a></small>
                                </h5>
                                <p className="card-text">
                                    { recipe.description }
                                </p>
                            </div>
                        </div><br />

                        <button className="btn btn-danger pull-right" title="Delete Recipe" data-toggle="modal" data-target="#deleteRecipe">
                            <i className="fa fa-trash-o fa-fw"></i> 
                        </button>                        
                        <button className="btn btn-info" data-toggle="modal" data-target="#recipeModal">
                            <i className="fa fa-edit fa-fw"></i> Edit Recipe</button>
                        <br />
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5>Ingredients</h5>
                        <hr />
                        <ul class="list-unstyled">
                            { this.renderItems(recipe.ingredients) }
                        </ul>
                    </div>

                    <div className="col-6">
                        <h5>Directions/Steps</h5>
                        <hr />
                        <ul class="list-unstyled">
                            { this.renderItems(recipe.directions) }
                        </ul>
                    </div>
                </div>
                <div>
                    <RecipeEditModal reload = { this.loadItem }/>
                    <DeleteRecipeModal redirect = { this.redirectTo } />
                    <Notifications />
                </div>

                <hr className="featurette-divider" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        recipe: state.recipe.recipe_item
    };
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeDetail);
