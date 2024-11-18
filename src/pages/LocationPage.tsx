import { IonContent, IonPage, IonList, IonItem, IonLabel, IonNote } from "@ionic/react";
import Header from "../common/components/Header";
import { publishItemSelect, publishNavigateBackMessage } from "../pub-sub";
import { useGetMarkets } from "../common/api/useGetMarkets";
import { MarketStatus } from "../common/models/market";
import "./LocationPage.css";
const LocationPage = () => {
  const { data: markets = [], isLoading, error } = useGetMarkets();
  
  return (
    <IonPage>
      <Header
        backButton
        title="Location"
        onClickListener={publishNavigateBackMessage}
        defaultHref="/tabs"
      />
      <IonContent fullscreen >
        <IonList lines="full">
          {markets.map((location, i) => (
            <IonItem className="item-background-color"
              onClick={() => publishItemSelect(location)}
              key={location.id}
                 disabled={location.status !== MarketStatus.Open}
            >
              <IonLabel>{location.name}</IonLabel>
              <IonNote slot="end" hidden={location.status === MarketStatus.Open} > Comming soon</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LocationPage;
