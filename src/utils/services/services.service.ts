import { apiClient } from "@/helpers";
import { IService, IServiceSearch } from "@/types/service";

const prefix = "/service";

export const searchServices = async (
  params: IServiceSearch
): Promise<IService[]> => {
  const res = await apiClient?.get(prefix, { params });

  return res.data;
};

export const getService = async (id: string): Promise<IService> => {
  const res = await apiClient?.get(`${prefix}/${id}`);

  return res.data;
};

export const createService = async (data: IService): Promise<IService> => {
  const res = await apiClient?.post(prefix, data);

  return res.data;
};

export const updateService = async (data: IService): Promise<IService> => {
  const res = await apiClient?.put(`${prefix}/${data._id}`, data);

  return res.data;
};

export const deleteService = async (id: string) => {
  const res = await apiClient?.delete(`${prefix}/${id}`);

  return res.data;
};

export const startService = async (id: string) => {
  const res = await apiClient?.put(`${prefix}/${id}/start`);

  return res.data;
};

export const stopService = async (id: string) => {
  const res = await apiClient?.put(`${prefix}/${id}/stop`);

  return res.data;
};
