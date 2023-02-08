import React, {FormEvent} from 'react';
import {render} from 'react-dom';

import * as AWS from 'aws-sdk';

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.
import {path} from "path";
import {fs} from "fs";

export class AuthAWS {
	username: string
	password: string
  configurator: AWS.Config
  configued: boolean = false
  // objectAWS: AWS

	constructor (_user: string, _pass: string){
		this.username = _user
		this.password = _pass
    this.configurator = new AWS.Config()
	}

  print_parameter () {
    console.log(this.username, this.password)
  }

  sdk_configure () {
    this.configurator.update({region: 'us-east-2'})
    
    this.configurator.update({accessKeyId: this.username, secretAccessKey: this.password})
    this.configued = true
  }

  doSomething () {
    if (!this.configued) {
      console.log("call configure function first")
      return
    }

    const file_path = "test.txt"
    const fileStream = fs.createReadStream(file_path)
  }
}

/*
var myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'IDENTITY_POOL_ID'});
var myConfig = new AWS.Config({
  credentials: myCredentials, region: 'us-west-2'
});

myConfig.update({region: 'us-east-1'})

// Below is ChatGPT solution

// Configure the AWS SDK
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key'
});

// Create a new instance of the AWS.CognitoIdentityServiceProvider service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

// Define the login credentials
const loginCredentials = {
  UserName: 'user1',
  Password: 'password1'
};

// Call the adminInitiateAuth method to log in
cognitoIdentityServiceProvider.adminInitiateAuth({
  AuthFlow: 'ADMIN_NO_SRP_AUTH',
  UserPoolId: 'your-user-pool-id',
  ClientId: 'your-app-client-id',
  AuthParameters: loginCredentials
}, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
*/