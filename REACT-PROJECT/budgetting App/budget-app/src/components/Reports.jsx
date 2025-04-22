import { useContext, useEffect, useState } from 'react'
import { BudgetContext } from '../context/BudgetContext'
import Chart from './Chart'

const Reports = () => {
  const {
    transactions,
    getMonthlyReport,
    activeView
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
    <div className={`content ${activeView === 'reports' ? 'active' : ''}`}>
      <div className="header">
        <h2>Reports</h2>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Spending Breakdown</h3>
          <div className="chart-container">
            <Chart
              type="pie"
              data={report.byCategory}
              expensesTotal={report.expenses}
            />
          </div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Income vs Expenses</h3>
          <div className="chart-container">
            <Chart type="bar" transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports