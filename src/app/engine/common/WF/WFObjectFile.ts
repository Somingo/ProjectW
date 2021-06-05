import {WFObject} from './WFObject';

export interface WFObjectFile {
  name: string;
  mtllib: string[];
  o: WFObject[];
}
