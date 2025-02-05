import React, { useState } from 'react';
import { createUser } from '../api';
import { TextField, Button } from '@mui/material';

const UserForm = ({ onUserCreated }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser({ name });
            onUserCreated();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button type="submit">Create User</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default UserForm;