import { publish } from "@ionic/portals";

type Messages = { topic: "navigate:back" };

type MessageWithData = { topic: "item:select"; data: object };

export const publishNavigateBackMessage = async () => {
  await publish<Messages>({ topic: "navigate:back" });
};

export const publishItemSelect = async (dataSent: object) => {
  await publish<MessageWithData>({ topic: "item:select", data: dataSent });
};
