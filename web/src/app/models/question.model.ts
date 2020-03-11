export class Question {
    constructor(public id: string,
                public question: string, 
                public answer: string,
                public area: string,
                public category: string,
                public complexity: string,
                public notes: string){}
}