import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'
import { FaEdit, FaTrash } from 'react-icons/fa'

const TransactionTable = ({ transactions }) => {
  const { deleteTransaction } = useContext(BudgetContext)

  const getCategoryColor = (category) => {
    const colors = {
      Housing: '#FF6384',
      Food: '#36A2EB',
      Transportation: '#FFCE56',
      Utilities: '#4BC0C0',
      Healthcare: '#9966FF',
      Entertainment: '#FF9F40',
      Savings: '#8AC24A',
      Other: '#EA5F89',
      Uncategorized: '#ADB5BD',
      Income: '#4CC9F0'
    }
    return colors[category] || '#ADB5BD'
  }

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr 
            key={transaction.id} 
            className={`${transaction.type}-row`}
          >
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{transaction.description || '-'}</td>
            <td>
              <div className="transaction-category">
                <div 
                  className="category-icon"
                  style={{ backgroundColor: getCategoryColor(transaction.category) }}
                >
                  {transaction.category.charAt(0)}
                </div>
                <span>{transaction.category}</span>
              </div>
            </td>
            <td className="amount">
              {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </td>
            <td>
              <div className="transaction-actions">
                <button className="action-btn">
                  <FaEdit />
                </button>
                <button 
                  className="action-btn"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionTable