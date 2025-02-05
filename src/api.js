import axios from 'axios';

const API_URL = 'https://gl-interview.azurewebsites.net';

export const createUser = async (userData) => {
    return await axios.post(`${API_URL}/users`, {username: userData.name });
};

export const createLoan = async (loanData) => {
    return await axios.post(`${API_URL}/loans`, loanData);
};

export const fetchUserLoans = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/loans`);
};

export const fetchLoanSchedule = async (loanId) => {
    return await axios.get(`${API_URL}/loans/${loanId}`);
};

export const fetchLoanSummary = async (loanId, month) => {
    return await axios.get(`${API_URL}/loans/${loanId}/month/${month}`);
};

export const shareLoan = async (loanId, shareData) => {
    return await axios.post(`${API_URL}/loans/${loanId}/share`, shareData);
};