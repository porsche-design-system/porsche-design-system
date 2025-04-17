// We need a custom env since next build does not work when setting NODE_ENV to development.
export const isDevEnvironment =
  process.env.NEXT_PUBLIC_PDS_ENV === 'development' || process.env.NODE_ENV !== 'production';
