import React, { useEffect, useState } from 'react';
import { fetchUserLoans, createLoan } from '../api';
import AmortizationSchedule from './AmortizationSchedule';
import UserForm from './UserForm';
import LoanForm from './LoanForm';
import { Button } from '@mui/material';

const LoanList = ({ userId }) => {
    const [loans, setLoans] = useState([]);
    const [showLoanForm, setShowLoanForm] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLoans = async () => {
            try {
                const response = await fetchUserLoans(userId);
                setLoans(response.data);
            } catch (error) {
                setError('Failed to fetch loans');
                console.error('Error fetching loans:', error.response?.data || error.message);
            }
        };
        getLoans();
    }, [userId]);

    const handleLoanCreated = async (loanData) => {
        try {
            await createLoan({ ...loanData, owner_id: userId });
            setMessage('Loan created successfully');
            setError(null);
            setShowLoanForm(false);
            const response = await fetchUserLoans(userId);
            setLoans(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'An error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.map(err => err.msg).join(', ') : errorMessage);
            console.error('Error creating loan:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Loan List</h1>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button onClick={() => setShowLoanForm(true)}>Create Loan</Button>
            {showLoanForm && <LoanForm onLoanCreated={handleLoanCreated} />}
            <ul>
                {loans.map((loan) => (
                    <li key={loan.id}>
                        <p>Amount: {loan.amount}</p>
                        <p>APR: {loan.apr}%</p>
                        <p>Term: {loan.term} years</p>
                        <p>Status: {loan.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanList;