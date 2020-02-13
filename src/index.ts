import * as functions from 'firebase-functions';
import gdCloudFunctionServices from './functions';

exports.gdservices = functions.https.onRequest(gdCloudFunctionServices);