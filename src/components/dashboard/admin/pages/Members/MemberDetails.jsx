import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchMemberDetails = async () => {
      try {
        // Replace with actual API call
        const memberData = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          plan: 'Premium',
          status: 'Active',
          startDate: '2024-03-01',
          lastPayment: '2024-03-15',
          attendance: [
            { date: '2024-03-20', class: 'Yoga' },
            { date: '2024-03-18', class: 'CrossFit' },
          ],
          upcomingClasses: [
            { date: '2024-03-25', class: 'Weight Training' },
            { date: '2024-03-27', class: 'Yoga' },
          ]
        };
        setMember(memberData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching member details:', error);
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-600">Member not found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Member Details</h1>
        <div className="space-x-4">
          <Link
            to={`/admin/members/edit/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Edit Member
          </Link>
          <button
            onClick={() => navigate('/admin/members')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">{member.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2">{member.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2">{member.phone}</span>
            </div>
          </div>
        </div>

        {/* Membership Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Membership Details</h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Plan:</span>
              <span className="ml-2">{member.plan}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {member.status}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Start Date:</span>
              <span className="ml-2">{member.startDate}</span>
            </div>
            <div>
              <span className="text-gray-600">Last Payment:</span>
              <span className="ml-2">{member.lastPayment}</span>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Attendance</h2>
          <div className="space-y-2">
            {member.attendance.map((record, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{record.class}</span>
                <span className="text-gray-600 text-sm">{record.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Classes</h2>
          <div className="space-y-2">
            {member.upcomingClasses.map((class_, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{class_.class}</span>
                <span className="text-gray-600 text-sm">{class_.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;