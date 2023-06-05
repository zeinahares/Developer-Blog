const BlogPost = require('./BlogPost');
const User = require('./User');
const Comments = require('./Comments');

// A user can have many blog posts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// blogpost belongs to user
BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A blog post can have many comments
BlogPost.hasMany(Comments, {
    foreignKey: 'blogPost_id',
    onDelete: 'CASCADE'
});

// comment is connected to one blog post
Comments.belongsTo(BlogPost, {
    foreignKey: 'blogPost_id'
});

// a user can have many comments
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// a comment only has one user
Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {
    BlogPost,
    User,
    Comments
};