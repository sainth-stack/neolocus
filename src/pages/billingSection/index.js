import React, { useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import axios from 'axios';

const BillingSection = () => {
    const username = localStorage.getItem('username')
    const { userData, setUserData } = useUser();

    const getUserInfo = async () => {
        try {
            const formData = new FormData();
            formData.append('user', username);
            const response = await axios.post('http://3.132.248.171:4500/get_user_details', formData);
            setUserData(response?.data?.paymentinfo);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);
console.log(userData)
    const navigate = useNavigate()
    return (
        <div className="billing-container">
            <h1 className="billing-title">MY ACCOUNT</h1>
            <div className="billing-box">
                <div className="billing-info">
                    <p className='billing-header'>You are currently on a "{userData[1]} Plan"</p>
                    <p>You have {userData[2]} credits left</p>
                </div>
                <div className="billing-buttons">
                    <button className="upgrade-btn" onClick={() => navigate('/pricing')}>Upgrade your plan</button>
                    <button className="stop-btn">Stop your plan</button>
                </div>
            </div>
            <div className="design-prompt">
                <p>Are you ready to transform your space?</p>
                <button className="design-btn" onClick={() => navigate('/start-design')}>Start designing</button>
            </div>
        </div>
    );
};

export default BillingSection;
