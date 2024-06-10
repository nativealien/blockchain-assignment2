import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const setFolderPath = (url) => {
    const fileName = fileURLToPath(url);
    return path.dirname(fileName);
}

export const writeFileAsync = async (folder, file, data) => await writeFile(folder, data)

export const readFileAsync = async (filePath) => {
    if(!fs.existsSync(filePath) || fs.statSync(filePath).size === 0 ) return []
    else{
        const data = await readFile(filePath, { encoding: 'utf-8' })
        return JSON.parse(data)
    }
}
