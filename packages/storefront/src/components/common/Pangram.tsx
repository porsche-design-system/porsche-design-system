import { PText } from '@porsche-design-system/components-react/ssr';

const PANGRAMS: Record<string, { text: string; dir?: 'rtl' }> = {
  en: { text: 'The quick brown fox jumps over the lazy dog.' },
  el: { text: 'Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός' },
  vi: {
    text: 'Do bạch kim rất quý nên sẽ dùng để lắp vô xương.',
  },
  th: {
    text: 'เป็นมนุษย์สุดประเสริฐเลิศคุณค่า กว่าบรรดาฝูงสัตว์เดรัจฉาน',
  },
  ar: {
    text: 'نص حكيم له سر قاطع وذو شأن عظيم مكتوب على ثوب أخضر ومغلف بجلد أزرق',
    dir: 'rtl',
  },
  ru: { text: 'Эх, чужак, общий съём цен шляп (юфть) – вдрызг!' },
  'zh-Hans': { text: '保时捷驾驶体验活动在线销售通用条款与条件' },
  'zh-Hant': { text: '天地玄黃，宇宙洪荒。日月盈昃，辰宿列張。' },
  ja: {
    text: 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすん',
  },
  ko: { text: '키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다' },
};

type PangramProps = {
  lang: keyof typeof PANGRAMS;
};

export const Pangram = ({ lang }: PangramProps) => {
  const entry = PANGRAMS[lang];
  if (!entry) return null;

  return (
    <>
      <PText lang={lang} dir={entry.dir}>
        {entry.text}
      </PText>
      <PText lang={lang} dir={entry.dir} weight="semibold">
        {entry.text}
      </PText>
      <PText lang={lang} dir={entry.dir} weight="bold">
        {entry.text}
      </PText>
    </>
  );
};
