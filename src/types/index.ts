export type HangoutType = 'community' | 'offer' | 'event-linked';

export type HangoutStatus = 'active' | 'pending' | 'approved' | 'full' | 'cancelled';

export type TimeFilter = 'now' | 'tonight' | 'weekend';

export interface Hangout {
  id: string;
  type: HangoutType;
  title: string;
  description: string;
  vibe: string[];
  time: string;
  capacity: number;
  spotsLeft: number;
  hostId: string;
  hostName: string;
  location?: {
    name: string;
    address: string;
  };
  locationLocked: boolean;
  visibility: 'public' | 'invite-only';
  plan: string[];
  groupTags: string[];
  languages: string[];
  eventId?: string;
  offerId?: string;
  participants: Participant[];
  status: HangoutStatus;
  createdAt: string;
}

export interface Participant {
  id: string;
  name: string;
  status: 'host' | 'approved' | 'pending';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  time: string;
  image?: string;
  hangoutsCount: number;
  tags: string[];
}

export interface Offer {
  id: string;
  venueId: string;
  venueName: string;
  title: string;
  description: string;
  perk: string;
  validUntil: string;
  terms: string[];
  image?: string;
  tags: string[];
}

// User Profile Ambition (simple display)
export interface UserAmbitionDisplay {
  id: string;
  text: string;
  icon: string;
  expiresAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  interests: string[];
  vibe: string[];
  languages: string[];
  availability: string[];
  ambitions: UserAmbitionDisplay[]; // Usa el tipo simple
  joinedDate: string;
}

export interface JoinRequest {
  id: string;
  hangoutId: string;
  userId: string;
  userName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

// Ambitions System (for matching)
export type AmbitionIntent = 
  | 'coffee' | 'drinks' | 'clubbing' | 'gym' 
  | 'walk' | 'brunch' | 'lunch' | 'dinner' 
  | 'movie' | 'games' | 'study' | 'explore';

export type AmbitionTimeWindow = 'now' | 'tonight' | 'weekend' | 'custom';

export type AmbitionVibe = 'chill' | 'social' | 'party' | 'active';

export interface Ambition {
  id: string;
  userId: string;
  userName: string;
  intent: AmbitionIntent;
  timeWindow: AmbitionTimeWindow;
  customTime?: string;
  vibe: AmbitionVibe;
  area?: string;
  groupSize?: { min: number; max: number };
  status: 'active' | 'matched' | 'expired';
  createdAt: string;
  expiresAt: string;
}

export interface AmbitionMatch {
  id: string;
  ambitions: Ambition[];
  status: 'pending' | 'accepted' | 'declined' | 'hangout_created';
  hangoutId?: string;
  createdAt: string;
  expiresAt: string;
}

export interface MyPlan {
  hangout: Hangout;
  userRole: 'host' | 'participant' | 'pending';
  status: 'upcoming' | 'pending_approval' | 'past' | 'cancelled';
}
