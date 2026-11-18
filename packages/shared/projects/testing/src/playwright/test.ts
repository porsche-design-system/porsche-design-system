import { test as base } from '@playwright/test';
import {
  type CollectedMessage,
  findUnexpectedConsole,
  findUnexpectedPageErrors,
  formatUnexpectedConsole,
} from './consoleGuard';
import {
  type ExternalRequestsOptions,
  externalImageStub,
  externalUrlPattern,
  resolveExternalRequest,
} from './externalRequests';

export type TestOptions = {
  /** `false` switches request routing off. Only the smoke suite does. Default `{}`. */
  externalRequests: ExternalRequestsOptions | false;
  /** Console errors, warnings and page errors the test expects. Default `[]`. */
  expectedConsole: RegExp[];
};

export const test = base.extend<TestOptions & { requestRouting: void; consoleGuard: void }>({
  externalRequests: [{}, { option: true }],
  expectedConsole: [[], { option: true }],
  requestRouting: [
    async ({ context, externalRequests }, use) => {
      const abortedUrls: string[] = [];
      if (externalRequests !== false) {
        await context.route(externalUrlPattern, async (route) => {
          const request = route.request();
          const outcome = resolveExternalRequest(request.url(), request.resourceType(), externalRequests);
          switch (outcome.action) {
            case 'cdn':
              try {
                await route.fulfill({ response: await route.fetch({ url: outcome.url }) });
              } catch {
                // The local CDN may not run, and a closed context rejects the abort too.
                await route.abort().catch(() => {});
              }
              return;
            case 'stub':
              return route.fulfill(outcome.reply);
            case 'allow':
              return route.continue();
            case 'image':
              return route.fulfill({ contentType: 'image/svg+xml', body: externalImageStub });
            case 'abort':
              abortedUrls.push(request.url());
              return route.abort();
          }
        });
      }

      await use();

      await context.unrouteAll({ behavior: 'ignoreErrors' });
      // The console guard cannot report an abort reliably, as each browser logs it differently.
      if (abortedUrls.length) {
        throw new Error(`Aborted external requests\n${abortedUrls.join('\n')}`);
      }
    },
    { auto: true },
  ],
  consoleGuard: [
    async ({ context, expectedConsole }, use) => {
      const messages: CollectedMessage[] = [];
      const pageErrors: string[] = [];
      context.on('console', (message) =>
        messages.push({ type: message.type(), text: message.text(), url: message.location().url })
      );
      context.on('weberror', (webError) => pageErrors.push(webError.error().message));

      await use();

      const unexpected = findUnexpectedConsole(messages, expectedConsole);
      const unexpectedPageErrors = findUnexpectedPageErrors(pageErrors, expectedConsole);
      if (unexpected.length || unexpectedPageErrors.length) {
        throw new Error(formatUnexpectedConsole(unexpected, unexpectedPageErrors));
      }
    },
    { auto: true },
  ],
});
