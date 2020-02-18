import { Category } from '../enums/category.enum'
import { Complexity } from '../enums/complexity.enum'

export class Question {
    constructor(public id: string,
                public question: string, 
                public answer: string,
                public area: any,
                public category: Category,
                public complexity: Complexity){}
}