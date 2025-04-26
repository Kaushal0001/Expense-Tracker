import TopExpenses from '../components/TopExpenses/TopExpenses';
import Tracker from '../components/Tracker/Tracker';
import Transaction from '../components/Transaction/Transaction';
import '../styles//HomePage.css';

function HomePage() {
    return (
        <div className="HomePage">
            <Tracker></Tracker>
            <div className='bottom'>
                <Transaction></Transaction>
                <TopExpenses></TopExpenses>
            </div>
        </div>
    );
}

export default HomePage;
