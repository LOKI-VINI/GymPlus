import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext(null);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      memberId: 1,
      memberName: 'John Doe',
      amount: 1999, // ₹1,999
      type: 'Monthly Membership',
      status: 'Completed',
      date: '2024-03-25',
      paymentMethod: 'Credit Card',
      transactionId: 'TRX001',
      description: 'Monthly membership fee - March 2024'
    },
    {
      id: 2,
      memberId: 2,
      memberName: 'Jane Smith',
      amount: 24999, // ₹24,999
      type: 'Annual Membership',
      status: 'Completed',
      date: '2024-03-24',
      paymentMethod: 'UPI',
      transactionId: 'TRX002',
      description: 'Annual membership fee'
    }
  ]);

  const addPayment = (newPayment) => {
    setPayments(prev => [
      ...prev,
      { 
        ...newPayment, 
        id: prev.length + 1,
        status: 'Completed',
        transactionId: `TRX${String(Date.now()).slice(-6)}`
      }
    ]);
  };

  const updatePayment = (id, updatedPayment) => {
    setPayments(prev => prev.map(payment => 
      payment.id === parseInt(id) ? { ...payment, ...updatedPayment } : payment
    ));
  };

  const deletePayment = (id) => {
    setPayments(prev => prev.filter(payment => payment.id !== id));
  };

  const getPaymentById = (id) => {
    return payments.find(payment => payment.id === parseInt(id));
  };

  const getPaymentsByMemberId = (memberId) => {
    return payments.filter(payment => payment.memberId === parseInt(memberId));
  };

  return (
    <PaymentContext.Provider value={{
      payments,
      addPayment,
      updatePayment,
      deletePayment,
      getPaymentById,
      getPaymentsByMemberId
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;