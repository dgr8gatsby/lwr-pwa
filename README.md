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
        "id": "app",
        "path": "/",
        "rootComponent": "dad/app",
        "layoutTemplate": "<layoutsDir>/main.html"
    ]
}
```

layoutsDir = `src/layouts`

### Configure assetDirs
```json
{
    "assets": [
        {
            "file": "<rootDir>/src/serviceWorkers/sw.js",
            "urlPath": "/sw.js"
        },
        {
            "dir": "<rootDir>/src",
            "urlPath": "/public"
        }
    ]
}
```

Supports explicit file path, as well as directories
Default folder for assets = `src/assets`

### TypeScript
