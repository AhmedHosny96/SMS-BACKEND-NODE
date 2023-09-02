const { Op } = require("sequelize");
const model = require("../models/modelConfig");

const Message = model.messages;
const Conversation = model.conversations;
const UserConversation = model.userConversation;
const User = model.users;

// const createMessage = async (req, res) => {
//   const { content, senderId, receiverId } = req.body;

//   let payload = {
//     content,
//     senderId,
//     receiverId,
//   };

//   await Message.create(payload);

//   res.send(payload);
// };
const createMessage = async (req, res) => {
  const { content, senderId, receiverId } = req.body;

  try {
    // Check if a conversation exists between sender and receiver
    let existingConversation = await Conversation.findOne({
      where: {},
      include: [
        {
          model: User,
          where: { id: senderId },
          through: { attributes: [] },
        },
        {
          model: User,
          where: { id: receiverId },
          through: { attributes: [] },
        },
      ],
    });

    if (!existingConversation) {
      // Create a new conversation
      existingConversation = await Conversation.create();
      await existingConversation.addUsers([senderId, receiverId]);
    }

    // Create the message and associate with the conversation
    const payload = {
      content,
      senderId,
      receiverId,
      conversationId: existingConversation.id,
    };

    const message = await Message.create(payload);

    res.status(201).json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the message." });
  }
};

const getMessages = async (req, res) => {
  const messages = await Message.findAll({});

  res.send(messages);
};

const getMessageById = async (req, res) => {
  let id = req.params.id;

  const message = await Message.findOne({ where: { id: id } });

  if (!message)
    return res
      .status(404)
      .send({ status: 404, message: `Message with id ${id} not found` });

  res.send(message);
};

const retrieveUnreadMessagesByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const unreadMessages = await Message.findAll({
      where: {
        receiverId: userId,
        isRead: false,
      },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["name", "email"],
        },
      ],
      raw: true,
    });

    const messagesBySender = {};

    unreadMessages.forEach((message) => {
      const senderName = message["sender.name"];
      if (!messagesBySender[senderName]) {
        messagesBySender[senderName] = [];
      }
      messagesBySender[senderName].push(message);
    });

    const totalUnreadMessages = unreadMessages.length; // Calculate total count

    res.status(200).json({
      count: totalUnreadMessages,
      messages: messagesBySender,
    });
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching unread messages." });
  }
};

// const retrieveUnreadMessagesByUserId = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const unreadMessages = await Message.findAll({
//       where: {
//         receiverId: userId,
//         isRead: false,
//       },
//       include: [
//         {
//           model: User,
//           attributes: ["name", "email"],
//         },
//       ],
//       raw: true,
//     });

//     const unreadMessagesCount = unreadMessages.length;

//     res.status(200).json({
//       count: unreadMessagesCount,
//       messages: unreadMessages,
//     });
//   } catch (error) {
//     console.error("Error fetching unread messages:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching unread messages." });
//   }
// };

//   try {
//     const unreadMessages = await Message.findAll({
//       where: {
//         receiverId: userId,
//         isRead: false,
//       },
//     });

//     if (!unreadMessages)
//       return res
//         .status(404)
//         .send({ status: 404, message: `Message with id ${id} not found` });

//     res.status(200).json(unreadMessages);
//   } catch (error) {
//     console.error("Error fetching unread messages:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching unread messages." });
//   }

const updateMessage = async (req, res) => {
  let id = req.params.id;

  const message = await Message.update(req.body, { where: { id: id } });

  if (!message)
    return res
      .status(404)
      .send({ status: 404, message: `Message with id ${id} not found` });

  res.status(200).send(message);
};

const deleteMessage = async (req, res) => {
  let id = req.params.id;

  const message = await Message.destroy({ where: { id: id } });

  if (message === null)
    return res
      .status(404)
      .send({ status: 404, message: `message with id ${id} not found` });

  res.send({ status: 200, message: "Messages is deleted" });
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  retrieveUnreadMessagesByUserId,
  updateMessage,
  deleteMessage,
};
