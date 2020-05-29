import { TiendaEnLineaAngularPage } from './app.po';

describe('tienda-en-linea-angular App', function() {
  let page: TiendaEnLineaAngularPage;

  beforeEach(() => {
    page = new TiendaEnLineaAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
