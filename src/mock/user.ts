
import { UserProfile } from '@/types';

export const mockUser: UserProfile = {
  id: 'user-1',
  name: 'Alex Chen',
  bio: 'Coffee enthusiast, runner, always down for good conversations',
  interests: ['Coffee', 'Running', 'Tech', 'Photography', 'Books'],
  vibe: ['Chill', 'Curious', 'Active'],
  languages: ['English', 'Mandarin'],
  availability: ['Weekday evenings', 'Weekend mornings'],
  ambitions: [
    { id: 'amb-1', text: 'Try every coffee shop in the Mission', icon: '☕', expiresAt: '2024-12-31' },
    { id: 'amb-2', text: 'Run a half marathon', icon: '🏃', expiresAt: '2024-06-30' },
    { id: 'amb-3', text: 'Read 50 books this year', icon: '📚' },
  ],
  joinedDate: '2024-01-15',
};