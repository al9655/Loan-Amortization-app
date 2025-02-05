import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const LoanForm = ({ onLoanCreated }) => {
    const [amount, setAmount] = useState('');
    const [apr, setApr] = useState('');
    const [term, setTerm] = useState('');
    const [status] = useState('active');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loanAmount = parseFloat(amount);
        const loanApr = parseFloat(apr);
        const loanTerm = parseInt(term);

        if (isNaN(loanAmount) || loanAmount <= 0) {
            setError('Loan amount must be greater than zero');
            return;
        }

        if (isNaN(loanApr) || loanApr <= 0) {
            setError('APR must be greater than zero');
            return;
        }

        if (isNaN(loanTerm) || loanTerm <= 0) {
            setError('Term must be greater than zero');
            return;
        }

        setError(null);
        const loanData = {
            amount: loanAmount,
            apr: loanApr,
            term: loanTerm,
            status: status,
        };

        try {
            await onLoanCreated(loanData);
        } catch (err) {
            setError('Failed to create loan');
            console.error('Error creating loan:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <TextField
                label="APR"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                required
            />
            <TextField
                label="Term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
            />
            <Button type="submit">Create Loan</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LoanForm;