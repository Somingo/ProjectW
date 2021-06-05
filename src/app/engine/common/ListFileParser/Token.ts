import {TokenHandler} from './TokenHandler';

export interface Token {
  match: string[];
  name: string;
  handler: TokenHandler;
}
