import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';

import { createCategory } from '../../actions/categories';

class CategoryModal extends Component {

    // submiting form values
    _submit = (values) => {
        const { reloadItems } = this.props;
        this.props.createCategory(values, () => {
            for (const field in this.refs) {
                this.refs[field].value = '';
            }
            document.querySelector('#close').click();
            reloadItems();
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

    // method to render form in the modal
    renderForm() {
        return (
            <div>
                <form id="catForm" onSubmit={ this._onhandleSubmit }>
                    <div className="form-group row">
                        <label for="name" className="col-sm-3 col-form-label" name="name">Name</label>
                        <div className="col-sm-9">
                            <input ref="name" type="text" className="form-control" id="name" placeholder="Category name" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="description" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                            <textarea ref="description" className="form-control" id="description" name="description"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Create New Category</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        { this.renderForm() }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-success" form="catForm">Save</button>
                    </div>
                    </div>
                </div>
                </div>
                <Notifications />
            </div>
        );
    }
}

export default connect(null, { createCategory })(CategoryModal);