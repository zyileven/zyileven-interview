
import "server-only";
import path from "path";
import fs from "fs";

export function getFileContentByPath(pathDir: string) {
  // Remove leading slash if present
  const cleanPath = pathDir.startsWith('/') ? pathDir.substring(1) : pathDir;
  const filePath = path.join(process.cwd(), cleanPath);
  
  // Ensure path exists before reading
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return fileContent.toString();
}