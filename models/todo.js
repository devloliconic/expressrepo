import { DataTypes } from "sequelize";
import { db } from "../database.js";

export const Todo = db.define(
  "todo",
  {
    todo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: db, timestamps: false }
);
