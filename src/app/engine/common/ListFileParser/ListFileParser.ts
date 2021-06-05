import {Token} from './Token';
import {TokenHandler} from './TokenHandler';

export abstract class ListFileParser<T> {
  abstract tokens: Token[];
  target: any;
  result: T;

  stringHandler: TokenHandler = (name, params, target = this.target) => target[name] = params[1];
  stringArrayHandler: TokenHandler = (name, params, target = this.target) => target[name]?.push(params[1]) ?? (target[name] = [params[1]]);
  numberHandler: TokenHandler = (name, params, target = this.target) => target[name] = Number.parseFloat(params[1]);
  intHandler: TokenHandler = (name, params, target = this.target) => target[name] = Number.parseInt(params[1], 10);
  // tslint:disable-next-line:max-line-length
  booleanHandler: TokenHandler = (name, params, target = this.target) => target[name] = ['on', '1', 'true'].includes(params[1]?.toLowerCase());
  // tslint:disable-next-line:max-line-length
  numberV2Handler: TokenHandler = (name, params, target = this.target) => target[name] = [Number.parseFloat(params[1]), Number.parseFloat(params[2])];
  // tslint:disable-next-line:max-line-length
  numberV3Handler: TokenHandler = (name, params, target = this.target) => target[name] = [Number.parseFloat(params[1]), Number.parseFloat(params[2]), Number.parseFloat(params[3])];
  // tslint:disable-next-line:max-line-length
  numberV3ArrayHandler: TokenHandler = (name, params, target = this.target) => target[name]?.push([Number.parseFloat(params[1]), Number.parseFloat(params[2]), Number.parseFloat(params[3])]) ?? (target[name] = [[Number.parseFloat(params[1]), Number.parseFloat(params[2]), Number.parseFloat(params[3])]]);

  constructor() {
    this.parseLine = this.parseLine.bind(this);
    this.parseFile = this.parseFile.bind(this);
  }

  parseFile(file: string): T {
    file.split('\n').map(x => x.trim()).forEach(this.parseLine);
    return this.result;
  }

  parseLine(line: string): void {
    const tokens = line.split(' ');
    const matchedToken = this.tokens.find(({match}) => match.includes(tokens[0]));
    if (matchedToken) {
      matchedToken.handler(matchedToken.name, tokens);
    }
  }

}
