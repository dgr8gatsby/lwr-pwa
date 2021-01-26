import { LightningElement, api } from 'lwc';

export default class Joke extends LightningElement {
    constructor() {
        super();
    }
    @api joke: any = "";

}