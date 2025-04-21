import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'
import TransactionForm from './TransactionForm'
import { FaTimes } from 'react-icons/fa'

const Modal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(BudgetContext)

  if (!isModalOpen) return null

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Add Transaction</h3>
          <button 
            className="modal-close"
            onClick={() => setIsModalOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <TransactionForm />
        </div>
      </div>
    </div>
  )
}

export default Modal