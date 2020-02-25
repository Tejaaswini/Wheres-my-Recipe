import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import CategoriesList from '../../components/catogories/category_list';
import RecipesList from '../../components/recipes/recipe_list';

class Dashboard extends Component {

    render() {
        const { first_name, last_name } = this.props.user ? this.props.user: '';
        return (
            <div>
                <div className="container">
                    <h2><i className="fa fa-user fa-fw" aria-hidden="true"></i> {first_name} { last_name }</h2>
                    <hr />

                    <div className="row">
                        <div className="col-md-8">
                            <h4>Recipes</h4>
                            <hr />
                            <RecipesList />
                        </div>
                        <div className="col-md-4">
                            <h4>Categories 
                                <small>
                                    <Link to="#" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-plus-circle fa-fw" aria-hidden="true"></i>Add Category</Link>
                                </small>
                            </h4>
                            <hr />
                            <CategoriesList { ...this.props }/>
                        </div>
                    </div>

                    <hr className="featurette-divider" />
                </div>
                <Notifications />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        authenticated: state.auth.authenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(Dashboard);