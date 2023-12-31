/* eslint-disable no-param-reassign */

const { DataTypes, Model } = require('sequelize');
const _ = require('lodash');

const { sequelize } = require('../../db/sequelize');

class Question extends Model {}

// Sequelize model for the Question entity
Question.init(
  {
    imageUrl: {
      type: DataTypes.STRING,
    },
    correctAnswers: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: `JSON structure:
        {
          "1": Number,
          "2": Number,
          ...
        }`,
    },
    answersCount: {
      type: DataTypes.INTEGER,
    },
    reasoning: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Question',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['week', 'round', 'number'],
      },
    ],
    hooks: {
      // Format the imageUrl based on the week, round, and question number.
      // Count the number of correct answers for the question.
      beforeSave: (question) => {
        question.imageUrl = `/week${question.week}/r${question.round}/q${question.number}.png`;
        question.answersCount = _.size(question.correctAnswers);
      },
    },
  },
);

module.exports = Question;
