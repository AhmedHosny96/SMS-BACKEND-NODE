const model = require("../models/modelConfig");

const NewsFeed = model.newsfeed;

const createNewfeed = async (req, res) => {
  const { title, description, attachment, date } = req.body;

  let destination = await NewsFeed.findOne({
    where: {
      title: title,
    },
  });

  if (destination)
    return res.status(400).send("newsfeed with the same name exists");

  let payload = {
    title,
    description,
    attachment,
    date,
  };

  await NewsFeed.create(payload);

  res.send(payload);
};

const getNewsfeed = async (req, res) => {
  const destination = await NewsFeed.findAll({});

  res.send(destination);
};

const getNewsfeedById = async (req, res) => {
  let id = req.params.id;

  const destination = await NewsFeed.findOne({
    where: { newsfeedId: id },
  });

  if (destination === null)
    return res.status(404).send(`newsfeed with id ${id} not found`);

  res.send(destination);
};

const updateNewsfeed = async (req, res) => {
  let id = req.params.id;

  const newsfeed = await NewsFeed.update(req.body, {
    where: { newsfeedId: id },
  });

  if (newsfeed === null)
    return res.status(404).send(`newsfeed with id ${id} not found`);

  res.status(200).send(newsfeed);
};

const deleteDestination = async (req, res) => {
  let id = req.params.id;

  const newsfeed = await NewsFeed.destroy({
    where: { newsfeedId: id },
  });

  if (newsfeed === null)
    return res.status(404).send(`newsfeed with id ${id} not found`);

  res.send("deleted newsfeed");
};

module.exports = {
  createNewfeed,
  getNewsfeed,
  getNewsfeedById,
  updateNewsfeed,
  deleteDestination,
};
