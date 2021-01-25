import { createRouter } from 'lwr/router';
import type { RouteDefinition, RouteHandlerModule, Router, PageReference } from 'lwr/router';

const routes: RouteDefinition[] = [
    {
        id: 'home',
        path: '/',
        handler: (): Promise<RouteHandlerModule> => import('example/homePageHandler'),
        page: {
            type: 'home',
        },
    }
];

export function createRootRouter(): Router<PageReference> {
    return createRouter({ routes });
}