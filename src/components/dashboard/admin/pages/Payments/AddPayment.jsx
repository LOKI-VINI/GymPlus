import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { usePayment } from '../../../../../context/PaymentContext';
import { formatCurrency } from '../../../../../utils/formatCurrency';

const AddPayment = () => {
  const navigate = useNavigate();
  const { addPayment } = usePayment();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    memberName: '',
    memberId: '',
    amount: '',
    type: 'Monthly Membership',
    paymentMethod: 'Credit Card',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.memberName.trim()) newErrors.memberName = 'Member name is required';
    if (!formData.memberId) newErrors.memberId = 'Member ID is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addPayment({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      alert('Payment recorded successfully!');
      navigate('/admin/payments');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const paymentTypes = [
    { value: 'Monthly Membership', label: 'Monthly Membership - ₹1,999' },
    { value: 'Annual Membership', label: 'Annual Membership - ₹24,999' },
    { value: 'Personal Training', label: 'Personal Training - ₹3,999' },
    { value: 'Class Registration', label: 'Class Registration - ₹999' },
    { value: 'Other', label: 'Other' }
  ];

  const paymentMethods = [
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Debit Card', label: 'Debit Card' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Net Banking', label: 'Net Banking' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">Record Payment</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200">Member Name</label>
                  <input
                    type="text"
                    name="memberName"
                    value={formData.memberName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.memberName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.memberName && <p className="mt-1 text-sm text-red-500">{errors.memberName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Member ID</label>
                  <input
                    type="text"
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.memberId ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.memberId && <p className="mt-1 text-sm text-red-500">{errors.memberId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.amount ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Payment Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {paymentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {paymentMethods.map(method => (
                      <option key={method.value} value={method.value}>{method.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Additional payment details..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/payments')}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;