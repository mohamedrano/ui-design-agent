import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header>
                <h1>UI Design Agent</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} UI Design Agent. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;