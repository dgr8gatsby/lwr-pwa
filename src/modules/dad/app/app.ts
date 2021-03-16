import { LightningElement, track } from 'lwc';
import Navigo from 'navigo';
// import { getJokes } from '../../wires/wires'

//const router = new Navigo('/', { hash: true });
const router = new Navigo('/');

export default class App extends LightningElement {
    constructor() {
        super();

        router.on('/', async () => { });
        // Get the correct joke when navigating to this route
        router.on('/jokes/:id', async (url: any) => {
            await this.getJokeById(url.data.id);
        })
        this.initialize();
    }

    jokeIds = [];
    currentJokeIndex: number = 0;
    currentJoke: any = null;
    @track metadata: any = {};
    // @wire(getJokes)
    // objTest: any;
    // getJokesWire({ error, data }): void {

    //     if (data) {
    //         console.log(`Data! ${data}`);
    //     } else if (error) {
    //         console.log(`Data! ${error}`);
    //     }
    // }

    // Async calls to the backend API
    async getJokes() {
        let api_url = '/api/jokes';
        if(window.location.hostname == 'localhost'){
            api_url = "http://localhost:3001/jokes"
        }
        let response: any = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this.handleErrors)
            .catch((error) => {
                console.error(`Error: ${error}`);
            });

        let js = await response.json();
        this.jokeIds = Object.values(js.items.map((value: any) => value._id));
    }

    async getMetadata(){
        let api_url = '/api/meta';
        if(window.location.hostname == 'localhost'){
            api_url = "http://localhost:3001/meta"
        }

        let response: any = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this.handleErrors)
            .catch((error) => {
                console.error(`Error: ${error}`);
            });

        let js = await response.json();
        this.metadata = js;
    }

    async getJokeById(id: string) {
        let api_url = '/api/jokes';
        if(window.location.hostname == 'localhost'){
            api_url = "http://localhost:3001/jokes"
        }
        let joke = await fetch(`${api_url}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.currentJoke = await joke.json();

        // add social meta tags
        // @ts-ignore
        if(window.removeAllMetatags){
            // @ts-ignore
           window.removeAllMetatags();
        }
        // @ts-ignore
        if(window.createMetatag){
            // @ts-ignore
            window.createMetatag('og:title',this.currentJoke.headline);
            // @ts-ignore
            window.createMetatag('twitter:title',this.currentJoke.headline);
            // @ts-ignore
            window.createMetatag('twitter:description',this.currentJoke.headline);
            // @ts-ignore
            window.createMetatag('og:description',this.currentJoke.punchline);
            // @ts-ignore
            window.createMetatag('og:url',document.location);
            // @ts-ignore
            window.createMetatag('twitter:url',document.location);
        }
    }

    // Getters/Setters
    get joke() {
        if (this.currentJoke !== null && this.currentJoke !== undefined) {
            return this.currentJoke;
        } else {
            return null;
        }
    }

    // Methods
    async initialize() {
        this.getMetadata();
        await this.getJokes();
        var route = router.getCurrentLocation();
        if (route.url.length) {
            // Try to navigate to the existing joke if one was pasted in
            const path = route.url.split('/');
            if (path[0] === 'jokes' && path[1].length >= 24) {
                router.navigate(`jokes/${path[1]}`);
            } else {
                this.next();
            }
        } else {
            this.next();
        }
    }

    get metaTitle(){
        if(this.metadata.totalRenders){
            return `${this.metadata.totalRenders} dad jokes rendered`
        }

        return '';
    }

    next() {
        if (this.currentJokeIndex < this.jokeIds.length - 1) {
            this.currentJokeIndex++;
        } else {
            this.currentJokeIndex = 0;
        }
        router.navigate(`jokes/${this.jokeIds[this.currentJokeIndex]}`);
    }

    prev() {
        if (this.currentJokeIndex > 1) {
            this.currentJokeIndex--;
        } else {
            this.currentJokeIndex = this.jokeIds.length - 1;
        }
        router.navigate(`jokes/${this.jokeIds[this.currentJokeIndex]}`);
    }

    handleErrors(response: any) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}
