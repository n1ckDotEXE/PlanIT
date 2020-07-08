import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLinks';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props => {
    const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);
    
    const openDrawerHandler = () => {
        setSideDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setSideDrawerIsOpen(false);
    };

    return (
        <React.Fragment>
            {sideDrawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={sideDrawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/"><span role="img" aria-label="sappling">🌿</span> PlanIt</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;