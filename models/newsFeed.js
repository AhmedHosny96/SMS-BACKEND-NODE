const mysql = require("../config/db");

// constructor

const NewsFeed = function (feed) {
  this.title = feed.title;
  this.description = feed.description;
  this.attachment = feed.attachment;
  this.date = feed.date;
};

// create new subject
NewsFeed.findAll = (result) => {
  const query = `CALL getNewsfeed()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

NewsFeed.findById = (id, result) => {
  let query = `CALL getNewsFeedById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

NewsFeed.create = (feed, result) => {
  const { title, attachment, description, date } = feed;
  mysql.query(
    `CALL createNewsFeed(?,?,?,?)`,
    [title, attachment, description, date],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...feed });
    }
  );
};

//update

NewsFeed.findByIdAndUpdate = (id, feed, result) => {
  const { title, attachment, description, date } = feed;

  mysql.query(
    `CALL updateNewsFeed(${id},?,?,?,?)`,
    [title, attachment, description, date],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...feed });
    }
  );
};

// delete

NewsFeed.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteNewsFeed(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = NewsFeed;
