const bcrypt = require("bcryptjs");
const { User } = require("./models");

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.MAIN_ADMIN_EMAIL || "admin@gmail.com";
        const adminPassword = process.env.MAIN_ADMIN_PASSWORD || "secure123";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await User.create({
                name: "Main Admin",
                email: adminEmail,
                phone: "0000000000",
                password: hashedPassword,
                role: "SUPER_ADMIN",
                status: "ACTIVE"
            });

            console.log("✅ Main Admin seeded successfully!");
        } else {
            console.log("ℹ️ Main Admin already exists. Skipping seeding.");
        }
    } catch (error) {
        console.error("❌ Error seeding admin:", error.message);
    }
};

module.exports = seedAdmin;
