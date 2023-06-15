declare global {
  interface Window {
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn';
  }
}

export const CDN_BASE_URL = (typeof window !== 'undefined' && window.PORSCHE_DESIGN_SYSTEM_CDN === 'cn' ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com') + '/porsche-design-system/email';
export const EMAIL_MANIFEST = {"porscheMarque":"porsche-marque.min.4816796e41dc8c32c587dc043b4c5089.png"};