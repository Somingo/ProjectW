import {getFilename, getFilenameWithoutExtensions, loadImageFile, loadJsonFile, loadTextFile} from './fileUtils';

describe('fileUtils', () => {
  it('loadTextFile should download text file', async () => {
    const textFile = await loadTextFile('/assets/test/fileUtils/test.txt');
    expect(textFile).toEqual('test success\r\n');
  });
  it('loadTextFile should download and parse json file', async () => {
    const textFile = await loadJsonFile('/assets/test/fileUtils/test.json');
    expect(textFile).toEqual({test: true, result: 'success'});
  });
  it('loadImageFile should download image file', async () => {
    const image = await loadImageFile('/assets/test/fileUtils/test.png');
    expect(image.height).toEqual(1);
    expect(image.width).toEqual(1);
  });
  it('loadImageFile should throw error image file not found', async () => {
    try {
      await loadImageFile('/assets/test/fileUtils/test.jpg');
      fail('File not found error expected.');
    } catch (e) {
      expect(e).toEqual({status: 'error'});
    }
  });
  it('loadTextFile should throw proper error message on error', async () => {
    try {
      await loadTextFile('/test/notfound.txt');
      fail('File not found error expected.');
    } catch (e) {
      expect(e).toEqual({status: 404, message: 'NOT FOUND'});
    }
  });
  describe('getFileName', () => {
    [
      ['test.d.txt', 'test.d.txt'],
      ['asdf/qwer/tyui/test.d.txt', 'test.d.txt'],
      ['/asdf/qwer/tyui/test.d.txt', 'test.d.txt'],
    ].forEach(
      ([input, expected]) => it(`should ${input} be ${expected}`, () => {
        expect(getFilename(input)).toEqual(expected);
      })
    )
    ;
  });
  describe('getFilenameWithoutExtensions', () => {
    [
      ['test.d.txt', 'test'],
      ['asdf/qwer/tyui/test.d.txt', 'test'],
      ['/asdf/qwer/tyui/test.d.txt', 'test'],
    ].forEach(
      ([input, expected]) => it(`should ${input} be ${expected}`, () => {
        expect(getFilenameWithoutExtensions(input)).toEqual(expected);
      })
    )
    ;
  });
});
