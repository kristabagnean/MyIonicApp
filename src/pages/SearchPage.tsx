import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Header from "../commons/components/Header";

const SearchPage = () => (
  <IonPage>
    <Header title="Search" />
    <IonContent fullscreen>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        Search content
      </div>
    </IonContent>
  </IonPage>
);

export default SearchPage;
