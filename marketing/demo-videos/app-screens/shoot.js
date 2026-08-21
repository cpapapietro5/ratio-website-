const pw = (() => {
  const tries = ['playwright', 'playwright-core'];
  for (const t of tries) { try { return require(t); } catch (e) {} }
  const root = require('child_process').execSync('npm root -g').toString().trim();
  for (const t of tries) { try { return require(root + '/' + t); } catch (e) {} }
  throw new Error('playwright not found');
})();
const fs = require('fs');
const path = __dirname;

const meals = {
  'analysis-friedrice': {
    TIME: '6:24', IMG: 'assets/food-friedrice.jpg', CAL: '650', P: '40', C: '70', F: '20',
    CONF: 'Medium Confidence',
    NAME: 'Chicken fried rice with vegetables (chicken, egg, rice, broccoli, carrots, snap peas)',
    QTY: '2.5 cups (~450g)', CALPAD: '26'
  },
  'analysis-salmon': {
    TIME: '12:41', IMG: 'assets/food-salmon.jpg', CAL: '580', P: '42', C: '40', F: '27',
    CONF: 'High Confidence',
    NAME: 'Grilled salmon with quinoa, roasted vegetables & avocado',
    QTY: '1 bowl (~420g)', CALPAD: '4'
  }
};

(async () => {
  const tpl = fs.readFileSync(path + '/analysis.template.html', 'utf8');
  for (const [name, vars] of Object.entries(meals)) {
    let html = tpl;
    for (const [k, v] of Object.entries(vars)) html = html.replaceAll('{{' + k + '}}', v);
    fs.writeFileSync(`${path}/${name}.html`, html);
  }

  const browser = await pw.chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3
  });
  const page = await ctx.newPage();
  for (const name of ['home', ...Object.keys(meals)]) {
    await page.goto('file://' + path + '/' + name + '.html');
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${path}/out-${name}.png` });
    console.log('shot', name);
  }
  await browser.close();
})();
