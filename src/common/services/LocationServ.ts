import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";

const LocationServ = {
  // Check if application having GPS access permission
  checkGPSPermission: async (): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      if (Capacitor.isNativePlatform()) {
        Geolocation.checkPermissions().then(
          (result) => {
            if (result.coarseLocation === "granted") {
              // If having permission show 'Turn On GPS' dialogue
              resolve(true);
            } else {
              // If not having permission ask for permission
              resolve(false);
            }
          },
          (err) => {
            alert(err);
          }
        );
      } else {
        resolve(true);
      }
    });
  },

  requestGPSPermission: async (): Promise<string> => {
    return await new Promise((resolve, reject) => {
      // Show 'GPS Permission Request' dialogue
      Geolocation.requestPermissions().then(
        (result) => {
          if (result.coarseLocation === "granted") {
            // call method to turn on GPS
            resolve("GOT_PERMISSION");
          } else {
            resolve("DENIED_PERMISSION");
          }
        },
        (error) => {
          // Show alert if user click on 'No Thanks'
          alert(
            "requestPermission Error requesting location permissions " + error
          );
        }
      );
    });
  },

};
export default LocationServ;
