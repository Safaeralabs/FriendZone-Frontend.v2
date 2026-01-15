import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { OnboardingProvider } from '@/context/OnboardingContext';
import BottomNav from '@/components/BottomNav/BottomNav';

// Public Pages
import Landing from '@/pages/Landing/Landing';
import Login from '@/pages/Login/Login';
import SignUp from '@/pages/SignUp/SignUp';
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword';
import Terms from '@/pages/Terms/Terms';
import Privacy from '@/pages/Privacy/Privacy';

// Onboarding
import Onboarding from '@/pages/Onboarding/Onboarding';

// Main App Pages
import Discovery from '@/pages/Discovery/Discovery';
import Ambitions from '@/pages/Ambitions/Ambitions';
import Plans from '@/pages/Plans/Plans';
import Maps from '@/pages/Maps/Maps';
import Profile from '@/pages/Profile/Profile';
import CreateHangout from '@/pages/CreateHangout/CreateHangout';

// Detail Pages
import HangoutDetail from '@/pages/HangoutDetail/HangoutDetail';
import UserProfile from '@/pages/UserProfile/UserProfile';
import Chat from '@/pages/Chat/Chat';

// Settings & Support
import Settings from '@/pages/Settings/Settings';
import Help from '@/pages/Help/Help';

// 404
import NotFound from '@/pages/NotFound/NotFound';

// Layout wrapper for authenticated pages WITH bottom navigation
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
      <BottomNav />
    </div>
  );
};

// Layout wrapper for full-screen pages WITHOUT bottom navigation
const FullScreenLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public Routes - No Navigation */}
          <Route path="/welcome" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Onboarding - No Navigation */}
          <Route
            path="/onboarding"
            element={
              <OnboardingProvider>
                <Onboarding />
              </OnboardingProvider>
            }
          />

          {/* Main App Routes - With Bottom Navigation */}
          <Route
            path="/"
            element={
              <AppLayout>
                <Discovery />
              </AppLayout>
            }
          />
          <Route
            path="/ambitions"
            element={
              <AppLayout>
                <Ambitions />
              </AppLayout>
            }
          />
          <Route
            path="/plans"
            element={
              <AppLayout>
                <Plans />
              </AppLayout>
            }
          />
          <Route
            path="/maps"
            element={
              <AppLayout>
                <Maps />
              </AppLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AppLayout>
                <Profile />
              </AppLayout>
            }
          />
          <Route
            path="/create"
            element={
              <AppLayout>
                <CreateHangout />
              </AppLayout>
            }
          />

          {/* Detail Pages - With Bottom Navigation */}
          <Route
            path="/hangout/:hangoutId"
            element={
              <AppLayout>
                <HangoutDetail />
              </AppLayout>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <AppLayout>
                <UserProfile />
              </AppLayout>
            }
          />

          {/* Chat - Full Screen (NO Bottom Navigation) */}
          <Route
            path="/chat/:hangoutId"
            element={
              <FullScreenLayout>
                <Chat />
              </FullScreenLayout>
            }
          />

          {/* Edit Profile - With Bottom Navigation */}
         

          {/* Settings & Support - With Bottom Navigation */}
          <Route
            path="/settings"
            element={
              <AppLayout>
                <Settings />
              </AppLayout>
            }
          />
          <Route
            path="/help"
            element={
              <AppLayout>
                <Help />
              </AppLayout>
            }
          />

          {/* 404 - No Navigation */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;