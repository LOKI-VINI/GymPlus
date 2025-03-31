import React, { useState } from 'react';
import { useMember } from '../../../../context/MemberContext';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaClock } from 'react-icons/fa';
import Card from '../../../shared/ui/Card';
import Button from '../../../shared/ui/Button';
import Modal from '../../../shared/ui/Modal';
import Input from '../../../shared/ui/Input';
import MemberNavbar from '../components/MemberNavbar';
import { formatDate } from '../../../shared/utils/formatDate';
import DefaultAvatar from '../../../../components/shared/ui/DefaultAvatar';

const MyProfile = () => {
  const { currentMember, updateMember } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editForm, setEditForm] = useState({
    email: currentMember?.email || '',
    phone: currentMember?.phone || '',
    address: currentMember?.address || '',
  });

  const daysUntilRenewal = () => {
    const renewalDate = new Date(currentMember?.renewalDate);
    const today = new Date();
    const diffTime = renewalDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMember({ ...currentMember, ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                  {imagePreview || currentMember?.profilePicture ? (
                    <img
                      src={imagePreview || currentMember?.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <DefaultAvatar className="w-full h-full" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <FaUser className="text-white" />
                </label>
              </div>

              {/* Basic Info */}
              <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white">{currentMember?.name}</h1>
                <p className="text-gray-400">Member ID: {currentMember?.memberId}</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentMember?.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentMember?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <FaUser className="mr-3 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">Age</p>
                    <p>{currentMember?.age} years</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaEnvelope className="mr-3 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>{currentMember?.email}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaPhone className="mr-3 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p>{currentMember?.phone}</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full"
                variant="primary"
              >
                Edit Profile
              </Button>
            </div>
          </Card>

          {/* Membership Details */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Membership Details</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <FaCalendar className="mr-3 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">Plan Type</p>
                    <p className="capitalize">{currentMember?.planType}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaClock className="mr-3 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">Renewal Date</p>
                    <p>{formatDate(currentMember?.renewalDate)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full"
                      style={{ 
                        width: `${Math.max(0, Math.min(100, (daysUntilRenewal() / 30) * 100))}%` 
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {daysUntilRenewal()} days until renewal
                  </p>
                </div>
              </div>
              <Button
                className="mt-6 w-full"
                variant="success"
              >
                Renew Membership
              </Button>
            </div>
          </Card>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          title="Edit Profile"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <Input
              label="Phone"
              type="tel"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            />
            <Input
              label="Address"
              type="text"
              value={editForm.address}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
            />
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default MyProfile;