import React from 'react';
import StrataNavbar from './StrataNavbar';
import './AppLayout.css';

const AppLayout = ({ children }) => {
    return (
        <div className="app-layout">
            <StrataNavbar />
            <div className="app-content">
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
