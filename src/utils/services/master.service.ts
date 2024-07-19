import { apiClient } from "@/helpers";
import { IMaster } from "@/types/master";

const prefix = "/master";

export const getMasterInfo = async (): Promise<IMaster> => {
  const res = await apiClient?.get(prefix);

  return res.data;
};
