
import sequelize from "./config/config";
async function initialize() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connection established and models synced.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

initialize();
