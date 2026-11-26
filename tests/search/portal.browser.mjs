import { chromium, devices, expect, webkit } from '@playwright/test';

const origin = process.env.SEARCH_TEST_ORIGIN || 'http://127.0.0.1:4321';
const runtime = '**/pagefind/pagefind.js';

async function openSearch(page) {
  await page.getByRole('button', { name: /^(搜索|検索|Search|Rechercher)$/ }).click();
}

async function softNavigate(page, path) {
  const timeOrigin = await page.evaluate((path) => {
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.dataset.testNavigation = '';
    anchor.textContent = 'Navigate';
    document.body.append(anchor);
    document.documentElement.dataset.searchNavigationComplete = 'false';
    document.addEventListener(
      'astro:page-load',
      () => {
        document.documentElement.dataset.searchNavigationComplete = 'true';
      },
      { once: true },
    );
    return performance.timeOrigin;
  }, path);
  await page.locator('[data-test-navigation]').click();
  await page.waitForFunction(() => document.documentElement.dataset.searchNavigationComplete === 'true');
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(timeOrigin);
  await expect(page).toHaveURL(`${origin}${path}`);
}

for (const profile of [
  { name: 'desktop Chromium', engine: chromium, options: { viewport: { width: 1440, height: 900 } } },
  { name: 'Android Chromium emulation', engine: chromium, options: devices['Pixel 7'] },
  { name: 'iPhone WebKit emulation', engine: webkit, options: devices['iPhone 13'] },
]) {
  const browser = await profile.engine.launch();
  try {
    for (const scenario of ['navigation', 'failure']) {
      const context = await browser.newContext(profile.options);
      const page = await context.newPage();
      page.setDefaultTimeout(15000);
      const timer = setTimeout(() => {
        void context.close();
      }, 45000);
      const requests = [];
      const errors = [];
      page.on('request', (request) => requests.push(request.url()));
      page.on('pageerror', (error) => errors.push(error.message));
      try {
        if (scenario === 'failure') {
          await page.route(runtime, (route) => route.abort());
        }
        await page.goto(origin, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('astro-island[component-url*="SearchDialog"]')).not.toHaveAttribute('ssr');
        expect(requests.filter((url) => url.endsWith('pagefind.js'))).toHaveLength(0);
        await openSearch(page);
        const input = page.locator('[data-search-input]');
        if (scenario === 'failure') {
          await expect(page.locator('[data-search-loading]')).toHaveText('搜索加载失败，请刷新页面重试。');
          await page.getByRole('dialog').getByRole('button', { name: '关闭', exact: true }).click();
          await expect(page.locator('[data-search-dialog]')).toHaveCount(0);
          expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
        } else {
          await expect(input).toBeVisible();
          await expect(input).toBeFocused();
          await input.fill('Astro');
          await expect(page.locator('[data-search-result]').first()).toBeVisible({ timeout: 15000 });
          await page.keyboard.press('Escape');
          await softNavigate(page, '/posts/');
          await openSearch(page);
          await expect(input).toBeVisible();
          await expect(input).toBeFocused();
          await page.keyboard.press('Escape');
          await softNavigate(page, '/fr/');
          await openSearch(page);
          await expect(input).toBeVisible();
          await expect(input).toBeFocused();
          await expect(input).toHaveAttribute('placeholder', 'Rechercher par mot-clé');
          expect(requests.filter((url) => url.endsWith('pagefind.js'))).toHaveLength(1);
        }
        if (scenario !== 'failure') expect(errors).toEqual([]);
        console.log(`PASS ${profile.name}: ${scenario}`);
      } finally {
        clearTimeout(timer);
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
}
