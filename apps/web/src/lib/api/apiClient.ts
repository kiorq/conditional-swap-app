import axios from "axios";

const API_URL = "http://localhost:3030";

const axiosClient = axios.create({
  baseURL: API_URL,
});

const apiClient = {
  getAllSwapRequests: async (): Promise<object[]> => {
    const response = await axiosClient.get("/swap_requests");
    return response.data;
  },
  createSwapRequest: async (swapRequest: Record<string, any>) => {
    const response = await axiosClient.post("/swap_requests", swapRequest);
    return response.data;
  },
  getSwapRequest: async (id: string) => {
    const response = await axiosClient.get(`/swap_requests/${id}`);
    return response.data;
  },
  updateSwapRequest: async (id: string, swapRequest: Record<string, any>) => {
    const response = await axiosClient.put(`/swap_requests/${id}`, swapRequest);
    return response.data;
  },

  getAvailableCurrencies: async (): Promise<string[]> => {
    const response = await axiosClient.get("/exchange/currencies");
    return response.data;
  },
};

export default apiClient;
