import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Member',
      path: '/admin/members/add',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      title: 'Add Class',
      path: '/admin/classes/add',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      title: 'Add Payment',
      path: '/admin/payments/add',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      title: 'Add Trainer',
      path: '/admin/trainers/add',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      )
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={() => navigate(action.path)}
            variant="secondary"
            className="flex items-center justify-center p-4 hover:bg-gray-700 transition-colors"
          >
            <span className="text-red-500 mr-2">
              {action.icon}
            </span>
            <span className="text-gray-300">{action.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;