module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("schoolBranches", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false, // Optional, set to false if the contact email is mandatory
      validate: {
        isEmail: true, // Validate the email format using Sequelize validation
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false, // Optional, set to false if the phone number is mandatory
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other branch-related fields here, as needed.
  });

  return Branch;
};
