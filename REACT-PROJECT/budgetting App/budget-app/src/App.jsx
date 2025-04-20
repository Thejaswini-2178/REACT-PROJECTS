import { BudgetProvider } from './context/BudgetContext'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Reports from './components/Reports'
import Modal from './components/Modal'

function App() {
  return (
    <BudgetProvider>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Dashboard />
          <Transactions />
          <Reports />
        </main>
        <Modal />
      </div>
    </BudgetProvider>
  )
}

export default App