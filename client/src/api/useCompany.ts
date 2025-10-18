import { useQuery } from '@tanstack/react-query';
import { CompanyService, type CompanyFilters } from '../services/CompanyService';
import type { Company } from '../types';

export function useCompanies(filters: CompanyFilters = {}) {
  return useQuery<Company[]>({
    queryKey: ['companies', filters],
    queryFn: () => CompanyService.list(filters),
  });
}
