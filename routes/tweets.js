
const Twitter = require ('Twitter');


module.exports = (app, io) => {
    let twitter = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY || 'jFpdifZvcNy8OWR8o3FB9PoQL',
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'lXu9tpiCULC7wGek96NvIWJB3pnLXwMMACIcyHiggJKJXELtyN',
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || '1215714868550082561-mY0nfGX7IutX7OZSqvkCt8IV6CHQOM',
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'yw6svqr7sbJ06w09vhv1NScrJeRVqJ7CehvjgZ7XggPzJ'
    });
}
//Establishes socket connection.
io.on("connection", socket => {
    stream();
    socket.on("connection", () => console.log("Client connected"));
    socket.on("disconnect", () => console.log("Client disconnected"));
});

//Emits data with socket.io as twitter stream flows in
const stream = () => {
   twitter.stream('statuses/filter', { track: app.locals.searchTerm }, (stream) => {
       stream.on('data', (tweet) => {
           sendMessage(tweet);
       });

       stream.on('error', (error) => {
           console.log(error);
       });
   });
}