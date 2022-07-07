const mysql = require("../config/db");

const Asset = function (Asset) {
  this.itemName = Asset.itemName;
  this.model = Asset.model;
  this.quantity = Asset.quantity;
  this.remark = Asset.remark;
  this.category = Asset.category;
  this.status = Asset.status || "Good";
};

//
Asset.findAll = (result) => {
  let query = `CALL getAssets()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};

// by id
Asset.findById = (id, result) => {
  let query = `CALL getAssetById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};

Asset.create = (asset, result) => {
  const { itemName, model, category, quantity, status, remark } = asset;
  mysql.query(
    `CALL createAsset(?,?,?,?,?)`,
    [itemName, model, category, quantity, status, remark],
    (err, res) => {
      if (err) return result(null, err);

      result(null, { id: res.insertId, ...asset });
    }
  );
};

//update

Asset.findByIdAndUpdate = (id, asset, result) => {
  const { itemName, model, category, quantity, status, remark } = asset;

  mysql.query(
    `CALL updateAsset(${id},?,?,?,?,?)`,
    [itemName, model, category, quantity, status, remark],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...data });
    }
  );
};

// delete

Asset.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteAsset(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Asset;
