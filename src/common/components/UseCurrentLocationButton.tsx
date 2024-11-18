import { IonButton, IonIcon, IonText, useIonToast } from "@ionic/react";

import { useCallback, useEffect, useState } from "react";
import { navigate } from "ionicons/icons";

import AlamoAlert from "./AlamoAlert";
import { PermissionsStatus } from "../models/permissionsStatus";
import { useGeolocation } from "../hooks/useGeolocation";
import { AlamoApp } from "../plugins/AlamoApp";

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
  const [isSettingsAlertOpen, setSettingsAlertOpen] = useState(false);
  const [initLocationFlow, setInitLocationFlow] = useState(false);
  const [wasButtonClicked, setWasButtonClicked] = useState(false);

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
    setWasButtonClicked(true);
    requestPermissions();
    // checkPermissions();
  };
  useEffect(() => {
    checkPermissions();
    console.log("check permission in useEffect ");
  }, [checkPermissions]);

  /**
   * @param {boolean} initLocationFlow  is a state variable used to control the initiation of
   * a location retrieval process. When initLocationFlow is true, it indicates that the process to
   * get the user's location should start or restart.
   **/
  useEffect(() => {
    if (permissionStatus) {
      console.log("permission status is ", permissionStatus);
      if (wasButtonClicked) {
        switch (permissionStatus) {
          case PermissionsStatus.Prompt:
            // if (initLocationFlow) {
            //   requestPermissions();
            //   setInitLocationFlow(false);
            // }
            requestPermissions();
            break;
          case PermissionsStatus.PromptWithRationale:
            // if (initLocationFlow) {
            //   setConfirmationAlertOpen(true);
            //   setInitLocationFlow(false);
            // }
            setConfirmationAlertOpen(true);
            break;
          case PermissionsStatus.Granted:
            getCurrentPosition();
            break;
          case PermissionsStatus.Denied:
            // if (initLocationFlow) {
            //   setSettingsAlertOpen(true);
            //   setInitLocationFlow(false);
            // }
            setSettingsAlertOpen(true);
            setInitLocationFlow(false);
            break;
        }
      }
    }
  }, [permissionStatus, requestPermissions, getCurrentPosition,wasButtonClicked]);
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
      <AlamoAlert
        className="adc-confirmation-alert"
        isOpen={isSettingsAlertOpen}
        message="Open app seetings."
        positiveText="Accept"
        negativeText="Decline"
        positiveButtonListener={() => {
          setSettingsAlertOpen(false);
          AlamoApp.openSettings();
        }}
        negativeButtonListener={() => {
          setSettingsAlertOpen(false);
        }}
      />
    </>
  );
};
export default UseCurrentLocationButton;
