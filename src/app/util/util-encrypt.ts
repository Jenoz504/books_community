import * as CryptoJs from "crypto-js";

export const encriptar = (data: string):string => {
  return CryptoJs.AES.encrypt(data, 'HIPOTENUSA').toString();
};

export const desencriptar = (valorEncriptado: string) => {
  return CryptoJs.AES.decrypt(valorEncriptado, 'HIPOTENUSA').toString(CryptoJs.enc.Utf8);
};