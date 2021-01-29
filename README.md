# lwr-pwa

```javascript
yarn install
yarn start
```

# config

### Need to tell lwr where the LWC modules are:

```json
{
    "lwc":{
        "modules":[
        {
            "dir":"<rootDir>/src/modules"
        }
    ]}
}
```

### Configure routes
```json
{
    "routes":[
        "id":"app",
        "path":"/",
        "rootComponent":"dad/app",
        "layoutTemplate":"<layoutsDir>/main.html"
    ]
}
```

layoutsDir = `src/layouts`

### Configure assetDirs
```json
{
    "assetDirs":[
        {
            "dir":"<rootDir>/src/serviceWorkers/sw.js",
            "path":"/public/sw.js"
        },
        {
            "dir":"<rootDir>/src",
            "path:"/public"
        }
    ]
}
```

Supports explict file path, as well as directories
Default folder for assets = `src/assets`

### TypeScript