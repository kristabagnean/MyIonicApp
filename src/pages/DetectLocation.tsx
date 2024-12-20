import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonAlert,
  useIonAlert,
  IonButton,
  useIonToast,
  useIonRouter,
} from "@ionic/react";
import Header from "../common/components/Header";
import { publishItemSelect, publishNavigateBackMessage } from "../pub-sub";
import { Position, Geolocation } from "@capacitor/geolocation";
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetNearestMarket } from "../common/api/useGetNearestMarket";
import { NearestMarket } from "../common/models/nearestMarket";
import AlamoAlert from "../common/components/AlamoAlert";
import { PermissionsStatus } from "../common/models/permissionsStatus";
import { registerPlugin } from "@capacitor/core";
import { App } from "@capacitor/app";
import UseCurrentLocationButton from "../common/components/UseCurrentLocationButton";
import { useGeolocation } from "../common/hooks/useGeolocation";
import { AlamoApp } from "../common/plugins/AlamoApp";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  "BackgroundGeolocation"
);

const DetectLocation = () => {
  const [present] = useIonToast();
  const { location } = useGeolocation();
  const router = useIonRouter();
  //const [nearest, setNearest] = useState<NearestMarket>();
  // const closestMarket = useGetNearestMarket(location);

  const [isSettingsOpen, setSettingsIsOpen] = useState(false);

  const presentToast = (mess: string) => {
    present({
      message: mess,
      duration: 1500,
      position: "middle",
    });
  };
  const getGeolocationPermission = async () => {
    const permissions = await Geolocation.checkPermissions();
    console.log(" in the screen permissions status is ", permissions.coarseLocation);
  };
  AlamoApp.addListener('backButton', () => {
    if (router.canGoBack()) {
      router.goBack();
    } else {
      publishNavigateBackMessage();
    }
  });
  AlamoApp.addListener('pause', () => {
    console.log('App paused');
    AlamoApp.unsetBackButtonListeners();
  });
  AlamoApp.addListener('resume', () => {
    console.log('App resume');
    AlamoApp.attachBackButtonListener();
    getGeolocationPermission();
  });


  useEffect(() => {
    App.getInfo().then((info) => {
      console.log("App Info:", info.version);
    });

    //  App.addEventListener('ionBackButton', (ev:Event) => {
    //   ev.preventDefault.register(10, () => {
    //     console.log('Handler was called!');
    //   });
    //});
    console.log("location in another hookk", location);
  }, [location]);
  // useEffect(() => {
  //   console.log("userPosition", location?.coords);
  //   console.log("nearestMarket", closestMarket);
  //   if (closestMarket) {
  //     // setInitFlow(false);
  //     // setNearest(closestMarket);
  //     //  presentToast(closestMarket.market.name);
  //     console.log("nearest exists!!!!!", closestMarket.market.name);
  //   }
  // }, [closestMarket]);
  return (
    <IonPage>
      <Header
        backButton
        title="Detect Location"
        onClickListener={publishNavigateBackMessage}
        defaultHref="/tabs"
      />
      <IonContent fullscreen>
        <UseCurrentLocationButton />
        {/* <IonButton onClick={handleClick}>Get Location</IonButton>
        <AlamoAlert
          className="custom-alert"
          isOpen={isOpen}
          message="Alamo uses your location to find the Alamo Drafthouse that is closest to you."
          positiveText="Accept"
          negativeText="Decline"
          positiveButtonListener={() => {
            //   setShowRationale(false);
            setIsOpen(false);
            requestPermissions();
          }}
          negativeButtonListener={() => {
            //   setShowRationale(false);
            setIsOpen(false);
          }}
        ></AlamoAlert> */}
        {/* <AlamoAlert
          className="custom-alert"
          isOpen={isSettingsOpen}
          message="Go to seetings."
          positiveText="Accept"
          negativeText="Decline"
          positiveButtonListener={() => {
            setSettingsIsOpen(false);
            openAppSettings();
          }}
          negativeButtonListener={() => {
            setSettingsIsOpen(false);
          }}
        ></AlamoAlert> */}
        <IonLabel>Permission status</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default DetectLocation;
