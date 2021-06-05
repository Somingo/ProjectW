export interface WFMaterial {
  name: string;
  Ka?: [number, number, number];
  Kd?: [number, number, number];
  Ks?: [number, number, number];
  Ke?: [number, number, number];
  Ns?: number;
  d?: number;
  map_Ka?: string;
  map_Kd?: string;
  map_Ks?: string;
  map_Ke?: string;
  map_Ns?: string;
  map_d?: string;
  map_bump?: string;
  disp?: string;
  decal?: string;
  illum?: number;
}
