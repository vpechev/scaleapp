const fs = require('fs');
const path = require('path');

export class BaseFileRepository<T> {
    private dataList: T[];

    constructor(dataPath: string) { 
        this.dataList = this.parseInputConfiguration(dataPath);
    }

    public getAll() : T[] {
        return this.dataList;
    }

    protected parseInputConfiguration(dataPath: string) {
        let location = dataPath;
        let rawData = fs.readFileSync(path.join(__dirname, location));
        return JSON.parse(rawData);
    }
}