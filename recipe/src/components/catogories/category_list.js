import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import CategoryModal from '../../components/catogories/category_modal';
import { fetchCategories } from '../../actions/categories';

export class CategoriesList extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }


    renderCategories() {
        const { categories } = this.props;
        if (!categories) {
            return (
                <div>Loading...</div>
            );
        }
        
        //using lodash map to traverse through the category object
        return _.map(categories, category => {
            return (
                <li className="list-group-item" key={ category.id }>
                   <Link to={`/categories/${category.id}`}>{  category.name }</Link>
                </li>
            );
        });
    }

    getPaginatedItems = (e) => {
        e.preventDefault();
        this.props.fetchCategories(e.target.dataset.page);
    }
    
    reloadCategories = () => {
        this.props.fetchCategories();
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
            <ul class="pagination">
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
                <ul className="list-group">
                    { this.renderCategories() }
                </ul><br />
                {/* pagination */}
                <nav aria-label="...">
                    { this.renderPagination() }
                </nav>
                <CategoryModal reloadItems = { this.reloadCategories }/>
                <Notifications />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        categories: state.categories.categories,
        pagination: state.categories.categoryPagination
    }
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);