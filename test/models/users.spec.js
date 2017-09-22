import helper from '../../test_helpers'

var factory = helper.factory;
var Models = helper.Models;

describe('users', () => {
  describe('#numberByAge()', () => {
    beforeEach((done) => {
      factory.createMany('users', 3, [
        {age: 21},
        {age: 22},
        {age: 15},
      ]).then((result) => {
        done();
      });
    });

    it('should return one', (done) => {
      Models.users.numberByAge(21).then((result) => {
        result.should.eql(1);
        done();
      });
    });
  });
  describe('#under21()', () => {
    beforeEach((done) => {
      factory.createMany('users', 3, [
        {age: 15},
        {age: 21},
        {age: 55},
      ]).then((result) => {
        done();
      });
    });

    it('should return two users', (done) => {
      Models.users.under21().then((result) => {
        result.length.should.eql(2);
        done();
      });
    });
  });
});

