import { create } from "zustand";

export type Company = {
    id: string;
    name: string;
    // Add other fields as needed
};

interface CompaniesState {
    companies: Company[];
    setCompanies: (companies: Company[]) => void;
    addCompany: (company: Company) => void;
    // More actions as needed
}

const LOCAL_STORAGE_KEY = "companies";

export const useCompaniesStore = create<CompaniesState>((set, get) => ({
    companies: [],
    setCompanies: (companies) => {
        set({ companies });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(companies));
    },
    addCompany: (company) => {
        const companies = [...get().companies, company];
        set({ companies });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(companies));
    },
}));

// Load from localStorage on init
const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
if (saved) {
    useCompaniesStore.getState().setCompanies(JSON.parse(saved));
}