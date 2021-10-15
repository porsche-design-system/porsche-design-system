import { init } from '@sentry/vue';
import Vue from 'vue';

if (process.env.NODE_ENV === 'production') {
  init({
    Vue,
    dsn: 'https://a2a34f457b944d0799acf81fdb0c2356@o1039693.ingest.sentry.io/6008634',
  });
}
