export interface Region {
  code: string;
  name: string;
  countries: string[];
}

export const mockRegions: Region[] = [
  {
    code: 'CAU',
    name: 'Caucasus',
    countries: ['Georgia', 'Armenia', 'Azerbaijan'],
  },
  {
    code: 'EU',
    name: 'Europe',
    countries: ['Germany', 'France', 'Italy', 'Turkey'],
  },
];
