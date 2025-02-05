import React, { useEffect, useState } from 'react';
import { fetchLoanSchedule } from '../api';

const AmortizationSchedule = ({ loanId }) => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const getSchedule = async () => {
            const response = await fetchLoanSchedule(loanId);
            setSchedule(response.data);
        };
        getSchedule();
    }, [loanId]);

    return (
        <div>
            <h4>Amortization Schedule</h4>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((payment) => (
                        <tr key={payment.month}>
                            <td>{payment.month}</td>
                            <td>{payment.payment}</td>
                            <td>{payment.principal}</td>
                            <td>{payment.interest}</td>
                            <td>{payment.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AmortizationSchedule;
