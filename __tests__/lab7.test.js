describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  it('Initial Home Page - Check for 20 product items', async () => {
    const numProducts = await page.$$eval('product-item', (prodItems) => prodItems.length);
    expect(numProducts).toBe(20);
  });

  it('Make sure <product-item> elements are populated', async () => {
    const allArePopulated = await page.$$eval('product-item', (prodItems) => {
      return prodItems.every(item => {
        const data = item.data;
        return data && data.title && data.price && data.image;
      });
    });
    expect(allArePopulated).toBe(true);
  }, 10000);

  it('Clicking the "Add to Cart" button should change button text', async () => {
    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    await button.click();
    const buttonText = await (await button.getProperty('innerText')).jsonValue();
    expect(buttonText).toBe('Remove from Cart');
  }, 2500);

  it('Checking number of items in cart on screen', async () => {
    const items = await page.$$('product-item');
    for (const item of items) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      await button.click();
    }
    const cartCount = await page.$eval('#cart-count', el => el.textContent);
    expect(cartCount).toBe("20");
  }, 10000);

  it('Checking number of items in cart on screen after reload', async () => {
    await page.reload();
    const items = await page.$$('product-item');
    for (const item of items) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      expect(text).toBe("Remove from Cart");
    }
    const cartCount = await page.$eval('#cart-count', el => el.textContent);
    expect(cartCount).toBe("20");
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  it('Checking number of items in cart on screen after removing from cart', async () => {
    const items = await page.$$('product-item');
    for (const item of items) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      await button.click();
    }
    const cartCount = await page.$eval('#cart-count', el => el.textContent);
    expect(cartCount).toBe("0");
  }, 10000);

  it('Checking number of items in cart on screen after reload', async () => {
    await page.reload();
    const items = await page.$$('product-item');
    for (const item of items) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      expect(text).toBe("Add to Cart");
    }
    const cartCount = await page.$eval('#cart-count', el => el.textContent);
    expect(cartCount).toBe("0");
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[]');
  });
});