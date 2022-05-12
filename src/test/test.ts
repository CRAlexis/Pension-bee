import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import should from 'should';
import glob from 'glob';
import TemplateService from '../services/templateService';

chai.use(chaiHttp);

let filePath: string;
const getDirectories = (src: string, callback: (err: Error, res: string[]) => void) => {
  glob(src + '/**/*', callback);
};

describe('Content requsts', () => {
  before(() => {
      return new Promise<void>((resolve) => {
        getDirectories('src/public/content', (err, res) => {
          if (err) {
            console.log(err);
          } else {
            filePath = res[0].substring(res[0].indexOf('content/') + 7);
            console.log('File path: ' + filePath);
            resolve();
          }
        })
      });
  })
  describe('/valid url', () => {
    it('it should return 200', (done) => {
      chai.request(server)
        .get(filePath)
        .end((err, res) => {
          should(res.status).equal(200);
          done();
        });
    });
  });
  describe('/html content matches', () => {
    it('it should return html content', (done) => {
      chai.request(server)
        .get(filePath)
        .end((err, res) => {
          TemplateService.buildHtml(filePath).then(html => {
            should(res.body).eql(html);
          })
          done()
        });
    });
  });
  describe('/invalid url', () => {
    it('it should return 404', (done) => {
      chai.request(server)
        .get('/invalid.invalid')
        .end((err, res) => {
          should(res.status).equal(404);
          done();
        });
    });
  });
})