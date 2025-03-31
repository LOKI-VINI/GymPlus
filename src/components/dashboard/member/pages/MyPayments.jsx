import React from 'react';
import { usePayment } from '../../../../context/PaymentContext';
import { useMember } from '../../../../context/MemberContext';
import MemberNavbar from '../components/MemberNavbar';
import Card from '../../../shared/ui/Card';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { FaWallet, FaFileInvoice, FaHistory } from 'react-icons/fa';

const MyPayments = () => {
  const { payments } = usePayment();
  const { currentMember } = useMember();

  // Filter payments for current member
  const memberPayments = payments.filter(
    payment => payment.memberId === currentMember?.id
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">My Payments</h1>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Last Payment</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {formatCurrency(memberPayments[0]?.amount || 0)}
                  </p>
                </div>
                <div className="bg-blue-500 p-3 rounded-lg">
                  <FaWallet className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {memberPayments[0] 
                  ? `Paid on ${formatDate(memberPayments[0].date)}`
                  : 'No payments yet'}
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Next Due</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {formatCurrency(1999)}
                  </p>
                </div>
                <div className="bg-green-500 p-3 rounded-lg">
                  <FaFileInvoice className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Due on {formatDate(new Date().setMonth(new Date().getMonth() + 1))}
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Paid</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {formatCurrency(
                      memberPayments.reduce((sum, payment) => sum + payment.amount, 0)
                    )}
                  </p>
                </div>
                <div className="bg-purple-500 p-3 rounded-lg">
                  <FaHistory className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Lifetime total
              </p>
            </div>
          </Card>
        </div>

        {/* Payment History Table */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {memberPayments.map((payment, index) => (
                    <tr key={payment.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {payment.description}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {memberPayments.length === 0 && (
              <div className="text-center py-12">
                <FaWallet className="mx-auto h-12 w-12 text-gray-600" />
                <h3 className="mt-2 text-lg font-medium text-white">
                  No payment history
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Your payment history will appear here
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyPayments;
