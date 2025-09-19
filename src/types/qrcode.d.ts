// src/types/qrcode.d.ts
declare module "qrcode" {
  export function toBuffer(
    text: string,
    options?: {
      width?: number;
      margin?: number;
      color?: { dark?: string; light?: string };
    }
  ): Promise<Uint8Array | ArrayBuffer | Buffer>;
}
