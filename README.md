# Alga-hCard-backend
Alga hCard backend implementation

#### Get Started
````bash
    npm install
````
add creds in the config file /src/env.json
```json
{
  "drivers": {
    "mongodb": {
      // ...
    },
    "api": {
       // ...
    }
  }
}
```
#### Production
1) build the project
````bash
    npm run build
````
2) serve locally
````bash
    PORT=8888 npm run start-local
````
2) or Dockerizeme!
***** must have docker installed ****
````bash
    npm run dockerizeme
    
    # serve locally
    PORT=8888 npm run docker-dev
````

#### Development
````bash
    PORT=8888 npm run dev
````

#### Test
````bash
    npm run test
````



## Author
Alga Leal (4lg4) 

- [http://alga.me](http://alga.me)
- [https://www.linkedin.com/in/akgleal](https://www.linkedin.com/in/akgleal)
- [https://github.com/4lg4](https://github.com/4lg4)
