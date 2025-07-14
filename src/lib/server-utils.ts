
import "server-only";
import path from "path";
import fs from "fs";

export function getFileContentByPath(pathDir: string) {
  const debounceFilePath = path.join(process.cwd(), pathDir);
  const debounceFileContent = fs.readFileSync(debounceFilePath, "utf-8");
  return debounceFileContent.toString();
}