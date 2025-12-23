import React, { useState } from 'react';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) {
            setErrors('Username is required');
            return;
        }
        if (!email) {
            setErrors('Email is required');
            return;
        }
        if (!password) {
            setErrors('Password is required');
            return;
        }
        
        setErrors('');
        console.log('Form submitted:', { username, email, password });
        // Reset form or further actions
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {errors && <p style={{color: 'red'}}>{errors}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
