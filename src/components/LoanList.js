import React, { useEffect, useState } from 'react';
import { fetchUserLoans, createLoan } from '../api';
import AmortizationSchedule from './AmortizationSchedule';
import LoanForm from './LoanForm';
import { Button } from '@mui/material';

const LoanList = ({ userId }) => {
    const [loans, setLoans] = useState([]);
    const [showLoanForm, setShowLoanForm] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLoans = async () => {
            const response = await fetchUserLoans(userId);
            setLoans(response.data);
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
            <h2>Your Loans</h2>
            <Button onClick={() => setShowLoanForm(!showLoanForm)}>
                {showLoanForm ? 'Cancel' : 'Create Loan'}
            </Button>
            {showLoanForm && <LoanForm onLoanCreated={handleLoanCreated} />}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loans.map((loan) => (
                <div key={loan.id}>
                    <h3>Loan ID: {loan.id}</h3>
                    <AmortizationSchedule loanId={loan.id} />
                </div>
            ))}
        </div>
    );
};

export default LoanList;