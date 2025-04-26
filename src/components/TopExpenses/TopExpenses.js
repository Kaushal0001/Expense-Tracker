import '../../styles/TopExpenses.css'
import TopExpensesChart from './TopExpensesChart';

export default function TopExpenses() {
    return (
        <div className='TopExpenses'>
            <h1>Top Expenses</h1>
            <div className='TopExpenses-inner'>
                <TopExpensesChart />
            </div>
        </div>
    )
}



