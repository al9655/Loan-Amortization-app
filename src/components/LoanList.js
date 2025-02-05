import React, { useEffect, useState } from 'react';
import { fetchUserLoans, createLoan, updateLoan } from '../api';
import LoanForm from './LoanForm';
import AmortizationSchedule from './AmortizationSchedule';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const LoanList = ({ userId }) => {
    const [loans, setLoans] = useState([]);
    const [showLoanForm, setShowLoanForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [currentLoan, setCurrentLoan] = useState({ id: '', amount: '', apr: '', term: '' });
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

    const handleLoanUpdated = async (e) => {
        e.preventDefault();
        const updatedLoanData = {
            amount: parseFloat(currentLoan.amount),
            apr: parseFloat(currentLoan.apr),
            term: parseInt(currentLoan.term),
            owner_id: userId
        };

        try {
            await updateLoan(currentLoan.id, updatedLoanData);
            setMessage('Loan updated successfully');
            setError(null);
            setShowEditForm(false);
            const response = await fetchUserLoans(userId);
            setLoans(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'An error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.map(err => err.msg).join(', ') : errorMessage);
            console.error('Error updating loan:', error.response?.data || error.message);
        }
    };

    const openEditForm = (loan) => {
        setCurrentLoan(loan);
        setShowEditForm(true);
    };

    const openSchedule = (loan) => {
        setCurrentLoan(loan);
        setShowSchedule(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentLoan({ ...currentLoan, [name]: value });
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
                        <p>Term: {loan.term} month(s)</p>
                        <p>Status: {loan.status}</p>
                        <Button onClick={() => openEditForm(loan)}>Edit Loan</Button>
                        <Button onClick={() => openSchedule(loan)}>View Schedule</Button>
                    </li>
                ))}
            </ul>
            {showEditForm && (
                <Dialog open={showEditForm} onClose={() => setShowEditForm(false)}>
                    <DialogTitle>Edit Loan</DialogTitle>
                    <form onSubmit={handleLoanUpdated}>
                        <DialogContent>
                            <TextField
                                label="Amount"
                                name="amount"
                                value={currentLoan.amount}
                                onChange={handleEditChange}
                                required
                            />
                            <TextField
                                label="APR"
                                name="apr"
                                value={currentLoan.apr}
                                onChange={handleEditChange}
                                required
                            />
                            <TextField
                                label="Term"
                                name="term"
                                value={currentLoan.term}
                                onChange={handleEditChange}
                                required
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowEditForm(false)}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            )}
            {showSchedule && (
                <Dialog open={showSchedule} onClose={() => setShowSchedule(false)}>
                    <DialogTitle>Amortization Schedule</DialogTitle>
                    <DialogContent>
                        <AmortizationSchedule loanId={currentLoan.id} userId={userId} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowSchedule(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default LoanList;