import { countriesByContinent, distanceFactors } from './routes-helpers.js';

export function calculatePriceQuote({
  shippingType,
  weightKg,
  lengthCm,
  widthCm,
  heightCm,
  origin,
  destination,
  declaredValue = 0,
  includeInsurance = false,
  extraSurcharges = 0,
}) {
  const volumetricWeight = (lengthCm * widthCm * heightCm) / 5000;
  const chargeableWeight = Math.max(weightKg, volumetricWeight);

  const distanceFactor = getDistanceFactor(origin, destination);

  const typeMultiplier = {
    SEA: 0.7,
    RAILWAY: 0.85,
    ROAD: 1.0,
    AIR: 1.6,
  };

  const basePrice = 18;
  const pricePerKg = 2.4;
  const base = basePrice + chargeableWeight * pricePerKg;

  const fuelSurcharge = base * 0.12;
  const insurance = includeInsurance ? declaredValue * 0.05 : 0;

  const total =
    base * typeMultiplier[shippingType] * distanceFactor +
    fuelSurcharge +
    insurance +
    extraSurcharges;

  return {
    base,
    fuelSurcharge,
    insurance,
    extraSurcharges,
    total,
    breakdown: {
      volumetricWeight,
      chargeableWeight,
      typeMultiplier: typeMultiplier[shippingType],
      distanceFactor,
    },
  };
}

function getDistanceFactor(originCountry, destinationCountry) {
  const origin = getContinent(originCountry);
  const destination = getContinent(destinationCountry);
  if (origin === destination) return 1;

  const directKey = `${origin}-${destination}`;
  const reverseKey = `${destination}-${origin}`;
  return distanceFactors[directKey] ?? distanceFactors[reverseKey] ?? 1.45;
}

function getContinent(country) {
  const entry = Object.entries(countriesByContinent).find(([, list]) =>
    list.includes(country),
  );
  return entry ? entry[0] : 'REMOTE';
}
