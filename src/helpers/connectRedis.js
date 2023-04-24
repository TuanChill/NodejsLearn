const {createClient} = require('redis');

const client = createClient({
    socket: {
        port: 6379,
        host: '127.0.0.1',
    }
});

client.on( 'ready', function () {
    console.log(`Connected to redis database ${this.name}`);
});

client.on( 'end', function () {
    console.log(`Disconnected to redis database ${this.name}`);
});

client.on('error', err => console.log("Redis client err", err));

client.connect();

module.exports = client;