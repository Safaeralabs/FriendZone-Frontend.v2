import { Event } from '@/types';

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'SF Tech Mixer',
    description: 'Monthly networking event for tech professionals',
    venue: 'The Battery',
    time: '2024-02-15T19:00:00',
    hangoutsCount: 8,
    tags: ['Tech', 'Networking', 'Professional'],
  },
  {
    id: 'event-2',
    title: 'Indie Film Screening',
    description: 'Premiere of local filmmaker\'s latest work',
    venue: 'Alamo Drafthouse',
    time: '2024-02-16T20:00:00',
    hangoutsCount: 3,
    tags: ['Film', 'Arts', 'Culture'],
  },
  {
    id: 'event-3',
    title: 'Saturday Farmers Market',
    description: 'Fresh produce, artisan goods, and community vibes',
    venue: 'Ferry Building',
    time: '2024-02-17T09:00:00',
    hangoutsCount: 12,
    tags: ['Food', 'Outdoors', 'Community'],
  },
];