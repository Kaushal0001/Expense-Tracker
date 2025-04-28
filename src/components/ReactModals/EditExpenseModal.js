import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import '../../styles/AddExpenseModal.css';
import { ExpenseContext } from '../../context/ExpenseContext';
import { ExpenseRatioContext } from '../../context/ExpenseRatioContext';

ReactModal.setAppElement('#root');

export default function EditExpenseModal({ isOpen, handleCloseModal, id }) {
  const [formData, setFormData] = useState({})
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
    let expenseRatioCopy = { ...expenseRatio }
    let expense = expenses.filter(item => item.id === id)[0]
    let oldCategory = expense.category
    let oldPrice = expense.price
    let newCategory = formData.category
    let newPrice = formData.price


    let price = expenseRatioCopy[oldCategory].price - oldPrice
    if (price === 0) {
      delete expenseRatioCopy[oldCategory]
    } else {
      expenseRatioCopy = { ...expenseRatioCopy, [oldCategory]: { price } }
    }


    price = expenseRatioCopy[newCategory] ? expenseRatioCopy[newCategory].price + Number(newPrice) : Number(newPrice)
    expenseRatioCopy = { ...expenseRatioCopy, [newCategory]: { price } }

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


    let expensesCopy = [...expenses]
    let index = expensesCopy.findIndex(item => item.id === id)
    expensesCopy.splice(index, 1, { ...formData, id })

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
              <option value="Travel">Travel </option>
              <option value="Entertainment">Entertainment </option>
              <option value="Shopping">Others  </option>
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
