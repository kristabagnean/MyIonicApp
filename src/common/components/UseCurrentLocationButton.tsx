import { IonButton, IonIcon, IonText, useIonToast } from "@ionic/react";

import { useCallback, useEffect, useState } from "react";
import { navigate } from "ionicons/icons";

import AlamoAlert from "./AlamoAlert";
import { PermissionsStatus } from "../models/permissionsStatus";
import { useGeolocation } from "../hooks/useGeolocation";

const UseCurrentLocationButton = (): JSX.Element => {
  const {
    location,
    permissionStatus,
    checkPermissions,
    requestPermissions,
    getCurrentPosition,
  } = useGeolocation();
  const [showToast] = useIonToast();
  const [isConfirmationAlertOpen, setConfirmationAlertOpen] = useState(false);
  const [initLocationFlow, setInitLocationFlow] = useState(false);

  const displayToast = useCallback(
    (mess: string) => {
      showToast({
        message: mess,
        duration: 1500,
        position: "bottom",
      });
    },
    [showToast]
  );
  const handleCurrentLocation = () => {
    setInitLocationFlow(true);
    checkPermissions();
  };

  /**
   * @param {boolean} initLocationFlow  is a state variable used to control the initiation of
   * a location retrieval process. When initLocationFlow is true, it indicates that the process to
   * get the user's location should start or restart.
   **/
  useEffect(() => {
    if (permissionStatus) {
      switch (permissionStatus) {
        case PermissionsStatus.Prompt:
          if (initLocationFlow) {
            requestPermissions();
            setInitLocationFlow(false);
          }
          break;
        case PermissionsStatus.PromptWithRationale:
          if (initLocationFlow) {
            setConfirmationAlertOpen(true);
            setInitLocationFlow(false);
          }
          break;
        case PermissionsStatus.Granted:
          getCurrentPosition();
          break;
        case PermissionsStatus.Denied:
          if (initLocationFlow) {
            displayToast("Location permissions denied.");
            setInitLocationFlow(false);
          }
          break;
      }
    }
  }, [
    permissionStatus,
    isConfirmationAlertOpen,
    initLocationFlow,
    requestPermissions,
    getCurrentPosition,
    displayToast,
  ]);
  useEffect(() => {
    console.log("location in small component", location?.coords.latitude);
  }, [location]);
  return (
    <>
      <IonButton onClick={handleCurrentLocation} fill="clear">
        <IonIcon slot="start" icon={navigate} color="secondary"></IonIcon>
        <IonText color="secondary">Use Current Location</IonText>
      </IonButton>
      <AlamoAlert
        className="adc-confirmation-alert"
        isOpen={isConfirmationAlertOpen}
        message="Alamo uses your location to find the Alamo Drafthouse that is closest to you."
        positiveText="Accept"
        negativeText="Decline"
        positiveButtonListener={() => {
          setConfirmationAlertOpen(false);
          requestPermissions();
        }}
        negativeButtonListener={() => {
          setConfirmationAlertOpen(false);
        }}
      />
    </>
  );
};
export default UseCurrentLocationButton;
