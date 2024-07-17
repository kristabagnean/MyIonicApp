import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
  IonButton,
} from "@ionic/react";
import { logoIonic, arrowBackOutline, alertCircleOutline } from "ionicons/icons";
import HorizontalMenu from "./HorizontalMenu";
interface HeaderProps extends Pick<HTMLIonBackButtonElement, "defaultHref"> {
  backButton?: boolean;
  title?: string;
  onClickListener?: () => void;
}

const Header = ({
  backButton = false,
  defaultHref,
  title,
  onClickListener = undefined
}: HeaderProps): JSX.Element => {
  let imageLogoUrl = "/favicon.png";
  return (
    <IonHeader>
      <IonToolbar>
        {backButton && (
          <IonButtons slot="start">
        
            {onClickListener !== undefined && (
              <IonButton onClick={onClickListener}>
                <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
              
              </IonButton>
            )}
            {onClickListener === undefined && (
              <IonBackButton
                defaultHref={defaultHref}
              />
            )}
          </IonButtons>
        )}
        <IonTitle className="ion-hide-md-up">{title}</IonTitle>
        <HorizontalMenu />
        <IonButtons slot="end">
          <IonMenuButton
            autoHide={false}
            menu="menu-app"
            className="ion-hide-md-down"
          ></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
