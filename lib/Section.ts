import { ItemValue } from "./types";
import { isTrue } from "./util";

export default class Section implements Iterable<[string, string]> {
    private readonly items = new Map<string, string>();
    private sectionName: string;

    constructor(sectionName: string) {
        this.sectionName = sectionName;
    }

    getName() {
        return this.sectionName;
    }

    setName(sectionName: string) {
        this.sectionName = sectionName;
    }

    set(key: string, value: ItemValue, splitter = ',') {
        // TODO process splitter
        if (value instanceof Array) {
            this.items.set(key, value.join(splitter));
        } else {
            this.items.set(key, value.toString());
        }
    }

    remove(key: string) {
        this.items.delete(key);
    }

    keys() {
        return this.items.keys();
    }

    values() {
        return this.items.values();
    }

    getMap() {
        return this.items;
    }

    get(key: string) {
        return this.items.get(key);
    }

    getInt(key: string, radix?: number) {
        return parseInt(this.get(key), radix);
    }

    getFloat(key: string) {
        return parseFloat(this.get(key));
    }

    getArray(key: string, splitter = ',') {
        return this.get(key).split(splitter);
    }

    getBoolean(key: string) {
        return isTrue(this.get(key));
    }

    [Symbol.iterator]() {
        return this.items.entries();
    }

    toString() {
        let str = '';
        for (const [key, value] of this.getMap()) {
            str += `, '${key}' => '${value}'`;
        }
        return `${this.sectionName} { ${str.substring(1).trimStart()} }`;
    }
}
