import { PongPage } from './app.po';

describe('pong App', function() {
  let page: PongPage;

  beforeEach(() => {
    page = new PongPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
