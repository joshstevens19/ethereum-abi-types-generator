#!/usr/bin/env node

// import dotenv = require('dotenv');
// import path = require('path');
import 'reflect-metadata';
import { Logger } from '../common/logger';
import { execute } from './execute';

// we can create typings for this but its just getting the version
// if we import it then it wants the package.json in the src folder
// which we dont want
// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

(async () => {
  await execute(packageJson);
})().catch((err) => Logger.error(err.message));
