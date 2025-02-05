import React, { useEffect, useState } from 'react';
import { fetchLoanSchedule } from '../api';

const AmortizationSchedule = ({ loanId, userId }) => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const response = await fetchLoanSchedule(loanId, userId);
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching loan schedule:', error.response?.data || error.message);
            }
        };
        getSchedule();
    }, [loanId, userId]);

    const roundToHundredth = (num) => Math.round(num * 100) / 100;

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
                            <td>{roundToHundredth(payment.total_payment)}</td>
                            <td>{roundToHundredth(payment.principal_payment)}</td>
                            <td>{roundToHundredth(payment.interest_payment)}</td>
                            <td>{roundToHundredth(payment.close_balance)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AmortizationSchedule;
