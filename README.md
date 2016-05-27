# Image Management Tool

## Installing dependencies

```
npm install && bower install
```

## Creating the database

Since the application is based on a database (MySQL in development environment, see ```config/config.json```), a database needs
to be setup before we can start.

Example for XAMPP with PhpMyAdmin:

Open the PhpMyAdmin GUI and add a database called ```image_management_tool```. The tables will be added when the app is first started.

## Creating the upload folder

Add the folder ```public/uploads```. In this folder your uploaded images will be saved.

## Starting the application

```
npm start
```
This will start the express server on port 8080. Just open [http://localhost:8080](http://localhost:8080).
To adjust the node environment (see ```config/config.json```), just change set NODE_ENV=??? in package.json.

```
npm run nw
```
This will automatically start the application as node-webkit application.

## Troubleshoot

**Uncaught TypeError: Illegal invocation (in promised-io/promises.js:242)**
Running the app as node-webkit application while having logging enabled for Sequelize will cause errors. Therefore logging needs to
be disabled. This is done by setting ```"logging":false``` in file ```config/config.json```.

**[0527/094737:ERROR:process_info.cc(608)] range at 0xff0d4c7800000000, size 0x6a fully unreadable**
Version 0.13.2[-sdk] of node-webkit (nw) must be used at the moment. Newer versions are causing an errors like when uploading images.

## Deploying the application

To deploy the application, so that it will be executable on any machine, the following steps need to be done:

1. (optional) Change version for nw from ```0.13.2-sdk``` to ```0.13.2``` in ```package.json```, so that the context menu in the app is not available.
2. Create a new directory
3. Copy the content of the root folder (with ```package.json```) in it into this directory
4. Copy the content of the folder ```node_modules\nw\nwjs``` into this directory
5. Start the app with ```nw.exe```

This is only one way of doing the deployment. See
[here]
(https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps)
and
[here]
(http://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/#prepare-your-app)
for more.

Attention: Some methods found at the links won't work, because the application needs to access the directories in ```public/uploads```.
So e.g. the method where the files are packaged as nw-file doesn't work.


## Execute tests

tbd
