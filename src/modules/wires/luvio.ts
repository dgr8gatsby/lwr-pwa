import { Luvio, Store, Environment, ResourceRequest, FetchResponse, Headers } from '@luvio/engine';

async function networkAdapter(
    resourceRequest: ResourceRequest
): Promise<FetchResponse<any>> {
    const { baseUri, basePath, body, queryParams, method, headers } = resourceRequest;

    const qs = generateQueryString(queryParams);

    const path = `${baseUri}${basePath}${qs}`;

    const response = await fetch(path, {
        method: method.toUpperCase(),
        headers: generateHeaders(headers),
        body: body === null ? null : JSON.stringify(body),
    });

    const { status, ok, statusText } = response;

    const responseBody = status === 204 ? undefined : await response.json();

    return {
        body: responseBody,
        status,
        statusText,
        ok,
        headers: {},
    };
}

function generateQueryString(params: Record<string, any>): string {
    const queryStrings = [] as string[];
    for (const key of Object.keys(params)) {
        queryStrings.push(`${key}=${params[key]}`);
    }
    if (queryStrings.length > 0) {
        return `?${queryStrings.join('&')}`;
    }
    return '';
}

function generateHeaders(headers: Headers): globalThis.Headers {
    const fetchHeaders = new Headers(); // Fetch version of headers
    for (const key of Object.keys(headers)) {
        fetchHeaders.set(key, headers[key]);
    }
    fetchHeaders.set('Accept', 'application/json');
    fetchHeaders.set('Content-Type', 'application/json');
    return fetchHeaders;
}

export const luvio = new Luvio(new Environment(new Store(), networkAdapter));
