/* eslint import/no-extraneous-dependencies:0 */
const { expect } = require('chai');

const request = require('supertest');
const app = require('../app');
// eslint-disable-next-line import/order
// const request = require('supertest')(app);
// add.js


describe('site/users', () => {
  const username = `crqtest${Math.random(1)}`;
  const password = '123456';
  const repassword = '123456';

  describe('注册', () => {
    it('注册的时候用户名不能为空', () => request(app)
      .post('/users/register')
      .send({
        username: '',
        password,
        repassword,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body.code).to.be.equal(401);
        expect(response.body.msg).to.be.equal('用户名为空');
      }));

    it('两次密码不一致', () => request(app)
      .post('/users/register')
      .send({
        username: '123',
        password: '123456',
        repassword: '1234567',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body.code).to.be.equal(401);
        expect(response.body.msg).to.be.equal('注册失败，两次输入的密码不一致');
      }));

    it('用户名存在', () => request(app)
      .post('/users/register')
      .send({
        username: 'crq1',
        password: '123456',
        repassword: '123456',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body.code).to.be.equal(409);
        expect(response.body.msg).to.be.equal('用户名已存在，请重新输入一个吧');
      }));

    it('注册成功', () => request(app)
      .post('/users/register')
      .send({
        username: 'test11',
        password: '123456',
        repassword: '123456',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body.code).to.be.equal(200);
        expect(response.body.msg).to.be.equal('注册成功');
        expect(response.body.data.username).to.be.equal('test11');
      }));
  });
});
