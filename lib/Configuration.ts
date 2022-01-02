import { readFileSync } from "fs";
import Section from "./Section";
import { ItemValue } from "./types";
import { isTrue } from "./util";

export default class Configuration {
    private readonly sections = new Map<string, Section>();
    private filePath: string;

    constructor(filePath?: string) {
        this.filePath = filePath || null;
    }

    static parse(str: string): Configuration {
        const config = new Configuration();

        

        return config;
    }

    static loadFromFile(filePath: string, options: { encoding: BufferEncoding; flag?: string | undefined; } | BufferEncoding = 'utf8') {
        const config = this.parse(readFileSync(filePath, options));
        config.setFilePath(filePath);
        return config;
    }

    setFilePath(filePath: string) {
        this.filePath = filePath;
    }

    getFilePath(filePath: string) {
        this.filePath = filePath;
    }

    getAllSections() {
        return Array.from(this.sections.values());
    }

    getSection(sectionName: string) {
        const section = this.sections.get(sectionName);
        if (!section) {
            throw new Error(`no section named ${sectionName}`);
        }
        return section;
    }

    removeSection(sectionName: string) {
        return this.sections.delete(sectionName);
    }

    get(sectionName: string, key: string) {
        const section = this.getSection(sectionName);
        return section.get(key);
    }

    getInt(sectionName: string, key: string, radix?: number) {
        return parseInt(this.getSection(sectionName).get(key), radix);
    }

    getFloat(sectionName: string, key: string) {
        return parseFloat(this.getSection(sectionName).get(key));
    }

    getArray(sectionName: string, key: string, splitter = ',') {
        return this.getSection(sectionName).get(key).split(splitter);
    }

    getBoolean(sectionName: string, key: string) {
        return isTrue(this.getSection(sectionName).get(key));
    }

    set(sectionName: string, key: string, value: ItemValue, splitter?: string) {
        const section = this.sections.has(sectionName) ? this.sections.get(sectionName) : new Section(sectionName);
        section.set(key, value, splitter);
    }

    remove(sectionName: string, key: string) {
        return this.getSection(sectionName).remove(key);
    }
}
