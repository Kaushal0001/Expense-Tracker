import React, { useContext, useState } from 'react'
import '../../styles/Transaction.css'
import { ExpenseContext } from '../../context/ExpenseContext';
import TransactionList from './TransactionList';
import Pagination from './Pagination';

function Transaction() {
    const { expenses } = useContext(ExpenseContext);
    const [pageIndex, setPageIndex] = useState(0);
    let startIndex = pageIndex * 3
    let endIndex = startIndex + 3

    return (

        <div className='Transaction'>
            <h1>Recent Transactions</h1>
            <div className='Transaction-inner'>
                <div style={{ flex: 1 }}>
                    {expenses.length === 0 &&
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <p style={{ color: 'gray' }}>No Transactions</p>
                        </div>
                    }
                    {expenses.slice(startIndex, endIndex).map((item, index) =>
                        <TransactionList item={item} key={index} />
                    )}
                </div>

                <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex} />
            </div>
        </div>
    )
}



export default Transaction