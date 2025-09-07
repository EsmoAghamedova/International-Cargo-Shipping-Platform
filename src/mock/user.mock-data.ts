import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    fullName: 'Esmira Aghamedova',
    email: 'esmira@example.com',
    addresses: [
      {
        city: 'Tbilisi',
        country: 'Georgia',
        street: 'Rustaveli Ave 10',
        postalCode: '0108',
      },
    ],
    role: 'USER',
  },
  {
    id: 'user-2',
    fullName: 'Levan Giorgadze',
    email: 'levan@example.com',
    addresses: [
      {
        city: 'Batumi',
        country: 'Georgia',
        street: 'Chavchavadze St 15',
        postalCode: '6000',
      },
    ],
    role: 'USER',
  },
];
