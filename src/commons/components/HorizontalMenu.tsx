import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonRow,
} from "@ionic/react";
import { logoIonic } from "ionicons/icons";

const HorizontalMenu = (): JSX.Element => {
  let imageLogoUrl = "/favicon.png";
  let url =
    "https://media.istockphoto.com/id/2154556828/photo/multigenerational-family-working-together-at-the-flower-nursery.jpg?s=2048x2048&w=is&k=20&c=ofL2H-70bcFZ2Sjwv1jap6IOSztY4C8XFrSf2yTHTR8=";
  return (
    <IonRow className="ion-hide-md-down" class="ion-align-items-center">
      <IonCol size="1">
        <img src={url} />
        {/* <IonImg src={logoIonic} /> */}
        {/* <IonIcon icon={logoIonic}/> */}
      </IonCol>
      <IonCol size="5">
        <div>
          <IonButton
            fill="clear"
            routerLink="/tabs/home"
            routerDirection="root"
          >
            Home
          </IonButton>
          <IonButton
            fill="clear"
            routerLink="/tabs/library"
            routerDirection="root"
          >
            Library
          </IonButton>
          <IonButton
            fill="clear"
            routerLink="/tabs/search"
            routerDirection="root"
          >
            Search
          </IonButton>
        </div>
      </IonCol>
    </IonRow>
  );
};
export default HorizontalMenu;
