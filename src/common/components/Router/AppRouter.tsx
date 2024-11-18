import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, useLocation } from "react-router";
import TabNavigation from "./TabNavigation";
import LocationPage from "../../../pages/LocationPage";
import { AppProps } from "../../../App";
import DetectLocation from "../../../pages/DetectLocation";
import { useEffect } from "react";

const AppRouter = ({ context }: AppProps): JSX.Element => {

  useEffect(() => {
    if (context) {
      console.log("Context starting route: ", context?.startingRoute);
    }
  }, [ context]);
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        {context?.startingRoute ? (
          <Route exact path="/">
            {context.startingRoute === "/" ? (
              <TabNavigation />
            ) : (
              <Redirect to={context.startingRoute} />
            )}
          </Route>
        ) : (
          <>
            <Route path="/tabs" render={() => <TabNavigation />} />
            <Route exact path="/">
              <Redirect to="/tabs" />
            </Route>
          </>
        )}

        <Route path="/tabs/location" component={LocationPage} />
        <Route path="/tabs/detect-location" component={DetectLocation} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
