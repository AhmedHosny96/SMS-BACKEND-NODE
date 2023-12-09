module.exports = (sequelize, DataTypes) => {
  const SubjectScore = sequelize.define(
    "SubjectScore",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      totalMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100, // Set the default total marks as 100
      },
      obtainedMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default obtained marks as 0
      },
      // Any additional fields related to subject scores
    },
    {
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  // Define associations to Subject and Student models
  return SubjectScore;
};
