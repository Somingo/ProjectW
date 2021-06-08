import {ListFileParser} from '../ListFileParser/ListFileParser';
import {WFObjectFile} from './WFObjectFile';
import {WFObject} from './WFObject';
import {WFGroup} from './WFGroup';
import {TokenHandler} from '../ListFileParser/TokenHandler';

export class WFObjectFileParser extends ListFileParser<WFObjectFile> {

  constructor(name: string) {
    super();
    this.result = {o: [], name, mtllib: []};
    this.target = this.result;
    this.targetObject = this.getObject();
    this.result.o.push(this.targetObject);
    this.targetGroup = this.getGroup();
    this.targetObject.g.push(this.targetGroup);
  }

  targetObject: WFObject;
  targetGroup: WFGroup;

  wfObjectHandler: TokenHandler = (name, params) => {
    this.targetObject = this.getObject(params[1]);
    this.targetGroup = this.getGroup();
    this.targetObject.g.push(this.targetGroup);
    this.result.o.push(this.targetObject);
  };

  wfGroupHandler: TokenHandler = (name, params) => {
    this.targetGroup = this.getGroup(params[1]);
    this.targetObject.g.push(this.targetGroup);
  };

  wfTriangleParam = (param: string): void => {
    const [v, t, n] = param.split('/').map(p => p !== '' ? parseInt(p, 10) : null);
    this.targetGroup.vInd.push(v);
    this.targetGroup.vtInd.push(t);
    this.targetGroup.vnInd.push(n);
  };

  wfTriangleHandler: TokenHandler = (name, params) => {
    const temp: string[] = [params[1], params[2], params[3]];
    if (params.length === 5) {
      temp.push(params[2]);
      temp.push(params[3]);
      temp.push(params[4]);
    }
    temp.forEach((param, index) => this.wfTriangleParam(param));

  };

  // tslint:disable-next-line:member-ordering
  tokens = [
    {name: 'v', match: ['v'], handler: (name, params) => this.numberV3ArrayHandler(name, params, this.targetObject)},
    {name: 'vt', match: ['vt'], handler: (name, params) => this.numberV3ArrayHandler(name, params, this.targetObject)},
    {name: 'vn', match: ['vn'], handler: (name, params) => this.numberV3ArrayHandler(name, params, this.targetObject)},
    {name: 'mtllib', match: ['mtllib'], handler: this.stringArrayHandler},
    {name: 'o', match: ['o'], handler: this.wfObjectHandler},
    {name: 'g', match: ['g'], handler: this.wfGroupHandler},
    {name: 'f', match: ['f'], handler: this.wfTriangleHandler},
    {name: 's', match: ['s'], handler: ((name, params) => this.booleanHandler(name, params, this.targetGroup))},
    {name: 'usemtl', match: ['usemtl'], handler: ((name, params) => this.stringHandler(name, params, this.targetGroup))},
  ];

  getObject(name = '__default__'): WFObject {
    return {
      name,
      v: [], vn: [], vt: [],
      g: []
    };
  }

  getGroup(name = '__default__'): WFGroup {
    return {
      name,
      vInd: [],
      vtInd: [],
      vnInd: [],
      s: false,
      usemtl: null
    };
  }
}

