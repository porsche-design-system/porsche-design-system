import https from 'node:https';
import type { IncomingMessage } from 'node:http';

/**
 * Validates a CSS string against the W3C CSS Validation Service (Jigsaw)
 * using the public HTTP API documented at:
 * https://jigsaw.w3.org/css-validator/documentation.html
 */

const W3C_VALIDATOR_URL = 'https://jigsaw.w3.org/css-validator/validator';
const BOUNDARY_LENGTH = 10;

export type W3CValidationMessage = {
  /** Line number where the error or warning was found (if available). */
  line?: number;
  /** A snippet of the CSS context where the issue was found (if available). */
  context?: string;
  /** The validation message describing the error or warning. */
  message: string;
  /** The type of the message, e.g., 'error' or 'warning' (if available). */
  type?: string;
};

export type W3CValidationResult = {
  /** Indicates if the CSS is valid (no errors) or not. */
  valid: boolean;
  /** List of errors found in the CSS. */
  errors: W3CValidationMessage[];
  /** List of warnings found in the CSS. */
  warnings: W3CValidationMessage[];
};

export type W3CValidationOptions = {
  /** CSS profile, e.g. 'css3', 'css3svg' (default). */
  profile?: string;
  /** 'no' | '0' | '1' | '2' — warning verbosity (default 'no'). */
  warning?: string;
  /** Medium (e.g. 'all', 'screen'). */
  medium?: string;
  /** Override the validator endpoint (e.g. self-hosted Jigsaw). */
  endpoint?: string;
  /** Request timeout in milliseconds (default 10_000). */
  timeout?: number;
};

/** Raw error/warning shape returned by the W3C JSON API. */
type W3CJsonError = {
  line?: number;
  context?: string;
  message?: string;
  type?: string;
};

/** Raw JSON response envelope returned by the W3C CSS Validation Service. */
type W3CJsonResponse = {
  cssvalidation: {
    validity: boolean;
    errors?: W3CJsonError[];
    warnings?: W3CJsonError[];
  };
};

// ---------------------------------------------------------------------------
// Multipart form-data helpers (RFC 7578)
//
// The W3C CSS Validation Service expects input via `multipart/form-data`.
// This encoding requires a **boundary** — a unique delimiter string that
// separates individual form fields within the request body. The recipient
// (server) uses this boundary to know where one field ends and the next
// begins. The boundary must not appear anywhere inside the field values
// themselves, so we generate a random one for each request to avoid
// accidental collisions with the submitted CSS content.
// ---------------------------------------------------------------------------

/**
 * Generates a random boundary string used to delimit parts in a
 * `multipart/form-data` request body (see RFC 7578 §4.1).
 *
 * A boundary is required because the HTTP `multipart/form-data` encoding
 * concatenates multiple fields into a single body. Without a unique
 * delimiter the server cannot determine where one field's value ends and
 * the next field's metadata begins.
 */
const getBoundary = (): string => {
  const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPiece = '';
  for (let i = 0; i < BOUNDARY_LENGTH; i++) {
    randomPiece += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  }
  return `----CSSValidatorBoundary${randomPiece}`;
};

/**
 * Builds a `multipart/form-data` body string from a flat record of
 * field-name → value pairs, using a randomly generated boundary.
 */
const buildFormData = (fields: Record<string, string>): string => {
  const CRLF = '\r\n';
  const boundary = `--${getBoundary()}`;

  const pieces = Object.entries(fields).map(
    ([name, value]) => `Content-Disposition: form-data; name="${name}"${CRLF}${CRLF}${value}${CRLF}`
  );

  return `${boundary}${CRLF}${pieces.join(`${boundary}${CRLF}`)}${boundary}`;
};

/**
 * Sends the pre-built multipart form body to the W3C validator endpoint
 * and resolves with the parsed `cssvalidation` payload from the JSON response.
 *
 * @param endpoint - Full URL of the validation service.
 * @param formData - The multipart/form-data encoded body string.
 * @param timeout  - Maximum time in ms before the request is aborted.
 */
const retrieve = (
  endpoint: string,
  formData: string,
  timeout: number
): Promise<W3CJsonResponse['cssvalidation']> =>
  new Promise((resolve, reject) => {
    const boundaryValue = formData.slice(2, 2 + 4 + 'CSSValidatorBoundary'.length + BOUNDARY_LENGTH);

    const req = https.request(
      endpoint,
      {
        method: 'POST',
        timeout,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundaryValue}`,
          'Content-Length': String(Buffer.byteLength(formData)),
        },
      },
      (res: IncomingMessage) => {
        if (typeof res.statusCode === 'number' && (res.statusCode < 200 || res.statusCode >= 300)) {
          res.resume();
          reject(new Error(`W3C CSS validator returned HTTP ${res.statusCode} ${res.statusMessage ?? ''}`));
          return;
        }

        let data = '';
        res.on('data', (chunk: string) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve((JSON.parse(data) as W3CJsonResponse).cssvalidation);
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`The request took longer than ${timeout}ms`));
    });

    req.on('error', reject);
    req.write(formData);
    req.end();
  });

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Converts the raw W3C JSON error/warning arrays into a cleaner
 * {@link W3CValidationMessage} array with trimmed strings.
 */
const normalizeMessages = (msgs?: W3CJsonError[]): W3CValidationMessage[] =>
  (msgs ?? []).map((m) => ({
    line: m.line,
    context: m.context?.trim(),
    message: (m.message ?? '').trim(),
    type: m.type,
  }));

/**
 * Sends CSS text to the W3C CSS Validation Service and returns a parsed result.
 *
 * Please be considerate: the W3C recommends self-hosting Jigsaw for heavy use
 * (see https://jigsaw.w3.org/css-validator/DOWNLOAD.html).
 *
 * @param css     - The raw CSS string to validate.
 * @param options - Optional overrides for profile, warning level, medium, endpoint, and timeout.
 * @returns A promise resolving to the validation result with errors and warnings.
 */
export const validateCssWithW3C = async (
  css: string,
  options: W3CValidationOptions = {}
): Promise<W3CValidationResult> => {
  const {
    profile = 'css3svg',
    warning = 'no',
    medium = 'all',
    endpoint = W3C_VALIDATOR_URL,
    timeout = 60_000,
  } = options;

  const formData = buildFormData({
    text: css,
    profile,
    output: 'application/json',
    usermedium: medium,
    warning,
  });

  const result = await retrieve(endpoint, formData, timeout);

  return {
    valid: result.validity,
    errors: normalizeMessages(result.errors),
    warnings: normalizeMessages(result.warnings),
  };
};

/**
 * Formats an array of validator messages into a single human-readable string
 * suitable for test output or logging.
 */
export const formatW3CMessages = (messages: W3CValidationMessage[]): string =>
  messages
    .map(
      (m, i) =>
        `#${i + 1}${m.line ? ` (line ${m.line})` : ''}: ${m.message}${m.context ? ` — ${m.context}` : ''}`
    )
    .join('\n');

