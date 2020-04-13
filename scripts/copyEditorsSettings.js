"use strict";
const fs = require('fs-extra');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../../');

//vscode editor
const vsCodeFileName = 'settings.json';
const vsCodeSource = path.resolve(__dirname, '../common/editorsConfigs/vscode', vsCodeFileName);
const vsCodeDestination = path.resolve(projectRoot.split('node_modules')[0], '.vscode', vsCodeFileName);

//see what sources we have
fs.copy(vsCodeSource, vsCodeDestination)
  .then(() => {
    console.log(`VSCode editor configuration file copied to: ${vsCodeDestination}`);
  })
  .catch(console.error.bind(console));
