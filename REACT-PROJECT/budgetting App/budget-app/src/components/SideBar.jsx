import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'
import NavItem from './NavItem'
import { FaWallet, FaHome, FaExchangeAlt, FaChartPie } from 'react-icons/fa'

const Sidebar = () => {
  const { activeView, setActiveView } = useContext(BudgetContext)

  return (
    <div className="sidebar">
      <div className="logo">
        <FaWallet className="logo-icon" />
        <h1>Financy</h1>
      </div>
      <nav className="nav-menu">
        <NavItem 
          icon={<FaHome />} 
          label="Dashboard" 
          active={activeView === 'dashboard'}
          onClick={() => setActiveView('dashboard')}
        />
        <NavItem 
          icon={<FaExchangeAlt />} 
          label="Transactions" 
          active={activeView === 'transactions'}
          onClick={() => setActiveView('transactions')}
        />
        <NavItem 
          icon={<FaChartPie />} 
          label="Reports" 
          active={activeView === 'reports'}
          onClick={() => setActiveView('reports')}
        />
      </nav>
    </div>
  )
}

export default Sidebar