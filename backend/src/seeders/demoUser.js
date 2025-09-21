const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function seedDemoUser() {
  try {
    // Demo User
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
      "Demo User credentials -> email: demo@example.com password:",
      demoPassword
    );

    // Demo Admin
    const adminPassword = "Admin@123";
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    const [adminUser, adminCreated] = await User.findOrCreate({
      where: { email: "admin@example.com" },
      defaults: {
        name: "System Administrator For Testing",
        email: "admin@example.com",
        password: hashedAdminPassword,
        address: "Admin Address",
        role: "admin",
      },
    });

    if (!adminCreated) {
      adminUser.password = hashedAdminPassword;
      await adminUser.save();
      console.log(
        "Admin user updated with new password:",
        adminUser.dataValues.email
      );
    } else {
      console.log("Admin user created:", adminUser.dataValues.email);
    }
    console.log(
      "Admin User credentials -> email: admin@example.com password:",
      adminPassword
    );

    // Demo Owner
    const ownerPassword = "Owner@123";
    const hashedOwnerPassword = await bcrypt.hash(ownerPassword, 10);
    const [ownerUser, ownerCreated] = await User.findOrCreate({
      where: { email: "owner@example.com" },
      defaults: {
        name: "Store Owner For Testing The Application",
        email: "owner@example.com",
        password: hashedOwnerPassword,
        address: "Owner Address For Testing",
        role: "owner",
      },
    });

    if (!ownerCreated) {
      ownerUser.password = hashedOwnerPassword;
      await ownerUser.save();
      console.log(
        "Owner user updated with new password:",
        ownerUser.dataValues.email
      );
    } else {
      console.log("Owner user created:", ownerUser.dataValues.email);
    }
    console.log(
      "Owner User credentials -> email: owner@example.com password:",
      ownerPassword
    );
  } catch (error) {
    console.error("Error seeding demo users:", error);
  }
}

module.exports = seedDemoUser;
