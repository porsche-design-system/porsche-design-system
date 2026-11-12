import { describe, expect, it } from 'vitest';
import {
  type CollectedMessage,
  findUnexpectedConsole,
  formatUnexpectedConsole,
} from '../../../src/playwright/consoleGuard';

const message = (type: string, text: string, url = 'http://localhost:8080/'): CollectedMessage => ({ type, text, url });

describe('findUnexpectedConsole()', () => {
  it('error and warning are unexpected', () => {
    const error = message('error', 'an error');
    const warning = message('warning', 'a warning');
    const messages = [error, warning, message('log', 'a log'), message('info', 'an info'), message('debug', 'a debug')];
    expect(findUnexpectedConsole(messages, [])).toEqual([error, warning]);
  });

  it('a declared pattern removes a message', () => {
    expect(
      findUnexpectedConsole([message('error', 'component p-display is deprecated')], [/p-display is deprecated/])
    ).toEqual([]);
  });

  it('a pattern can match the source url', () => {
    const notFound = message(
      'error',
      'Failed to load resource: the server responded with a status of 404 ()',
      'http://localhost:8080/assets/lights.jpg'
    );
    expect(findUnexpectedConsole([notFound], [/status of 404 .*\/assets\/lights\.jpg$/])).toEqual([]);
  });

  it("WebKit's abort message is unexpected", () => {
    const blocked = message('info', 'Web Inspector blocked https://new.example.com/x.js from loading');
    expect(findUnexpectedConsole([blocked], [])).toEqual([blocked]);
  });

  it('any other info is ignored', () => {
    expect(findUnexpectedConsole([message('info', 'Download the React DevTools')], [])).toEqual([]);
  });

  it('a global pattern matches every message', () => {
    expect(findUnexpectedConsole([message('error', 'boom'), message('error', 'boom')], [/boom/g])).toEqual([]);
  });
});

describe('formatUnexpectedConsole()', () => {
  it('format lists every message with its url, then the page errors', () => {
    const output = formatUnexpectedConsole(
      [
        message('error', 'first text', 'http://localhost:8080/a.js'),
        message('warning', 'second text', 'http://localhost:8080/b.js'),
      ],
      ['ReferenceError: x is not defined']
    );
    const lines = output.split('\n');
    const firstLine = lines.findIndex(
      (line) => line.includes('first text') && line.includes('http://localhost:8080/a.js')
    );
    const secondLine = lines.findIndex(
      (line) => line.includes('second text') && line.includes('http://localhost:8080/b.js')
    );
    const pageErrorLine = lines.findIndex((line) => line.includes('ReferenceError: x is not defined'));

    expect(firstLine).toBeGreaterThanOrEqual(0);
    expect(secondLine).toBeGreaterThan(firstLine);
    expect(pageErrorLine).toBeGreaterThan(secondLine);
  });
});
