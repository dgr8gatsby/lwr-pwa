import { LightningElement } from 'lwc';
import Navigo from 'navigo';

const router = new Navigo('/', { hash: true });

export default class App extends LightningElement {
    constructor() {
        super();

        router.on('/', async () => { });
        // Get the correct joke when navigating to this route
        router.on('/joke/:id', async (url: any) => {
            await this.getJokeById(url.data.id);
        })
        this.initialize();
    }

    jokeIds = [];
    currentJokeIndex: number = 0;
    currentJoke: any = null;

    // Async calls to the backend API
    async getJokes() {
        let response: any = await fetch('http://localhost:3001/api/jokes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this.handleErrors)
            .catch((error) => {
                console.error(`Error: ${error}`);
            });

        let jokeIds = await response.json();
        this.jokeIds = Object.values(jokeIds);
    }

    async getJokeById(id: string) {
        let joke = await fetch(`http://localhost:3001/api/joke/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.currentJoke = await joke.json();
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
        await this.getJokes();
        var route = router.getCurrentLocation();
        if (route.url.length) {
            // Try to navigate to the existing joke if one was pasted in
            const path = window.location.hash.split('/');
            if (path.length === 3 && path[1] === 'joke' && path[2].length >= 24) {
                router.navigate(`joke/${path[2]}`);
            } else {
                this.next();
            }
        } else {
            this.next();
        }
    }

    next() {
        if (this.currentJokeIndex < this.jokeIds.length - 1) {
            this.currentJokeIndex++;
        } else {
            this.currentJokeIndex = 0;
        }
        router.navigate(`joke/${this.jokeIds[this.currentJokeIndex]}`);
    }

    prev() {
        if (this.currentJokeIndex > 1) {
            this.currentJokeIndex--;
        } else {
            this.currentJokeIndex = this.jokeIds.length - 1;
        }
        router.navigate(`joke/${this.jokeIds[this.currentJokeIndex]}`);
    }

    handleErrors(response: any) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}
