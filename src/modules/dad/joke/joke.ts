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
        if (this.punchlineElement || undefined) {
            this.punchlineElement.classList.add(FADE_IN);
        }
    }
    get joke() {
        return this._joke;
    }

    get tweetLink() {
        return `${TWITTER_URL}?text=${encodeURI(this.joke.headline)}%0A${encodeURI(this.joke.punchline)}%0A&url=${encodeURI('https://www.papajoke.com/')}&hashtags=papajoke,dadabase`;
    }

    handleAnimationEnd(event: any) {
        event.path[0].classList.remove(FADE_IN);
        this.isAnimating = false;
    }

    renderedCallback() {
        this.punchlineElement = this.template.querySelector('.punchline') || document.createElement("div");
    }
}