import React from 'react';
import '../styles.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="logo">Exploring Engineering</h1>
      </div>
      <ul className="nav-links">
        <li
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
        <li
          className={`nav-item ${activeTab === 'rebates' ? 'active' : ''}`}
          onClick={() => handleTabClick('rebates')}
        >
          <a href="#" className="nav-link">
            Activity
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
