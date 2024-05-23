const User = require("../model/User");
const bcrypt = require("bcrypt");
async function createAdminIfNotExists() {
  try {
    const adminCount = await User.findOne({ role: "ADMIN" });
    if (!adminCount) {
      const hashedPwd = await bcrypt.hash("Kulandai@123", 10);
      const admin = new User({
        name: "admin",
        email: "kulandaiyesu569@gmail.com",
        password: hashedPwd,
        role: "ADMIN",
        verified: true,
        token: "",
      });
      await admin.save();
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

module.exports = { createAdminIfNotExists };
