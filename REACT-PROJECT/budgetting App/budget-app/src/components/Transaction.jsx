import { useContext, useEffect, useState } from 'react'
import { BudgetContext } from '../context/BudgetContext'
import TransactionTable from './TransactionTable'
import { FaPlus } from 'react-icons/fa'

const Transactions = () => {
  const { 
    transactions, 
    activeView, 
    setIsModalOpen 
  } = useContext(BudgetContext)

  return (
    <div className={`content ${activeView === 'transactions' ? 'active' : ''}`}>
      <div className="header">
        <h2>All Transactions</h2>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
        </div>
      </div>

      <div className="transactions-container">
        <div className="section-header">
          <h3 className="section-title">Transaction History</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add Transaction
          </button>
        </div>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  )
}

export default Transactions