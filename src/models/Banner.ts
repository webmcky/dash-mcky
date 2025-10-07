import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/lib/sequelize";

// ✅ Definisikan tipe data untuk Banner
interface BannerAttributes {
  id: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BannerCreationAttributes extends Optional<BannerAttributes, "id"> {}

export class Banner
  extends Model<BannerAttributes, BannerCreationAttributes>
  implements BannerAttributes
{
  public id!: string;
  public imageUrl!: string | null;
  public videoUrl!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// ✅ Definisi model
Banner.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "banners",
    timestamps: true,
  }
);

export default Banner;
