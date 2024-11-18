import { useState, useCallback } from 'react';
import { Position, Geolocation } from '@capacitor/geolocation';
import { useIonToast } from '@ionic/react';
import { PortalMessage } from '@ionic/portals';



/**
 * Custom hook for managing geolocation functionality.
 */
export const useGeolocation = () => {
  const [showToast] = useIonToast();
  const [location, setLocation] = useState<Position>();
  const [permissionStatus, setPermissionStatus] = useState<string>();
  const displayToast = useCallback(
    (mess: string) => {
      showToast({
        message: mess,
        duration: 1500,
        position: 'bottom',
      });
    },
    [showToast],
  );
  /**
   * Checks the location permissions for accessing the device's location.
   */
  const checkPermissions = useCallback(async () => {
    try {
      const permissions = await Geolocation.checkPermissions();
      console.log('check permissions callback', permissions.coarseLocation);
      setPermissionStatus(permissions.coarseLocation);
    } catch (error) {
      displayToast('Location services are disabled on your mobile device.');
    }
  }, [displayToast]);
  /**
   * Requests permissions for accessing the user's location.
   */
  const requestPermissions = useCallback(async () => {
    try {
      const permissions = await Geolocation.requestPermissions();
      console.log('request permissions callback', permissions.coarseLocation);
      setPermissionStatus(permissions.coarseLocation);
    } catch (error) {
      displayToast('Location services are disabled on your mobile device.');
    }
  }, [displayToast]);

 
  /**
   * Retrieves the user's current position using the Geolocation API.
   * @returns {Promise<Position>} A promise that resolves when the user's position is successfully
   * retrieved.
   */
  const getCurrentPosition = useCallback(async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      });
      setLocation(coordinates);
    } catch (error) {
      const err = error as Error;
      displayToast(`failed getting current location: ${err.message}`);
      console.error(error);
    }
  }, [displayToast]);

  return { location, permissionStatus, checkPermissions, requestPermissions, getCurrentPosition };
};
