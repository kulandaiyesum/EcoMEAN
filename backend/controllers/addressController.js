const Address = require('../model/Address');

const saveAddress = async (req, res) => {
  try {
    const address = new Address({ ...req.body, user: req.userId });
    const savedAddress = await address.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.log("Error in saveAddress controller", error.message)
    res.status(500).json({ message: "Failed to save address" });
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.userId });
    if(! addresses) {
      return res.status(200).json([]);
    }
    res.status(200).json(addresses);
  } catch (error) {
    console.log("Error in getAllAddresses controller", error.message)
    res.status(500).json({ message: "Failed to retrieve addresses" });
  }
};


const editAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(updatedAddress);
  } catch (error) {
    console.log("Error in editAddress controller", error.message)
    res.status(500).json({ message: "Failed to update address" });
  }
};


const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const deletedAddress = await Address.findOneAndDelete({ _id: addressId, user: req.userId });
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAddress controller", error.message)
    res.status(500).json({ message: "Failed to delete address" });
  }
};

module.exports = {
  saveAddress,
  getAllAddresses,
  editAddress,
  deleteAddress,
};
