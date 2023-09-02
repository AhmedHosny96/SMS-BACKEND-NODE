module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define("school", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    principalName: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, set to false if the principal's name is mandatory
    },
    establishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, set to false if the principal's name is mandatory
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, set to false if the contact email is mandatory
      validate: {
        isEmail: true, // Validate the email format using Sequelize validation
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, set to false if the phone number is mandatory
    },
    // logo: {
    //   type: DataTypes.STRING,
    //   allowNull: true, // Optional, set to false if the established year is mandatory
    // },

    // Add other school-related fields here, as needed.
  });

  return School;
};
