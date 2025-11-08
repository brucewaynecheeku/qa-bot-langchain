declare module 'pdf-parse' {
  interface PDFParseOptions {
    pagerender?: (pageData: any) => Promise<string> | string;
    max?: number;
    version?: string;
    normalizeWhitespace?: boolean;
    disableCombineTextItems?: boolean;
  }

  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: any | null;
    metadata: any | null;
    text: string;
    version: any;
  }

  function pdfParse(dataBuffer: Buffer | Uint8Array, options?: PDFParseOptions): Promise<PDFParseResult>;
  export default pdfParse;
}

declare module 'pdf-parse/lib/pdf-parse.js' {
  import pdfParse from 'pdf-parse';
  export default pdfParse;
}
