import { ItemValue } from "./types";

export default class Section implements Iterable<[string, string]> {
    private readonly map = new Map<string, string>();

    add(key: string, value: ItemValue, splitter = ',') {
        // TODO process splitter
        if (value instanceof Array) {
            this.map.set(key, value.join(splitter));
        } else {
            this.map.set(key, value.toString());
        }
    }

    remove(key: string) {
        this.map.delete(key);
    }

    keys() {
        return this.map.keys();
    }

    values() {
        return this.map.values();
    }

    getMap() {
        return this.map;
    }

    get(key: string) {
        return this.map.get(key);
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
        return this.isTrue(this.get(key));
    }

    private isTrue(value: string) {
        return value && value.toString() !== "false" && value !== "0";
    }

    [Symbol.iterator]() {
        return this.map.entries();
    }
}
