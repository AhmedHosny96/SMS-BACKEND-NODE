const mysql = require("../config/db");

// constructor

const NewsFeed = function (feed) {
  this.title = feed.title;
  this.description = feed.description;
  this.attachment = feed.attachment;
  this.date = feed.date;
};

module.exports = NewsFeed;

("use strict");
module.exports = (sequelize, DataTypes) => {
  const Newsfeed = sequelize.define(
    "newsfeed",
    {
      newsfeedId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Newsfeed;
};

//
