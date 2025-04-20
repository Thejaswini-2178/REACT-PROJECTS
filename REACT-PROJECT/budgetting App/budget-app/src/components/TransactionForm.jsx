import { useState, useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'
import { FaTimes } from 'react-icons/fa'

const TransactionForm = () => {
  const { addTransaction, categories, setIsModalOpen } = useContext(BudgetContext)
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.amount || (formData.type === 'expense' && !formData.category)) {
      alert('Please fill all required fields')
      return
    }

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      category: formData.category || 'Uncategorized'
    })

    // Reset form
    setFormData({
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    })

    setIsModalOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Amount *</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Type *</label>
        <div className="form-radio-group">
          <input
            type="radio"
            id="expense"
            name="type"
            value="expense"
            checked={formData.type === 'expense'}
            onChange={handleChange}
            className="form-radio"
          />
          <label htmlFor="expense" className="form-radio-label">
            Expense
          </label>

          <input
            type="radio"
            id="income"
            name="type"
            value="income"
            checked={formData.type === 'income'}
            onChange={handleChange}
            className="form-radio"
          />
          <label htmlFor="income" className="form-radio-label">
            Income
          </label>
        </div>
      </div>

      {formData.type === 'expense' && (
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            className="form-control form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required={formData.type === 'expense'}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="modal-footer">
        <button 
          type="button" 
          className="btn btn-outline"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </div>
    </form>
  )
}

export default TransactionForm