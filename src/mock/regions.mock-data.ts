export interface Region {
  code: string; // ISO2 კოდი (e.g. GE, TR, EU)
  name: string;
}

export const mockRegions: Region[] = [
  { code: 'GE', name: 'Georgia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'RU', name: 'Russia' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'EU', name: 'European Union' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KR', name: 'South Korea' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
];
