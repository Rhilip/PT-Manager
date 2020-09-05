// from: https://gist.github.com/jonleighton/958841#gistcomment-2915919
export function arrayBufferToBase64(buffer: ArrayBuffer) {
    return btoa(new Uint8Array(buffer).reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
    }, ''));
}