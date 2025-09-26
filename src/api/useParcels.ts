// src/api/useParcels.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRequestsStore } from '../store/useRequestsStore';
import type { ParcelRequest, RequestStatus } from '../types';

const REQUESTS_KEY = ['parcelRequests'];

export function useParcels() {
  const queryClient = useQueryClient();
  const { requests, loadRequests, addRequest, updateRequestStatus } =
    useRequestsStore();

  // Query: ყველა request-ის წამოღება
  const requestsQuery = useQuery<ParcelRequest[]>({
    queryKey: REQUESTS_KEY,
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 500)); // latency simulation
      // Zustand-იდან წამოიღებს
      loadRequests();
      return requests;
    },
    initialData: requests,
  });

  // Mutation: ახალი request-ის დამატება
  const addRequestMutation = useMutation({
    mutationFn: async (req: ParcelRequest) => {
      await new Promise((res) => setTimeout(res, 500));
      addRequest(req);
      return req;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_KEY });
    },
  });

  // Mutation: request-ის სტატუსის განახლება
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      comment,
    }: {
      id: string;
      status: RequestStatus;
      comment?: string;
    }) => {
      await new Promise((res) => setTimeout(res, 500));
      updateRequestStatus(id, status, comment);
      return { id, status, comment };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_KEY });
    },
  });

  return {
    requests: requestsQuery.data ?? [],
    isLoading: requestsQuery.isLoading,
    error: requestsQuery.error,

    addRequest: addRequestMutation.mutate,
    addRequestAsync: addRequestMutation.mutateAsync,
    isAdding: addRequestMutation.isPending,

    updateStatus: updateStatusMutation.mutate,
    updateStatusAsync: updateStatusMutation.mutateAsync,
    isUpdating: updateStatusMutation.isPending,
  };
}
