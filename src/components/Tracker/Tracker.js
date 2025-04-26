
import React, { useContext, useEffect, useState } from 'react'
import '../../styles/Tracker.css'
import TrackerChart from './TrackerChart';
import { ExpenseContext } from '../../context/ExpenseContext';
import { BalanceContext } from '../../context/BalanceContext';
import AddExpenseModal from '../ReactModals/AddExpenseModal';
import AddBalanceModal from '../ReactModals/AddBalanceModal';



function Tracker() {
    const { expenses } = useContext(ExpenseContext);
    const { balance, setBalance } = useContext(BalanceContext);
    const [totalExpense, setTotalExpense] = useState(0)
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
    const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false)


    useEffect(() => {
        if (localStorage.getItem('balance')) {
            setBalance(Number(localStorage.getItem('balance')))
        } else {
            setBalance(5000)
        }

        let sum = 0
        expenses.forEach(item => sum = sum + Number(item.price))
        setTotalExpense(sum)
    }, [expenses, setBalance])

    const handleAddExpense = () => {
        setIsAddExpenseOpen(true)
    }

    const handleCloseAddExpenseModal = () => {
        setIsAddExpenseOpen(false)
    }

    const handleAddBalance = () => {
        setIsAddBalanceOpen(true)
    }

    const handleCloseAddBalanceModal = () => {
        setIsAddBalanceOpen(false)
    }


    return (
        <div className='Tracker'>
            <h1>Expense Tracker</h1>
            <div className='Tracker-inner'>
                <div className='Tracker-inner-2'>
                    <div className='balance'>
                        <p>Wallet Balance: <span>₹{balance - totalExpense}</span> </p>
                        <button onClick={() => handleAddBalance()}>+ Add Income</button>
                    </div>
                    <div className='expenses'>
                        <p>Expenses: <span>₹{totalExpense}</span></p>
                        <button onClick={() => handleAddExpense()}>+ Add Expense</button>
                    </div>
                </div>
                <TrackerChart />
            </div>
            <AddExpenseModal isOpen={isAddExpenseOpen} handleCloseModal={handleCloseAddExpenseModal} totalExpense={totalExpense} setTotalExpense={setTotalExpense} />

            <AddBalanceModal isOpen={isAddBalanceOpen} handleCloseModal={handleCloseAddBalanceModal} totalExpense={totalExpense} setTotalExpense={setTotalExpense} />
        </div>
    )
}



export default Tracker