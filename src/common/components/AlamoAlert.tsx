import { IonAlert } from "@ionic/react";
import './AlamoAlert.scss';

interface AlertProps {
  className: string;
  isOpen: boolean;
  title?: string;
  message: string;
  positiveText: string;
  negativeText?: string;
  positiveButtonListener?: () => void;
  negativeButtonListener?: () => void;
}

const AlamoAlert = ({
  className,
  isOpen = false,
  title,
  message,
  positiveText,
  negativeText = "Cancel",
  positiveButtonListener,
  negativeButtonListener,
}: AlertProps): JSX.Element => {
  return (
    <>
      <IonAlert
        className={className}
        message={message}
        isOpen={isOpen}
        buttons={[
          {
            text: positiveText,
            role: "confirm",
            handler: positiveButtonListener,
          },
          {
            text: negativeText,
            role: "cancel",
            handler: negativeButtonListener,
          },
        ]}
      ></IonAlert>
    </>
  );
};

export default AlamoAlert;
