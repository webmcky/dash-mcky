import  DataType  from "sequelize";
import sequelize from '@/lib/sequelize';

export const UserModel = sequelize.define("User",
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
);

export default UserModel;