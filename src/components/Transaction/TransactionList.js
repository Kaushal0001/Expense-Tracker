import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { ExpenseRatioContext } from "../../context/ExpenseRatioContext";
import { TiDeleteOutline } from "react-icons/ti";
import { GoPencil } from "react-icons/go";
import EditExpenseModal from "../ReactModals/EditExpenseModal";
import { FaUtensils, FaTools, FaPlane, FaHeartbeat, FaFilm, FaShoppingBag, FaGraduationCap, FaPiggyBank, FaCreditCard, FaSpa } from 'react-icons/fa';

const categoryData = {
    'Food': { img: <FaUtensils /> },
    'Utilities': { img: <FaTools /> },
    'Travel': { img: <FaPlane /> },
    'Healthcare': { img: <FaHeartbeat /> },
    'Entertainment': { img: <FaFilm /> },
    'Shopping': { img: <FaShoppingBag /> },
    'Education': { img: <FaGraduationCap /> },
    'Savings': { img: <FaPiggyBank /> },
    'Debt': { img: <FaCreditCard /> },
    'Personal Care': { img: <FaSpa /> }
};

export default function TransactionList({ item }) {
    const { expenses, setExpenses } = useContext(ExpenseContext);
    const { expenseRatio, setExpenseRatio } = useContext(ExpenseRatioContext);
    const [isOpen, setIsOpen] = useState()

    var options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };
    let unformattedDate = item.date ? item.date : new Date().toString()
    let [day, month, year] = unformattedDate.split('/')
    const date = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', options)

    const handleDelete = (e) => {
        let id = e.currentTarget.getAttribute('id')
        let newExpenses = expenses.filter(item => item.id !== id)
        setExpenses(newExpenses)
        localStorage.setItem('expenses', JSON.stringify(newExpenses))


        let expenseRatioCopy = { ...expenseRatio }
        let expense = expenses.filter(item => item.id === id)[0]
        let category = expense.category
        let currPrice = expense.price
        let price = expenseRatioCopy[category].price - currPrice
        if (price === 0) {
            delete expenseRatioCopy[category]
        } else {
            expenseRatioCopy = { ...expenseRatioCopy, [category]: { price } }
        }

        let totalPrice = 0
        Object.keys(expenseRatioCopy).forEach((item) => {
            totalPrice = totalPrice + expenseRatioCopy[item].price
        })

        Object.keys(expenseRatioCopy).forEach((item) => {
            let ratio = Math.floor(expenseRatioCopy[item].price / totalPrice * 100)
            expenseRatioCopy[item].ratio = ratio
        })

        localStorage.setItem('expenseRatio', JSON.stringify(expenseRatioCopy))
        setExpenseRatio(expenseRatioCopy)
    }

    const handleCloseModal = () => setIsOpen(false)

    const handleOpenModal = () => setIsOpen(true)

    return <div className='TransactionList'>
        <div className='img-container'>
            {categoryData[item.category]?.img}
        </div>
        <div className='TransactionList-inner'>
            <div>
                <p className='title'>{item.title}</p>
                <p className='date'>{date}</p>
            </div>
            <span className='price'>₹{item.price}</span>
        </div>
        <div className='buttons'>
            <button className='delete' id={item.id} onClick={e => handleDelete(e)} >
                <TiDeleteOutline className='icon-button' />
            </button>
            <button className='edit' id={item.id} onClick={e => handleOpenModal(e)}>
                <GoPencil className='icon-button' />
            </button>
        </div>
        <EditExpenseModal isOpen={isOpen} handleCloseModal={handleCloseModal} id={item.id}></EditExpenseModal>

    </div>
}