import { SwapRequest } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.API_URL || "http://localhost:3030";

const axiosClient = axios.create({
  baseURL: API_URL,
});

const handleError = (response: AxiosResponse) => {
  if (response.status !== 200 || !response.data.success) {
    throw new Error("Failed to fetch available currencies");
  }
};

const apiClient = {
  getAllSwapRequests: async (): Promise<SwapRequest[]> => {
    const response = await axiosClient.get("/swap_requests");
    handleError(response);
    return response.data.swap_requests;
  },
  createSwapRequest: async (
    swapRequest: Partial<SwapRequest>
  ): Promise<SwapRequest> => {
    const response = await axiosClient.post("/swap_requests", swapRequest);
    handleError(response);

    return response.data.swap_request;
  },
  getSwapRequest: async (id: string): Promise<SwapRequest> => {
    const response = await axiosClient.get(`/swap_requests/${id}`);
    handleError(response);
    return response.data.swap_request;
  },
  updateSwapRequest: async (id: string, swapRequest: Partial<SwapRequest>) => {
    const response = await axiosClient.put(`/swap_requests/${id}`, swapRequest);
    handleError(response);
    return response.data;
  },

  getAvailableCurrencies: async (): Promise<Record<string, number>> => {
    const response = await axiosClient.get("/exchange/currencies");
    handleError(response);
    return response.data.currencies;
  },
};

export default apiClient;
