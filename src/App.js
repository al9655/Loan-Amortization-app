import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import { Container } from '@mui/material';

const App = () => {
  const [userId, setUserId] = useState(null);

  const handleUserCreated = (id) => {
    setUserId(id);
  };

  return (
    <Router>
      <Container>
        <h1>Loan Amortization App</h1>
        <Routes>
          <Route path="/" element={<UserForm onUserCreated={handleUserCreated} />} />
          <Route path="/loanlist/:userId" element={<LoanList userId={userId} />} />
        </Routes>
        {userId && (
          <>
            <LoanList userId={userId} />
          </>
        )}
      </Container>
    </Router>
  );
};

export default App;