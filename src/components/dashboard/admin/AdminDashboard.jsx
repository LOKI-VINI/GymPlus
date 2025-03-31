import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import { useMember } from '../../../context/MemberContext';
import { usePayment } from '../../../context/PaymentContext';
import { useTrainer } from '../../../context/TrainerContext';
import { useClass } from '../../../context/ClassContext';
import { formatCurrency } from '../../../utils/formatCurrency';
// Import icons from react-icons
import { FaUsers, FaRupeeSign, FaDumbbell, FaChalkboardTeacher } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { BsCalendarCheck } from 'react-icons/bs';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { members } = useMember();
  const { payments } = usePayment();
  const { trainers } = useTrainer();
  const { classes } = useClass();

  const [stats, setStats] = useState({
    activeMembers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeTrainers: 0,
    activeClasses: 0,
    recentPayments: []
  });

  useEffect(() => {
    // Calculate active members (members with active status)
    const activeMemberCount = members.filter(member => 
      member.status === 'Active'
    ).length;

    // Calculate active trainers
    const activeTrainerCount = trainers.filter(trainer => 
      trainer.status === 'Active'
    ).length;

    // Calculate active classes
    const activeClassCount = classes.filter(cls => 
      cls.status === 'Active'
    ).length;

    // Calculate total revenue (all time)
    const totalRev = payments.reduce((sum, payment) => 
      sum + payment.amount, 0
    );

    // Calculate monthly revenue
    const currentDate = new Date();
    const monthlyRev = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getMonth() === currentDate.getMonth() &&
             paymentDate.getFullYear() === currentDate.getFullYear();
    }).reduce((sum, payment) => sum + payment.amount, 0);

    // Get recent payments (last 5)
    const recent = [...payments]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setStats({
      activeMembers: activeMemberCount,
      totalRevenue: totalRev,
      monthlyRevenue: monthlyRev,
      activeTrainers: activeTrainerCount,
      activeClasses: activeClassCount,
      recentPayments: recent
    });
  }, [members, payments, trainers, classes]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-gray-400 mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => navigate('/admin/payments/add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <FaRupeeSign />
              <span>New Payment</span>
            </button>
            <button 
              onClick={() => navigate('/admin/members/add')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <FaUsers />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Members Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm">Active Members</p>
                <h3 className="text-4xl font-bold text-white mt-2">{stats.activeMembers}</h3>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <FaUsers className="text-white text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => navigate('/admin/members')}
                className="text-blue-100 text-sm hover:text-white flex items-center"
              >
                View details <BiTrendingUp className="ml-2" />
              </button>
            </div>
          </div>

          {/* Monthly Revenue Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm">Monthly Revenue</p>
                <h3 className="text-4xl font-bold text-white mt-2">
                  {formatCurrency(stats.monthlyRevenue)}
                </h3>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <FaRupeeSign className="text-white text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => navigate('/admin/payments')}
                className="text-green-100 text-sm hover:text-white flex items-center"
              >
                View details <BiTrendingUp className="ml-2" />
              </button>
            </div>
          </div>

          {/* Active Trainers Card */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm">Active Trainers</p>
                <h3 className="text-4xl font-bold text-white mt-2">{stats.activeTrainers}</h3>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <FaChalkboardTeacher className="text-white text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => navigate('/admin/trainers')}
                className="text-purple-100 text-sm hover:text-white flex items-center"
              >
                View details <BiTrendingUp className="ml-2" />
              </button>
            </div>
          </div>

          {/* Active Classes Card */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm">Active Classes</p>
                <h3 className="text-4xl font-bold text-white mt-2">{stats.activeClasses}</h3>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <FaDumbbell className="text-white text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => navigate('/admin/classes')}
                className="text-orange-100 text-sm hover:text-white flex items-center"
              >
                View details <BiTrendingUp className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Payments Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BsCalendarCheck className="mr-2" />
              Recent Payments
            </h2>
            <button 
              onClick={() => navigate('/admin/payments')}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              View all
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Member
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
                {stats.recentPayments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                          {payment.memberName.charAt(0)}
                        </div>
                        <span className="ml-3 text-sm text-gray-300">
                          {payment.memberName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${payment.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;