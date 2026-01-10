import { Offer } from '@/types';

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    venueId: 'venue-1',
    venueName: 'Blue Bottle Coffee',
    title: 'Free pastry with any drink',
    description: 'Valid for groups of 3+ meeting here for the first time',
    perk: 'Free pastry',
    validUntil: '2024-03-31',
    terms: ['Groups of 3 or more', 'First-time meetups only', 'One per person'],
    tags: ['Coffee', 'Breakfast', 'Hayes Valley'],
  },
  {
    id: 'offer-2',
    venueId: 'venue-2',
    venueName: 'The Interval',
    title: '20% off food for groups',
    description: 'Exclusive discount for Friendzone hangouts',
    perk: '20% off',
    validUntil: '2024-04-30',
    terms: ['Groups of 4 or more', 'Valid Monday-Thursday', 'Must mention Friendzone'],
    tags: ['Food', 'Drinks', 'Fort Mason'],
  },
];