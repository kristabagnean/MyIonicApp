import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { home, library, search } from "ionicons/icons";
const AppMenu = (): JSX.Element => {
  return (
    <IonMenu contentId="content-main" menuId="menu-app" side="end">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonMenuToggle>
          <IonItem routerLink="/tabs/home" lines="full">
            <IonIcon icon={home} className="icon" />
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem routerLink="/tabs/library" lines="full">
            <IonIcon icon={library} className="icon" />
            <IonLabel>Library</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem routerLink="/tabs/search" lines="full">
            <IonIcon icon={search} className="icon" />
            <IonLabel>Search</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
