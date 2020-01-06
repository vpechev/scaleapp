import { Area } from '../enums/area.enum'
import { Category } from '../enums/category.enum'
import { Complexity } from '../enums/complexity.enum'

export class Question {
    constructor(public id: string,
                public question: string, 
                public answer: string,
                public area: string,
                public category: string,
                public complexity: Complexity){}
}