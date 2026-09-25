const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { ObjectId } = require('mongodb');

const mongodb = require('../db/connect');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = mongodb.getDb().collection('users');

        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        let user = await usersCollection.findOne({
          githubId: profile.id
        });

        if (!user) {
          const newUser = {
            githubId: profile.id,
            username: profile.username || null,
            displayName: profile.displayName || profile.username || null,
            email,
            provider: 'github',
            createdAt: new Date(),
            updatedAt: new Date()
          };

          const result = await usersCollection.insertOne(newUser);

          user = {
            _id: result.insertedId,
            ...newUser
          };
        } else {
          await usersCollection.updateOne(
            { _id: user._id },
            {
              $set: {
                username: profile.username || user.username,
                displayName:
                  profile.displayName ||
                  profile.username ||
                  user.displayName,
                email: email || user.email,
                updatedAt: new Date()
              }
            }
          );

          user = await usersCollection.findOne({
            _id: user._id
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    if (!ObjectId.isValid(id)) {
      return done(null, false);
    }

    const user = await mongodb
      .getDb()
      .collection('users')
      .findOne({
        _id: new ObjectId(id)
      });

    return done(null, user || false);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;