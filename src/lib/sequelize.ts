import pg from 'pg';

// src/lib/sequelize.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectModule: pg,
    logging: console.log, 
  }
);

// 🚀 Sync model ke database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true }); 
    // alter = update struktur tabel kalau ada perubahan
    // force: true bisa dipakai saat development (tabel di-drop & bikin ulang)
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

export default sequelize;
