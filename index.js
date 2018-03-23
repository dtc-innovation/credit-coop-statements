const puppeteer = require('puppeteer');

module.exports.download = async ({ username, password, accountId }) => {
  const browser = await puppeteer.launch({
    dumpio: false,
    ignoreHTTPSErrors: false,
    headless: true
  });
  const page = await browser.newPage();

  browser.on('targetcreated', async target => {
    console.log(target.url());
  });
  browser.on('targetchanged', async target => {
    console.log(target.url());
  });

  await page.goto('https://www.coopanet.com/banque/sso/?csite=C');
  await page.bringToFront();

  await page.click('#miniMdp');
  await page.type('#mdp input[name="codeUtil"]', username);
  await page.type('#mdp input[name="motPasse"]', password);

  await Promise.all([
    page.click('#mdp input[name="pbValider"]'),
    page.waitForNavigation(),
  ]);

  // statements page
  await page.goto(`https://www.coopanet.com/banque/cpt/cpt/situationcomptes.do?lnkReleveAction=X&numeroExterne=${accountId}`);

  // download page
  await page.goto('https://www.coopanet.com/banque/cpt/cpt/navigation.do?navigation=3');

  // value="5" means "CSV riche"
  await page.click('form[name="selectionTelechargementForm"] input[value="5"]');
  await Promise.all([
    page.click('form[name="selectionTelechargementForm"] [name="btValider"]'),
    page.waitForNavigation(),
  ]);

  // download confirm page
  const result = await page.evaluate(async () => {
    const form = document.querySelector('form[name="telechargementForm"]');
    const data = new FormData(form);
    data.append('btConfirmer', 'Confirmer');

    return fetch(form.action, {
      method: 'POST',
      credentials: 'include',
      body: data,
    })
    .then(response => response.text());
  });

  // CSV data as plain text
  return result;
}
