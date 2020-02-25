import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import recipeListImg from '../../img/recipe_list_image.jpg'

import { fetchRecipes } from '../../actions/recipes';

export class RecipesList extends Component {

    componentDidMount() {
        this.props.fetchRecipes();
    }

    onInputChange = (event) => {
        const { value } = event.target
        this.props.fetchRecipes(value);
    }

    getPaginatedItems = (e) => {
        e.preventDefault();
        const value='';
        this.props.fetchRecipes(value, e.target.dataset.page);
    }

    renderPagination = () => {
        const { pagination } = this.props;
        if(!pagination){
            return (
                <div>Loading pagination...</div>
            );
        }

        if(pagination.total_count === 0) {
            return (
                <div className="alert alert-warning">
                    No recipes found that match this search term!
                </div>
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
                    You do not have recipes yet, first add categories and then recipes
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
                            <p className="card-text">{ recipe.description }</p>
                            <Link to={`/categories/${recipe.cat_id}/recipes/${recipe.id}`} className="btn btn-primary">View More</Link>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3 col-md-6">
                    <input 
                        type="text" 
                        className="form-control"  
                        onChange = { this.onInputChange }
                        placeholder="Search Recipe" 
                        aria-label="Recipe" 
                        aria-describedby="basic-addon2" 
                    />
                    {/* <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-search"></i> Search</span>
                    </div> */}
                </div>
                <div className="row">
                    { this.renderRecipes() }
                </div><br />

                {/* pagination */}
                <nav aria-label="...">
                    { this.renderPagination() }
                </nav>
                <Notifications />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes.recipes,
        pagination: state.recipes.recipePagination 
    }
}

export default connect(mapStateToProps, { fetchRecipes })(RecipesList);