const axios = require("axios");

const getContacts = (req, res, next) => {
  axios
    .get(`https://exercise.goldenspear.com/contacts.json`)
    .then(data => {
      res.json(data.data);
    })
    .catch(error => {
      return res.status(400).json({
        message: "An error has happened during application run",
        error
      });
    });
};

exports.getContacts = getContacts;
