import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import '../../styles/AddExpenseModal.css';
import { ExpenseContext } from '../../context/ExpenseContext';
import { ExpenseRatioContext } from '../../context/ExpenseRatioContext';

ReactModal.setAppElement('#root');

export default function EditExpenseModal({ isOpen, handleCloseModal, id }) {
  const [formData, setFormData] = useState({})
  //formData = {title, price, category, date}
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { expenseRatio, setExpenseRatio } = useContext(ExpenseRatioContext);
  const [index, setIndex] = useState(null)


  useEffect(() => {
    const expensesData = JSON.parse(localStorage.getItem('expenses')) || []
    setExpenses(expensesData)


    const expenseRatioData = JSON.parse(localStorage.getItem('expenseRatio')) || {}
    setExpenseRatio(expenseRatioData)
  }, [setExpenses, setExpenseRatio, id])

  useEffect(() => {
    if (isOpen) {
      let i = expenses.findIndex(item => item.id === id)
      console.log(expenses)
      setFormData(expenses[i])
      setIndex(i)
    }
  }, [expenses, id, isOpen])



  const handleEditExpense = () => {

    // replace the category (remove old, update new)
    let expenseRatioCopy = { ...expenseRatio }
    let expense = expenses.filter(item => item.id === id)[0]
    let oldCategory = expense.category
    let oldPrice = expense.price
    let newCategory = formData.category
    let newPrice = formData.price

    //delete or reduce oldPrice from expenseRatio price in oldCategory
    let price = expenseRatioCopy[oldCategory].price - oldPrice
    if (price === 0) {
      delete expenseRatioCopy[oldCategory]
    } else {
      expenseRatioCopy = { ...expenseRatioCopy, [oldCategory]: { price } }
    }

    //add or increase new price in new category
    price = expenseRatioCopy[newCategory] ? expenseRatioCopy[newCategory].price + Number(newPrice) : Number(newPrice)
    expenseRatioCopy = { ...expenseRatioCopy, [newCategory]: { price } }

    // calculate ratios for new categories
    let totalPrice = 0
    Object.keys(expenseRatioCopy).forEach((item) => {
      totalPrice = totalPrice + expenseRatioCopy[item].price
    })

    Object.keys(expenseRatioCopy).forEach((item) => {
      let ratio = Math.floor(expenseRatioCopy[item].price / totalPrice * 100)
      expenseRatioCopy[item].ratio = ratio
    })
    console.log(expenseRatioCopy)
    localStorage.setItem('expenseRatio', JSON.stringify(expenseRatioCopy))
    setExpenseRatio(expenseRatioCopy)


    //replace from existing expenses
    let expensesCopy = [...expenses]
    let index = expensesCopy.findIndex(item => item.id === id)
    expensesCopy.splice(index, 1, { ...formData, id })
    // set it
    localStorage.setItem('expenses', JSON.stringify(expensesCopy))
    setExpenses(expensesCopy)

    handleCloseModal()
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
        <h1>Edit Expenses</h1>
        {index !== null && <div className='grid'>
          <input type="text" placeholder='Title'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <input type="text" placeholder='Price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          <div className='select-container'>
            <select name="category" id="category" value={formData.category || "Select Category"} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="Select Category">Select Category </option>
              <option value="Food" >Food </option>
              <option value="Utilities">Utilities </option>
              <option value="Travel">Travel </option>
              <option value="Healthcare">Healthcare </option>
              <option value="Entertainment">Entertainment </option>
              <option value="Shopping">Shopping  </option>
              <option value="Education">Education </option>
              <option value="Savings">Savings  </option>
              <option value="Debt">Debt  </option>
              <option value="Personal Care">Personal Care </option>
            </select>
          </div>

          <input type="text" placeholder='dd/mm/yy' value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <button className='AddExpense-button' onClick={handleEditExpense}>Add Expense</button>
          <div>

            <button className='cancel-button' onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>}
      </div >

    </ReactModal >

  )
}
