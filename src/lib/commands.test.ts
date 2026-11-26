import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { type CommandItem, filterCommands, isEditableTarget, nextActiveIndex } from './commands';

const SAMPLE_COMMANDS: CommandItem[] = [
  { id: 'home', label: 'Home', group: 'navigation', keywords: ['首页', 'index'], icon: 'ri:home-line', href: '/' },
  {
    id: 'archives',
    label: 'Archives',
    description: 'Article Timeline',
    group: 'navigation',
    keywords: ['归档', 'timeline'],
    icon: 'ri:archive-line',
    href: '/archives',
  },
  {
    id: 'theme',
    label: 'Toggle Theme',
    group: 'actions',
    keywords: ['dark', 'light', '深色'],
    icon: 'ri:contrast-2-line',
    actionId: 'theme',
  },
];

describe('command palette helpers', () => {
  it('filters commands case-insensitively across label, description, and keywords', () => {
    assert.equal(filterCommands(SAMPLE_COMMANDS, '').length, 3);
    assert.deepEqual(
      filterCommands(SAMPLE_COMMANDS, 'timeline').map((c) => c.id),
      ['archives'],
    );
    assert.deepEqual(
      filterCommands(SAMPLE_COMMANDS, '深色').map((c) => c.id),
      ['theme'],
    );
    assert.deepEqual(filterCommands(SAMPLE_COMMANDS, 'nonexistent'), []);
  });

  it('wraps keyboard selection index circularly', () => {
    assert.equal(nextActiveIndex(0, -1, 3), 2);
    assert.equal(nextActiveIndex(2, 1, 3), 0);
    assert.equal(nextActiveIndex(1, 1, 3), 2);
    assert.equal(nextActiveIndex(0, 1, 0), 0);
  });

  it('detects editable targets so single-key shortcuts never hijack typing', () => {
    assert.equal(isEditableTarget({ tagName: 'INPUT' } as unknown as EventTarget), true);
    assert.equal(isEditableTarget({ tagName: 'TEXTAREA' } as unknown as EventTarget), true);
    assert.equal(isEditableTarget({ tagName: 'DIV', isContentEditable: true } as unknown as EventTarget), true);
    assert.equal(isEditableTarget({ tagName: 'BODY', isContentEditable: false } as unknown as EventTarget), false);
    assert.equal(isEditableTarget(null), false);
  });
});
