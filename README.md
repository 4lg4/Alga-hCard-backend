# Alga-hCard-backend
Alga hCard backend implementation


### Production
1) install production libraries
````bash
    NODE_ENV=production npm install
````
2) build the project
````bash
    npm run build
````
3) serve locally
````bash
    PORT=8888 npm run start-local
````
or Dockerizeme!
***** must have docker installed ****
````bash
    npm run dockerizeme
    
    # serve locally
    PORT=8888 npm run docker-dev
````

### Development
1) to install development libraries 
````bash
    NODE_ENV=development npm install
````
2) run tests
````bash
    npm run test
````
3) serve locally the dev code
````bash
    npm run dev
````
