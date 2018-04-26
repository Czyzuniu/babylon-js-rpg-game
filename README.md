# BabylonJs Webpack Boilerplate

## Description

This is a BabylonJS + Webpack minimal boilerplate for development and production to work with either **es6** and/or **typescript**. It includes a simple express server to deploy your build.

## instructions

- clone the repo
- npm install
- For development: npm run dev
- For production: npm run build
- To serve the production bundle: node server.js

## File Structure

### /index.html
This file is used as a template by webpack to create the actual **index.html** that will be served to the client.

### /src 
This is where you should place all your application code.

### /src/index.js
This is the entry point of the app. it imports the Game class (the core of your game), creates a new instance and calls its implementation of createScene() and doRender() on **DOMContentLoaded**. Uncomment the second line and Comment the fourth to use the es6 Game class instead of the typescript one.

### /src/Game.js && /src/Game.ts
The Game class comes both in typescript and es6. You can choose which one to import from **src/index.js**. This class implements the same example found in the [BabylonJS docs](https://doc.babylonjs.com/)

## Coming up...

- Minimal unit testing setup.
- Minimal integration testing setup.
- Fork with a more opinionated environment
- Minimal networking setup (with socket.io)

## Thank you!

Thank you for using it, feel free to contribute in any way you can/want, just keep in mind that this should stay as a very mimimalistic boilerplate. If you'd like to add complexity just fork it and let me know when you're done, so that I might reference it here in case someone comes looking for a more opinionated environment.

Enjoy!
