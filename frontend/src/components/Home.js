import React, { useEffect } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = ({ showAlert }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if no auth token is found in localStorage
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {/* Render Notes only after token check */}
            <Notes showAlert={showAlert} />
        </div>
    );
};

export default Home;