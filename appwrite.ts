import {
  Client,
  ID,
  Account,
  Databases,
  Storage,
  Avatars,
  Graphql
} from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6510ab663173c4d1180d');

const graphql = new Graphql(client);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

console.log('Appwrite initialized');

export { client, account, database, storage, ID, avatars };
