import { Category } from "./category.model";

export class Area {
    constructor(public key: string, public value: string, public categories: Category[]){}
}