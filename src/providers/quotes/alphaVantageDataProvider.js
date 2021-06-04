import {
  eachDayOfInterval,
  parseISO,
  format,
} from 'date-fns';
import {
  getActualQuote,
  historicalQuotes,
} from '~/src/services/alphaVantageQueries';

/** Class for provide Alpha Vantage data. */
class AlphaVantageData {
  /**
  * @param {array} symbols - the quote symbol.
  */
  constructor(symbols) {
    this.symbols = symbols;
  }
  /**
   * Return parsed json response or throw Exception if fails.
   * @param {string} response - Response from the API.
   * @param {string} key - key from where the data will be parsed.
   * @return {JSON}
   * */
  #parseResponse(response, key) {
    const {data} = response;
    data.hasOwnProperty('Note') &&
      throw new Error('API limit reached, wait 1 minute');
    !(data[key] && Object.keys(data[key]).length > 0) &&
      throw new Error('Invalid query');
    return data[key];
  }

  /**
   * Check if the market is oppened.
   * @param {object} date - date object from the api.
   * @return {void}
   * */
  #validateDate(date) {
    !date && throw new Error('Market was not open on this day');
  }

  /**
   * Return unique actual action price.
   * @return {JSON}
   * */
  async getQuote() {
    try {
      const response = await getActualQuote(this.symbols.shift());
      const data = this.#parseResponse(response, 'Global Quote');
      return {
        name: data['01. symbol'],
        lastPrice: parseFloat(data['05. price']),
        pricedAt: new Date(
            data['07. latest trading day'],
        ).toISOString(),
      };
    } catch (e) {
      throw new Error(`An error occurred on getQuote: ${e}`);
    }
  }

  /**
   * Return gain projection.
   * @param {string} purchasedAt - purchase date.
   * @param {string} sellAt - sell date.
   * @param {int} amount - quantity of buyed quotes.
   * @return {JSON}
   **/
  async gainsProjection(purchasedAt, sellAt, amount) {
    (new Date(purchasedAt).getTime() > new Date(sellAt).getTime()) &&
      throw new Error('You cannot sell before purchase');
    try {
      const response = await historicalQuotes(this.symbols.shift());
      const data = this.#parseResponse(response, 'Time Series (Daily)');
      this.#validateDate(data[purchasedAt]);
      this.#validateDate(data[sellAt]);
      const buyedPrice = parseFloat(data[purchasedAt]['4. close']);
      const selledPrice = parseFloat(data[sellAt]['4. close']);
      const gain = (amount * selledPrice) - (amount * buyedPrice);
      return {
        name: this.symbol,
        amount,
        purchasedAt,
        sellAt,
        buyedPrice,
        selledPrice,
        gain: `R$ ${gain}`,
      };
    } catch (e) {
      throw new Error(`An error occurred on gainsProjection: ${e}`);
    }
  }

  /**
   * Return historical data from period.
   * @param {string} from - intial date.
   * @param {string} to - final date.
   * @return {JSON}
   **/
  async historical(from, to) {
    (new Date(from).getTime() > new Date(to).getTime()) &&
      throw new Error('From cant be bigger than up to');
    try {
      const response = await historicalQuotes(this.symbols.shift());
      const data = this.#parseResponse(response, 'Time Series (Daily)');
      const start = parseISO(from);
      const end = parseISO(to);
      const intervalDays = eachDayOfInterval({
        start,
        end,
      });
      return intervalDays.map((date) => {
        const dateFormatted = format(date, 'yyyy-MM-dd');
        const price = data[dateFormatted];
        if (!price) {
          return {
            return: 'ok',
            closed: true,
            pricedAt: dateFormatted,
          };
        }

        return {
          return: 'ok',
          opening: Number(price['1. open']),
          high: Number(price['2. high']),
          low: Number(price['3. low']),
          closing: Number(price['4. close']),
          pricedAt: dateFormatted,
        };
      });
    } catch (e) {
      throw new Error(`An error occurred on historicalQuote: ${e}`);
    }
  }

  /**
   * Return compartion from array of symbols.
   **/
  async compare() {
    (this.symbols.length >= 3) &&
      throw new Error('You cannot compare more than 3 assets');
    const responsePrices = await Promise.all([
      ...this.symbols.map((symbol) =>{
        return getActualQuote(symbol);
      }),
    ]).catch((e) => {
      throw new Error(`An error occurred on compare: ${e}`);
    });
    return responsePrices.map(
        (response) => {
          const data = this.#parseResponse(response, 'Global Quote');
          if (!data['01. symbol']) {
            throw new Error('One stock not found');
          }

          return {
            response: 'ok',
            name: data['01. symbol'],
            lastPrice: Number(data['05. price']),
            pricedAt: data['07. latest trading day'],
          };
        },
    );
  }
}

export default AlphaVantageData;
