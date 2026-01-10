import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import Toast from './components/Toast/Toast';

// Pages
import Discovery from './pages/Discovery/Discovery';
import HangoutDetail from './pages/HangoutDetail/HangoutDetail';
import CreateHangout from './pages/CreateHangout/CreateHangout';
import Onboarding from './pages/Onboarding/Onboarding';
import Events from './pages/Events/Events';
import EventDetail from './pages/EventDetail/EventDetail';
import Offers from './pages/Offers/Offers';
import Ambitions from './pages/Ambitions/Ambitions';
import Plans from './pages/Plans/Plans'; // NUEVO
import Profile from './pages/Profile/Profile';
import Maps from './pages/Maps/Maps'; // AGREGAR


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<AppShell />}>
          <Route path="/" element={<Discovery />} />
          <Route path="/hangouts/:id" element={<HangoutDetail />} />
          <Route path="/create" element={<CreateHangout />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/ambitions" element={<Ambitions />} />
          <Route path="/plans" element={<Plans />} /> {/* NUEVO */}
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/maps" element={<Maps />} /> {/* Cambiar de Events a Maps */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;