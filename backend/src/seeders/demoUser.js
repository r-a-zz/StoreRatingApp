const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function seedDemoUser() {
  try {
    const demoPassword = "DemoUser@123"; // stable demo password
    const hashedPassword = await bcrypt.hash(demoPassword, 10);
    const [demoUser, created] = await User.findOrCreate({
      where: { email: "demo@example.com" },
      defaults: {
        name: "Demo User For Testing The Application",
        email: "demo@example.com",
        password: hashedPassword,
        address: "Demo Address For Testing",
        role: "user",
      },
    });

    if (!created) {
      // force update password in case it changed earlier
      demoUser.password = hashedPassword;
      await demoUser.save();
      console.log(
        "Demo user updated with new password:",
        demoUser.dataValues.email
      );
    } else {
      console.log("Demo user created:", demoUser.dataValues.email);
    }
    console.log(
      "Demo credentials -> email: demo@example.com password:",
      demoPassword
    );
  } catch (error) {
    console.error("Error seeding demo user:", error);
  }
}

module.exports = seedDemoUser;
