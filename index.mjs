import puppeteer from 'puppeteer';

export const download = async ({ username, password, accountId }) => {
  const browser = await puppeteer.launch({
    dumpio: false,
    ignoreHTTPSErrors: false,
    headless: true
  });
  const page = await browser.newPage();

  page.on('request', async req => {
    console.log(req.resourceType(), req.url());
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

  await page.click('form[name="selectionTelechargementForm"] input[value="5"]');
  await Promise.all([
    page.click('form[name="selectionTelechargementForm"] [name="btValider"]'),
    page.waitForNavigation(),
  ]);

  // confirm page
  const [resp] = await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('form[name="telechargementForm"] input[name="btConfirmer"]'),
  ]);

  return '';
}
