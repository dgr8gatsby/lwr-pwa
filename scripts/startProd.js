import { createServer } from 'lwr';

createServer().listen(({ port, 'prod' }) => {
    console.log(`>> Started server in ${port} | MODE: prod`);
})
