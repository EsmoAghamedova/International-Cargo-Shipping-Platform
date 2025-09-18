import { create } from 'zustand';
import type { Company } from '../types';
import { mockCompanies } from '../mock/company.mock-data';

interface CompaniesState {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  addCompany: (company: Company) => void;
}

const LOCAL_STORAGE_KEY = 'companies';

export const useCompaniesStore = create<CompaniesState>((set, get) => ({
  companies: [],
  setCompanies: (companies) => {
    set({ companies });
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        companies.filter((c) => !mockCompanies.find((m) => m.id === c.id)),
      ),
    );
  },
  addCompany: (company) => {
    const companies = [...get().companies, company];
    set({ companies });
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        companies.filter((c) => !mockCompanies.find((m) => m.id === c.id)),
      ),
    );
  },
}));

// Init: mockCompanies + localStorage
const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
if (saved) {
  const parsed = JSON.parse(saved) as Company[];
  useCompaniesStore.getState().setCompanies([...mockCompanies, ...parsed]);
} else {
  useCompaniesStore.getState().setCompanies(mockCompanies);
}
