import type { User } from "../types";

export const mockUsers: User[] = [
    {
        id: "u1",
        email: "user1@test.com",
        fullName: "Nino Beridze",
        phone: "+995500111222",
        addresses: [
            {
                id: "a1",
                country: "GE",
                city: "Tbilisi",
                line1: "Rustaveli Ave 15",
                postalCode: "0108",
            },
            {
                id: "a2",
                country: "GE",
                city: "Batumi",
                line1: "Chavchavadze St 5",
                postalCode: "6000",
            },
        ],
        role: "USER",
    },
    {
        id: "u2",
        email: "user2@test.com",
        fullName: "Giorgi Lomidze",
        phone: "+995500222333",
        addresses: [
            {
                id: "a3",
                country: "GE",
                city: "Kutaisi",
                line1: "Main Square 12",
                postalCode: "4600",
            },
        ],
        role: "USER",
    },
];
