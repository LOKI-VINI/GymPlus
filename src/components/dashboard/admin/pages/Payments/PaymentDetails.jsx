import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { usePayment } from '../../../../../context/PaymentContext';
import { formatCurrency } from '../../../../../utils/formatCurrency';

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPaymentById } = usePayment();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const paymentData = getPaymentById(id);
    if (paymentData) {
      setPayment(paymentData);
    } else {
      navigate('/admin/payments');
    }
  }, [id, getPaymentById, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!payment) {
    return (
      <div className="min-h-screen bg-gray-900">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const paymentInfo = [
    { label: 'Amount', value: formatCurrency(payment.amount) },
    { label: 'Transaction ID', value: payment.transactionId },
    { label: 'Payment Method', value: payment.paymentMethod },
    { label: 'Payment Type', value: payment.type },
    { label: 'Date', value: formatDate(payment.date) },
    { label: 'Status', value: payment.status, isStatus: true }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Payment Details</h1>
          <button
            onClick={() => navigate('/admin/payments')}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to List
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Transaction Information</h2>
            <div className="space-y-3">
              {paymentInfo.map((info, index) => (
                <div key={index}>
                  <span className="text-gray-400">{info.label}:</span>
                  <span className="ml-2 text-gray-200">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Member Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Member Name:</span>
                <span className="ml-2 text-gray-200">{payment.memberName}</span>
              </div>
              <div>
                <span className="text-gray-400">Member ID:</span>
                <span className="ml-2 text-gray-200">{payment.memberId}</span>
              </div>
              <div>
                <span className="text-gray-400">Payment Type:</span>
                <span className="ml-2 text-gray-200">{payment.type}</span>
              </div>
              <div>
                <span className="text-gray-400">Payment Method:</span>
                <span className="ml-2 text-gray-200">{payment.paymentMethod}</span>
              </div>
            </div>
          </div>

          {payment.description && (
            <div className="bg-gray-800 rounded-lg shadow p-6 md:col-span-2">
              <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
              <p className="text-gray-200">{payment.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;