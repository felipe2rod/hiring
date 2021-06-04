import AlphaVantageData from '~/src/providers/quotes/alphaVantageDataProvider';

describe('test for alphaVantageDataProvider Class', () => {
  /*
  it('test valid getQuote', async () => {
    const instance = new AlphaVantageData(['IBM']);
    const result = await instance.getQuote();
    expect(Object.keys(result).sort())
        .toEqual(['name', 'lastPrice', 'pricedAt'].sort());
  });

  it('test invalid getQuote', async () => {
    const instance = new AlphaVantageData(['INVALID_SYMBOL']);
    await expect(() => instance.getQuote()).rejects.toThrow(/getQuote/);
  });

  it('test valid gainsProjection', async () => {
    const instance = new AlphaVantageData(['IBM']);
    const result = await instance.gainsProjection(
        '2021-02-17',
        '2021-04-29',
        100);
    expect(Object.keys(result).sort())
        .toEqual([
          'name',
          'amount',
          'purchasedAt',
          'sellAt',
          'buyedPrice',
          'selledPrice',
          'gain'].sort());
  });

  it('test buy after sell dates gainsProjection', async () => {
    const instance = new AlphaVantageData(['IBM']);
    await expect(() => instance.gainsProjection(
        '2021-01-04',
        '2021-05-02',
        100).rejects.toThrow('You cannot sell before purchase'));
  });

  it('test day off market dates gainsProjection', async () => {
    const instance = new AlphaVantageData(['IBM']);
    await expect(() => instance.gainsProjection(
        '2021-01-01',
        '2021-06-02',
        100).rejects.toThrow('Market was not open on this day'));
  });

   it('test valid historical', async () => {
    const instance = new AlphaVantageData(['IBM']);
    const result = await instance.historical(
        '2021-02-17',
        '2021-04-29'
    );
    expect(result[0].return).toMatch('ok');
  });

  it('test invalid historical dates', async () => {
    const instance = new AlphaVantageData(['IBM']);
    await expect(() => instance.historical(
        '2021-02-17',
        '2021-01-29').rejects.toThrow('From cant be bigger than up to'));
  });

  it('test invalid compare number', async () => {
    const instance = new AlphaVantageData(['IBM']);
    await expect(() => instance.compare(
        'IBM',
        'GOOGLE',
        'APPLE',
        'PETR4').rejects.toThrow('You cannot compare more than 3 assets'));
  });
  */
  it('test valid compare number', async () => {
    const instance = new AlphaVantageData(['IBM', 'AAPL']);
    const result = await instance.compare();
    expect(result[0].response).toMatch('ok');
  });
});
