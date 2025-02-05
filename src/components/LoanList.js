import React, { useEffect, useState } from 'react';
import { fetchUserLoans } from '../api';
import AmortizationSchedule from './AmortizationSchedule';

const LoanList = ({ userId }) => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const getLoans = async () => {
            const response = await fetchUserLoans(userId);
            setLoans(response.data);
        };
        getLoans();
    }, [userId]);

    return (
        <div>
            <h2>Your Loans</h2>
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
