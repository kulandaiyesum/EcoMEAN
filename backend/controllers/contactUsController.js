const ContactUs = require("../model/ContactUs");

const postContactUsMessage = async (req, res) => {
  try {
    const contactUsObject = await ContactUs.create(req.body);
    res.status(201).json(contactUsObject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllContactUsMessages = async (req, res) => {
  try {
    const allContactusMessages = await ContactUs.find();
    res.status(200).json(allContactusMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postContactUsMessage,
  getAllContactUsMessages,
};
