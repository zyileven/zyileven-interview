import "server-only";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";

export async function getFileContentByPath(pathDir: string) {
  // Remove leading slash if present
  const cleanPath = pathDir.startsWith('/') ? pathDir.substring(1) : pathDir;
  
  // Check if we're in production (Vercel environment)
  const isProduction = process.env.VERCEL === '1';
  
  if (isProduction) {
    // In production, fetch file from public URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zyileven-interview.vercel.app';
    const url = `${baseUrl}/${cleanPath}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      throw new Error(`Failed to fetch file from ${url}: ${error}`);
    }
  } else {
    // In development, use filesystem
    const filePath = path.join(process.cwd(), cleanPath);
    
    // Ensure path exists before reading
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    return fs.readFileSync(filePath, "utf-8").toString();
  }
}