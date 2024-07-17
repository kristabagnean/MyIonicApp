import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import TabNavigation from "./TabNavigation";
import LocationPage from "../../../pages/LocationPage";
import { AppProps } from "../../../App";

const AppRouter = ({ context }: AppProps): JSX.Element => {
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
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
