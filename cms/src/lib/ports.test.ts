import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CMS_PORT, DEFAULT_BLOG_PORT, DEFAULT_CMS_PORT, DEV_SERVER_PORT, DEV_SERVER_URL, parsePort } from './ports';

describe('CMS port configuration', () => {
  it('defaults blog port to 3000 and CMS port to 4322', () => {
    assert.equal(DEFAULT_BLOG_PORT, 3000);
    assert.equal(DEFAULT_CMS_PORT, 4322);
    assert.equal(CMS_PORT, 4322);
    assert.equal(DEV_SERVER_PORT, 3000);
    assert.equal(DEV_SERVER_URL, 'http://localhost:3000');
  });

  it('parses valid port strings and falls back on invalid values', () => {
    assert.equal(parsePort('4321', 3000), 4321);
    assert.equal(parsePort('8080', 3000), 8080);
    assert.equal(parsePort(undefined, 3000), 3000);
    assert.equal(parsePort('', 3000), 3000);
    assert.equal(parsePort('0', 3000), 3000);
    assert.equal(parsePort('70000', 3000), 3000);
    assert.equal(parsePort('not-a-port', 4322), 4322);
  });
});
