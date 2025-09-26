// src/api/useCompanies.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCompaniesStore } from '../store/useCompanyStore';
import type { Company } from '../types';

const COMPANIES_KEY = ['companies'];

export function useCompanies() {
  const queryClient = useQueryClient();
  const { companies, setCompanies, addCompany } = useCompaniesStore();

  // Query: Zustand + mockCompanies data
  const companiesQuery = useQuery<Company[]>({
    queryKey: COMPANIES_KEY,
    queryFn: async () => {
      // latency simulation
      await new Promise((res) => setTimeout(res, 500));
      return companies;
    },
    initialData: companies,
  });

  // Mutation: ახალი Company-ის დამატება
  const addCompanyMutation = useMutation({
    mutationFn: async (newCompany: Company) => {
      await new Promise((res) => setTimeout(res, 500));
      addCompany(newCompany);
      return newCompany;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANIES_KEY });
    },
  });

  // Optionally override all companies
  const setCompaniesMutation = useMutation({
    mutationFn: async (newList: Company[]) => {
      await new Promise((res) => setTimeout(res, 500));
      setCompanies(newList);
      return newList;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANIES_KEY });
    },
  });

  return {
    companies: companiesQuery.data ?? [],
    isLoading: companiesQuery.isLoading,
    error: companiesQuery.error,
    addCompany: addCompanyMutation.mutate,
    addCompanyAsync: addCompanyMutation.mutateAsync,
    setCompanies: setCompaniesMutation.mutate,
    setCompaniesAsync: setCompaniesMutation.mutateAsync,
    isAdding: addCompanyMutation.isPending,
    isSetting: setCompaniesMutation.isPending,
  };
}
