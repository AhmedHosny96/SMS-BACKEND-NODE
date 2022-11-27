module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    "Section",
    {
      sectionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      maximumStudents: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  // Section.belongsTo(Class, {
  //   foreignKey: "classId",
  // });

  return Section;
};

//
