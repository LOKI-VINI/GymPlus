import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { usePayment } from '../../../../../context/PaymentContext';
import { formatCurrency } from '../../../../../utils/formatCurrency';

const PaymentHistory = () => {
  const { payments } = usePayment();
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [recentPayments, setRecentPayments] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate monthly total
    const monthlyPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    });
    const monthTotal = monthlyPayments.reduce((sum, payment) => sum + payment.amount, 0);
    setMonthlyTotal(monthTotal);

    // Calculate yearly total
    const yearlyPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getFullYear() === currentYear;
    });
    const yearTotal = yearlyPayments.reduce((sum, payment) => sum + payment.amount, 0);
    setYearlyTotal(yearTotal);

    // Get recent payments
    const sorted = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecentPayments(sorted.slice(0, 10));
  }, [payments]);

  const getPaymentsByPeriod = () => {
    const currentDate = new Date();
    const filteredPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      if (selectedPeriod === 'month') {
        return paymentDate.getMonth() === currentDate.getMonth() &&
               paymentDate.getFullYear() === currentDate.getFullYear();
      } else if (selectedPeriod === 'year') {
        return paymentDate.getFullYear() === currentDate.getFullYear();
      }
      return true;
    });
    return filteredPayments.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const summaryCards = [
    {
      title: 'Today\'s Collection',
      amount: todayTotal,
      subtitle: 'Total payments today'
    },
    {
      title: 'Monthly Revenue',
      amount: monthlyTotal,
      subtitle: 'Current month'
    },
    {
      title: 'Yearly Revenue',
      amount: yearlyTotal,
      subtitle: 'Current year'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-white mb-6">Payment History</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-200">{card.title}</h2>
              <p className="text-3xl font-bold text-white mt-2">
                {formatCurrency(card.amount)}
              </p>
              <p className="text-sm text-gray-400 mt-1">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Transaction History</h2>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Method</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {getPaymentsByPeriod().map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-200">{payment.memberName}</div>
                    <div className="text-sm text-gray-400">ID: {payment.memberId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {payment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {payment.paymentMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Summary Chart could be added here */}
        <div className="mt-6 bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Payment Statistics</h2>
          <p className="text-gray-300">Chart component can be added here to show payment trends</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;