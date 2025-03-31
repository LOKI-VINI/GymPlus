import React, { createContext, useContext, useState } from 'react';

const MemberContext = createContext(null);

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
};

export const MemberProvider = ({ children }) => {
  // Initial sample data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      plan: 'Premium',
      status: 'Active',
      startDate: '2024-03-01',
      gender: 'male',
      emergencyContact: '9876543210',
      address: '123 Gym Street'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      plan: 'Basic',
      status: 'Active',
      startDate: '2024-03-15',
      gender: 'female',
      emergencyContact: '1234567890',
      address: '456 Fitness Avenue'
    }
  ]);

  const addMember = (newMember) => {
    setMembers(prevMembers => [
      ...prevMembers,
      {
        ...newMember,
        id: prevMembers.length + 1,
        status: 'Active'
      }
    ]);
  };

  const updateMember = (id, updatedMember) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === parseInt(id) ? { ...member, ...updatedMember } : member
      )
    );
  };

  const deleteMember = (id) => {
    setMembers(prevMembers =>
      prevMembers.filter(member => member.id !== id)
    );
  };

  const getMemberById = (id) => {
    return members.find(member => member.id === parseInt(id));
  };

  return (
    <MemberContext.Provider value={{
      members,
      addMember,
      updateMember,
      deleteMember,
      getMemberById
    }}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;