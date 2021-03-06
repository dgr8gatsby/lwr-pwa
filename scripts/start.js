import { createServer } from 'lwr';

createServer().listen(({ port, serverMode = 'prod' }) => {
    console.log(`>> Started server in ${port} | MODE: ${serverMode}`);
})
