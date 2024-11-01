import { PermissionState } from "@capacitor/core";
import { Geolocation, PermissionStatus } from "@capacitor/geolocation";
import { useEffect, useState } from "react";

export const useCheckLocPermission = () => {
  const [state, setState] = useState<PermissionState>();
  useEffect(() => {
    const getPermissionStatus = async () => {
      const status: PermissionStatus = await Geolocation.checkPermissions();
      console.log("Current status:", status.coarseLocation);
      setState(status.coarseLocation);
      return status.coarseLocation;
    };
    getPermissionStatus().catch((error) => {
      console.log("failed to check permission status:", error);
    });
  }, []);
  return state;
};
