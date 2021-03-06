const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Food = require('./food');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

describe('Food', () => {
  describe('getName()', () => {
    it(`should return 'the title of the given food'`, () => {
      const food = new Food({
        foo: 'Chicken Nuggets'
      });
      expect(food.getName()).to.equal('Chicken Nuggets');
    });
  });

  describe('getAllFood()', () => {
    it(`should pass a list of created foods to the callback provided`, () => {
      sinon.stub(Food, 'find');
      Food.find.yields(null, [{ title: 'French Fries' }, { title: 'Pizza' }]);
      Food.getAllFood(foods => {
        console.log('FOOOODS: ', foods);

        Food.find.restore();
      });
    });
  });
});
