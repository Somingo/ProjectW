export function loadTextFile(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          // Action to be performed when the document is read;
          resolve(httpRequest.responseText);
        } else {
          reject({status: httpRequest.status, message: httpRequest.responseText});
        }
      }
    };
    httpRequest.onerror = reject;
    httpRequest.open('GET', url, true);
    httpRequest.send();
  });
}

export async function loadJsonFile<T>(url: string): Promise<T> {
  return JSON.parse(await loadTextFile(url)) as unknown as T;
}

export async function loadImageFile(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (event) => reject({status: typeof event === 'string' ? event : event.type});
    image.src = url;
  });
}

export function getFilename(path: string): string {
  return path.split('/').pop();
}

export function getFilenameWithoutExtensions(path: string): string {
  return getFilename(path).split('.').shift();
}
