import { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export default function Pagination({ pageIndex, setPageIndex }) {
    const { expenses } = useContext(ExpenseContext);
    let numberOfPages = Math.ceil(expenses.length / 3)

    return <div>
        {numberOfPages > 0 &&
            <div className='Pagination'>
                <button className='Pagination-navigation-button' onClick={() => pageIndex > 0 && setPageIndex(pageIndex - 1)}>
                    <IoIosArrowRoundBack style={{ width: '24px', height: '24px' }} />
                </button>
                <div className='Pagination-inner'>
                    {Array.from({ length: numberOfPages }, (_, i) => (
                        <button key={i} id={i} className='Pagination-page-button' onClick={() => setPageIndex(i)}>{i + 1}</button>
                    ))}
                </div>
                <button className='Pagination-navigation-button' onClick={() => pageIndex < numberOfPages - 1 && setPageIndex(pageIndex + 1)}>
                    <IoIosArrowRoundForward style={{ width: '24px', height: '24px' }} />
                </button>
            </div >
        }
    </div>
}