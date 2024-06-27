import path from 'path';
import { fileURLToPath } from 'url';

export const setFolderPath = (url) => {
    const fileName = fileURLToPath(url);
    return path.dirname(fileName);
}