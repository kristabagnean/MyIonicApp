import { Geolocation, Position } from "@capacitor/geolocation";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../utils/constants";

export const useGetPosition = () => {
  const getCurrentPosition = async () => {
    const coordinates: Position = await Geolocation.getCurrentPosition();

    console.log("Current position:", coordinates);
    return coordinates;
  };

  return useQuery({
    queryKey: [QueryKey.CurrentPosition],
    queryFn: () => getCurrentPosition(),
  });
};
