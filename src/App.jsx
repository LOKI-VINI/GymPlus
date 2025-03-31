import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GymProvider } from './context/GymContext';
import { MemberProvider } from './context/MemberContext';
import { TrainerProvider } from './context/TrainerContext';
import { ClassProvider } from './context/ClassContext';
import { PaymentProvider } from './context/PaymentContext';

// Public Pages
import Landing from './pages/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Admin Pages
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import MembersList from './components/dashboard/admin/pages/Members/MembersList';
import AddMember from './components/dashboard/admin/pages/Members/AddMember';
import EditMember from './components/dashboard/admin/pages/Members/EditMember';
import MemberDetails from './components/dashboard/admin/pages/Members/MemberDetails';

import TrainersList from './components/dashboard/admin/pages/Trainers/TrainersList';
import AddTrainer from './components/dashboard/admin/pages/Trainers/AddTrainer';
import EditTrainer from './components/dashboard/admin/pages/Trainers/EditTrainer';
import TrainerDetails from './components/dashboard/admin/pages/Trainers/TrainerDetails';

import ClassList from './components/dashboard/admin/pages/Classes/ClassList';
import AddClass from './components/dashboard/admin/pages/Classes/AddClass';
import EditClass from './components/dashboard/admin/pages/Classes/EditClass';
import ClassDetails from './components/dashboard/admin/pages/Classes/ClassDetails';

import PaymentsList from './components/dashboard/admin/pages/Payments/PaymentsList';
import AddPayment from './components/dashboard/admin/pages/Payments/AddPayment';
import PaymentDetails from './components/dashboard/admin/pages/Payments/PaymentDetails';
import PaymentHistory from './components/dashboard/admin/pages/Payments/PaymentHistory';

// Member Pages
import MemberDashboard from './components/dashboard/member/MemberDashboard';
import MyProfile from './components/dashboard/member/pages/MyProfile';
import MyClasses from './components/dashboard/member/pages/MyClasses';
import MyPayments from './components/dashboard/member/pages/MyPayments';
import WorkoutPlans from './components/dashboard/member/pages/WorkoutPlans';
import DietPlan from './components/dashboard/member/pages/DietPlan';
import WorkoutDetails from './components/dashboard/member/pages/WorkoutDetails';
import MealPlanner from './components/dashboard/member/pages/MealPlanner';
import ClassSchedule from './components/dashboard/member/pages/ClassSchedule';
import BookClass from './components/dashboard/member/pages/BookClass';
import ProgressTracking from './components/dashboard/member/pages/ProgressTracking';
import Measurements from './components/dashboard/member/pages/Measurements';
import Attendance from './components/dashboard/member/pages/Attendance';
import AttendanceHistory from './components/dashboard/member/pages/AttendanceHistory';
import Support from './components/dashboard/member/pages/Support';
import SupportChat from './components/dashboard/member/pages/SupportChat';

// Auth Hook
import { useAuth } from './hooks/useAuth';

// Create ProtectedRoute as a separate component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <GymProvider>
        <MemberProvider>
          <TrainerProvider>
            <ClassProvider>
              <PaymentProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin Routes */}
                    <Route path="/admin">
                      <Route index element={<AdminDashboard />} />
                      <Route path="members">
                        <Route index element={<MembersList />} />
                        <Route path="add" element={<AddMember />} />
                        <Route path="edit/:id" element={<EditMember />} />
                        <Route path=":id" element={<MemberDetails />} />
                      </Route>
                      <Route path="classes">
                        <Route index element={<ClassList />} />
                        <Route path="add" element={<AddClass />} />
                        <Route path="edit/:id" element={<EditClass />} />
                        <Route path=":id" element={<ClassDetails />} />
                      </Route>
                      <Route path="trainers">
                        <Route index element={<TrainersList />} />
                        <Route path="add" element={<AddTrainer />} />
                        <Route path="edit/:id" element={<EditTrainer />} />
                        <Route path=":id" element={<TrainerDetails />} />
                      </Route>
                      <Route path="payments">
                        <Route index element={<PaymentsList />} />
                        <Route path="add" element={<AddPayment />} />
                        <Route path="history" element={<PaymentHistory />} />
                        <Route path=":id" element={<PaymentDetails />} />
                      </Route>
                    </Route>

                    {/* Member Routes */}
                    <Route path="/member">
                      <Route index element={<MemberDashboard />} />
                      <Route path="profile" element={<MyProfile />} />
                      <Route path="workouts">
                        <Route index element={<WorkoutPlans />} />
                        <Route path=":id" element={<WorkoutDetails />} />
                      </Route>
                      <Route path="classes">
                        <Route index element={<MyClasses />} />
                        <Route path="schedule" element={<ClassSchedule />} />
                        <Route path="book" element={<BookClass />} />
                      </Route>
                      <Route path="diet">
                        <Route index element={<DietPlan />} />
                        <Route path="meal-planner" element={<MealPlanner />} />
                      </Route>
                      <Route path="payments" element={<MyPayments />} />
                      <Route path="progress" element={<ProgressTracking />} />
                      <Route path="attendance">
                        <Route index element={<Attendance />} />
                        <Route path="history" element={<AttendanceHistory />} />
                      </Route>
                      <Route path="measurements" element={<Measurements />} />
                      <Route path="support">
                        <Route index element={<Support />} />
                        <Route path="chat" element={<SupportChat />} />
                      </Route>
                    </Route>

                    {/* Catch all route - should be last */}
                    <Route path="*" element={<Navigate to="/member" replace />} />
                  </Routes>
                </BrowserRouter>
              </PaymentProvider>
            </ClassProvider>
          </TrainerProvider>
        </MemberProvider>
      </GymProvider>
    </AuthProvider>
  );
};

// Only one export default per file
export default App;