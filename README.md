# ads

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Install Vuetify
``
vue add vuetify
``

### Install VueRouter
```
npm install vue-router --save
```

### DB config firebase

В директории src создать поддиректорию config.
В этой директории создать файл db.js с содержимым конфигурации приложения firebase

```
export default {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "https://your-app.firebaseio.com",
    projectId: "your-vue-project-id",
    storageBucket: "your-vue-storage.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your:app-id"
}
```

next lesson 24