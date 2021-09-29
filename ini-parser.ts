import * as fs from 'fs';
import * as path from 'path';

interface IniParseOptions {
    /**
     * comment prefix, default is [';', '#']
     */
    comments?: string[],
    /**
     * separator for key-value pairs, default is [',']
     */
    delimiters?: string[]
}

function checkAndgetEffectivePath(filePath: string) {
    let effectivePath = filePath;
    if (fs.existsSync(effectivePath)) {
        return effectivePath;
    }
    effectivePath = path.join(process.cwd(), filePath);
    if (fs.existsSync(effectivePath)) {
        return effectivePath;
    }
    throw new Error(`file path is not exists: ${effectivePath} ...`);
}

function checkIfIsFile(filePath: string) {
    if (!fs.statSync(filePath).isFile()) {
        throw new Error(`path is not a file: ${filePath}`);
    }
}

export default class IniParser {
    private readonly config: Record<string, Record<string, any>>;
    private readonly filePath: string;
    /**
     * 
     * @param {string} filePath ini file path
     * @param {BufferEncoding} encoding encoding
     * @param {IniParseOptions} [opts] ini parse options
     */
    constructor (filePath: string, encoding: BufferEncoding = 'utf-8', opts?: IniParseOptions) {
        this.filePath = checkAndgetEffectivePath(filePath);
        this.config = {};
        checkIfIsFile(filePath);
    }

    getPath() {
        return this.filePath;
    }
}
