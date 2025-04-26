import { useState } from 'react';
import './styles/App.css';
import { ExpenseContext } from './context/ExpenseContext';
import { ExpenseRatioContext } from './context/ExpenseRatioContext';
import { BalanceContext } from './context/BalanceContext';
import { SnackbarProvider } from 'notistack'
import HomePage from './pages/HomePage';

function App() {
  const [expenseRatio, setExpenseRatio] = useState([])
  const [expenses, setExpenses] = useState([])
  const [balance, setBalance] = useState(null)

  console.log(window.innerWidth + 'px', window.innerHeight + 'px');


  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      maxSnack={1}
      preventDuplicate
    >
      <ExpenseRatioContext.Provider value={{ expenseRatio, setExpenseRatio }}>
        <ExpenseContext.Provider value={{ expenses, setExpenses }}>
          <BalanceContext.Provider value={{ balance, setBalance }}>
            <HomePage />

          </BalanceContext.Provider>
        </ExpenseContext.Provider>
      </ExpenseRatioContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
