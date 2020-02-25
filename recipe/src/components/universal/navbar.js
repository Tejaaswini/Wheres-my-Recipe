import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import { signOutAction } from '../../actions';

class NavbarComponent extends Component {
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { isOpen: false };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleClick(e) {
        e.preventDefault();
        //localStorage.removeItem('current_user');
        this.props.signOutAction(() => {
            this.props.history.push('/');
            window.location.reload();
        });
    }

    render() {
        const { authenticated } = this.props;
        const { email } = this.props.user ? this.props.user: '';
        let navigation;
        if (authenticated) { 
            navigation = (<Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/dashboard">
                    <i className="fa fa-tachometer fa-fw" aria-hidden="true"></i> DASHBOARD
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#">
                    <i className="fa fa-user fa-fw" aria-hidden="true"></i> { email }
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" onClick={ this.handleClick.bind(this) }>
                    <i className="fa fa-sign-out fa-fw" aria-hidden="true"></i> SIGNOUT
                </NavLink>
            </NavItem>
            </Nav>);
        }else {
            navigation = (<Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/signin">
                    <i className="fa fa-sign-in fa-fw" aria-hidden="true"></i> SIGNIN
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/signup">
                    <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> REGISTER
                </NavLink>
            </NavItem></Nav>);
        }
        return (
            <header>
                <Navbar color="dark" dark expand = "md">
                    <NavbarBrand href="/">
                        <li className="fa fa-home fa-fw" aria-hidden="true"></li> Where's My Recipe?
                    </NavbarBrand>
                    <NavbarToggler onClick={ this.toggle } />
                    <Collapse isOpen={ this.state.isOpen } navbar>   
                        { navigation }  
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        authenticated: state.auth.authenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, { signOutAction })(NavbarComponent);