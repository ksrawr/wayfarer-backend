const db = require("./models");
const bcrypt = require("bcryptjs");

const user = {
  name: "User A",
  email: "usera@email.com",
  password: "1234wayfarer",
  homeCity: "Alburqueque",
  userImage: "https://i.imgur.com/YuxXHQ6.png"
};

const posts = [
  {
    title: "Here's a Poooost",
    fakecity: "London",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    img: "https://i.imgur.com/TyrqyIb.jpg"
  },
  {
    title: "Here's a P0st",
    fakecity: "London",

    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    img: "https://i.imgur.com/TyrqyIb.jpg"
  },
  {
    title: "Here's a P(o)st",
    fakecity: "London",

    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    img: "https://i.imgur.com/TyrqyIb.jpg"
  },
  {
    title: "Here's another Post",
    fakecity: "San Francisco",

    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    img: "https://i.imgur.com/TyrqyIb.jpg"
  },
  {
    title: "Post 2: Now Postier",
    fakecity: "San Francisco",

    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    img: "https://i.imgur.com/TyrqyIb.jpg"
  },
  {
    title: "Poast",
    fakecity: "San Francisco",

    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    img: "https://i.imgur.com/TyrqyIb.jpg"
  }
];
db.Post.deleteMany({}, () => {
  db.User.deleteMany({}, async () => {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      db.User.create(user, (err, createdUser) => {
        if (err) {
          console.log(err);
        }
        const userId = createdUser._id;

        for (i = 0; i < posts.length; i++) {
          db.Post.create({ ...posts[i], user: userId }, (err, createdPost) => {
            if (err) {
              console.log(err);
            }
            console.log(createdPost);
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
});
