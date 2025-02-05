import React, { useState } from 'react';
import { createUser, fetchUsers } from '../api';
import { TextField, Button } from '@mui/material';

const UserForm = ({ onUserCreated }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const users = await fetchUsers();
            const existingUser = users.find(user => user.username === name);
    
            if (existingUser) {
                setMessage('User signed in successfully');
                setError(null);
                onUserCreated(existingUser.id);
            } else {
                const newUser = await createUser({ name });
                setMessage('User created successfully');
                setError(null);
                onUserCreated(newUser.data.id);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'An error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.map(err => err.msg).join(', ') : errorMessage);
            setMessage(null);
            console.error('Error creating user:', err.response?.data || err.message);
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
        if (error) {
            setError(null);
        }
        if (message) {
            setMessage(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="User Name"
                value={name}
                onChange={handleChange}
                required
            />
            <Button type="submit">Sign In</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
    );
};

export default UserForm;