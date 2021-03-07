import { LightningElement, api } from 'lwc';

const TWITTER_URL = 'https://twitter.com/intent/tweet';

export default class Joke extends LightningElement {
    constructor() {
        super();
        this.punchlineElement = document.createElement("div");
    }
    punchlineElement: HTMLElement;
    isAnimating: boolean = true;
    _joke: any = {};

    @api
    set joke(value: any) {
        this._joke = value;
    }
    get joke() {
        return this._joke;
    }

    get nextJoke(){
        if(this._joke.nextJokeId){
            return this._joke.nextJokeId;
        }
        return undefined;
    }

    get nextJokeHref(){
        return `#/jokes/${this.nextJoke}`;
    }

    get tweetLink() {
        return `${TWITTER_URL}?text=${encodeURI(this.joke.headline)}%0A${encodeURI(this.joke.punchline)}%0A&url=${encodeURI(window.location.href)}&hashtags=papajoke,dadabase`;
    }

    get why(){
        if(this._joke.why){
            return this._joke.why;
        }
    }

    handleWhyClick(){
        console.log(this.why);
        let overlay : any = this.template.querySelector('.overlay');
        if(overlay){
            overlay.style.width = '100%';
        }
    }

    handleWhyClose(){
        let overlay :any = this.template.querySelector('.overlay');
        if(overlay){
            overlay.style.width = 0;
        }
    }

    renderedCallback() {
        this.punchlineElement = this.template.querySelector('.punchline') || document.createElement("div");
    }
}