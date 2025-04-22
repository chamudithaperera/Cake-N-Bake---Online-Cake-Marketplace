import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ isAddmin }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to={isAddmin ? '/admin/restaurants' : '/'} className="logo-link">
                        <div className="logo-container">
                            <h1 className="logo-text">
                                {!isAddmin ? (
                                    <>Cake <span className="logo-accent">N</span> Bake</>
                                ) : (
                                    "Cake N Bake Admin"
                                )}
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

