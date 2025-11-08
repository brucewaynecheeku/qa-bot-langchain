import path from "node:path";
import fs from "node:fs/promises";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

/**
 * Load a PDF or DOCX document and return its text content
 */
export async function loadDocument(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  try {
    if (ext === ".pdf") {
      const data = await fs.readFile(filePath);
      const parsed = await pdfParse(data);
      // pdf-parse returns an object with a `text` property
      return (parsed.text || "").trim();
    }

    if (ext === ".docx") {
      // mammoth.extractRawText returns an object with a `value` string
      const result = await mammoth.extractRawText({ path: filePath });
      return (result.value || "").trim();
    }

    throw new Error(`Unsupported file type: ${ext}. Only .pdf and .docx are supported.`);
    
  } catch (error) {
    throw new Error(
      `Failed to load document at ${filePath}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Get all PDF and DOCX files from a directory
 */
export async function getResumeFiles(documentsDir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(documentsDir);
    const resumeFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".pdf" || ext === ".docx";
    });
    
    return resumeFiles.map(file => path.join(documentsDir, file));
  } catch (error) {
    throw new Error(
      `Failed to read documents directory at ${documentsDir}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
