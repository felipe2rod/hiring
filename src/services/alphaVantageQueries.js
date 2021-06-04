import {default as http} from './alphaVantageHTTP';

const getActualQuote = (symbol) =>
  http.get(`query?function=GLOBAL_QUOTE&`+
    `symbol=${symbol}&`+
    `apikey=${process.env.ALPHA_KEY}`);

const historicalQuotes = (symbol) =>
  http.get(`query?function=TIME_SERIES_DAILY&`+
    `symbol=${symbol}&`+
    `outputsize=full&`+
    `apikey=${process.env.ALPHA_KEY}`);

export {
  getActualQuote,
  historicalQuotes,
};
