import { useContext, useEffect, useState } from 'react'
import { BudgetContext } from '../context/BudgetContext'
import Card from './Card'
import Chart from './Chart'
import TransactionTable from './TransactionTable'
import { FaArrowDown, FaArrowUp, FaWallet, FaPlus } from 'react-icons/fa'

const Dashboard = () => {
  const { 
    transactions, 
    getCurrentBalance, 
    getMonthlyReport, 
    setIsModalOpen 
  } = useContext(BudgetContext)
  
  const [currentDate] = useState(new Date())
  const [report, setReport] = useState(null)

  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    setReport(getMonthlyReport(year, month))
  }, [transactions, currentDate, getMonthlyReport])

  if (!report) return <div>Loading...</div>

  return (
    <div className={`content ${activeView === 'dashboard' ? 'active' : ''}`}>
      <div className="header">
        <h2>Dashboard</h2>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
        </div>
      </div>

      <div className="dashboard-cards">
        <Card
          title="Total Income"
          value={`$${report.income.toFixed(2)}`}
          icon={<FaArrowDown />}
          iconClass="income"
        />
        <Card
          title="Total Expenses"
          value={`$${report.expenses.toFixed(2)}`}
          icon={<FaArrowUp />}
          iconClass="expense"
        />
        <Card
          title="Current Balance"
          value={`$${getCurrentBalance().toFixed(2)}`}
          icon={<FaWallet />}
          iconClass="balance"
        />
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Spending by Category</h3>
          <div className="chart-container">
            <Chart 
              type="pie" 
              data={report.byCategory} 
              expensesTotal={report.expenses} 
            />
          </div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Monthly Trends</h3>
          <div className="chart-container">
            <Chart type="line" transactions={transactions} />
          </div>
        </div>
      </div>

      <div className="transactions-container">
        <div className="section-header">
          <h3 className="section-title">Recent Transactions</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add Transaction
          </button>
        </div>
        <TransactionTable transactions={report.transactions.slice(0, 5)} />
      </div>
    </div>
  )
}

export default Dashboard