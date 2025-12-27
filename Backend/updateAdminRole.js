const { User } = require("./models");

const updateAdminRole = async () => {
    try {
        // Update existing admin user's role
        const result = await User.update(
            { role: "SUPER_ADMIN" },
            { where: { email: "admin@gmail.com" } }
        );

        if (result[0] > 0) {
            console.log("✅ Admin role updated to SUPER_ADMIN successfully!");
        } else {
            console.log("ℹ️ No admin user found with email admin@gmail.com");
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error updating admin role:", error.message);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    const sequelize = require("./config/database");
    sequelize.sync().then(() => {
        updateAdminRole();
    });
}

module.exports = updateAdminRole;
