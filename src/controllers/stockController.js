import AlphaVantageData from '~/src/providers/quotes/alphaVantageDataProvider';

/** Controller for stock. */
class StockController {
  /**
  * @param {Request} req - the express request
  * @param {Response} res - the express response
  */
  async quote(req, res) {
    const {stock_name} = req.params;
    try {
      const dataProvider = new AlphaVantageData([stock_name]);
      return res.status(200).json(await dataProvider.getQuote());
    } catch (e) {
      return res.status(500).json({
        error: e.message,
      });
    }
  }
}

export default new StockController();
