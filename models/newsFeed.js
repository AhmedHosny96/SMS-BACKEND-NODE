const mysql = require("../config/db");

// constructor

const NewsFeed = function (feed) {
  this.title = feed.title;
  this.description = feed.description;
  this.attachment = feed.attachment;
  this.roleId = feed.roleId || null;
};

// create new subject
NewsFeed.findAll = (result) => {
  const query = "SELECT * FROM newsFeed ORDER BY newsFeedId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

NewsFeed.findById = (id, result) => {
  let query = `SELECT * FROM newsFeed WHERE newsFeedId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

NewsFeed.create = (feed, result) => {
  mysql.query("INSERT INTO newsFeed SET ?", feed, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...feed });
  });
};

//update

NewsFeed.findByIdAndUpdate = (id, feed, result) => {
  let query = `UPDATE newsFeed SET title = '${feed.title}' , description = '${feed.description}' ,   attachment = '${feed.attachment}', roleId = '${feed.roleId}'  WHERE newsFeedId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...feed });
  });
};

// delete

NewsFeed.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM newsFeed WHERE newsFeedId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = NewsFeed;
