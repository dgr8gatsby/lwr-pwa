import { createServer } from 'lwr';

createServer().listen(({ port, serverMode }) => {
    console.log(`>> Started server in ${port} | MODE: ${serverMode}`);
})
