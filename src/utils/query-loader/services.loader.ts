import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import {
  createService,
  deleteService,
  getService,
  searchServices,
  startService,
  stopService,
  updateService,
} from "../services/services.service";
import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "./react-query";

export const CACHE_SERVICE = {
  DETAIL: "SERVICE_DETAIL",
  SEARCH: "SERVICES",
};

// Create
export const useCreateService = ({
  config,
}: {
  config?: MutationConfig<typeof createService>;
}) => {
  return useMutation({
    ...config,
    mutationFn: createService,
  });
};

// Search
export const useSearchServices = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchServices>;
}) =>
  useQuery<ExtractFnReturnType<typeof searchServices>>({
    ...config,
    queryKey: [CACHE_SERVICE.SEARCH, params],
    queryFn: async () => searchServices(params),
  });

// Read
export const useGetService = ({
  id,
  config,
}: {
  id: string;
  config?: QueryConfig<typeof getService>;
}) =>
  useQuery<ExtractFnReturnType<typeof getService>>({
    ...config,
    queryKey: [CACHE_SERVICE.DETAIL, id],
    queryFn: async () => getService(id),
  });

// Update
export const useUpdateService = ({
  config,
}: {
  config?: MutationConfig<typeof updateService>;
}) => {
  return useMutation({
    ...config,
    mutationFn: updateService,
  });
};

// Delete
export const useDeleteService = ({
  config,
}: {
  config?: MutationConfig<typeof deleteService>;
}) => {
  return useMutation({
    ...config,
    mutationFn: deleteService,
  });
};

// Start service
export const useStartService = ({
  config,
}: {
  config?: MutationConfig<typeof startService>;
}) => {
  return useMutation({
    ...config,
    mutationFn: startService,
  });
};
// Stop service
export const useStopService = ({
  config,
}: {
  config?: MutationConfig<typeof stopService>;
}) => {
  return useMutation({
    ...config,
    mutationFn: stopService,
  });
};
