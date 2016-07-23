var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

describe('GET /menu', function() {

  it('returns a 200 response for /menu', function(done) {
    api.get('/menu')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('returns an array of coffees for /menu', function(done) {
    api.get('/menu')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.have.property('coffees');
      expect(res.body.coffees).to.be.an('array');
      done();
    });
  });

  it('returns at least 4 coffees for /menu', function(done) {
    api.get('/menu')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      expect(res.body.coffees.length).to.be.at.least(4);
      done();
    });
  });

  it('returns coffee objects for /menu', function(done) {
    api.get('/menu')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      expect(res.body.coffees[1]).to.have.property('name');
      expect(res.body.coffees[1]).to.have.property('order_path');
      expect(res.body.coffees[1]).to.have.property('price');
      expect(res.body.coffees[1]).to.have.property('caffeine_level');
      expect(res.body.coffees[1]).to.have.property('milk_ratio');

      expect(res.body.coffees[1].name).to.be.an('string');
      expect(res.body.coffees[1].order_path).to.be.an('string');
      expect(res.body.coffees[1].price).to.be.an('number');
      expect(res.body.coffees[1].caffeine_level).to.be.an('number');
      expect(res.body.coffees[1].milk_ratio).to.be.an('number');

      done();
    });
  });
});
