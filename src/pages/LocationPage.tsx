import { IonContent, IonPage, IonList, IonItem, IonLabel } from "@ionic/react";
import Header from "../common/components/Header";
import { publishItemSelect, publishNavigateBackMessage } from "../pub-sub";
import { useEffect, useState } from "react";
import { Location } from "../common/models/Location";
import { useGetMarkets } from "../common/api/useGetMarkets";
const LocationPage = () => {
  const [locations, setTodos] = useState<Location[]>([]);
  const { data: markets = [], isLoading } = useGetMarkets();
  return (
    <IonPage>
      <Header
        backButton
        title="Location"
        onClickListener={publishNavigateBackMessage}
        defaultHref="/tabs"
      />
      <IonContent fullscreen>
        <IonList>
          {markets.map((location, i) => (
            <IonItem
              onClick={() => publishItemSelect(location)}
              key={location.id}
            >
              <IonLabel>{location.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LocationPage;
