// const fs = require('fs').promises;
import { promises as fs } from "fs"; // Node > v11
import * as yaml from "js-yaml";

/**
 * Read YAML file
 *
 * @param {string} path Path to YAML file
 * @return {Promise<object>} Parsed YAML as a JS object
 */
async function readYAMLFile(path: string): Promise<object> {
  let buffer: any;
  try {
    buffer = await fs.readFile(path, "utf8");
    return yaml.safeLoad(buffer);
  } catch (e) {
    if (e.name && e.name === "YAMLException") {
      const reason = `${e.name}: ${e.reason}; line ${e.mark.line}, column ${e.mark.column}`;
      throw new Error(reason);
    } else if (e.code && e.code === "ENOENT") {
      const reason = `no such file or directory; ${e.syscall} ${e.path}`;
      throw new Error(reason);
    }
    throw e;
  }
}

/**
 * Convert YAML file to JSON
 *
 * @param {string} path Path to the file
 * @param {number} indentation Number of spaces to use for indentation
 * @return {Promise<string>} JSON string buffer
 */
async function readYAMLFileToJSON(path: string, indentation: number = 0): Promise<string> {
  const buffer = await readYAMLFile(path);
  return JSON.stringify(buffer, null, indentation);
}

export { readYAMLFile, readYAMLFileToJSON };
