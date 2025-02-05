import React, { useState } from 'react';
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
    <Container>
      <h1>Loan Amortization App</h1>
      {!userId ? (
        <UserForm onUserCreated={handleUserCreated} />
      ) : (
        <>
        <LoanForm onLoanCreated={() => {}} />
        <LoanList userId={userId} />
        </>
      )}
    </Container>
  );
};

export default App;
