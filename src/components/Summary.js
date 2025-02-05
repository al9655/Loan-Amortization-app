import React, { useEffect, useState } from 'react';
import { fetchLoanSummary } from '../api';

const Summary = ({ loanId }) => {
    const [summary, setSummary] = useState({});

    useEffect(() => {
        const getSummary = async () => {
            const response = await fetchLoanSummary(loanId, new Date().getMonth() + 1);
            setSummary(response.data);
        };
        getSummary();
    }, [loanId]);

    return (
        <div>
            <h4>Loan Summary</h4>
            <p>Remaining Balance: {summary.remainingBalance}</p>
            <p>Total Principal Paid: {summary.totalPrincipalPaid}</p>
            <p>Total Interest Paid: {summary.totalInterestPaid}</p>
        </div>
    );
};

export default Summary;
