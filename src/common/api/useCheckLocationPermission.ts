import { Geolocation, PermissionStatus } from "@capacitor/geolocation";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../utils/constants";

export const useCheckPermission = () => {
  const getPermissionStatus = async () => {
    const status :PermissionStatus = await Geolocation.checkPermissions();

    console.log("Current status:", status.coarseLocation);
    return status.coarseLocation;
  };

  return useQuery({
    queryKey: [QueryKey.LocationPermissionStatus],
    queryFn: () => getPermissionStatus(),
  });
};
