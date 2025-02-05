import React, { useEffect, useState } from 'react';
import { fetchUserLoans, createLoan } from '../api';
import AmortizationSchedule from './AmortizationSchedule';
import LoanForm from './LoanForm';
import { Button } from '@mui/material';

const LoanList = ({ userId }) => {
    const [loans, setLoans] = useState([]);
    const [showLoanForm, setShowLoanForm] = useState(false);

    useEffect(() => {
        const getLoans = async () => {
            const response = await fetchUserLoans(userId);
            setLoans(response.data);
        };
        getLoans();
    }, [userId]);

    const handleLoanCreated = async (loanData) => {
        const newLoan = await createLoan({ ...loanData, owner_id: userId });
        setLoans([...loans, newLoan.data]);
        setShowLoanForm(false);
    };

    return (
        <div>
            <h2>Your Loans</h2>
            <Button onClick={() => setShowLoanForm(!showLoanForm)}>
                {showLoanForm ? 'Cancel' : 'Create Loan'}
            </Button>
            {showLoanForm && <LoanForm onLoanCreated={handleLoanCreated} />}
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