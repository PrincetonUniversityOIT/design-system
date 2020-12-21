# Princeton Design System

## Getting Started

The instructions below assume that you have Node/NPM properly installed on your system.

After cloning the repo to your local system, be sure to install the project dependencies.

```
npm install
```

You will want to run the build for the web components and CSS before running the server.

```
npm run stencil-build
```

After that you should be ready to run the site locally.

```
npm run storybook
```

You can build a static site for publishing to a public web server.  The output will be put in the .out directory, 
which can be zipped up and shipped as the root of the site. 

```
npm run build-storybook
```
