import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import CategoryRecipes from '../recipes/category_recipes';
import { fetchCategory } from '../../actions/categories';
import recipeListImg from '../../img/recipe_detail.png'

class CategoryDetail extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchCategory(id);
    }

    render() {
        const { category } = this.props;
        const imgSrc = recipeListImg;
        if (!category){
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
                                    <Link to={`/categories/${category.id}`}>{  category.name }</Link>
                                </h5>
                                <p className="card-text">
                                    { category.description }
                                </p>
                            </div>
                        </div><br />
                        <button className="btn btn-primary" data-toggle="modal" data-target="#recipeModal"><i className="fa fa-plus fa-fw"></i> Add Recipe</button><br />
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <CategoryRecipes /> 
                </div>

                <Notifications />

                <hr className="featurette-divider" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { category: state.category.category_item };
}

export default connect(mapStateToProps, { fetchCategory })(CategoryDetail);
