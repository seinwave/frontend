export interface Sector {
  id: number;
  name: string;
  coordinates: [number[], number[], number[], number[]];
  geojson_string: string;
}

export interface Plant {
  id: number;
  name: string;
  sector_id: number;
  cultivar_id: number;
  latitude: number;
  longitude: number;
  form: number;
  status?: number;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface SectorObject {
  type: string;
  properties: { name: string };
  geometry: {
    type: string;
    coordinates: [number[], number[], number[], number[]];
  };
  geometries: Array<any>;
}
