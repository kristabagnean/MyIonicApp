import { IonContent, IonPage, IonList, IonItem, IonLabel } from "@ionic/react";
import Header from "../commons/components/Header";
import { publishItemSelect, publishNavigateBackMessage } from "../pub-sub";
import { useEffect, useState } from "react";
import { Location } from "../commons/models/Location";
const LocationPage = () => {
  const [locations, setTodos] = useState<Location[]>([]);
  useEffect(() => {
    async function doFetch() {
      const result = await fetch("/locations.json");
      const data = await result.json();
      setTodos(data);
    }
    doFetch();
  }, []);
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
          {locations.map((location, i) => (
            <IonItem onClick={() => publishItemSelect(location)}>
              <IonLabel>{location.name}</IonLabel>
            </IonItem>
          ))}
          {/* <IonItem onClick={() => publishItemSelect("sss")}>
            <IonLabel>Pokémon Yellow</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Mega Man X</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>The Legend of Zelda</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pac-Man</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Super Mario World</IonLabel> */}
          {/* </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LocationPage;
