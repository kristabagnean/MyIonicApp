import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { home, library, search } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import AppMenu from "../AppMenu";
import HomePage from "../../../pages/HomePage";
import LibraryPage from "../../../pages/LibraryPage";
import SearchPage from "../../../pages/SearchPage";
const TabNavigation = () => {
  return (
    <>
      <AppMenu />

      <IonTabs>
        <IonRouterOutlet id="content-main">
          <Redirect exact path="/tabs" to="/tabs/home" />
          <Route path="/tabs/home">
            <HomePage />
          </Route>
          <Route exact path="/tabs/library">
            <LibraryPage />
          </Route>
          <Route path="/tabs/search">
            <SearchPage />
          </Route>
          <Route exact path="/tabs">
            <Redirect to="/tabs/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="ion-hide-md-up">
          <IonTabButton tab="home" href="/tabs/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="library" href="/tabs/library">
            <IonIcon icon={library} />
            <IonLabel>Library</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/tabs/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
export default TabNavigation;
