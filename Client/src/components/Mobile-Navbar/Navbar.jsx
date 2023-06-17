import React, { useState } from 'react';
import './Navbar.css';
import Profile from "../../img/avator.jpg";


import { AiOutlineRetweet, AiOutlineHome } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { BiChat } from "react-icons/bi"
import { useSelector } from 'react-redux';
import TrendCard from '../TrendCard/TrendCard';
import FollowersCard from '../FollowersCard/FollowersCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const { user } = useSelector((state) => state?.AuthReducer?.authData); 
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
        <nav className="navbar">
            <ul className="nav-menu">
                <li
                    className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Home')}
                    >
                        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
                    <AiOutlineHome/>
                        </Link>
                </li>
                <li
                    className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => handleTabClick('users')}
                >
                    <FiUsers/>
                </li>
                <li
                    className={`nav-item ${activeTab === 'trending' ? 'active' : ''}`}
                    onClick={() => handleTabClick('trending')}
                >
                    <AiOutlineRetweet/>
                </li>
                <li
                    className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => handleTabClick('chat')}
                    >
                        <Link to="/chat" style={{ textDecoration: "none", color: "inherit" }}>
                            <BiChat />
                            </Link>
                </li>
                <li
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => handleTabClick('profile')}
                    >
                        <Link to={`/profile/${user?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        
                            <img className='prflPic' src={user?.profilePicture ? user?.profilePicture : Profile} alt="" />
                        </Link>        
                </li>
                
                
            </ul>
        </nav>
            {activeTab === 'trending' ?
                <div className="trending">

                    <TrendCard />
                </div>
                : null}
            {activeTab === 'users' ?
                <div className="trending">

                    <FollowersCard />
                </div>
                : null}
        </>
    );
};

export default Navbar;
