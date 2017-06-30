import { KkPage } from './app.po';

describe('kk App', () => {
  let page: KkPage;

  beforeEach(() => {
    page = new KkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
