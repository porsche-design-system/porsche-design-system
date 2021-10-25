import { PText } from '@porsche-design-system/components-react';
import type { TextAlign, TextSize } from '@porsche-design-system/components-react';

export const TypographyGreekAndCopticPage = (): JSX.Element => {
  const style = `
    h2,
    h4 {
      color: deeppink;
    }

    p-text {
      display: inline-block;
      text-align: center;
      vertical-align: top;
      margin: 4px;
      padding: 4px;
      background: #f1f1f1;
      width: 36px;
      height: 36px;
    }
  `;
  const props: { size: TextSize; align: TextAlign } = { size: 'medium', align: 'center' };

  return (
    <>
      <style children={style} />

      <div className="playground" title="should show typography in greek and coptic charset">
        <h2>Porsche Next Greek & Coptic</h2>
        <h4>Range: U+0370-03FF</h4>
        <PText {...props} title="U+0370 | Dec:880" children="Ͱ" />
        <PText {...props} title="U+0371 | Dec:881" children="ͱ" />
        <PText {...props} title="U+0372 | Dec:882" children="Ͳ" />
        <PText {...props} title="U+0373 | Dec:883" children="ͳ" />
        <PText {...props} title="U+0374 | Dec:884" children="ʹ" />
        <PText {...props} title="U+0375 | Dec:885" children="͵" />
        <PText {...props} title="U+0376 | Dec:886" children="Ͷ" />
        <PText {...props} title="U+0377 | Dec:887" children="ͷ" />
        <PText {...props} title="U+0378 | Dec:888" children="&#888;" />
        <PText {...props} title="U+0379 | Dec:889" children="&#889;" />
        <PText {...props} title="U+037A | Dec:890" children="ͺ" />
        <PText {...props} title="U+037B | Dec:891" children="ͻ" />
        <PText {...props} title="U+037C | Dec:892" children="ͼ" />
        <PText {...props} title="U+037D | Dec:893" children="ͽ" />
        <PText {...props} title="U+037E | Dec:894" children=";" />
        <PText {...props} title="U+037F | Dec:895" children="Ϳ" />
        <PText {...props} title="U+0380 | Dec:896" children="&#896;" />
        <PText {...props} title="U+0381 | Dec:897" children="&#897;" />
        <PText {...props} title="U+0382 | Dec:898" children="&#898;" />
        <PText {...props} title="U+0383 | Dec:899" children="&#899;" />
        <PText {...props} title="U+0384 | Dec:900" children="΄" />
        <PText {...props} title="U+0385 | Dec:901" children="΅" />
        <PText {...props} title="U+0386 | Dec:902" children="Ά" />
        <PText {...props} title="U+0387 | Dec:903" children="·" />
        <PText {...props} title="U+0388 | Dec:904" children="Έ" />
        <PText {...props} title="U+0389 | Dec:905" children="Ή" />
        <PText {...props} title="U+038A | Dec:906" children="Ί" />
        <PText {...props} title="U+038B | Dec:907" children="΋" />
        <PText {...props} title="U+038C | Dec:908" children="Ό" />
        <PText {...props} title="U+038D | Dec:909" children="΍" />
        <PText {...props} title="U+038E | Dec:910" children="Ύ" />
        <PText {...props} title="U+038F | Dec:911" children="Ώ" />
        <PText {...props} title="U+0390 | Dec:912" children="ΐ" />
        <PText {...props} title="U+0391 | Dec:913" children="Α" />
        <PText {...props} title="U+0392 | Dec:914" children="Β" />
        <PText {...props} title="U+0393 | Dec:915" children="Γ" />
        <PText {...props} title="U+0394 | Dec:916" children="Δ" />
        <PText {...props} title="U+0395 | Dec:917" children="Ε" />
        <PText {...props} title="U+0396 | Dec:918" children="Ζ" />
        <PText {...props} title="U+0397 | Dec:919" children="Η" />
        <PText {...props} title="U+0398 | Dec:920" children="Θ" />
        <PText {...props} title="U+0399 | Dec:921" children="Ι" />
        <PText {...props} title="U+039A | Dec:922" children="Κ" />
        <PText {...props} title="U+039B | Dec:923" children="Λ" />
        <PText {...props} title="U+039C | Dec:924" children="Μ" />
        <PText {...props} title="U+039D | Dec:925" children="Ν" />
        <PText {...props} title="U+039E | Dec:926" children="Ξ" />
        <PText {...props} title="U+039F | Dec:927" children="Ο" />
        <PText {...props} title="U+03A0 | Dec:928" children="Π" />
        <PText {...props} title="U+03A1 | Dec:929" children="Ρ" />
        <PText {...props} title="U+03A2 | Dec:930" children="΢" />
        <PText {...props} title="U+03A3 | Dec:931" children="Σ" />
        <PText {...props} title="U+03A4 | Dec:932" children="Τ" />
        <PText {...props} title="U+03A5 | Dec:933" children="Υ" />
        <PText {...props} title="U+03A6 | Dec:934" children="Φ" />
        <PText {...props} title="U+03A7 | Dec:935" children="Χ" />
        <PText {...props} title="U+03A8 | Dec:936" children="Ψ" />
        <PText {...props} title="U+03A9 | Dec:937" children="Ω" />
        <PText {...props} title="U+03AA | Dec:938" children="Ϊ" />
        <PText {...props} title="U+03AB | Dec:939" children="Ϋ" />
        <PText {...props} title="U+03AC | Dec:940" children="ά" />
        <PText {...props} title="U+03AD | Dec:941" children="έ" />
        <PText {...props} title="U+03AE | Dec:942" children="ή" />
        <PText {...props} title="U+03AF | Dec:943" children="ί" />
        <PText {...props} title="U+03B0 | Dec:944" children="ΰ" />
        <PText {...props} title="U+03B1 | Dec:945" children="α" />
        <PText {...props} title="U+03B2 | Dec:946" children="β" />
        <PText {...props} title="U+03B3 | Dec:947" children="γ" />
        <PText {...props} title="U+03B4 | Dec:948" children="δ" />
        <PText {...props} title="U+03B5 | Dec:949" children="ε" />
        <PText {...props} title="U+03B6 | Dec:950" children="ζ" />
        <PText {...props} title="U+03B7 | Dec:951" children="η" />
        <PText {...props} title="U+03B8 | Dec:952" children="θ" />
        <PText {...props} title="U+03B9 | Dec:953" children="ι" />
        <PText {...props} title="U+03BA | Dec:954" children="κ" />
        <PText {...props} title="U+03BB | Dec:955" children="λ" />
        <PText {...props} title="U+03BC | Dec:956" children="μ" />
        <PText {...props} title="U+03BD | Dec:957" children="ν" />
        <PText {...props} title="U+03BE | Dec:958" children="ξ" />
        <PText {...props} title="U+03BF | Dec:959" children="ο" />
        <PText {...props} title="U+03C0 | Dec:960" children="π" />
        <PText {...props} title="U+03C1 | Dec:961" children="ρ" />
        <PText {...props} title="U+03C2 | Dec:962" children="ς" />
        <PText {...props} title="U+03C3 | Dec:963" children="σ" />
        <PText {...props} title="U+03C4 | Dec:964" children="τ" />
        <PText {...props} title="U+03C5 | Dec:965" children="υ" />
        <PText {...props} title="U+03C6 | Dec:966" children="φ" />
        <PText {...props} title="U+03C7 | Dec:967" children="χ" />
        <PText {...props} title="U+03C8 | Dec:968" children="ψ" />
        <PText {...props} title="U+03C9 | Dec:969" children="ω" />
        <PText {...props} title="U+03CA | Dec:970" children="ϊ" />
        <PText {...props} title="U+03CB | Dec:971" children="ϋ" />
        <PText {...props} title="U+03CC | Dec:972" children="ό" />
        <PText {...props} title="U+03CD | Dec:973" children="ύ" />
        <PText {...props} title="U+03CE | Dec:974" children="ώ" />
        <PText {...props} title="U+03CF | Dec:975" children="Ϗ" />
        <PText {...props} title="U+03D0 | Dec:976" children="ϐ" />
        <PText {...props} title="U+03D1 | Dec:977" children="ϑ" />
        <PText {...props} title="U+03D2 | Dec:978" children="ϒ" />
        <PText {...props} title="U+03D3 | Dec:979" children="ϓ" />
        <PText {...props} title="U+03D4 | Dec:980" children="ϔ" />
        <PText {...props} title="U+03D5 | Dec:981" children="ϕ" />
        <PText {...props} title="U+03D6 | Dec:982" children="ϖ" />
        <PText {...props} title="U+03D7 | Dec:983" children="ϗ" />
        <PText {...props} title="U+03D8 | Dec:984" children="Ϙ" />
        <PText {...props} title="U+03D9 | Dec:985" children="ϙ" />
        <PText {...props} title="U+03DA | Dec:986" children="Ϛ" />
        <PText {...props} title="U+03DB | Dec:987" children="ϛ" />
        <PText {...props} title="U+03DC | Dec:988" children="Ϝ" />
        <PText {...props} title="U+03DD | Dec:989" children="ϝ" />
        <PText {...props} title="U+03DE | Dec:990" children="Ϟ" />
        <PText {...props} title="U+03DF | Dec:991" children="ϟ" />
        <PText {...props} title="U+03E0 | Dec:992" children="Ϡ" />
        <PText {...props} title="U+03E1 | Dec:993" children="ϡ" />
        <PText {...props} title="U+03E2 | Dec:994" children="Ϣ" />
        <PText {...props} title="U+03E3 | Dec:995" children="ϣ" />
        <PText {...props} title="U+03E4 | Dec:996" children="Ϥ" />
        <PText {...props} title="U+03E5 | Dec:997" children="ϥ" />
        <PText {...props} title="U+03E6 | Dec:998" children="Ϧ" />
        <PText {...props} title="U+03E7 | Dec:999" children="ϧ" />
        <PText {...props} title="U+03E8 | Dec:1000" children="Ϩ" />
        <PText {...props} title="U+03E9 | Dec:1001" children="ϩ" />
        <PText {...props} title="U+03EA | Dec:1002" children="Ϫ" />
        <PText {...props} title="U+03EB | Dec:1003" children="ϫ" />
        <PText {...props} title="U+03EC | Dec:1004" children="Ϭ" />
        <PText {...props} title="U+03ED | Dec:1005" children="ϭ" />
        <PText {...props} title="U+03EE | Dec:1006" children="Ϯ" />
        <PText {...props} title="U+03EF | Dec:1007" children="ϯ" />
        <PText {...props} title="U+03F0 | Dec:1008" children="ϰ" />
        <PText {...props} title="U+03F1 | Dec:1009" children="ϱ" />
        <PText {...props} title="U+03F2 | Dec:1010" children="ϲ" />
        <PText {...props} title="U+03F3 | Dec:1011" children="ϳ" />
        <PText {...props} title="U+03F4 | Dec:1012" children="ϴ" />
        <PText {...props} title="U+03F5 | Dec:1013" children="ϵ" />
        <PText {...props} title="U+03F6 | Dec:1014" children="϶" />
        <PText {...props} title="U+03F7 | Dec:1015" children="Ϸ" />
        <PText {...props} title="U+03F8 | Dec:1016" children="ϸ" />
        <PText {...props} title="U+03F9 | Dec:1017" children="Ϲ" />
        <PText {...props} title="U+03FA | Dec:1018" children="Ϻ" />
        <PText {...props} title="U+03FB | Dec:1019" children="ϻ" />
        <PText {...props} title="U+03FC | Dec:1020" children="ϼ" />
        <PText {...props} title="U+03FD | Dec:1021" children="Ͻ" />
        <PText {...props} title="U+03FE | Dec:1022" children="Ͼ" />
        <PText {...props} title="U+03FF | Dec:1023" children="Ͽ" />
      </div>
    </>
  );
};
