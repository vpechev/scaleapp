export class Question {
    constructor(public id: string,
                public question: string, 
                public answer: string,
                public area: any,
                public category: string,
                public complexity: string,
                public notes: string){}
}