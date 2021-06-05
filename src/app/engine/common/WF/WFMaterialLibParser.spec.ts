import {WFMaterialLibParser} from './WFMaterialLibParser';
import {WFMaterial} from './WFMaterial';

const mtlWithD1blinn1SG = `# Blender MTL File: 'None'\n# Material Count: 11\n\nnewmtl D1blinn1SG\nNs 323.999994\nKa 1.000000 1.000000 1.000000\nKd 0.500000 0.500000 0.500000\nKs 0.500000 0.500000 0.500000\nKe 0.0 0.0 0.0\nNi 1.000000\nd 1.000000\nillum 2`;
const materialD1blinn1SG: WFMaterial = {
  name: 'D1blinn1SG',
  Ns: 323.999994,
  Ka: [1, 1, 1],
  Kd: [0.5, 0.5, 0.5],
  Ks: [0.5, 0.5, 0.5],
  Ke: [0, 0, 0],
  d: 1,
  illum: 2
};
const mtlWithD1blinn2SG = `\nnewmtl D1lambert2SG\nNs 323.999994\nKa 1.000000 1.000000 1.000000\nKd 0.020000 0.020000 0.020000\nKs 0.500000 0.500000 0.500000\nKe 0.0 0.0 0.0\nNi 1.000000\nd 1.000000\nillum 2\n`;
const materialD1blinn2SG: WFMaterial = {
  name: 'D1lambert2SG',
  Ns: 323.999994,
  Ka: [1, 1, 1],
  Kd: [0.02, 0.02, 0.02],
  Ks: [0.5, 0.5, 0.5],
  Ke: [0, 0, 0],
  d: 1,
  illum: 2
};

describe('WFMaterialLibParser', () => {
  it('should be created and have the correct lib name', () => {
    const parser = new WFMaterialLibParser('test');
    expect(parser.result).toEqual({name: 'test', mtl: []});
  });
  it('should parse empty file', () => {
    const parser = new WFMaterialLibParser('test');
    parser.parseFile('');
    expect(parser.result.mtl).toEqual([]);
  });
  it('should parse 1 material', () => {
    const parser = new WFMaterialLibParser('test');
    parser.parseFile(mtlWithD1blinn1SG);
    expect(parser.result.mtl).toEqual([materialD1blinn1SG]);
  });
  it('should parse 2 material', () => {
    const parser = new WFMaterialLibParser('test');
    parser.parseFile(mtlWithD1blinn1SG + mtlWithD1blinn2SG);
    expect(parser.result.mtl).toEqual([materialD1blinn1SG, materialD1blinn2SG]);
  });
});
