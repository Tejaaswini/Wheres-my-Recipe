import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Notifications from 'react-notify-toast';
import recipeListImg from '../../img/recipe_img.jpg'

import RecipeModal from '../recipes/recipe_modal';
import { fetchCategoryRecipes } from '../../actions/recipes';

class CategoryRecipes extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchCategoryRecipes(id);
    }

    reloadRecipes = () => {
        const { id } = this.props.match.params;
        this.props.fetchCategoryRecipes(id);
    }

    renderRecipes() {
        const { recipes } = this.props;
        if (!recipes) {
            return (
                <div>Loading...</div>
            );
        }

        if(_.size(recipes) === 0) {
            return (
                <div className="alert alert-info">
                    Category has no recipes in it yet. Click <strong>Add Recipe</strong> to add recipes
                </div>
            );
        }

        //using lodash map to traverse through the category object
        return _.map(recipes, recipe => {
            const imgSrc = recipeListImg;
            return (
                <div className="col-md-6" key={ recipe.id }>
                    <div className="card">
                        <img className="card-img-top" src={ imgSrc } />
                        <div className="card-body">
                            <h5 className="card-title">{ recipe.name }</h5>
                            <p className="card-text">
                                { recipe.description }
                            </p>
                            <Link to={`/categories/${recipe.cat_id}/recipes/${recipe.id}`} className="btn btn-primary">View More</Link>
                        </div>
                    </div>
                </div>
            );
        });
    }

    getPaginatedItems = (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        this.props.fetchCategoryRecipes(id, e.target.dataset.page);
    }

    renderPagination = () => {
        const { pagination } = this.props;
        if(!pagination){
            return (
                <div>Loading pagination...</div>
            );
        }
        const prevClass = `${pagination.previous_page ? 'page-item' : 'page-item disabled'}`;
        const nextClass = `${pagination.next_page ? 'page-item' : 'page-item disabled'}`;
        return (
            <ul class="pagination justify-content-center">
                <li className={ prevClass }>
                    <a 
                        className="page-link" href="#" tabindex="-1" 
                        onClick = { this.getPaginatedItems } 
                        data-page={ pagination.previous_page }>Previous
                    </a>
                </li>
                <li className='page-item'>
                    <a className="page-link" href="#">
                        Page { pagination.current_page } of { pagination.pages }
                    </a>
                </li>
                <li className={ nextClass }>
                    <a 
                        className="page-link" href="#" 
                        onClick = { this.getPaginatedItems } 
                        data-page={ pagination.next_page }>Next
                    </a>
                </li>
            </ul>
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    { this.renderRecipes() }
                </div><br />

                {/* pagination */}
                <nav aria-label="...">
                    { this.renderPagination() }
                </nav>

                <div>
                    <RecipeModal reloadItems = { this.reloadRecipes }/>
                </div>
                <Notifications />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.category.category_recipes,
        pagination: state.category.recipePagination
    }
}

export default withRouter(connect(mapStateToProps, { fetchCategoryRecipes })(CategoryRecipes));