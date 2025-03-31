import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useMember } from '../../../../../context/MemberContext';

const MembersList = () => {
  const { members, deleteMember } = useMember();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMember(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Members</h1>
            <p className="text-gray-400 mt-1">Total Members: {members.length}</p>
          </div>
          <Link
            to="/admin/members/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Member
          </Link>
        </div>

        {members.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
            <p className="text-gray-300">No members found. Add your first member!</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-200">{member.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{member.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{member.plan}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {member.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            to={`/admin/members/${member.id}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            View
                          </Link>
                          <Link
                            to={`/admin/members/edit/${member.id}`}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;