const express = require('express');
const User = require('../models').User;
const Grade = require("../models").Grade;

module.exports = {
  get: function (req, res, next) {
    User.findAll({
      attributes:{
        exclude: ['createdAt', 'updatedAt']
      },
      include:[
        {model: Grade}
      ]
    })
    .then((users) => {
      res.send(users);
    });
  },
}