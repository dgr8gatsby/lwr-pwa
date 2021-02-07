import { luvio } from './luvio';
import { createWireAdapterConstructor } from '@luvio/lwc-luvio';


import { getJokesAdapterFactory } from '../../../raml/generated/adapters/getJokes';
import { getJokeAdapterFactory } from '../../../raml/generated/adapters/getJoke';

// Create the luvio adapters
const getJokesLuvioAdapter = getJokesAdapterFactory(luvio);
const getJokeLuvioAdapter = getJokeAdapterFactory(luvio);

// Create wire adapters
const GetJokesWireAdapter = createWireAdapterConstructor(getJokesLuvioAdapter, 'getJokes', luvio);
const GetJokeWireAdapter = createWireAdapterConstructor(getJokeLuvioAdapter, 'getJoke', luvio);

export { GetJokesWireAdapter as getJokes, GetJokeWireAdapter as getJoke };