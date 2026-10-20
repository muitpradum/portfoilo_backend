const Contact = require("../models/Contact");

// POST - Create Message
const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.log("Contact Error:", error);

    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// GET - Get All Messages
const getMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get messages",
      error: error.message,
    });
  }
};

// // GET - Get Single Message
// const getMessageById = async (req, res) => {
//   try {
//     const message = await Message.findById(req.params.id);

//     if (!message) {
//       return res.status(404).json({
//         message: "Message not found",
//       });
//     }

//     res.status(200).json(message);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to get message",
//       error: error.message,
//     });
//   }
// };

// // DELETE - Delete Message
// const deleteMessage = async (req, res) => {
//   try {
//     const message = await Message.findByIdAndDelete(req.params.id);

//     if (!message) {
//       return res.status(404).json({
//         message: "Message not found",
//       });
//     }

//     res.status(200).json({
//       message: "Message deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete message",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  createContact,
  getMessages,
  // getMessageById,
  // deleteMessage,
};