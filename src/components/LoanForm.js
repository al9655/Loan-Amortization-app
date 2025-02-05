import React, { useState } from 'react';
import { createLoan } from '../api';
import { TextField, Button } from '@mui/material';

const LoanForm = ({ onLoanCreated }) => {
    const [principal, setPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [term, setTerm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loanData = { principal, interestRate, term };
        await createLoan(loanData);
        onLoanCreated();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Principal"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                required
            />
            <TextField
                label="Interest Rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                required
            />
            <TextField
                label="Term (in months)"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
            />
            <Button type="submit">Create Loan</Button>
        </form>
    );
};

export default LoanForm;
