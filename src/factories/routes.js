import StockController from '~/src/controllers/stockController';

export default (server) => {
  server.get('/', (req, res) => res.send('Hello World'));
  server.get('/stocks/:stock_name/quote',
      async (req, res) => await StockController.quote(req, res));
};
