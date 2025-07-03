import fs from 'fs/promises'

export async function readJSON(path){
    try {
        const text = await fs.readFile(path,'utf8');
        return JSON.parse(text);
    } catch  {
        return [];
    }
}

export async function writeJSON(path, data) {
    await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8')
}
