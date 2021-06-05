import {WFGroup} from './WFGroup';

export interface WFObject {
  name: string;
  v: [number, number, number][];
  vt: [number, number, number][];
  vn: [number, number, number][];
  g: WFGroup[];
}
