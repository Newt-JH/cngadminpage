import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: 'white', height: '1000px', color: 'black'  }}>{children}</div>
    </div>
  );
};

export default Layout;
