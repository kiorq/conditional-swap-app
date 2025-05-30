import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { SwapRequest } from "@/app/types";

export const useSwapRequests = () =>
  useQuery({
    queryKey: ["swap_requests"],
    queryFn: apiClient.getAllSwapRequests,
  });

export const useCreateSwapRequest = () =>
  useMutation({
    mutationFn: apiClient.createSwapRequest,
  });

export const useGetSwapRequest = (id: string) =>
  useQuery({
    queryKey: ["swap_requests", id],
    queryFn: () => apiClient.getSwapRequest(id),
    enabled: !!id,
  });

export const useUpdateSwapRequest = (id: string) =>
  useMutation({
    mutationFn: (swapRequest: Partial<SwapRequest>) =>
      apiClient.updateSwapRequest(id, swapRequest),
  });

export const useGetAvailableCurrencies = () =>
  useQuery({
    queryKey: ["currencies"],
    queryFn: apiClient.getAvailableCurrencies,
  });
