import { type FlagName, PFlag, PText } from '@porsche-design-system/components-react/ssr';

/** A pangram per language, with the flag of a country that writes it. */
const PANGRAMS: Record<string, { text: string; flag: FlagName; dir?: 'rtl' }> = {
  en: { flag: 'gb', text: 'The quick brown fox jumps over the lazy dog.' },
  el: { flag: 'gr', text: 'Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός' },
  vi: { flag: 'vn', text: 'Do bạch kim rất quý nên sẽ dùng để lắp vô xương.' },
  th: { flag: 'th', text: 'เป็นมนุษย์สุดประเสริฐเลิศคุณค่า กว่าบรรดาฝูงสัตว์เดรัจฉาน' },
  ar: { flag: 'sa', text: 'نص حكيم له سر قاطع وذو شأن عظيم مكتوب على ثوب أخضر ومغلف بجلد أزرق', dir: 'rtl' },
  ru: { flag: 'ru', text: 'Эх, чужак, общий съём цен шляп (юфть) – вдрызг!' },
  'zh-Hans': { flag: 'cn', text: '保时捷驾驶体验活动在线销售通用条款与条件' },
  'zh-Hant': { flag: 'tw', text: '天地玄黃，宇宙洪荒。日月盈昃，辰宿列張。' },
  ja: {
    flag: 'jp',
    text: 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすん',
  },
  ko: { flag: 'kr', text: '키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다' },
};

type PangramProps = {
  lang: keyof typeof PANGRAMS;
};

export const Pangram = ({ lang }: PangramProps) => {
  const entry = PANGRAMS[lang];
  if (!entry) return null;

  return (
    <>
      <PFlag className="mb-static-sm" name={entry.flag} />
      <PText lang={lang} dir={entry.dir}>
        Porsche 911: {entry.text}
      </PText>
      <PText lang={lang} dir={entry.dir} weight="semibold">
        Porsche 911: {entry.text}
      </PText>
      <PText lang={lang} dir={entry.dir} weight="bold">
        Porsche 911: {entry.text}
      </PText>
    </>
  );
};
