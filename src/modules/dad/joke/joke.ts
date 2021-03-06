import { LightningElement, api } from 'lwc';
const FADE_IN = 'fadeIn';
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
        console.log(window.location.href);
        return `${TWITTER_URL}?text=${encodeURI(this.joke.headline)}%0A${encodeURI(this.joke.punchline)}%0A&url=${encodeURI(window.location.href)}&hashtags=papajoke,dadabase`;
    }

    renderedCallback() {
        this.punchlineElement = this.template.querySelector('.punchline') || document.createElement("div");
    }
}