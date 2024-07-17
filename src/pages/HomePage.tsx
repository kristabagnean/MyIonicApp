import { IonContent, IonPage } from "@ionic/react";
import Header from "../commons/components/Header";
const HomePage = () => {
  return (
    <IonPage>
      <Header title="Home" />
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Listen now content
        </div>
      </IonContent>
    </IonPage>
  );
};
export default HomePage;
