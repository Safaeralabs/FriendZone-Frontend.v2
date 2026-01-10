import { Ambition, AmbitionMatch } from '@/types';

export const mockAmbitions: Ambition[] = [
  {
    id: 'amb-1',
    userId: 'user-1',
    userName: 'Alex Chen',
    intent: 'coffee',
    timeWindow: 'now',
    vibe: 'chill',
    area: 'Mission',
    groupSize: { min: 2, max: 4 },
    status: 'active',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'amb-2',
    userId: 'user-5',
    userName: 'Emma Davis',
    intent: 'coffee',
    timeWindow: 'now',
    vibe: 'chill',
    area: 'Mission',
    groupSize: { min: 2, max: 3 },
    status: 'active',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'amb-3',
    userId: 'user-8',
    userName: 'Lisa Park',
    intent: 'drinks',
    timeWindow: 'tonight',
    vibe: 'social',
    area: 'SOMA',
    status: 'active',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockMatches: AmbitionMatch[] = [
  {
    id: 'match-1',
    ambitions: [mockAmbitions[0], mockAmbitions[1]],
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min to accept
  },
];