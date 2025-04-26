import React, { useContext, useState } from 'react'
import ReactModal from 'react-modal';
import '../../styles/AddBalanceModal.css';
import { BalanceContext } from '../../context/BalanceContext';

ReactModal.setAppElement('#root');

export default function AddBalanceModal({ isOpen, handleCloseModal }) {
  const [amount, setAmount] = useState(null)
  const { balance, setBalance } = useContext(BalanceContext);

  const handleAddBalance = () => {
    setBalance(balance + Number(amount))
    localStorage.setItem('balance', balance + Number(amount))
    handleCloseModal()
    setAmount(null)
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      className='AddBalanceModal'
      overlayClassName='AddBalanceModalOverlay'

    >
      <div>
        <h1>Add Balance</h1>
        <div className='grid'>
          <input type="text" placeholder='Income Amount' onChange={(e) => setAmount(e.target.value)} />
          <button className='AddBalance-button' onClick={handleAddBalance}>Add Balance</button>
          <div>
            <button className='cancel-button' onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      </div >

    </ReactModal >

  )
}
