import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { usePayment } from '../../../../../context/PaymentContext';
import { formatCurrency } from '../../../../../utils/formatCurrency';

const PaymentsList = () => {
  const { payments } = usePayment();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredPayments = payments
    .filter(payment => 
      (filterStatus === 'all' || payment.status === filterStatus) &&
      (payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Payments</h1>
            <p className="text-gray-400 mt-1">
              Total Collection: {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
            </p>
          </div>
          <Link
            to="/admin/payments/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Record Payment
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by member name or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-200">{payment.memberName}</div>
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
                        : payment.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/payments/${payment.id}`}
                      className="text-blue-400 hover:text-blue-300 mr-4"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;