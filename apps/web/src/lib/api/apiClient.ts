import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3030";

const axiosClient = axios.create({
  baseURL: API_URL,
});

const handleError = (response: AxiosResponse) => {
  if (response.status !== 200 || !response.data.success) {
    throw new Error("Failed to fetch available currencies");
  }
};

const apiClient = {
  getAllSwapRequests: async (): Promise<object[]> => {
    const response = await axiosClient.get("/swap_requests");
    handleError(response);
    return response.data;
  },
  createSwapRequest: async (swapRequest: Record<string, any>) => {
    const response = await axiosClient.post("/swap_requests", swapRequest);
    handleError(response);
    return response.data;
  },
  getSwapRequest: async (id: string) => {
    const response = await axiosClient.get(`/swap_requests/${id}`);
    handleError(response);
    return response.data;
  },
  updateSwapRequest: async (id: string, swapRequest: Record<string, any>) => {
    const response = await axiosClient.put(`/swap_requests/${id}`, swapRequest);
    handleError(response);
    return response.data;
  },

  getAvailableCurrencies: async (): Promise<string[]> => {
    const response = await axiosClient.get("/exchange/currencies");
    handleError(response);
    return response.data.currencies;
  },
};

export default apiClient;
