const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();

chai.use(chaiHttp);

describe('Swagger JSON', () => {
    it('should check authorization of user /swagger.json GET', done => {
        chai
            .request(server)
            .get('/swagger.json')
            .end(function(err, res) {
                should.not.exist(err);
                res.type.should.eql("application/json");
                done();
            });
    });
});
