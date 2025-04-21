// import { Doughnut, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

// ChartJS.register(
//   ArcElement, Tooltip, Legend, CategoryScale, 
//   LinearScale, PointElement, LineElement, Title
// );

// const Chart = ({ type, data, expensesTotal, transactions }) => {
//   if (type === 'pie') {
//     const chartData = {
//       labels: Object.keys(data),
//       datasets: [{
//         data: Object.values(data),
//         backgroundColor: [
//           '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
//           '#9966FF', '#FF9F40', '#8AC24A', '#EA5F89', '#ADB5BD'
//         ],
//         borderWidth: 1
//       }]
//     };

//     const options = {
//       plugins: {
//         tooltip: {
//           callbacks: {
//             label: function(context) {
//               const label = context.label || '';
//               const value = context.raw || 0;
//               const percentage = (value / expensesTotal) * 100;
//               return `${label}: $${value.toFixed(2)} (${percentage.toFixed(1)}%)`;
//             }
//           }
//         }
//       },
//       maintainAspectRatio: false
//     };

//     return <Doughnut data={chartData} options={options} />;
//   }

//   if (type === 'line') {
//     // Generate trend data for the last 6 months
//     const currentDate = new Date();
//     const months = [];
//     const incomeData = [];
//     const expenseData = [];
//     const savingsData = [];
    
//     for (let i = 5; i >= 0; i--) {
//       const date = new Date(currentDate);
//       date.setMonth(date.getMonth() - i);
      
//       const year = date.getFullYear();
//       const month = date.getMonth() + 1;
//       const monthName = date.toLocaleString('default', { month: 'short' });
      
//       const monthlyTransactions = transactions.filter(t => {
//         const d = new Date(t.date);
//         return d.getFullYear() === year && d.getMonth() === month - 1;
//       });
      
//       const income = monthlyTransactions
//         .filter(t => t.type === 'income')
//         .reduce((sum, t) => sum + t.amount, 0);
      
//       const expenses = monthlyTransactions
//         .filter(t => t.type === 'expense')
//         .reduce((sum, t) => sum + t.amount, 0);
      
//       months.push(`${monthName} ${year}`);
//       incomeData.push(income);
//       expenseData.push(expenses);
//       savingsData.push(income - expenses);
//     }

//     const chartData = {
//       labels: months,
//       datasets: [
//         {
//           label: 'Income',
//           data: incomeData,
//           borderColor: '#4BC0C0',
//           backgroundColor: 'rgba(75, 192, 192, 0.1)',
//           tension: 0.1,
//           fill: true
//         },
//         {
//           label: 'Expenses',
//           data: expenseData,
//           borderColor: '#FF6384',
//           backgroundColor: 'rgba(255, 99, 132, 0.1)',
//           tension: 0.1,
//           fill: true
//         },
//         {
//           label: 'Savings',
//           data: savingsData,
//           borderColor: '#36A2EB',
//           backgroundColor: 'rgba(54, 162, 235, 0.1)',
//           tension: 0.1,
//           fill: true
//         }
//       ]
//     };

//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     };

//     return <Line data={chartData} options={options} />;
//   }

//   return null;
// };

// export default Chart;
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title 
} from 'chart.js'

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, PointElement, LineElement, BarElement, Title
)

const Chart = ({ type, data, expensesTotal, transactions }) => {
  if (type === 'pie') {
    const chartData = {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#8AC24A', '#EA5F89', '#ADB5BD'
        ],
        borderWidth: 1
      }]
    }

    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.raw || 0
              const percentage = (value / expensesTotal) * 100
              return `${label}: $${value.toFixed(2)} (${percentage.toFixed(1)}%)`
            }
          }
        }
      },
      maintainAspectRatio: false
    }

    return <Doughnut data={chartData} options={options} />
  }

  if (type === 'line' || type === 'bar') {
    // Generate trend data for the last 6 months
    const currentDate = new Date()
    const months = []
    const incomeData = []
    const expenseData = []
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate)
      date.setMonth(date.getMonth() - i)
      
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const monthName = date.toLocaleString('default', { month: 'short' })
      
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
      
      months.push(`${monthName} ${year}`)
      incomeData.push(income)
      expenseData.push(expenses)
    }

    const chartData = {
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: '#4BC0C0',
          borderColor: '#4BC0C0',
          tension: 0.1
        },
        {
          label: 'Expenses',
          data: expenseData,
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          tension: 0.1
        }
      ]
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

    return type === 'line' 
      ? <Line data={chartData} options={options} /> 
      : <Bar data={chartData} options={options} />
  }

  return null
}

export default Chart