# ES6/7 Node starter kit with built in Rest API authentication

## Features

- Babel configuration
- Nodemon for automatically restart the dev server
- Production environment configuration
- Built in rest API authentication
- MongoDB configuration
- Linting with Airbnb eslint configuration

## Preview

![Preview](preview.gif?raw=true "Preview")

## Getting Started

Clone Repo

````
git clone https://github.com/DimitriMikadze/es6-node-starter.git
````

npm install dependencies

````
cd es6-node-starter

npm install
````

### Start MongoDB

````
mongod
````

### Start development server

````
npm run dev
````

### Linting

For linting i'm using Eslint with Airbnb Eslint configuration

````
npm run lint
````

### Production

Build for production

````
npm run build
````

Start production server

````
npm run start
````

Note: I'm using pm2 for production server, you should install it on server via 'npm install pm2 -g'.
if you don't want to use pm2, just change pm2 with node in package.json file in scripts section.

### Contributing

contributions are welcome!

### License

MIT