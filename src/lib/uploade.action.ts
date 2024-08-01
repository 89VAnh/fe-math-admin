import { apiClient } from "@/helper/api";

const prefix = "core";

export const uploadFile = async (data: any): Promise<any> => {
  const result = await apiClient.post(`${prefix}/upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};
