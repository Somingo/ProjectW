import {WFMaterialLib} from './WFMaterialLib';
import {WFMaterial} from './WFMaterial';
import {TokenHandler} from '../ListFileParser/TokenHandler';
import {ListFileParser} from '../ListFileParser/ListFileParser';

export class WFMaterialLibParser extends ListFileParser<WFMaterialLib> {

  constructor(libName?: string) {
    super();
    this.newMatLib = this.newMatLib.bind(this);
    this.result = this.newMatLib(libName);
    this.target = this.result;
  }

  newmtlHandler: TokenHandler = (name, params) => {
    this.target = this.newMaterial(params[1]);
    this.result.mtl.push(this.target as WFMaterial);
  };

  // tslint:disable-next-line:member-ordering
  tokens = [
    {name: 'name', match: ['newmtl'], handler: this.newmtlHandler},
    {name: 'Ka', match: ['Ka'], handler: this.numberV3Handler},
    {name: 'Kd', match: ['Kd'], handler: this.numberV3Handler},
    {name: 'Ks', match: ['Ks'], handler: this.numberV3Handler},
    {name: 'Ke', match: ['Ke'], handler: this.numberV3Handler},
    {name: 'Ns', match: ['Ns'], handler: this.numberHandler},
    {name: 'd', match: ['d', 'Tr'], handler: this.numberHandler},
    {name: 'map_Ka', match: ['map_Ka'], handler: this.stringHandler},
    {name: 'map_Kd', match: ['map_Kd'], handler: this.stringHandler},
    {name: 'map_Ks', match: ['map_Ks'], handler: this.stringHandler},
    {name: 'map_Ke', match: ['map_Ke'], handler: this.stringHandler},
    {name: 'map_Ns', match: ['map_Ns'], handler: this.stringHandler},
    {name: 'map_d', match: ['map_d', 'map_Tr'], handler: this.stringHandler},
    {name: 'map_bump', match: ['map_bump', 'bump'], handler: this.stringHandler},
    {name: 'disp', match: ['disp'], handler: this.stringHandler},
    {name: 'decal', match: ['decal'], handler: this.stringHandler},
    {name: 'illum', match: ['illum'], handler: this.intHandler},
  ];

  newMatLib(name = '__default__'): WFMaterialLib {
    return {
      name,
      mtl: [],
    };
  }

  newMaterial(name): WFMaterial {
    return {
      name
    };
  }
}
