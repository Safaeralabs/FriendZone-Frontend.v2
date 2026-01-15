import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hangout, Event, Offer, UserProfile, JoinRequest } from '@/types';
import { mockHangouts } from '@/mock/hangouts';
import { mockEvents } from '@/mock/events';
import { mockOffers } from '@/mock/offers';
import { mockUser } from '@/mock/user';

interface AppContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void; // Añadir esta línea
  hangouts: Hangout[];
  events: Event[];
  offers: Offer[];
  joinRequests: JoinRequest[];
  addHangout: (hangout: Hangout) => void;
  updateHangout: (id: string, updates: Partial<Hangout>) => void;
  joinHangout: (hangoutId: string) => void;
  approveRequest: (hangoutId: string, userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(mockUser); // Cambiar a incluir setUser
  const [hangouts, setHangouts] = useState<Hangout[]>(mockHangouts);
  const [events] = useState<Event[]>(mockEvents);
  const [offers] = useState<Offer[]>(mockOffers);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);

  // Función updateUser corregida
  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addHangout = (hangout: Hangout) => {
    setHangouts(prev => [hangout, ...prev]);
  };

  const updateHangout = (id: string, updates: Partial<Hangout>) => {
    setHangouts(prev =>
      prev.map(h => (h.id === id ? { ...h, ...updates } : h))
    );
  };

  const joinHangout = (hangoutId: string) => {
    const hangout = hangouts.find(h => h.id === hangoutId);
    if (!hangout) return;

    const request: JoinRequest = {
      id: `req-${Date.now()}`,
      hangoutId,
      userId: user.id,
      userName: user.name,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setJoinRequests(prev => [...prev, request]);
    
    // Add as pending participant
    updateHangout(hangoutId, {
      participants: [
        ...hangout.participants,
        { id: user.id, name: user.name, status: 'pending' },
      ],
    });
  };

  const approveRequest = (hangoutId: string, userId: string) => {
    // Update request status
    setJoinRequests(prev =>
      prev.map(r =>
        r.hangoutId === hangoutId && r.userId === userId
          ? { ...r, status: 'approved' }
          : r
      )
    );

    // Update participant status and decrease spots
    const hangout = hangouts.find(h => h.id === hangoutId);
    if (hangout) {
      updateHangout(hangoutId, {
        participants: hangout.participants.map(p =>
          p.id === userId ? { ...p, status: 'approved' } : p
        ),
        spotsLeft: hangout.spotsLeft - 1,
        locationLocked: false, // Unlock location on approval
      });
    }
  };

  const value: AppContextType = {
    user,
    updateUser, // Añadir updateUser aquí
    hangouts,
    events,
    offers,
    joinRequests,
    addHangout,
    updateHangout,
    joinHangout,
    approveRequest,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};