const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('GET /', function () {
  it('Returns a valid JSON response', function () {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        const JSONType = 'application/json'
        const resContentType = res.header['content-type']
          .slice(0, JSONType.length)

        res.status.should.equal(200)
        res.header.should.have.property('content-type')
        resContentType.should.equal(JSONType)
      })
  })
  it('Returns a response with { msg: "arbitrary string" }',
    function () {
      chai.request(server)
        .get('/')
        .end(function (err, res) {
          res.body.should.be.a('object')
          res.body.should.have.property('msg')
          res.body.msg.should.be.a('string')
        })
    })
})
describe('GET /articles', function () {
  describe('GET /articles', function () {
    it('Returns an array', function () {
      chai.request(server)
        .get('/articles')
        .end(function (err, res) {
          const articles = res.body

          articles.should.be.a('array')
        })
    })
    it('Returns an array with a dummmy articles object', function () {
      chai.request(server)
        .get('/articles')
        .end(function (err, res) {
          const articles = res.body
          const firstArticle = articles[0]

          articles.should.be.not.empty
          firstArticle.should.be.a('object')
        })
    })
  })
  describe.only('Valid article properties', function () {
    let article
    before(function (done) {
      chai.request(server)
        .get('/articles')
        .end(function (err, res) {
          article = res.body[0]
          done()
        })
    })
    it('Has a "title" property', function () {
      article.should.have.property('title')
      article.title.should.be.a('string')
    })
    it('Has a "content" property', function () {
      article.should.have.property('content')
      article.content.should.be.a('string')
    })
    xit('Has a "date" property', function () {
      article.should.have.property('date')
    })
    it('Has an "author" property', function () {
      article.should.have.property('author')
      article.author.should.be.a('string')
    })
    it('Has a "source" property', function () {
      article.should.have.property('source')
      article.source.should.be.a('string')
    })
  })
})
