import { PText, PHeadline } from '@porsche-design-system/components-react';

export const TypographyFallbackStrategyPage = (): JSX.Element => {
  return (
    <>
      <div className="playground" title="should show typography in supported font-weights for latin charset">
        <PText weight="thin">The quick brown fox jumps over the lazy dog</PText>
        <PText weight="regular">The quick brown fox jumps over the lazy dog</PText>
        <PHeadline variant="headline-5">The quick brown fox jumps over the lazy dog</PHeadline>
        <PText weight="bold">The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div className="playground" title="should show typography in supported font-weights for greek and coptic charset">
        <PText weight="thin">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</PText>
        <PText weight="regular">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</PText>
        <PHeadline variant="headline-5">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</PHeadline>
        <PText weight="bold">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</PText>
      </div>

      <div className="playground" title="should show typography in supported font-weights for cyril charset">
        <PText weight="thin">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</PText>
        <PText weight="regular">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</PText>
        <PHeadline variant="headline-5">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</PHeadline>
        <PText weight="bold">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</PText>
      </div>

      <div className="playground" title="should show typography in supported font-weights for chinese charset">
        <PText weight="thin">保时捷驾驶体验活动在线销售通用条款与条件</PText>
        <PText weight="regular">保时捷驾驶体验活动在线销售通用条款与条件</PText>
        <PHeadline variant="headline-5">保时捷驾驶体验活动在线销售通用条款与条件</PHeadline>
        <PText weight="bold">保时捷驾驶体验活动在线销售通用条款与条件</PText>
      </div>

      <div className="playground" title="should show typography in supported font-weights for cyril charset">
        <PText weight="thin">
          いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす（ん）
        </PText>
        <PText weight="regular">
          いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす（ん）
        </PText>
        <PHeadline variant="headline-5">
          いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす（ん）
        </PHeadline>
        <PText weight="bold">
          いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす（ん）
        </PText>
      </div>

      <div className="playground" title="should show typography in supported font-weights for cyril charset">
        <PText weight="thin">키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다</PText>
        <PText weight="regular">키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다</PText>
        <PHeadline variant="headline-5">키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다</PHeadline>
        <PText weight="bold">키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다</PText>
      </div>
    </>
  );
};
