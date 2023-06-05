const sequelize = require('../config/connection');
const { User, BlogPost, Comments } = require('../Models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commetsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await BlogPost.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comments.bulkCreate(commetsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
