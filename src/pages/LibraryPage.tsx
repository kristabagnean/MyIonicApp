import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Header from "../common/components/Header";

const LibraryPage = () => {
  return (
    <IonPage>
      <Header title="Library" />
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Library content
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LibraryPage;
