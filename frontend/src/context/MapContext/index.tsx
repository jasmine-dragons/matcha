import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Map } from 'mapbox-gl'
import { loadLayers, type Location } from "./loadLayers";

interface MapContextData {
  map: Map | null;
  setMap: Dispatch<SetStateAction<Map | null>>;
  locations: Location[];
  setLocations: Dispatch<SetStateAction<Location[]>>;
}

const MapContext = createContext<MapContextData | undefined>(undefined);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used in a MapProvider");
  }
  return context;
};

interface MapProviderProps {
  children?: ReactNode;
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<Map | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (map) {
      console.log('updating map')
      loadLayers(map, locations);
    }
  }, [map, locations])

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        locations,
        setLocations,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};