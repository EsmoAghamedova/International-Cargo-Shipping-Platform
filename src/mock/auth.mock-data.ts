import type { User, Company } from "../types";

export const mockUsers: User[] = [
    {
        id: "u1",
        email: "user@test.com",
        fullName: "Test User",
        phone: "+995500111222",
        addresses: [
            {
                id: "a1",
                country: "GE",
                city: "Tbilisi",
                line1: "Rustaveli Ave 10",
                postalCode: "0108",
            },
        ],
        role: "USER",
    },
];

export const mockCompanies: Company[] = [
    {
        id: "c1",
        name: "FastCargo Ltd",
        contactEmail: "admin@fastcargo.com",
        phone: "+995500333444",
        hqAddress: {
            id: "a2",
            country: "GE",
            city: "Batumi",
            line1: "Port Street 5",
            postalCode: "6000",
        },
        regions: ["GE", "TR", "AZ"],
        supportedTypes: ["ROAD", "SEA"],
        pricing: {
            basePrice: 20,
            pricePerKg: 5,
            fuelPct: 0.1,
            insurancePct: 0.02,
            typeMultipliers: { SEA: 0.7, RAILWAY: 0.85, ROAD: 1.0, AIR: 1.6 },
            remoteAreaPct: 0.15,
        },
        role: "COMPANY_ADMIN",
        logoUrl: "https://placehold.co/100x100",
    },
];
