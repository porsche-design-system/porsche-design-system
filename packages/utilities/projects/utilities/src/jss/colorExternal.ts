type ColorExternalKey =
  | 'facebook'
  | 'google'
  | 'instagram'
  | 'kakaotalk'
  | 'linkedin'
  | 'naver'
  | 'pinterest'
  | 'reddit'
  | 'tiktok'
  | 'twitter'
  | 'wechat'
  | 'whatsapp'
  | 'xing'
  | 'youtube';

type ColorExternal = { [key in ColorExternalKey]: string };

export const colorExternal: ColorExternal = {
  facebook: '#1877f2',
  google: '#4285f4',
  instagram: '#e1306c',
  kakaotalk: '#fae300',
  linkedin: '#0077b5',
  naver: '#03cf5d',
  pinterest: '#e60023',
  reddit: '#ff4500',
  tiktok: '#fe2c55',
  twitter: '#1da1f2',
  wechat: '#1aad19',
  whatsapp: '#25d366',
  xing: '#006567',
  youtube: '#ff0000',
};
