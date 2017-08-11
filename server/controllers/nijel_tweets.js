const request = require('request'),
    envVar = require('dotenv').load().parsed;

module.exports = {
    fetchLastThreeTweets: (req, res) => {

        const options = {
            url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=3&screen_name=nijel_mapping',
            headers: {
                'Authorization': ('Bearer ' + envVar.TWITTER_BEARER_TOKEN)
            }
        }

        request(options, (err, response, body) => {
            if (!err) {
                res.json({
                    success: true,
                    tweets: body
                });
            } else {
                res.json({
                    success: false,
                    err: err
                })
            }
        });
    }
}
