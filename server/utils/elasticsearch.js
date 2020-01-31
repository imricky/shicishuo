const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.2', // use the same version of your Elasticsearch instance
});
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000,
}, (error) => {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

module.exports = client;
