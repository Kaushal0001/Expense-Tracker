import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import '../../styles/AddExpenseModal.css';
import { ExpenseContext } from '../../context/ExpenseContext';
import { ExpenseRatioContext } from '../../context/ExpenseRatioContext';
import { v4 as uuidv4 } from 'uuid';
import { BalanceContext } from '../../context/BalanceContext';
import { useSnackbar } from 'notistack'

ReactModal.setAppElement('#root');

export default function AddExpenseModal({ isOpen, handleCloseModal, totalExpense, setTotalExpense }) {
  const [formData, setFormData] = useState({})
  //formData = {title, price, category, date}
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { expenseRatio, setExpenseRatio } = useContext(ExpenseRatioContext);
  const { balance } = useContext(BalanceContext);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    const expensesData = JSON.parse(localStorage.getItem('expenses')) || []
    setExpenses(expensesData)
    const expenseRatioData = JSON.parse(localStorage.getItem('expenseRatio')) || {}
    setExpenseRatio(expenseRatioData)
  }, [setExpenses, setExpenseRatio])

  const handleAddExpense = () => {
    let totalTrackerExpense = totalExpense + Number(formData.price)
    if (totalTrackerExpense > balance) {
      const key = enqueueSnackbar('Price cannot exceed Wallet Balance', {
        variant: 'warning',
        autoHideDuration: 3000,
        style: { cursor: 'pointer' },
        SnackbarProps: {
          onClick: () => closeSnackbar(key),
        },
      });
    } else {
      setTotalExpense(totalTrackerExpense)

      
      localStorage.setItem('expenses', JSON.stringify([...expenses, { ...formData, id: uuidv4() }]))
      setExpenses([...expenses, { ...formData, id: uuidv4() }])

      const price = expenseRatio[formData.category]?.price ? expenseRatio[formData.category].price + Number(formData.price) : Number(formData.price)
      const newExpenseRatio = { ...expenseRatio, [formData.category]: { price } }

      let totalPrice = 0
      Object.keys(newExpenseRatio).forEach((item) => {
        totalPrice = totalPrice + newExpenseRatio[item].price
      })

      Object.keys(newExpenseRatio).forEach((item) => {
        let ratio = Math.floor(newExpenseRatio[item].price / totalPrice * 100)
        newExpenseRatio[item].ratio = ratio
      })
      console.log(newExpenseRatio)

      localStorage.setItem('expenseRatio', JSON.stringify(newExpenseRatio))
      setExpenseRatio(newExpenseRatio)
    }

    handleCloseModal()
    setFormData({})
  }



  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      className='AddExpenseModal'
      overlayClassName='AddExpenseModalOverlay'

    >
      <div>
        <h1>Add Expenses</h1>
        <div className='grid'>
          <input type="text" placeholder='Title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <input type="text" placeholder='Price' onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          <div className='select-container'>
            <select name="category" id="category" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="Select Category" default>Select Category </option>
              <option value="Food" >Food </option>
              <option value="Entertainment">Entertainment </option> 
              <option value="Travel">Travel </option>
              <option value="Education">Others </option>
            </select>
          </div>

          <input type="text" placeholder='dd/mm/yy' onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <button className='AddExpense-button' onClick={handleAddExpense}>Add Expense</button>
          <div>

            <button className='cancel-button' onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      </div >

    </ReactModal >

  )
}
