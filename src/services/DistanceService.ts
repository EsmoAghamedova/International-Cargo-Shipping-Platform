// src/services/DistanceService.ts
export type Continent =
  | 'EU'
  | 'ASIA'
  | 'N_AMERICA'
  | 'S_AMERICA'
  | 'AFRICA'
  | 'OCEANIA'
  | 'REMOTE';

export const countriesByContinent: Record<Continent, string[]> = {
  EU: [
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Poland',
    'Netherlands',
    'Belgium',
    'Sweden',
    'Denmark',
    'Finland',
    'Austria',
    'Portugal',
    'Greece',
    'Ireland',
  ],
  ASIA: [
    'China',
    'Japan',
    'South Korea',
    'India',
    'Singapore',
    'Malaysia',
    'Thailand',
    'Vietnam',
    'Indonesia',
    'Philippines',
    'United Arab Emirates',
    'Saudi Arabia',
    'Israel',
  ],
  N_AMERICA: ['USA', 'Canada', 'Mexico'],
  S_AMERICA: ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru'],
  AFRICA: ['South Africa', 'Egypt', 'Nigeria', 'Morocco', 'Kenya'],
  OCEANIA: ['Australia', 'New Zealand', 'Fiji'],
  REMOTE: ['Greenland', 'Iceland'],
};

export const distanceFactors: Record<string, number> = {
  'EU-EU': 1.0,
  'EU-ASIA': 1.3,
  'EU-N_AMERICA': 1.4,
  'EU-S_AMERICA': 1.5,
  'EU-AFRICA': 1.2,
  'EU-OCEANIA': 1.6,
  'GLOBAL-REMOTE': 1.6,
  'ASIA-ASIA': 1.0,
  'ASIA-N_AMERICA': 1.5,
  // შეგიძლია დაამატო სხვა წყვილები
};

export class DistanceService {
  static getContinent(country: string): Continent {
    const found = (Object.keys(countriesByContinent) as Continent[]).find((c) =>
      countriesByContinent[c].includes(country),
    );
    return found ?? 'REMOTE';
  }

  static getFactor(originCountry: string, destinationCountry: string): number {
    const origin = this.getContinent(originCountry);
    const dest = this.getContinent(destinationCountry);

    if (origin === dest) return 1.0;

    const key1 = `${origin}-${dest}`;
    const key2 = `${dest}-${origin}`;

    return distanceFactors[key1] ?? distanceFactors[key2] ?? 1.5; // default
  }
}
