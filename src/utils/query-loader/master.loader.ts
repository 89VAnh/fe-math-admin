import { useQuery } from "@tanstack/react-query";
import { getMasterInfo } from "../services/master.service";
import { ExtractFnReturnType, QueryConfig } from "./react-query";

export const CACHE_MASTER = {
  DETAIL: "MASTER",
};

export const useGetMasterInfo = ({
  config,
}: {
  config?: QueryConfig<typeof getMasterInfo>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getMasterInfo>>({
    ...config,
    queryKey: [CACHE_MASTER.DETAIL],
    queryFn: () => getMasterInfo(),
  });
};
