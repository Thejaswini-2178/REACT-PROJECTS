import { createContext, useState, useEffect } from 'react'

export const BudgetContext = createContext()

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  
  const categories = [
    'Housing', 'Food', 'Transportation', 'Utilities', 
    'Healthcare', 'Entertainment', 'Savings', 'Other', 'Uncategorized'
  ]

  // Load from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('budgetApp_transactions')
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions).map(t => ({
        ...t,
        date: new Date(t.date)
      }))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('budgetApp_transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, {
      ...transaction,
      id: Date.now(),
      date: transaction.date || new Date()
    }])
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const getCurrentBalance = () => {
    return transactions.reduce((total, t) => {
      return t.type === 'income' ? total + t.amount : total - t.amount
    }, 0)
  }

  const getMonthlyReport = (year, month) => {
    const monthlyTransactions = transactions.filter(t => {
      const d = new Date(t.date)
      return d.getFullYear() === year && d.getMonth() === month - 1
    })

    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const byCategory = categories.reduce((acc, category) => {
      const catExpenses = monthlyTransactions
        .filter(t => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0)
      
      if (catExpenses > 0) acc[category] = catExpenses
      return acc
    }, {})

    return {
      year,
      month,
      income,
      expenses,
      savings: income - expenses,
      byCategory,
      transactions: monthlyTransactions
    }
  }

  return (
    <BudgetContext.Provider value={{
      transactions,
      categories,
      addTransaction,
      deleteTransaction,
      getCurrentBalance,
      getMonthlyReport,
      isModalOpen,
      setIsModalOpen,
      activeView,
      setActiveView
    }}>
      {children}
    </BudgetContext.Provider>
  )
}