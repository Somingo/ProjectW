import {WFObjectFileParser} from './WFObjectFileParser';

const testobj = `mtllib cube.mtl
o Cube
v 1.000000 1.000000 -1.000000
v 1.000000 -1.000000 -1.000000
v 1.000000 1.000000 1.000000
vt 0.375000 0.000000 0.000000
vt 0.625000 0.000000 0.000000
vt 0.625000 0.250000 0.000000
vn 0.0000 1.0000 0.0000
vn 0.0000 0.0000 1.0000
vn -1.0000 0.0000 0.0000
g groupName
usemtl Material
s off
f 1/1/1 5/2/1 7/3/1 3/4/1
`;

describe('WFObjectFileParser', () => {
  it('should be empty with name', () => {
    const parser = new WFObjectFileParser('test.obj');
    expect(parser.result).toEqual({
      name: 'test.obj',
      mtllib: [],
      o: [{
        name: '__default__',
        v: [],
        vt: [],
        vn: [],
        g: [{name: '__default__', vInd: [], vtInd: [], vnInd: [], s: false, usemtl: null}]
      }],

    });
  });
  it('should parse obj file correctly', () => {
    const parser = new WFObjectFileParser('test.obj');
    parser.parseFile(testobj);
    expect(parser.result).toEqual({
      name: 'test.obj',
      mtllib: ['cube.mtl'],
      o: [
        {
          name: '__default__',
          v: [],
          vt: [],
          vn: [],
          g: [{name: '__default__', vInd: [], vtInd: [], vnInd: [], s: false, usemtl: null}]
        }, {
          name: 'Cube',
          v: [[1, 1, -1], [1, -1, -1], [1, 1, 1]],
          vt: [[0.375, 0, 0], [0.625, 0, 0], [0.625, 0.25, 0]],
          vn: [[0, 1, 0], [0, 0, 1], [-1, 0, 0]],
          g: [
            {name: '__default__', vInd: [], vtInd: [], vnInd: [], s: false, usemtl: null},
            {
              name: 'groupName',
              vInd: [1, 5, 7, 3],
              vtInd: [1, 2, 3, 4],
              vnInd: [1, 1, 1, 1],
              s: false,
              usemtl: 'Material'
            }
          ]
        }]

    });
  });
});
