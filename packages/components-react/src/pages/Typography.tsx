import { PText, PHeadline } from '@porsche-design-system/components-react';
import type { TextAlign, TextSize } from '@porsche-design-system/components-react';

export const TypographyPage = (): JSX.Element => {
  const style = `
    .playground {
      overflow: hidden;
    }

    .playground:nth-child(-n+4) p-text {
      display: block;
      vertical-align: top;
      margin: 4px;
      padding: 4px;
      background: #f1f1f1;
      width: 36px;
      height: 36px;
      float: left;
    }

    div, br {
      clear: both;
    }
  `;
  const props: { size: TextSize; align: TextAlign } = { size: 'medium', align: 'center' };

  return (
    <>
      <style children={style} />

      <div className="playground" title="should show typography in basic latin charset">
        <PHeadline>Latin</PHeadline>
        <br />
        <PHeadline variant="headline-4">Range: U+0020-007F (Porsche Next "Basic Latin")</PHeadline>
        <PText {...props} title="U++0020 | Dec: 32" />
        <PText {...props} title="U++0021 | Dec: 33" children="!" />
        <PText {...props} title="U++0022 | Dec: 34" children='"' />
        <PText {...props} title="U++0023 | Dec: 35" children="#" />
        <PText {...props} title="U++0024 | Dec: 36" children="$" />
        <PText {...props} title="U++0025 | Dec: 37" children="%" />
        <PText {...props} title="U++0026 | Dec: 38" children="&amp;" />
        <PText {...props} title="U++0027 | Dec: 39" children="'" />
        <PText {...props} title="U++0028 | Dec: 40" children="(" />
        <PText {...props} title="U++0029 | Dec: 41" children=")" />
        <PText {...props} title="U++002A | Dec: 42" children="*" />
        <PText {...props} title="U++002B | Dec: 43" children="+" />
        <PText {...props} title="U++002C | Dec: 44" children="," />
        <PText {...props} title="U++002D | Dec: 45" children="-" />
        <PText {...props} title="U++002E | Dec: 46" children="." />
        <PText {...props} title="U++002F | Dec: 47" children="/" />
        <PText {...props} title="U++0030 | Dec: 48" children="0" />
        <PText {...props} title="U++0031 | Dec: 49" children="1" />
        <PText {...props} title="U++0032 | Dec: 50" children="2" />
        <PText {...props} title="U++0033 | Dec: 51" children="3" />
        <PText {...props} title="U++0034 | Dec: 52" children="4" />
        <PText {...props} title="U++0035 | Dec: 53" children="5" />
        <PText {...props} title="U++0036 | Dec: 54" children="6" />
        <PText {...props} title="U++0037 | Dec: 55" children="7" />
        <PText {...props} title="U++0038 | Dec: 56" children="8" />
        <PText {...props} title="U++0039 | Dec: 57" children="9" />
        <PText {...props} title="U++003A | Dec: 58" children=":" />
        <PText {...props} title="U++003B | Dec: 59" children=";" />
        <PText {...props} title="U++003C | Dec: 60" children="&lt;" />
        <PText {...props} title="U++003D | Dec: 61" children="=" />
        <PText {...props} title="U++003E | Dec: 62" children="&gt;" />
        <PText {...props} title="U++003F | Dec: 63" children="?" />
        <PText {...props} title="U++0040 | Dec: 64" children="@" />
        <PText {...props} title="U++0041 | Dec: 65" children="A" />
        <PText {...props} title="U++0042 | Dec: 66" children="B" />
        <PText {...props} title="U++0043 | Dec: 67" children="C" />
        <PText {...props} title="U++0044 | Dec: 68" children="D" />
        <PText {...props} title="U++0045 | Dec: 69" children="E" />
        <PText {...props} title="U++0046 | Dec: 70" children="F" />
        <PText {...props} title="U++0047 | Dec: 71" children="G" />
        <PText {...props} title="U++0048 | Dec: 72" children="H" />
        <PText {...props} title="U++0049 | Dec: 73" children="I" />
        <PText {...props} title="U++004A | Dec: 74" children="J" />
        <PText {...props} title="U++004B | Dec: 75" children="K" />
        <PText {...props} title="U++004C | Dec: 76" children="L" />
        <PText {...props} title="U++004D | Dec: 77" children="M" />
        <PText {...props} title="U++004E | Dec: 78" children="N" />
        <PText {...props} title="U++004F | Dec: 79" children="O" />
        <PText {...props} title="U++0050 | Dec: 80" children="P" />
        <PText {...props} title="U++0051 | Dec: 81" children="Q" />
        <PText {...props} title="U++0052 | Dec: 82" children="R" />
        <PText {...props} title="U++0053 | Dec: 83" children="S" />
        <PText {...props} title="U++0054 | Dec: 84" children="T" />
        <PText {...props} title="U++0055 | Dec: 85" children="U" />
        <PText {...props} title="U++0056 | Dec: 86" children="V" />
        <PText {...props} title="U++0057 | Dec: 87" children="W" />
        <PText {...props} title="U++0058 | Dec: 88" children="X" />
        <PText {...props} title="U++0059 | Dec: 89" children="Y" />
        <PText {...props} title="U++005A | Dec: 90" children="Z" />
        <PText {...props} title="U++005B | Dec: 91" children="[" />
        <PText {...props} title="U++005C | Dec: 92" children="\" />
        <PText {...props} title="U++005D | Dec: 93" children="]" />
        <PText {...props} title="U++005E | Dec: 94" children="^" />
        <PText {...props} title="U++005F | Dec: 95" children="_" />
        <PText {...props} title="U++0060 | Dec: 96" children="`" />
        <PText {...props} title="U++0061 | Dec: 97" children="a" />
        <PText {...props} title="U++0062 | Dec: 98" children="b" />
        <PText {...props} title="U++0063 | Dec: 99" children="c" />
        <PText {...props} title="U++0064 | Dec: 100" children="d" />
        <PText {...props} title="U++0065 | Dec: 101" children="e" />
        <PText {...props} title="U++0066 | Dec: 102" children="f" />
        <PText {...props} title="U++0067 | Dec: 103" children="g" />
        <PText {...props} title="U++0068 | Dec: 104" children="h" />
        <PText {...props} title="U++0069 | Dec: 105" children="i" />
        <PText {...props} title="U++006A | Dec: 106" children="j" />
        <PText {...props} title="U++006B | Dec: 107" children="k" />
        <PText {...props} title="U++006C | Dec: 108" children="l" />
        <PText {...props} title="U++006D | Dec: 109" children="m" />
        <PText {...props} title="U++006E | Dec: 110" children="n" />
        <PText {...props} title="U++006F | Dec: 111" children="o" />
        <PText {...props} title="U++0070 | Dec: 112" children="p" />
        <PText {...props} title="U++0071 | Dec: 113" children="q" />
        <PText {...props} title="U++0072 | Dec: 114" children="r" />
        <PText {...props} title="U++0073 | Dec: 115" children="s" />
        <PText {...props} title="U++0074 | Dec: 116" children="t" />
        <PText {...props} title="U++0075 | Dec: 117" children="u" />
        <PText {...props} title="U++0076 | Dec: 118" children="v" />
        <PText {...props} title="U++0077 | Dec: 119" children="w" />
        <PText {...props} title="U++0078 | Dec: 120" children="x" />
        <PText {...props} title="U++0079 | Dec: 121" children="y" />
        <PText {...props} title="U++007A | Dec: 122" children="z" />
        <PText {...props} title="U++007B | Dec: 123" children="&#123;" />
        <PText {...props} title="U++007C | Dec: 124" children="|" />
        <PText {...props} title="U++007D | Dec: 125" children="&#125;" />
        <PText {...props} title="U++007E | Dec: 126" children="~" />
        <PText {...props} title="U++007F | Dec: 127" children="␡" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+0080-00FF (Porsche Next "Latin-1 Supplement")</PHeadline>
        <PText {...props} title="U+0080 | Dec: 128" children="" />
        <PText {...props} title="U+0081 | Dec: 129" children="" />
        <PText {...props} title="U+0082 | Dec: 130" children="" />
        <PText {...props} title="U+0083 | Dec: 131" children="" />
        <PText {...props} title="U+0084 | Dec: 132" children="" />
        <PText {...props} title="U+0085 | Dec: 133" children="" />
        <PText {...props} title="U+0086 | Dec: 134" children="" />
        <PText {...props} title="U+0087 | Dec: 135" children="" />
        <PText {...props} title="U+0088 | Dec: 136" children="" />
        <PText {...props} title="U+0089 | Dec: 137" children="" />
        <PText {...props} title="U+008A | Dec: 138" children="" />
        <PText {...props} title="U+008B | Dec: 139" children="" />
        <PText {...props} title="U+008C | Dec: 140" children="" />
        <PText {...props} title="U+008D | Dec: 141" children="" />
        <PText {...props} title="U+008E | Dec: 142" children="" />
        <PText {...props} title="U+008F | Dec: 143" children="" />
        <PText {...props} title="U+0090 | Dec: 144" children="" />
        <PText {...props} title="U+0091 | Dec: 145" children="" />
        <PText {...props} title="U+0092 | Dec: 146" children="" />
        <PText {...props} title="U+0093 | Dec: 147" children="" />
        <PText {...props} title="U+0094 | Dec: 148" children="" />
        <PText {...props} title="U+0095 | Dec: 149" children="" />
        <PText {...props} title="U+0096 | Dec: 150" children="" />
        <PText {...props} title="U+0097 | Dec: 151" children="" />
        <PText {...props} title="U+0098 | Dec: 152" children="" />
        <PText {...props} title="U+0099 | Dec: 153" children="" />
        <PText {...props} title="U+009A | Dec: 154" children="" />
        <PText {...props} title="U+009B | Dec: 155" children="" />
        <PText {...props} title="U+009C | Dec: 156" children="" />
        <PText {...props} title="U+009D | Dec: 157" children="" />
        <PText {...props} title="U+009E | Dec: 158" children="" />
        <PText {...props} title="U+009F | Dec: 159" children="" />
        <PText {...props} title="U+00A0 | Dec: 160" children="&nbsp;" />
        <PText {...props} title="U+00A1 | Dec: 161" children="¡" />
        <PText {...props} title="U+00A2 | Dec: 162" children="¢" />
        <PText {...props} title="U+00A3 | Dec: 163" children="£" />
        <PText {...props} title="U+00A4 | Dec: 164" children="¤" />
        <PText {...props} title="U+00A5 | Dec: 165" children="¥" />
        <PText {...props} title="U+00A6 | Dec: 166" children="¦" />
        <PText {...props} title="U+00A7 | Dec: 167" children="§" />
        <PText {...props} title="U+00A8 | Dec: 168" children="¨" />
        <PText {...props} title="U+00A9 | Dec: 169" children="©" />
        <PText {...props} title="U+00AA | Dec: 170" children="ª" />
        <PText {...props} title="U+00AB | Dec: 171" children="«" />
        <PText {...props} title="U+00AC | Dec: 172" children="¬" />
        <PText {...props} title="U+00AD | Dec: 173" children="&shy;" />
        <PText {...props} title="U+00AE | Dec: 174" children="®" />
        <PText {...props} title="U+00AF | Dec: 175" children="¯" />
        <PText {...props} title="U+00B0 | Dec: 176" children="°" />
        <PText {...props} title="U+00B1 | Dec: 177" children="±" />
        <PText {...props} title="U+00B2 | Dec: 178" children="²" />
        <PText {...props} title="U+00B3 | Dec: 179" children="³" />
        <PText {...props} title="U+00B4 | Dec: 180" children="´" />
        <PText {...props} title="U+00B5 | Dec: 181" children="µ" />
        <PText {...props} title="U+00B6 | Dec: 182" children="¶" />
        <PText {...props} title="U+00B7 | Dec: 183" children="·" />
        <PText {...props} title="U+00B8 | Dec: 184" children="¸" />
        <PText {...props} title="U+00B9 | Dec: 185" children="¹" />
        <PText {...props} title="U+00BA | Dec: 186" children="º" />
        <PText {...props} title="U+00BB | Dec: 187" children="»" />
        <PText {...props} title="U+00BC | Dec: 188" children="¼" />
        <PText {...props} title="U+00BD | Dec: 189" children="½" />
        <PText {...props} title="U+00BE | Dec: 190" children="¾" />
        <PText {...props} title="U+00BF | Dec: 191" children="¿" />
        <PText {...props} title="U+00C0 | Dec: 192" children="À" />
        <PText {...props} title="U+00C1 | Dec: 193" children="Á" />
        <PText {...props} title="U+00C2 | Dec: 194" children="Â" />
        <PText {...props} title="U+00C3 | Dec: 195" children="Ã" />
        <PText {...props} title="U+00C4 | Dec: 196" children="Ä" />
        <PText {...props} title="U+00C5 | Dec: 197" children="Å" />
        <PText {...props} title="U+00C6 | Dec: 198" children="Æ" />
        <PText {...props} title="U+00C7 | Dec: 199" children="Ç" />
        <PText {...props} title="U+00C8 | Dec: 200" children="È" />
        <PText {...props} title="U+00C9 | Dec: 201" children="É" />
        <PText {...props} title="U+00CA | Dec: 202" children="Ê" />
        <PText {...props} title="U+00CB | Dec: 203" children="Ë" />
        <PText {...props} title="U+00CC | Dec: 204" children="Ì" />
        <PText {...props} title="U+00CD | Dec: 205" children="Í" />
        <PText {...props} title="U+00CE | Dec: 206" children="Î" />
        <PText {...props} title="U+00CF | Dec: 207" children="Ï" />
        <PText {...props} title="U+00D0 | Dec: 208" children="Ð" />
        <PText {...props} title="U+00D1 | Dec: 209" children="Ñ" />
        <PText {...props} title="U+00D2 | Dec: 210" children="Ò" />
        <PText {...props} title="U+00D3 | Dec: 211" children="Ó" />
        <PText {...props} title="U+00D4 | Dec: 212" children="Ô" />
        <PText {...props} title="U+00D5 | Dec: 213" children="Õ" />
        <PText {...props} title="U+00D6 | Dec: 214" children="Ö" />
        <PText {...props} title="U+00D7 | Dec: 215" children="×" />
        <PText {...props} title="U+00D8 | Dec: 216" children="Ø" />
        <PText {...props} title="U+00D9 | Dec: 217" children="Ù" />
        <PText {...props} title="U+00DA | Dec: 218" children="Ú" />
        <PText {...props} title="U+00DB | Dec: 219" children="Û" />
        <PText {...props} title="U+00DC | Dec: 220" children="Ü" />
        <PText {...props} title="U+00DD | Dec: 221" children="Ý" />
        <PText {...props} title="U+00DE | Dec: 222" children="Þ" />
        <PText {...props} title="U+00DF | Dec: 223" children="ß" />
        <PText {...props} title="U+00E0 | Dec: 224" children="à" />
        <PText {...props} title="U+00E1 | Dec: 225" children="á" />
        <PText {...props} title="U+00E2 | Dec: 226" children="â" />
        <PText {...props} title="U+00E3 | Dec: 227" children="ã" />
        <PText {...props} title="U+00E4 | Dec: 228" children="ä" />
        <PText {...props} title="U+00E5 | Dec: 229" children="å" />
        <PText {...props} title="U+00E6 | Dec: 230" children="æ" />
        <PText {...props} title="U+00E7 | Dec: 231" children="ç" />
        <PText {...props} title="U+00E8 | Dec: 232" children="è" />
        <PText {...props} title="U+00E9 | Dec: 233" children="é" />
        <PText {...props} title="U+00EA | Dec: 234" children="ê" />
        <PText {...props} title="U+00EB | Dec: 235" children="ë" />
        <PText {...props} title="U+00EC | Dec: 236" children="ì" />
        <PText {...props} title="U+00ED | Dec: 237" children="í" />
        <PText {...props} title="U+00EE | Dec: 238" children="î" />
        <PText {...props} title="U+00EF | Dec: 239" children="ï" />
        <PText {...props} title="U+00F0 | Dec: 240" children="ð" />
        <PText {...props} title="U+00F1 | Dec: 241" children="ñ" />
        <PText {...props} title="U+00F2 | Dec: 242" children="ò" />
        <PText {...props} title="U+00F3 | Dec: 243" children="ó" />
        <PText {...props} title="U+00F4 | Dec: 244" children="ô" />
        <PText {...props} title="U+00F5 | Dec: 245" children="õ" />
        <PText {...props} title="U+00F6 | Dec: 246" children="ö" />
        <PText {...props} title="U+00F7 | Dec: 247" children="÷" />
        <PText {...props} title="U+00F8 | Dec: 248" children="ø" />
        <PText {...props} title="U+00F9 | Dec: 249" children="ù" />
        <PText {...props} title="U+00FA | Dec: 250" children="ú" />
        <PText {...props} title="U+00FB | Dec: 251" children="û" />
        <PText {...props} title="U+00FC | Dec: 252" children="ü" />
        <PText {...props} title="U+00FD | Dec: 253" children="ý" />
        <PText {...props} title="U+00FE | Dec: 254" children="þ" />
        <PText {...props} title="U+00FF | Dec: 255" children="ÿ" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+0100-017F (Porsche Next "Latin Extended-A")</PHeadline>
        <PText {...props} title="U+0100 | Dec: 256" children="Ā" />
        <PText {...props} title="U+0101 | Dec: 257" children="ā" />
        <PText {...props} title="U+0102 | Dec: 258" children="Ă" />
        <PText {...props} title="U+0103 | Dec: 259" children="ă" />
        <PText {...props} title="U+0104 | Dec: 260" children="Ą" />
        <PText {...props} title="U+0105 | Dec: 261" children="ą" />
        <PText {...props} title="U+0106 | Dec: 262" children="Ć" />
        <PText {...props} title="U+0107 | Dec: 263" children="ć" />
        <PText {...props} title="U+0108 | Dec: 264" children="Ĉ" />
        <PText {...props} title="U+0109 | Dec: 265" children="ĉ" />
        <PText {...props} title="U+010A | Dec: 266" children="Ċ" />
        <PText {...props} title="U+010B | Dec: 267" children="ċ" />
        <PText {...props} title="U+010C | Dec: 268" children="Č" />
        <PText {...props} title="U+010D | Dec: 269" children="č" />
        <PText {...props} title="U+010E | Dec: 270" children="Ď" />
        <PText {...props} title="U+010F | Dec: 271" children="ď" />
        <PText {...props} title="U+0110 | Dec: 272" children="Đ" />
        <PText {...props} title="U+0111 | Dec: 273" children="đ" />
        <PText {...props} title="U+0112 | Dec: 274" children="Ē" />
        <PText {...props} title="U+0113 | Dec: 275" children="ē" />
        <PText {...props} title="U+0114 | Dec: 276" children="Ĕ" />
        <PText {...props} title="U+0115 | Dec: 277" children="ĕ" />
        <PText {...props} title="U+0116 | Dec: 278" children="Ė" />
        <PText {...props} title="U+0117 | Dec: 279" children="ė" />
        <PText {...props} title="U+0118 | Dec: 280" children="Ę" />
        <PText {...props} title="U+0119 | Dec: 281" children="ę" />
        <PText {...props} title="U+011A | Dec: 282" children="Ě" />
        <PText {...props} title="U+011B | Dec: 283" children="ě" />
        <PText {...props} title="U+011C | Dec: 284" children="Ĝ" />
        <PText {...props} title="U+011D | Dec: 285" children="ĝ" />
        <PText {...props} title="U+011E | Dec: 286" children="Ğ" />
        <PText {...props} title="U+011F | Dec: 287" children="ğ" />
        <PText {...props} title="U+0120 | Dec: 288" children="Ġ" />
        <PText {...props} title="U+0121 | Dec: 289" children="ġ" />
        <PText {...props} title="U+0122 | Dec: 290" children="Ģ" />
        <PText {...props} title="U+0123 | Dec: 291" children="ģ" />
        <PText {...props} title="U+0124 | Dec: 292" children="Ĥ" />
        <PText {...props} title="U+0125 | Dec: 293" children="ĥ" />
        <PText {...props} title="U+0126 | Dec: 294" children="Ħ" />
        <PText {...props} title="U+0127 | Dec: 295" children="ħ" />
        <PText {...props} title="U+0128 | Dec: 296" children="Ĩ" />
        <PText {...props} title="U+0129 | Dec: 297" children="ĩ" />
        <PText {...props} title="U+012A | Dec: 298" children="Ī" />
        <PText {...props} title="U+012B | Dec: 299" children="ī" />
        <PText {...props} title="U+012C | Dec: 300" children="Ĭ" />
        <PText {...props} title="U+012D | Dec: 301" children="ĭ" />
        <PText {...props} title="U+012E | Dec: 302" children="Į" />
        <PText {...props} title="U+012F | Dec: 303" children="į" />
        <PText {...props} title="U+0130 | Dec: 304" children="İ" />
        <PText {...props} title="U+0131 | Dec: 305" children="ı" />
        <PText {...props} title="U+0132 | Dec: 306" children="Ĳ" />
        <PText {...props} title="U+0133 | Dec: 307" children="ĳ" />
        <PText {...props} title="U+0134 | Dec: 308" children="Ĵ" />
        <PText {...props} title="U+0135 | Dec: 309" children="ĵ" />
        <PText {...props} title="U+0136 | Dec: 310" children="Ķ" />
        <PText {...props} title="U+0137 | Dec: 311" children="ķ" />
        <PText {...props} title="U+0138 | Dec: 312" children="ĸ" />
        <PText {...props} title="U+0139 | Dec: 313" children="Ĺ" />
        <PText {...props} title="U+013A | Dec: 314" children="ĺ" />
        <PText {...props} title="U+013B | Dec: 315" children="Ļ" />
        <PText {...props} title="U+013C | Dec: 316" children="ļ" />
        <PText {...props} title="U+013D | Dec: 317" children="Ľ" />
        <PText {...props} title="U+013E | Dec: 318" children="ľ" />
        <PText {...props} title="U+013F | Dec: 319" children="Ŀ" />
        <PText {...props} title="U+0140 | Dec: 320" children="ŀ" />
        <PText {...props} title="U+0141 | Dec: 321" children="Ł" />
        <PText {...props} title="U+0142 | Dec: 322" children="ł" />
        <PText {...props} title="U+0143 | Dec: 323" children="Ń" />
        <PText {...props} title="U+0144 | Dec: 324" children="ń" />
        <PText {...props} title="U+0145 | Dec: 325" children="Ņ" />
        <PText {...props} title="U+0146 | Dec: 326" children="ņ" />
        <PText {...props} title="U+0147 | Dec: 327" children="Ň" />
        <PText {...props} title="U+0148 | Dec: 328" children="ň" />
        <PText {...props} title="U+0149 | Dec: 329" children="ŉ" />
        <PText {...props} title="U+014A | Dec: 330" children="Ŋ" />
        <PText {...props} title="U+014B | Dec: 331" children="ŋ" />
        <PText {...props} title="U+014C | Dec: 332" children="Ō" />
        <PText {...props} title="U+014D | Dec: 333" children="ō" />
        <PText {...props} title="U+014E | Dec: 334" children="Ŏ" />
        <PText {...props} title="U+014F | Dec: 335" children="ŏ" />
        <PText {...props} title="U+0150 | Dec: 336" children="Ő" />
        <PText {...props} title="U+0151 | Dec: 337" children="ő" />
        <PText {...props} title="U+0152 | Dec: 338" children="Œ" />
        <PText {...props} title="U+0153 | Dec: 339" children="œ" />
        <PText {...props} title="U+0154 | Dec: 340" children="Ŕ" />
        <PText {...props} title="U+0155 | Dec: 341" children="ŕ" />
        <PText {...props} title="U+0156 | Dec: 342" children="Ŗ" />
        <PText {...props} title="U+0157 | Dec: 343" children="ŗ" />
        <PText {...props} title="U+0158 | Dec: 344" children="Ř" />
        <PText {...props} title="U+0159 | Dec: 345" children="ř" />
        <PText {...props} title="U+015A | Dec: 346" children="Ś" />
        <PText {...props} title="U+015B | Dec: 347" children="ś" />
        <PText {...props} title="U+015C | Dec: 348" children="Ŝ" />
        <PText {...props} title="U+015D | Dec: 349" children="ŝ" />
        <PText {...props} title="U+015E | Dec: 350" children="Ş" />
        <PText {...props} title="U+015F | Dec: 351" children="ş" />
        <PText {...props} title="U+0160 | Dec: 352" children="Š" />
        <PText {...props} title="U+0161 | Dec: 353" children="š" />
        <PText {...props} title="U+0162 | Dec: 354" children="Ţ" />
        <PText {...props} title="U+0163 | Dec: 355" children="ţ" />
        <PText {...props} title="U+0164 | Dec: 356" children="Ť" />
        <PText {...props} title="U+0165 | Dec: 357" children="ť" />
        <PText {...props} title="U+0166 | Dec: 358" children="Ŧ" />
        <PText {...props} title="U+0167 | Dec: 359" children="ŧ" />
        <PText {...props} title="U+0168 | Dec: 360" children="Ũ" />
        <PText {...props} title="U+0169 | Dec: 361" children="ũ" />
        <PText {...props} title="U+016A | Dec: 362" children="Ū" />
        <PText {...props} title="U+016B | Dec: 363" children="ū" />
        <PText {...props} title="U+016C | Dec: 364" children="Ŭ" />
        <PText {...props} title="U+016D | Dec: 365" children="ŭ" />
        <PText {...props} title="U+016E | Dec: 366" children="Ů" />
        <PText {...props} title="U+016F | Dec: 367" children="ů" />
        <PText {...props} title="U+0170 | Dec: 368" children="Ű" />
        <PText {...props} title="U+0171 | Dec: 369" children="ű" />
        <PText {...props} title="U+0172 | Dec: 370" children="Ų" />
        <PText {...props} title="U+0173 | Dec: 371" children="ų" />
        <PText {...props} title="U+0174 | Dec: 372" children="Ŵ" />
        <PText {...props} title="U+0175 | Dec: 373" children="ŵ" />
        <PText {...props} title="U+0176 | Dec: 374" children="Ŷ" />
        <PText {...props} title="U+0177 | Dec: 375" children="ŷ" />
        <PText {...props} title="U+0178 | Dec: 376" children="Ÿ" />
        <PText {...props} title="U+0179 | Dec: 377" children="Ź" />
        <PText {...props} title="U+017A | Dec: 378" children="ź" />
        <PText {...props} title="U+017B | Dec: 379" children="Ż" />
        <PText {...props} title="U+017C | Dec: 380" children="ż" />
        <PText {...props} title="U+017D | Dec: 381" children="Ž" />
        <PText {...props} title="U+017E | Dec: 382" children="ž" />
        <PText {...props} title="U+017F | Dec: 383" children="ſ" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+0180-024F (Porsche Next "Latin Extended-B")</PHeadline>
        <PText {...props} title="U+0180 | Dec: 384" children="ƀ" />
        <PText {...props} title="U+0181 | Dec: 385" children="Ɓ" />
        <PText {...props} title="U+0182 | Dec: 386" children="Ƃ" />
        <PText {...props} title="U+0183 | Dec: 387" children="ƃ" />
        <PText {...props} title="U+0184 | Dec: 388" children="Ƅ" />
        <PText {...props} title="U+0185 | Dec: 389" children="ƅ" />
        <PText {...props} title="U+0186 | Dec: 390" children="Ɔ" />
        <PText {...props} title="U+0187 | Dec: 391" children="Ƈ" />
        <PText {...props} title="U+0188 | Dec: 392" children="ƈ" />
        <PText {...props} title="U+0189 | Dec: 393" children="Ɖ" />
        <PText {...props} title="U+018A | Dec: 394" children="Ɗ" />
        <PText {...props} title="U+018B | Dec: 395" children="Ƌ" />
        <PText {...props} title="U+018C | Dec: 396" children="ƌ" />
        <PText {...props} title="U+018D | Dec: 397" children="ƍ" />
        <PText {...props} title="U+018E | Dec: 398" children="Ǝ" />
        <PText {...props} title="U+018F | Dec: 399" children="Ə" />
        <PText {...props} title="U+0190 | Dec: 400" children="Ɛ" />
        <PText {...props} title="U+0191 | Dec: 401" children="Ƒ" />
        <PText {...props} title="U+0192 | Dec: 402" children="ƒ" />
        <PText {...props} title="U+0193 | Dec: 403" children="Ɠ" />
        <PText {...props} title="U+0194 | Dec: 404" children="Ɣ" />
        <PText {...props} title="U+0195 | Dec: 405" children="ƕ" />
        <PText {...props} title="U+0196 | Dec: 406" children="Ɩ" />
        <PText {...props} title="U+0197 | Dec: 407" children="Ɨ" />
        <PText {...props} title="U+0198 | Dec: 408" children="Ƙ" />
        <PText {...props} title="U+0199 | Dec: 409" children="ƙ" />
        <PText {...props} title="U+019A | Dec: 410" children="ƚ" />
        <PText {...props} title="U+019B | Dec: 411" children="ƛ" />
        <PText {...props} title="U+019C | Dec: 412" children="Ɯ" />
        <PText {...props} title="U+019D | Dec: 413" children="Ɲ" />
        <PText {...props} title="U+019E | Dec: 414" children="ƞ" />
        <PText {...props} title="U+019F | Dec: 415" children="Ɵ" />
        <PText {...props} title="U+01A0 | Dec: 416" children="Ơ" />
        <PText {...props} title="U+01A1 | Dec: 417" children="ơ" />
        <PText {...props} title="U+01A2 | Dec: 418" children="Ƣ" />
        <PText {...props} title="U+01A3 | Dec: 419" children="ƣ" />
        <PText {...props} title="U+01A4 | Dec: 420" children="Ƥ" />
        <PText {...props} title="U+01A5 | Dec: 421" children="ƥ" />
        <PText {...props} title="U+01A6 | Dec: 422" children="Ʀ" />
        <PText {...props} title="U+01A7 | Dec: 423" children="Ƨ" />
        <PText {...props} title="U+01A8 | Dec: 424" children="ƨ" />
        <PText {...props} title="U+01A9 | Dec: 425" children="Ʃ" />
        <PText {...props} title="U+01AA | Dec: 426" children="ƪ" />
        <PText {...props} title="U+01AB | Dec: 427" children="ƫ" />
        <PText {...props} title="U+01AC | Dec: 428" children="Ƭ" />
        <PText {...props} title="U+01AD | Dec: 429" children="ƭ" />
        <PText {...props} title="U+01AE | Dec: 430" children="Ʈ" />
        <PText {...props} title="U+01AF | Dec: 431" children="Ư" />
        <PText {...props} title="U+01B0 | Dec: 432" children="ư" />
        <PText {...props} title="U+01B1 | Dec: 433" children="Ʊ" />
        <PText {...props} title="U+01B2 | Dec: 434" children="Ʋ" />
        <PText {...props} title="U+01B3 | Dec: 435" children="Ƴ" />
        <PText {...props} title="U+01B4 | Dec: 436" children="ƴ" />
        <PText {...props} title="U+01B5 | Dec: 437" children="Ƶ" />
        <PText {...props} title="U+01B6 | Dec: 438" children="ƶ" />
        <PText {...props} title="U+01B7 | Dec: 439" children="Ʒ" />
        <PText {...props} title="U+01B8 | Dec: 440" children="Ƹ" />
        <PText {...props} title="U+01B9 | Dec: 441" children="ƹ" />
        <PText {...props} title="U+01BA | Dec: 442" children="ƺ" />
        <PText {...props} title="U+01BB | Dec: 443" children="ƻ" />
        <PText {...props} title="U+01BC | Dec: 444" children="Ƽ" />
        <PText {...props} title="U+01BD | Dec: 445" children="ƽ" />
        <PText {...props} title="U+01BE | Dec: 446" children="ƾ" />
        <PText {...props} title="U+01BF | Dec: 447" children="ƿ" />
        <PText {...props} title="U+01C0 | Dec: 448" children="ǀ" />
        <PText {...props} title="U+01C1 | Dec: 449" children="ǁ" />
        <PText {...props} title="U+01C2 | Dec: 450" children="ǂ" />
        <PText {...props} title="U+01C3 | Dec: 451" children="ǃ" />
        <PText {...props} title="U+01C4 | Dec: 452" children="Ǆ" />
        <PText {...props} title="U+01C5 | Dec: 453" children="ǅ" />
        <PText {...props} title="U+01C6 | Dec: 454" children="ǆ" />
        <PText {...props} title="U+01C7 | Dec: 455" children="Ǉ" />
        <PText {...props} title="U+01C8 | Dec: 456" children="ǈ" />
        <PText {...props} title="U+01C9 | Dec: 457" children="ǉ" />
        <PText {...props} title="U+01CA | Dec: 458" children="Ǌ" />
        <PText {...props} title="U+01CB | Dec: 459" children="ǋ" />
        <PText {...props} title="U+01CC | Dec: 460" children="ǌ" />
        <PText {...props} title="U+01CD | Dec: 461" children="Ǎ" />
        <PText {...props} title="U+01CE | Dec: 462" children="ǎ" />
        <PText {...props} title="U+01CF | Dec: 463" children="Ǐ" />
        <PText {...props} title="U+01D0 | Dec: 464" children="ǐ" />
        <PText {...props} title="U+01D1 | Dec: 465" children="Ǒ" />
        <PText {...props} title="U+01D2 | Dec: 466" children="ǒ" />
        <PText {...props} title="U+01D3 | Dec: 467" children="Ǔ" />
        <PText {...props} title="U+01D4 | Dec: 468" children="ǔ" />
        <PText {...props} title="U+01D5 | Dec: 469" children="Ǖ" />
        <PText {...props} title="U+01D6 | Dec: 470" children="ǖ" />
        <PText {...props} title="U+01D7 | Dec: 471" children="Ǘ" />
        <PText {...props} title="U+01D8 | Dec: 472" children="ǘ" />
        <PText {...props} title="U+01D9 | Dec: 473" children="Ǚ" />
        <PText {...props} title="U+01DA | Dec: 474" children="ǚ" />
        <PText {...props} title="U+01DB | Dec: 475" children="Ǜ" />
        <PText {...props} title="U+01DC | Dec: 476" children="ǜ" />
        <PText {...props} title="U+01DD | Dec: 477" children="ǝ" />
        <PText {...props} title="U+01DE | Dec: 478" children="Ǟ" />
        <PText {...props} title="U+01DF | Dec: 479" children="ǟ" />
        <PText {...props} title="U+01E0 | Dec: 480" children="Ǡ" />
        <PText {...props} title="U+01E1 | Dec: 481" children="ǡ" />
        <PText {...props} title="U+01E2 | Dec: 482" children="Ǣ" />
        <PText {...props} title="U+01E3 | Dec: 483" children="ǣ" />
        <PText {...props} title="U+01E4 | Dec: 484" children="Ǥ" />
        <PText {...props} title="U+01E5 | Dec: 485" children="ǥ" />
        <PText {...props} title="U+01E6 | Dec: 486" children="Ǧ" />
        <PText {...props} title="U+01E7 | Dec: 487" children="ǧ" />
        <PText {...props} title="U+01E8 | Dec: 488" children="Ǩ" />
        <PText {...props} title="U+01E9 | Dec: 489" children="ǩ" />
        <PText {...props} title="U+01EA | Dec: 490" children="Ǫ" />
        <PText {...props} title="U+01EB | Dec: 491" children="ǫ" />
        <PText {...props} title="U+01EC | Dec: 492" children="Ǭ" />
        <PText {...props} title="U+01ED | Dec: 493" children="ǭ" />
        <PText {...props} title="U+01EE | Dec: 494" children="Ǯ" />
        <PText {...props} title="U+01EF | Dec: 495" children="ǯ" />
        <PText {...props} title="U+01F0 | Dec: 496" children="ǰ" />
        <PText {...props} title="U+01F1 | Dec: 497" children="Ǳ" />
        <PText {...props} title="U+01F2 | Dec: 498" children="ǲ" />
        <PText {...props} title="U+01F3 | Dec: 499" children="ǳ" />
        <PText {...props} title="U+01F4 | Dec: 500" children="Ǵ" />
        <PText {...props} title="U+01F5 | Dec: 501" children="ǵ" />
        <PText {...props} title="U+01F6 | Dec: 502" children="Ƕ" />
        <PText {...props} title="U+01F7 | Dec: 503" children="Ƿ" />
        <PText {...props} title="U+01F8 | Dec: 504" children="Ǹ" />
        <PText {...props} title="U+01F9 | Dec: 505" children="ǹ" />
        <PText {...props} title="U+01FA | Dec: 506" children="Ǻ" />
        <PText {...props} title="U+01FB | Dec: 507" children="ǻ" />
        <PText {...props} title="U+01FC | Dec: 508" children="Ǽ" />
        <PText {...props} title="U+01FD | Dec: 509" children="ǽ" />
        <PText {...props} title="U+01FE | Dec: 510" children="Ǿ" />
        <PText {...props} title="U+01FF | Dec: 511" children="ǿ" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+0250-02AF (Porsche Next "IPA Extensions")</PHeadline>
        <PText {...props} title="U+0250 | Dec:592" children="ɐ" />
        <PText {...props} title="U+0251 | Dec:593" children="ɑ" />
        <PText {...props} title="U+0252 | Dec:594" children="ɒ" />
        <PText {...props} title="U+0253 | Dec:595" children="ɓ" />
        <PText {...props} title="U+0254 | Dec:596" children="ɔ" />
        <PText {...props} title="U+0255 | Dec:597" children="ɕ" />
        <PText {...props} title="U+0256 | Dec:598" children="ɖ" />
        <PText {...props} title="U+0257 | Dec:599" children="ɗ" />
        <PText {...props} title="U+0258 | Dec:600" children="ɘ" />
        <PText {...props} title="U+0259 | Dec:601" children="ə" />
        <PText {...props} title="U+025A | Dec:602" children="ɚ" />
        <PText {...props} title="U+025B | Dec:603" children="ɛ" />
        <PText {...props} title="U+025C | Dec:604" children="ɜ" />
        <PText {...props} title="U+025D | Dec:605" children="ɝ" />
        <PText {...props} title="U+025E | Dec:606" children="ɞ" />
        <PText {...props} title="U+025F | Dec:607" children="ɟ" />
        <PText {...props} title="U+0260 | Dec:608" children="ɠ" />
        <PText {...props} title="U+0261 | Dec:609" children="ɡ" />
        <PText {...props} title="U+0262 | Dec:610" children="ɢ" />
        <PText {...props} title="U+0263 | Dec:611" children="ɣ" />
        <PText {...props} title="U+0264 | Dec:612" children="ɤ" />
        <PText {...props} title="U+0265 | Dec:613" children="ɥ" />
        <PText {...props} title="U+0266 | Dec:614" children="ɦ" />
        <PText {...props} title="U+0267 | Dec:615" children="ɧ" />
        <PText {...props} title="U+0268 | Dec:616" children="ɨ" />
        <PText {...props} title="U+0269 | Dec:617" children="ɩ" />
        <PText {...props} title="U+026A | Dec:618" children="ɪ" />
        <PText {...props} title="U+026B | Dec:619" children="ɫ" />
        <PText {...props} title="U+026C | Dec:620" children="ɬ" />
        <PText {...props} title="U+026D | Dec:621" children="ɭ" />
        <PText {...props} title="U+026E | Dec:622" children="ɮ" />
        <PText {...props} title="U+026F | Dec:623" children="ɯ" />
        <PText {...props} title="U+0270 | Dec:624" children="ɰ" />
        <PText {...props} title="U+0271 | Dec:625" children="ɱ" />
        <PText {...props} title="U+0272 | Dec:626" children="ɲ" />
        <PText {...props} title="U+0273 | Dec:627" children="ɳ" />
        <PText {...props} title="U+0274 | Dec:628" children="ɴ" />
        <PText {...props} title="U+0275 | Dec:629" children="ɵ" />
        <PText {...props} title="U+0276 | Dec:630" children="ɶ" />
        <PText {...props} title="U+0277 | Dec:631" children="ɷ" />
        <PText {...props} title="U+0278 | Dec:632" children="ɸ" />
        <PText {...props} title="U+0279 | Dec:633" children="ɹ" />
        <PText {...props} title="U+027A | Dec:634" children="ɺ" />
        <PText {...props} title="U+027B | Dec:635" children="ɻ" />
        <PText {...props} title="U+027C | Dec:636" children="ɼ" />
        <PText {...props} title="U+027D | Dec:637" children="ɽ" />
        <PText {...props} title="U+027E | Dec:638" children="ɾ" />
        <PText {...props} title="U+027F | Dec:639" children="ɿ" />
        <PText {...props} title="U+0280 | Dec:640" children="ʀ" />
        <PText {...props} title="U+0281 | Dec:641" children="ʁ" />
        <PText {...props} title="U+0282 | Dec:642" children="ʂ" />
        <PText {...props} title="U+0283 | Dec:643" children="ʃ" />
        <PText {...props} title="U+0284 | Dec:644" children="ʄ" />
        <PText {...props} title="U+0285 | Dec:645" children="ʅ" />
        <PText {...props} title="U+0286 | Dec:646" children="ʆ" />
        <PText {...props} title="U+0287 | Dec:647" children="ʇ" />
        <PText {...props} title="U+0288 | Dec:648" children="ʈ" />
        <PText {...props} title="U+0289 | Dec:649" children="ʉ" />
        <PText {...props} title="U+028A | Dec:650" children="ʊ" />
        <PText {...props} title="U+028B | Dec:651" children="ʋ" />
        <PText {...props} title="U+028C | Dec:652" children="ʌ" />
        <PText {...props} title="U+028D | Dec:653" children="ʍ" />
        <PText {...props} title="U+028E | Dec:654" children="ʎ" />
        <PText {...props} title="U+028F | Dec:655" children="ʏ" />
        <PText {...props} title="U+0290 | Dec:656" children="ʐ" />
        <PText {...props} title="U+0291 | Dec:657" children="ʑ" />
        <PText {...props} title="U+0292 | Dec:658" children="ʒ" />
        <PText {...props} title="U+0293 | Dec:659" children="ʓ" />
        <PText {...props} title="U+0294 | Dec:660" children="ʔ" />
        <PText {...props} title="U+0295 | Dec:661" children="ʕ" />
        <PText {...props} title="U+0296 | Dec:662" children="ʖ" />
        <PText {...props} title="U+0297 | Dec:663" children="ʗ" />
        <PText {...props} title="U+0298 | Dec:664" children="ʘ" />
        <PText {...props} title="U+0299 | Dec:665" children="ʙ" />
        <PText {...props} title="U+029A | Dec:666" children="ʚ" />
        <PText {...props} title="U+029B | Dec:667" children="ʛ" />
        <PText {...props} title="U+029C | Dec:668" children="ʜ" />
        <PText {...props} title="U+029D | Dec:669" children="ʝ" />
        <PText {...props} title="U+029E | Dec:670" children="ʞ" />
        <PText {...props} title="U+029F | Dec:671" children="ʟ" />
        <PText {...props} title="U+02A0 | Dec:672" children="ʠ" />
        <PText {...props} title="U+02A1 | Dec:673" children="ʡ" />
        <PText {...props} title="U+02A2 | Dec:674" children="ʢ" />
        <PText {...props} title="U+02A3 | Dec:675" children="ʣ" />
        <PText {...props} title="U+02A4 | Dec:676" children="ʤ" />
        <PText {...props} title="U+02A5 | Dec:677" children="ʥ" />
        <PText {...props} title="U+02A6 | Dec:678" children="ʦ" />
        <PText {...props} title="U+02A7 | Dec:679" children="ʧ" />
        <PText {...props} title="U+02A8 | Dec:680" children="ʨ" />
        <PText {...props} title="U+02A9 | Dec:681" children="ʩ" />
        <PText {...props} title="U+02AA | Dec:682" children="ʪ" />
        <PText {...props} title="U+02AB | Dec:683" children="ʫ" />
        <PText {...props} title="U+02AC | Dec:684" children="ʬ" />
        <PText {...props} title="U+02AD | Dec:685" children="ʭ" />
        <PText {...props} title="U+02AE | Dec:686" children="ʮ" />
        <PText {...props} title="U+02AF | Dec:687" children="ʯ" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+02B0-02FF (Porsche Next "Spacing Modifier Letters")</PHeadline>
        <PText {...props} title="U+02B0 | Dec:688" children="ʰ" />
        <PText {...props} title="U+02B1 | Dec:689" children="ʱ" />
        <PText {...props} title="U+02B2 | Dec:690" children="ʲ" />
        <PText {...props} title="U+02B3 | Dec:691" children="ʳ" />
        <PText {...props} title="U+02B4 | Dec:692" children="ʴ" />
        <PText {...props} title="U+02B5 | Dec:693" children="ʵ" />
        <PText {...props} title="U+02B6 | Dec:694" children="ʶ" />
        <PText {...props} title="U+02B7 | Dec:695" children="ʷ" />
        <PText {...props} title="U+02B8 | Dec:696" children="ʸ" />
        <PText {...props} title="U+02B9 | Dec:697" children="ʹ" />
        <PText {...props} title="U+02BA | Dec:698" children="ʺ" />
        <PText {...props} title="U+02BB | Dec:699" children="ʻ" />
        <PText {...props} title="U+02BC | Dec:700" children="ʼ" />
        <PText {...props} title="U+02BD | Dec:701" children="ʽ" />
        <PText {...props} title="U+02BE | Dec:702" children="ʾ" />
        <PText {...props} title="U+02BF | Dec:703" children="ʿ" />
        <PText {...props} title="U+02C0 | Dec:704" children="ˀ" />
        <PText {...props} title="U+02C1 | Dec:705" children="ˁ" />
        <PText {...props} title="U+02C2 | Dec:706" children="˂" />
        <PText {...props} title="U+02C3 | Dec:707" children="˃" />
        <PText {...props} title="U+02C4 | Dec:708" children="˄" />
        <PText {...props} title="U+02C5 | Dec:709" children="˅" />
        <PText {...props} title="U+02C6 | Dec:710" children="ˆ" />
        <PText {...props} title="U+02C7 | Dec:711" children="ˇ" />
        <PText {...props} title="U+02C8 | Dec:712" children="ˈ" />
        <PText {...props} title="U+02C9 | Dec:713" children="ˉ" />
        <PText {...props} title="U+02CA | Dec:714" children="ˊ" />
        <PText {...props} title="U+02CB | Dec:715" children="ˋ" />
        <PText {...props} title="U+02CC | Dec:716" children="ˌ" />
        <PText {...props} title="U+02CD | Dec:717" children="ˍ" />
        <PText {...props} title="U+02CE | Dec:718" children="ˎ" />
        <PText {...props} title="U+02CF | Dec:719" children="ˏ" />
        <PText {...props} title="U+02D0 | Dec:720" children="ː" />
        <PText {...props} title="U+02D1 | Dec:721" children="ˑ" />
        <PText {...props} title="U+02D2 | Dec:722" children="˒" />
        <PText {...props} title="U+02D3 | Dec:723" children="˓" />
        <PText {...props} title="U+02D4 | Dec:724" children="˔" />
        <PText {...props} title="U+02D5 | Dec:725" children="˕" />
        <PText {...props} title="U+02D6 | Dec:726" children="˖" />
        <PText {...props} title="U+02D7 | Dec:727" children="˗" />
        <PText {...props} title="U+02D8 | Dec:728" children="˘" />
        <PText {...props} title="U+02D9 | Dec:729" children="˙" />
        <PText {...props} title="U+02DA | Dec:730" children="˚" />
        <PText {...props} title="U+02DB | Dec:731" children="˛" />
        <PText {...props} title="U+02DC | Dec:732" children="˜" />
        <PText {...props} title="U+02DD | Dec:733" children="˝" />
        <PText {...props} title="U+02DE | Dec:734" children="˞" />
        <PText {...props} title="U+02DF | Dec:735" children="˟" />
        <PText {...props} title="U+02E0 | Dec:736" children="ˠ" />
        <PText {...props} title="U+02E1 | Dec:737" children="ˡ" />
        <PText {...props} title="U+02E2 | Dec:738" children="ˢ" />
        <PText {...props} title="U+02E3 | Dec:739" children="ˣ" />
        <PText {...props} title="U+02E4 | Dec:740" children="ˤ" />
        <PText {...props} title="U+02E5 | Dec:741" children="˥" />
        <PText {...props} title="U+02E6 | Dec:742" children="˦" />
        <PText {...props} title="U+02E7 | Dec:743" children="˧" />
        <PText {...props} title="U+02E8 | Dec:744" children="˨" />
        <PText {...props} title="U+02E9 | Dec:745" children="˩" />
        <PText {...props} title="U+02EA | Dec:746" children="˪" />
        <PText {...props} title="U+02EB | Dec:747" children="˫" />
        <PText {...props} title="U+02EC | Dec:748" children="ˬ" />
        <PText {...props} title="U+02ED | Dec:749" children="˭" />
        <PText {...props} title="U+02EE | Dec:750" children="ˮ" />
        <PText {...props} title="U+02EF | Dec:751" children="˯" />
        <PText {...props} title="U+02F0 | Dec:752" children="˰" />
        <PText {...props} title="U+02F1 | Dec:753" children="˱" />
        <PText {...props} title="U+02F2 | Dec:754" children="˲" />
        <PText {...props} title="U+02F3 | Dec:755" children="˳" />
        <PText {...props} title="U+02F4 | Dec:756" children="˴" />
        <PText {...props} title="U+02F5 | Dec:757" children="˵" />
        <PText {...props} title="U+02F6 | Dec:758" children="˶" />
        <PText {...props} title="U+02F7 | Dec:759" children="˷" />
        <PText {...props} title="U+02F8 | Dec:760" children="˸" />
        <PText {...props} title="U+02F9 | Dec:761" children="˹" />
        <PText {...props} title="U+02FA | Dec:762" children="˺" />
        <PText {...props} title="U+02FB | Dec:763" children="˻" />
        <PText {...props} title="U+02FC | Dec:764" children="˼" />
        <PText {...props} title="U+02FD | Dec:765" children="˽" />
        <PText {...props} title="U+02FE | Dec:766" children="˾" />
        <PText {...props} title="U+02FF | Dec:767" children="˿" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+0300-036F (Porsche Next "Combining Diacritical Marks")</PHeadline>
        <PText {...props} title="U+0300 | Dec:768" children="̀" />
        <PText {...props} title="U+0301 | Dec:769" children="́" />
        <PText {...props} title="U+0302 | Dec:770" children="̂" />
        <PText {...props} title="U+0303 | Dec:771" children="̃" />
        <PText {...props} title="U+0304 | Dec:772" children="̄" />
        <PText {...props} title="U+0305 | Dec:773" children="̅" />
        <PText {...props} title="U+0306 | Dec:774" children="̆" />
        <PText {...props} title="U+0307 | Dec:775" children="̇" />
        <PText {...props} title="U+0308 | Dec:776" children="̈" />
        <PText {...props} title="U+0309 | Dec:777" children="̉" />
        <PText {...props} title="U+030A | Dec:778" children="̊" />
        <PText {...props} title="U+030B | Dec:779" children="̋" />
        <PText {...props} title="U+030C | Dec:780" children="̌" />
        <PText {...props} title="U+030D | Dec:781" children="̍" />
        <PText {...props} title="U+030E | Dec:782" children="̎" />
        <PText {...props} title="U+030F | Dec:783" children="̏" />
        <PText {...props} title="U+0310 | Dec:784" children="̐" />
        <PText {...props} title="U+0311 | Dec:785" children="̑" />
        <PText {...props} title="U+0312 | Dec:786" children="̒" />
        <PText {...props} title="U+0313 | Dec:787" children="̓" />
        <PText {...props} title="U+0314 | Dec:788" children="̔" />
        <PText {...props} title="U+0315 | Dec:789" children="̕" />
        <PText {...props} title="U+0316 | Dec:790" children="̖" />
        <PText {...props} title="U+0317 | Dec:791" children="̗" />
        <PText {...props} title="U+0318 | Dec:792" children="̘" />
        <PText {...props} title="U+0319 | Dec:793" children="̙" />
        <PText {...props} title="U+031A | Dec:794" children="̚" />
        <PText {...props} title="U+031B | Dec:795" children="̛" />
        <PText {...props} title="U+031C | Dec:796" children="̜" />
        <PText {...props} title="U+031D | Dec:797" children="̝" />
        <PText {...props} title="U+031E | Dec:798" children="̞" />
        <PText {...props} title="U+031F | Dec:799" children="̟" />
        <PText {...props} title="U+0320 | Dec:800" children="̠" />
        <PText {...props} title="U+0321 | Dec:801" children="̡" />
        <PText {...props} title="U+0322 | Dec:802" children="̢" />
        <PText {...props} title="U+0323 | Dec:803" children="̣" />
        <PText {...props} title="U+0324 | Dec:804" children="̤" />
        <PText {...props} title="U+0325 | Dec:805" children="̥" />
        <PText {...props} title="U+0326 | Dec:806" children="̦" />
        <PText {...props} title="U+0327 | Dec:807" children="̧" />
        <PText {...props} title="U+0328 | Dec:808" children="̨" />
        <PText {...props} title="U+0329 | Dec:809" children="̩" />
        <PText {...props} title="U+032A | Dec:810" children="̪" />
        <PText {...props} title="U+032B | Dec:811" children="̫" />
        <PText {...props} title="U+032C | Dec:812" children="̬" />
        <PText {...props} title="U+032D | Dec:813" children="̭" />
        <PText {...props} title="U+032E | Dec:814" children="̮" />
        <PText {...props} title="U+032F | Dec:815" children="̯" />
        <PText {...props} title="U+0330 | Dec:816" children="̰" />
        <PText {...props} title="U+0331 | Dec:817" children="̱" />
        <PText {...props} title="U+0332 | Dec:818" children="̲" />
        <PText {...props} title="U+0333 | Dec:819" children="̳" />
        <PText {...props} title="U+0334 | Dec:820" children="̴" />
        <PText {...props} title="U+0335 | Dec:821" children="̵" />
        <PText {...props} title="U+0336 | Dec:822" children="̶" />
        <PText {...props} title="U+0337 | Dec:823" children="̷" />
        <PText {...props} title="U+0338 | Dec:824" children="̸" />
        <PText {...props} title="U+0339 | Dec:825" children="̹" />
        <PText {...props} title="U+033A | Dec:826" children="̺" />
        <PText {...props} title="U+033B | Dec:827" children="̻" />
        <PText {...props} title="U+033C | Dec:828" children="̼" />
        <PText {...props} title="U+033D | Dec:829" children="̽" />
        <PText {...props} title="U+033E | Dec:830" children="̾" />
        <PText {...props} title="U+033F | Dec:831" children="̿" />
        <PText {...props} title="U+0340 | Dec:832" children="̀" />
        <PText {...props} title="U+0341 | Dec:833" children="́" />
        <PText {...props} title="U+0342 | Dec:834" children="͂" />
        <PText {...props} title="U+0343 | Dec:835" children="̓" />
        <PText {...props} title="U+0344 | Dec:836" children="̈́" />
        <PText {...props} title="U+0345 | Dec:837" children="ͅ" />
        <PText {...props} title="U+0346 | Dec:838" children="͆" />
        <PText {...props} title="U+0347 | Dec:839" children="͇" />
        <PText {...props} title="U+0348 | Dec:840" children="͈" />
        <PText {...props} title="U+0349 | Dec:841" children="͉" />
        <PText {...props} title="U+034A | Dec:842" children="͊" />
        <PText {...props} title="U+034B | Dec:843" children="͋" />
        <PText {...props} title="U+034C | Dec:844" children="͌" />
        <PText {...props} title="U+034D | Dec:845" children="͍" />
        <PText {...props} title="U+034E | Dec:846" children="͎" />
        <PText {...props} title="U+034F | Dec:847" children="͏" />
        <PText {...props} title="U+0350 | Dec:848" children="͐" />
        <PText {...props} title="U+0351 | Dec:849" children="͑" />
        <PText {...props} title="U+0352 | Dec:850" children="͒" />
        <PText {...props} title="U+0353 | Dec:851" children="͓" />
        <PText {...props} title="U+0354 | Dec:852" children="͔" />
        <PText {...props} title="U+0355 | Dec:853" children="͕" />
        <PText {...props} title="U+0356 | Dec:854" children="͖" />
        <PText {...props} title="U+0357 | Dec:855" children="͗" />
        <PText {...props} title="U+0358 | Dec:856" children="͘" />
        <PText {...props} title="U+0359 | Dec:857" children="͙" />
        <PText {...props} title="U+035A | Dec:858" children="͚" />
        <PText {...props} title="U+035B | Dec:859" children="͛" />
        <PText {...props} title="U+035C | Dec:860" children="͜" />
        <PText {...props} title="U+035D | Dec:861" children="͝" />
        <PText {...props} title="U+035E | Dec:862" children="͞" />
        <PText {...props} title="U+035F | Dec:863" children="͟" />
        <PText {...props} title="U+0360 | Dec:864" children="͠" />
        <PText {...props} title="U+0361 | Dec:865" children="͡" />
        <PText {...props} title="U+0362 | Dec:866" children="͢" />
        <PText {...props} title="U+0363 | Dec:867" children="ͣ" />
        <PText {...props} title="U+0364 | Dec:868" children="ͤ" />
        <PText {...props} title="U+0365 | Dec:869" children="ͥ" />
        <PText {...props} title="U+0366 | Dec:870" children="ͦ" />
        <PText {...props} title="U+0367 | Dec:871" children="ͧ" />
        <PText {...props} title="U+0368 | Dec:872" children="ͨ" />
        <PText {...props} title="U+0369 | Dec:873" children="ͩ" />
        <PText {...props} title="U+036A | Dec:874" children="ͪ" />
        <PText {...props} title="U+036B | Dec:875" children="ͫ" />
        <PText {...props} title="U+036C | Dec:876" children="ͬ" />
        <PText {...props} title="U+036D | Dec:877" children="ͭ" />
        <PText {...props} title="U+036E | Dec:878" children="ͮ" />
        <PText {...props} title="U+036F | Dec:879" children="ͯ" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+0E00-0E7F (Porsche Next "Thai")</PHeadline>
        <PText {...props} title="U+0E00 | Dec:3584" children="฀" />
        <PText {...props} title="U+0E01 | Dec:3585" children="ก" />
        <PText {...props} title="U+0E02 | Dec:3586" children="ข" />
        <PText {...props} title="U+0E03 | Dec:3587" children="ฃ" />
        <PText {...props} title="U+0E04 | Dec:3588" children="ค" />
        <PText {...props} title="U+0E05 | Dec:3589" children="ฅ" />
        <PText {...props} title="U+0E06 | Dec:3590" children="ฆ" />
        <PText {...props} title="U+0E07 | Dec:3591" children="ง" />
        <PText {...props} title="U+0E08 | Dec:3592" children="จ" />
        <PText {...props} title="U+0E09 | Dec:3593" children="ฉ" />
        <PText {...props} title="U+0E0A | Dec:3594" children="ช" />
        <PText {...props} title="U+0E0B | Dec:3595" children="ซ" />
        <PText {...props} title="U+0E0C | Dec:3596" children="ฌ" />
        <PText {...props} title="U+0E0D | Dec:3597" children="ญ" />
        <PText {...props} title="U+0E0E | Dec:3598" children="ฎ" />
        <PText {...props} title="U+0E0F | Dec:3599" children="ฏ" />
        <PText {...props} title="U+0E10 | Dec:3600" children="ฐ" />
        <PText {...props} title="U+0E11 | Dec:3601" children="ฑ" />
        <PText {...props} title="U+0E12 | Dec:3602" children="ฒ" />
        <PText {...props} title="U+0E13 | Dec:3603" children="ณ" />
        <PText {...props} title="U+0E14 | Dec:3604" children="ด" />
        <PText {...props} title="U+0E15 | Dec:3605" children="ต" />
        <PText {...props} title="U+0E16 | Dec:3606" children="ถ" />
        <PText {...props} title="U+0E17 | Dec:3607" children="ท" />
        <PText {...props} title="U+0E18 | Dec:3608" children="ธ" />
        <PText {...props} title="U+0E19 | Dec:3609" children="น" />
        <PText {...props} title="U+0E1A | Dec:3610" children="บ" />
        <PText {...props} title="U+0E1B | Dec:3611" children="ป" />
        <PText {...props} title="U+0E1C | Dec:3612" children="ผ" />
        <PText {...props} title="U+0E1D | Dec:3613" children="ฝ" />
        <PText {...props} title="U+0E1E | Dec:3614" children="พ" />
        <PText {...props} title="U+0E1F | Dec:3615" children="ฟ" />
        <PText {...props} title="U+0E20 | Dec:3616" children="ภ" />
        <PText {...props} title="U+0E21 | Dec:3617" children="ม" />
        <PText {...props} title="U+0E22 | Dec:3618" children="ย" />
        <PText {...props} title="U+0E23 | Dec:3619" children="ร" />
        <PText {...props} title="U+0E24 | Dec:3620" children="ฤ" />
        <PText {...props} title="U+0E25 | Dec:3621" children="ล" />
        <PText {...props} title="U+0E26 | Dec:3622" children="ฦ" />
        <PText {...props} title="U+0E27 | Dec:3623" children="ว" />
        <PText {...props} title="U+0E28 | Dec:3624" children="ศ" />
        <PText {...props} title="U+0E29 | Dec:3625" children="ษ" />
        <PText {...props} title="U+0E2A | Dec:3626" children="ส" />
        <PText {...props} title="U+0E2B | Dec:3627" children="ห" />
        <PText {...props} title="U+0E2C | Dec:3628" children="ฬ" />
        <PText {...props} title="U+0E2D | Dec:3629" children="อ" />
        <PText {...props} title="U+0E2E | Dec:3630" children="ฮ" />
        <PText {...props} title="U+0E2F | Dec:3631" children="ฯ" />
        <PText {...props} title="U+0E30 | Dec:3632" children="ะ" />
        <PText {...props} title="U+0E31 | Dec:3633" children="ั" />
        <PText {...props} title="U+0E32 | Dec:3634" children="า" />
        <PText {...props} title="U+0E33 | Dec:3635" children="ำ" />
        <PText {...props} title="U+0E34 | Dec:3636" children="ิ" />
        <PText {...props} title="U+0E35 | Dec:3637" children="ี" />
        <PText {...props} title="U+0E36 | Dec:3638" children="ึ" />
        <PText {...props} title="U+0E37 | Dec:3639" children="ื" />
        <PText {...props} title="U+0E38 | Dec:3640" children="ุ" />
        <PText {...props} title="U+0E39 | Dec:3641" children="ู" />
        <PText {...props} title="U+0E3A | Dec:3642" children="ฺ" />
        <PText {...props} title="U+0E3B | Dec:3643" children="฻" />
        <PText {...props} title="U+0E3C | Dec:3644" children="฼" />
        <PText {...props} title="U+0E3D | Dec:3645" children="฽" />
        <PText {...props} title="U+0E3E | Dec:3646" children="฾" />
        <PText {...props} title="U+0E3F | Dec:3647" children="฿" />
        <PText {...props} title="U+0E40 | Dec:3648" children="เ" />
        <PText {...props} title="U+0E41 | Dec:3649" children="แ" />
        <PText {...props} title="U+0E42 | Dec:3650" children="โ" />
        <PText {...props} title="U+0E43 | Dec:3651" children="ใ" />
        <PText {...props} title="U+0E44 | Dec:3652" children="ไ" />
        <PText {...props} title="U+0E45 | Dec:3653" children="ๅ" />
        <PText {...props} title="U+0E46 | Dec:3654" children="ๆ" />
        <PText {...props} title="U+0E47 | Dec:3655" children="็" />
        <PText {...props} title="U+0E48 | Dec:3656" children="่" />
        <PText {...props} title="U+0E49 | Dec:3657" children="้" />
        <PText {...props} title="U+0E4A | Dec:3658" children="๊" />
        <PText {...props} title="U+0E4B | Dec:3659" children="๋" />
        <PText {...props} title="U+0E4C | Dec:3660" children="์" />
        <PText {...props} title="U+0E4D | Dec:3661" children="ํ" />
        <PText {...props} title="U+0E4E | Dec:3662" children="๎" />
        <PText {...props} title="U+0E4F | Dec:3663" children="๏" />
        <PText {...props} title="U+0E50 | Dec:3664" children="๐" />
        <PText {...props} title="U+0E51 | Dec:3665" children="๑" />
        <PText {...props} title="U+0E52 | Dec:3666" children="๒" />
        <PText {...props} title="U+0E53 | Dec:3667" children="๓" />
        <PText {...props} title="U+0E54 | Dec:3668" children="๔" />
        <PText {...props} title="U+0E55 | Dec:3669" children="๕" />
        <PText {...props} title="U+0E56 | Dec:3670" children="๖" />
        <PText {...props} title="U+0E57 | Dec:3671" children="๗" />
        <PText {...props} title="U+0E58 | Dec:3672" children="๘" />
        <PText {...props} title="U+0E59 | Dec:3673" children="๙" />
        <PText {...props} title="U+0E5A | Dec:3674" children="๚" />
        <PText {...props} title="U+0E5B | Dec:3675" children="๛" />
        <PText {...props} title="U+0E5C | Dec:3676" children="๜" />
        <PText {...props} title="U+0E5D | Dec:3677" children="๝" />
        <PText {...props} title="U+0E5E | Dec:3678" children="๞" />
        <PText {...props} title="U+0E5F | Dec:3679" children="๟" />
        <PText {...props} title="U+0E60 | Dec:3680" children="๠" />
        <PText {...props} title="U+0E61 | Dec:3681" children="๡" />
        <PText {...props} title="U+0E62 | Dec:3682" children="๢" />
        <PText {...props} title="U+0E63 | Dec:3683" children="๣" />
        <PText {...props} title="U+0E64 | Dec:3684" children="๤" />
        <PText {...props} title="U+0E65 | Dec:3685" children="๥" />
        <PText {...props} title="U+0E66 | Dec:3686" children="๦" />
        <PText {...props} title="U+0E67 | Dec:3687" children="๧" />
        <PText {...props} title="U+0E68 | Dec:3688" children="๨" />
        <PText {...props} title="U+0E69 | Dec:3689" children="๩" />
        <PText {...props} title="U+0E6A | Dec:3690" children="๪" />
        <PText {...props} title="U+0E6B | Dec:3691" children="๫" />
        <PText {...props} title="U+0E6C | Dec:3692" children="๬" />
        <PText {...props} title="U+0E6D | Dec:3693" children="๭" />
        <PText {...props} title="U+0E6E | Dec:3694" children="๮" />
        <PText {...props} title="U+0E6F | Dec:3695" children="๯" />
        <PText {...props} title="U+0E70 | Dec:3696" children="๰" />
        <PText {...props} title="U+0E71 | Dec:3697" children="๱" />
        <PText {...props} title="U+0E72 | Dec:3698" children="๲" />
        <PText {...props} title="U+0E73 | Dec:3699" children="๳" />
        <PText {...props} title="U+0E74 | Dec:3700" children="๴" />
        <PText {...props} title="U+0E75 | Dec:3701" children="๵" />
        <PText {...props} title="U+0E76 | Dec:3702" children="๶" />
        <PText {...props} title="U+0E77 | Dec:3703" children="๷" />
        <PText {...props} title="U+0E78 | Dec:3704" children="๸" />
        <PText {...props} title="U+0E79 | Dec:3705" children="๹" />
        <PText {...props} title="U+0E7A | Dec:3706" children="๺" />
        <PText {...props} title="U+0E7B | Dec:3707" children="๻" />
        <PText {...props} title="U+0E7C | Dec:3708" children="๼" />
        <PText {...props} title="U+0E7D | Dec:3709" children="๽" />
        <PText {...props} title="U+0E7E | Dec:3710" children="๾" />
        <PText {...props} title="U+0E7F | Dec:3711" children="๿" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+1E00-1EFF (Porsche Next "Latin Extended Additional")</PHeadline>
        <PText {...props} title="U+1E00 | Dec:7680" children="Ḁ" />
        <PText {...props} title="U+1E01 | Dec:7681" children="ḁ" />
        <PText {...props} title="U+1E02 | Dec:7682" children="Ḃ" />
        <PText {...props} title="U+1E03 | Dec:7683" children="ḃ" />
        <PText {...props} title="U+1E04 | Dec:7684" children="Ḅ" />
        <PText {...props} title="U+1E05 | Dec:7685" children="ḅ" />
        <PText {...props} title="U+1E06 | Dec:7686" children="Ḇ" />
        <PText {...props} title="U+1E07 | Dec:7687" children="ḇ" />
        <PText {...props} title="U+1E08 | Dec:7688" children="Ḉ" />
        <PText {...props} title="U+1E09 | Dec:7689" children="ḉ" />
        <PText {...props} title="U+1E0A | Dec:7690" children="Ḋ" />
        <PText {...props} title="U+1E0B | Dec:7691" children="ḋ" />
        <PText {...props} title="U+1E0C | Dec:7692" children="Ḍ" />
        <PText {...props} title="U+1E0D | Dec:7693" children="ḍ" />
        <PText {...props} title="U+1E0E | Dec:7694" children="Ḏ" />
        <PText {...props} title="U+1E0F | Dec:7695" children="ḏ" />
        <PText {...props} title="U+1E10 | Dec:7696" children="Ḑ" />
        <PText {...props} title="U+1E11 | Dec:7697" children="ḑ" />
        <PText {...props} title="U+1E12 | Dec:7698" children="Ḓ" />
        <PText {...props} title="U+1E13 | Dec:7699" children="ḓ" />
        <PText {...props} title="U+1E14 | Dec:7700" children="Ḕ" />
        <PText {...props} title="U+1E15 | Dec:7701" children="ḕ" />
        <PText {...props} title="U+1E16 | Dec:7702" children="Ḗ" />
        <PText {...props} title="U+1E17 | Dec:7703" children="ḗ" />
        <PText {...props} title="U+1E18 | Dec:7704" children="Ḙ" />
        <PText {...props} title="U+1E19 | Dec:7705" children="ḙ" />
        <PText {...props} title="U+1E1A | Dec:7706" children="Ḛ" />
        <PText {...props} title="U+1E1B | Dec:7707" children="ḛ" />
        <PText {...props} title="U+1E1C | Dec:7708" children="Ḝ" />
        <PText {...props} title="U+1E1D | Dec:7709" children="ḝ" />
        <PText {...props} title="U+1E1E | Dec:7710" children="Ḟ" />
        <PText {...props} title="U+1E1F | Dec:7711" children="ḟ" />
        <PText {...props} title="U+1E20 | Dec:7712" children="Ḡ" />
        <PText {...props} title="U+1E21 | Dec:7713" children="ḡ" />
        <PText {...props} title="U+1E22 | Dec:7714" children="Ḣ" />
        <PText {...props} title="U+1E23 | Dec:7715" children="ḣ" />
        <PText {...props} title="U+1E24 | Dec:7716" children="Ḥ" />
        <PText {...props} title="U+1E25 | Dec:7717" children="ḥ" />
        <PText {...props} title="U+1E26 | Dec:7718" children="Ḧ" />
        <PText {...props} title="U+1E27 | Dec:7719" children="ḧ" />
        <PText {...props} title="U+1E28 | Dec:7720" children="Ḩ" />
        <PText {...props} title="U+1E29 | Dec:7721" children="ḩ" />
        <PText {...props} title="U+1E2A | Dec:7722" children="Ḫ" />
        <PText {...props} title="U+1E2B | Dec:7723" children="ḫ" />
        <PText {...props} title="U+1E2C | Dec:7724" children="Ḭ" />
        <PText {...props} title="U+1E2D | Dec:7725" children="ḭ" />
        <PText {...props} title="U+1E2E | Dec:7726" children="Ḯ" />
        <PText {...props} title="U+1E2F | Dec:7727" children="ḯ" />
        <PText {...props} title="U+1E30 | Dec:7728" children="Ḱ" />
        <PText {...props} title="U+1E31 | Dec:7729" children="ḱ" />
        <PText {...props} title="U+1E32 | Dec:7730" children="Ḳ" />
        <PText {...props} title="U+1E33 | Dec:7731" children="ḳ" />
        <PText {...props} title="U+1E34 | Dec:7732" children="Ḵ" />
        <PText {...props} title="U+1E35 | Dec:7733" children="ḵ" />
        <PText {...props} title="U+1E36 | Dec:7734" children="Ḷ" />
        <PText {...props} title="U+1E37 | Dec:7735" children="ḷ" />
        <PText {...props} title="U+1E38 | Dec:7736" children="Ḹ" />
        <PText {...props} title="U+1E39 | Dec:7737" children="ḹ" />
        <PText {...props} title="U+1E3A | Dec:7738" children="Ḻ" />
        <PText {...props} title="U+1E3B | Dec:7739" children="ḻ" />
        <PText {...props} title="U+1E3C | Dec:7740" children="Ḽ" />
        <PText {...props} title="U+1E3D | Dec:7741" children="ḽ" />
        <PText {...props} title="U+1E3E | Dec:7742" children="Ḿ" />
        <PText {...props} title="U+1E3F | Dec:7743" children="ḿ" />
        <PText {...props} title="U+1E40 | Dec:7744" children="Ṁ" />
        <PText {...props} title="U+1E41 | Dec:7745" children="ṁ" />
        <PText {...props} title="U+1E42 | Dec:7746" children="Ṃ" />
        <PText {...props} title="U+1E43 | Dec:7747" children="ṃ" />
        <PText {...props} title="U+1E44 | Dec:7748" children="Ṅ" />
        <PText {...props} title="U+1E45 | Dec:7749" children="ṅ" />
        <PText {...props} title="U+1E46 | Dec:7750" children="Ṇ" />
        <PText {...props} title="U+1E47 | Dec:7751" children="ṇ" />
        <PText {...props} title="U+1E48 | Dec:7752" children="Ṉ" />
        <PText {...props} title="U+1E49 | Dec:7753" children="ṉ" />
        <PText {...props} title="U+1E4A | Dec:7754" children="Ṋ" />
        <PText {...props} title="U+1E4B | Dec:7755" children="ṋ" />
        <PText {...props} title="U+1E4C | Dec:7756" children="Ṍ" />
        <PText {...props} title="U+1E4D | Dec:7757" children="ṍ" />
        <PText {...props} title="U+1E4E | Dec:7758" children="Ṏ" />
        <PText {...props} title="U+1E4F | Dec:7759" children="ṏ" />
        <PText {...props} title="U+1E50 | Dec:7760" children="Ṑ" />
        <PText {...props} title="U+1E51 | Dec:7761" children="ṑ" />
        <PText {...props} title="U+1E52 | Dec:7762" children="Ṓ" />
        <PText {...props} title="U+1E53 | Dec:7763" children="ṓ" />
        <PText {...props} title="U+1E54 | Dec:7764" children="Ṕ" />
        <PText {...props} title="U+1E55 | Dec:7765" children="ṕ" />
        <PText {...props} title="U+1E56 | Dec:7766" children="Ṗ" />
        <PText {...props} title="U+1E57 | Dec:7767" children="ṗ" />
        <PText {...props} title="U+1E58 | Dec:7768" children="Ṙ" />
        <PText {...props} title="U+1E59 | Dec:7769" children="ṙ" />
        <PText {...props} title="U+1E5A | Dec:7770" children="Ṛ" />
        <PText {...props} title="U+1E5B | Dec:7771" children="ṛ" />
        <PText {...props} title="U+1E5C | Dec:7772" children="Ṝ" />
        <PText {...props} title="U+1E5D | Dec:7773" children="ṝ" />
        <PText {...props} title="U+1E5E | Dec:7774" children="Ṟ" />
        <PText {...props} title="U+1E5F | Dec:7775" children="ṟ" />
        <PText {...props} title="U+1E60 | Dec:7776" children="Ṡ" />
        <PText {...props} title="U+1E61 | Dec:7777" children="ṡ" />
        <PText {...props} title="U+1E62 | Dec:7778" children="Ṣ" />
        <PText {...props} title="U+1E63 | Dec:7779" children="ṣ" />
        <PText {...props} title="U+1E64 | Dec:7780" children="Ṥ" />
        <PText {...props} title="U+1E65 | Dec:7781" children="ṥ" />
        <PText {...props} title="U+1E66 | Dec:7782" children="Ṧ" />
        <PText {...props} title="U+1E67 | Dec:7783" children="ṧ" />
        <PText {...props} title="U+1E68 | Dec:7784" children="Ṩ" />
        <PText {...props} title="U+1E69 | Dec:7785" children="ṩ" />
        <PText {...props} title="U+1E6A | Dec:7786" children="Ṫ" />
        <PText {...props} title="U+1E6B | Dec:7787" children="ṫ" />
        <PText {...props} title="U+1E6C | Dec:7788" children="Ṭ" />
        <PText {...props} title="U+1E6D | Dec:7789" children="ṭ" />
        <PText {...props} title="U+1E6E | Dec:7790" children="Ṯ" />
        <PText {...props} title="U+1E6F | Dec:7791" children="ṯ" />
        <PText {...props} title="U+1E70 | Dec:7792" children="Ṱ" />
        <PText {...props} title="U+1E71 | Dec:7793" children="ṱ" />
        <PText {...props} title="U+1E72 | Dec:7794" children="Ṳ" />
        <PText {...props} title="U+1E73 | Dec:7795" children="ṳ" />
        <PText {...props} title="U+1E74 | Dec:7796" children="Ṵ" />
        <PText {...props} title="U+1E75 | Dec:7797" children="ṵ" />
        <PText {...props} title="U+1E76 | Dec:7798" children="Ṷ" />
        <PText {...props} title="U+1E77 | Dec:7799" children="ṷ" />
        <PText {...props} title="U+1E78 | Dec:7800" children="Ṹ" />
        <PText {...props} title="U+1E79 | Dec:7801" children="ṹ" />
        <PText {...props} title="U+1E7A | Dec:7802" children="Ṻ" />
        <PText {...props} title="U+1E7B | Dec:7803" children="ṻ" />
        <PText {...props} title="U+1E7C | Dec:7804" children="Ṽ" />
        <PText {...props} title="U+1E7D | Dec:7805" children="ṽ" />
        <PText {...props} title="U+1E7E | Dec:7806" children="Ṿ" />
        <PText {...props} title="U+1E7F | Dec:7807" children="ṿ" />
        <PText {...props} title="U+1E80 | Dec:7808" children="Ẁ" />
        <PText {...props} title="U+1E81 | Dec:7809" children="ẁ" />
        <PText {...props} title="U+1E82 | Dec:7810" children="Ẃ" />
        <PText {...props} title="U+1E83 | Dec:7811" children="ẃ" />
        <PText {...props} title="U+1E84 | Dec:7812" children="Ẅ" />
        <PText {...props} title="U+1E85 | Dec:7813" children="ẅ" />
        <PText {...props} title="U+1E86 | Dec:7814" children="Ẇ" />
        <PText {...props} title="U+1E87 | Dec:7815" children="ẇ" />
        <PText {...props} title="U+1E88 | Dec:7816" children="Ẉ" />
        <PText {...props} title="U+1E89 | Dec:7817" children="ẉ" />
        <PText {...props} title="U+1E8A | Dec:7818" children="Ẋ" />
        <PText {...props} title="U+1E8B | Dec:7819" children="ẋ" />
        <PText {...props} title="U+1E8C | Dec:7820" children="Ẍ" />
        <PText {...props} title="U+1E8D | Dec:7821" children="ẍ" />
        <PText {...props} title="U+1E8E | Dec:7822" children="Ẏ" />
        <PText {...props} title="U+1E8F | Dec:7823" children="ẏ" />
        <PText {...props} title="U+1E90 | Dec:7824" children="Ẑ" />
        <PText {...props} title="U+1E91 | Dec:7825" children="ẑ" />
        <PText {...props} title="U+1E92 | Dec:7826" children="Ẓ" />
        <PText {...props} title="U+1E93 | Dec:7827" children="ẓ" />
        <PText {...props} title="U+1E94 | Dec:7828" children="Ẕ" />
        <PText {...props} title="U+1E95 | Dec:7829" children="ẕ" />
        <PText {...props} title="U+1E96 | Dec:7830" children="ẖ" />
        <PText {...props} title="U+1E97 | Dec:7831" children="ẗ" />
        <PText {...props} title="U+1E98 | Dec:7832" children="ẘ" />
        <PText {...props} title="U+1E99 | Dec:7833" children="ẙ" />
        <PText {...props} title="U+1E9A | Dec:7834" children="ẚ" />
        <PText {...props} title="U+1E9B | Dec:7835" children="ẛ" />
        <PText {...props} title="U+1E9C | Dec:7836" children="ẜ" />
        <PText {...props} title="U+1E9D | Dec:7837" children="ẝ" />
        <PText {...props} title="U+1E9E | Dec:7838" children="ẞ" />
        <PText {...props} title="U+1E9F | Dec:7839" children="ẟ" />
        <PText {...props} title="U+1EA0 | Dec:7840" children="Ạ" />
        <PText {...props} title="U+1EA1 | Dec:7841" children="ạ" />
        <PText {...props} title="U+1EA2 | Dec:7842" children="Ả" />
        <PText {...props} title="U+1EA3 | Dec:7843" children="ả" />
        <PText {...props} title="U+1EA4 | Dec:7844" children="Ấ" />
        <PText {...props} title="U+1EA5 | Dec:7845" children="ấ" />
        <PText {...props} title="U+1EA6 | Dec:7846" children="Ầ" />
        <PText {...props} title="U+1EA7 | Dec:7847" children="ầ" />
        <PText {...props} title="U+1EA8 | Dec:7848" children="Ẩ" />
        <PText {...props} title="U+1EA9 | Dec:7849" children="ẩ" />
        <PText {...props} title="U+1EAA | Dec:7850" children="Ẫ" />
        <PText {...props} title="U+1EAB | Dec:7851" children="ẫ" />
        <PText {...props} title="U+1EAC | Dec:7852" children="Ậ" />
        <PText {...props} title="U+1EAD | Dec:7853" children="ậ" />
        <PText {...props} title="U+1EAE | Dec:7854" children="Ắ" />
        <PText {...props} title="U+1EAF | Dec:7855" children="ắ" />
        <PText {...props} title="U+1EB0 | Dec:7856" children="Ằ" />
        <PText {...props} title="U+1EB1 | Dec:7857" children="ằ" />
        <PText {...props} title="U+1EB2 | Dec:7858" children="Ẳ" />
        <PText {...props} title="U+1EB3 | Dec:7859" children="ẳ" />
        <PText {...props} title="U+1EB4 | Dec:7860" children="Ẵ" />
        <PText {...props} title="U+1EB5 | Dec:7861" children="ẵ" />
        <PText {...props} title="U+1EB6 | Dec:7862" children="Ặ" />
        <PText {...props} title="U+1EB7 | Dec:7863" children="ặ" />
        <PText {...props} title="U+1EB8 | Dec:7864" children="Ẹ" />
        <PText {...props} title="U+1EB9 | Dec:7865" children="ẹ" />
        <PText {...props} title="U+1EBA | Dec:7866" children="Ẻ" />
        <PText {...props} title="U+1EBB | Dec:7867" children="ẻ" />
        <PText {...props} title="U+1EBC | Dec:7868" children="Ẽ" />
        <PText {...props} title="U+1EBD | Dec:7869" children="ẽ" />
        <PText {...props} title="U+1EBE | Dec:7870" children="Ế" />
        <PText {...props} title="U+1EBF | Dec:7871" children="ế" />
        <PText {...props} title="U+1EC0 | Dec:7872" children="Ề" />
        <PText {...props} title="U+1EC1 | Dec:7873" children="ề" />
        <PText {...props} title="U+1EC2 | Dec:7874" children="Ể" />
        <PText {...props} title="U+1EC3 | Dec:7875" children="ể" />
        <PText {...props} title="U+1EC4 | Dec:7876" children="Ễ" />
        <PText {...props} title="U+1EC5 | Dec:7877" children="ễ" />
        <PText {...props} title="U+1EC6 | Dec:7878" children="Ệ" />
        <PText {...props} title="U+1EC7 | Dec:7879" children="ệ" />
        <PText {...props} title="U+1EC8 | Dec:7880" children="Ỉ" />
        <PText {...props} title="U+1EC9 | Dec:7881" children="ỉ" />
        <PText {...props} title="U+1ECA | Dec:7882" children="Ị" />
        <PText {...props} title="U+1ECB | Dec:7883" children="ị" />
        <PText {...props} title="U+1ECC | Dec:7884" children="Ọ" />
        <PText {...props} title="U+1ECD | Dec:7885" children="ọ" />
        <PText {...props} title="U+1ECE | Dec:7886" children="Ỏ" />
        <PText {...props} title="U+1ECF | Dec:7887" children="ỏ" />
        <PText {...props} title="U+1ED0 | Dec:7888" children="Ố" />
        <PText {...props} title="U+1ED1 | Dec:7889" children="ố" />
        <PText {...props} title="U+1ED2 | Dec:7890" children="Ồ" />
        <PText {...props} title="U+1ED3 | Dec:7891" children="ồ" />
        <PText {...props} title="U+1ED4 | Dec:7892" children="Ổ" />
        <PText {...props} title="U+1ED5 | Dec:7893" children="ổ" />
        <PText {...props} title="U+1ED6 | Dec:7894" children="Ỗ" />
        <PText {...props} title="U+1ED7 | Dec:7895" children="ỗ" />
        <PText {...props} title="U+1ED8 | Dec:7896" children="Ộ" />
        <PText {...props} title="U+1ED9 | Dec:7897" children="ộ" />
        <PText {...props} title="U+1EDA | Dec:7898" children="Ớ" />
        <PText {...props} title="U+1EDB | Dec:7899" children="ớ" />
        <PText {...props} title="U+1EDC | Dec:7900" children="Ờ" />
        <PText {...props} title="U+1EDD | Dec:7901" children="ờ" />
        <PText {...props} title="U+1EDE | Dec:7902" children="Ở" />
        <PText {...props} title="U+1EDF | Dec:7903" children="ở" />
        <PText {...props} title="U+1EE0 | Dec:7904" children="Ỡ" />
        <PText {...props} title="U+1EE1 | Dec:7905" children="ỡ" />
        <PText {...props} title="U+1EE2 | Dec:7906" children="Ợ" />
        <PText {...props} title="U+1EE3 | Dec:7907" children="ợ" />
        <PText {...props} title="U+1EE4 | Dec:7908" children="Ụ" />
        <PText {...props} title="U+1EE5 | Dec:7909" children="ụ" />
        <PText {...props} title="U+1EE6 | Dec:7910" children="Ủ" />
        <PText {...props} title="U+1EE7 | Dec:7911" children="ủ" />
        <PText {...props} title="U+1EE8 | Dec:7912" children="Ứ" />
        <PText {...props} title="U+1EE9 | Dec:7913" children="ứ" />
        <PText {...props} title="U+1EEA | Dec:7914" children="Ừ" />
        <PText {...props} title="U+1EEB | Dec:7915" children="ừ" />
        <PText {...props} title="U+1EEC | Dec:7916" children="Ử" />
        <PText {...props} title="U+1EED | Dec:7917" children="ử" />
        <PText {...props} title="U+1EEE | Dec:7918" children="Ữ" />
        <PText {...props} title="U+1EEF | Dec:7919" children="ữ" />
        <PText {...props} title="U+1EF0 | Dec:7920" children="Ự" />
        <PText {...props} title="U+1EF1 | Dec:7921" children="ự" />
        <PText {...props} title="U+1EF2 | Dec:7922" children="Ỳ" />
        <PText {...props} title="U+1EF3 | Dec:7923" children="ỳ" />
        <PText {...props} title="U+1EF4 | Dec:7924" children="Ỵ" />
        <PText {...props} title="U+1EF5 | Dec:7925" children="ỵ" />
        <PText {...props} title="U+1EF6 | Dec:7926" children="Ỷ" />
        <PText {...props} title="U+1EF7 | Dec:7927" children="ỷ" />
        <PText {...props} title="U+1EF8 | Dec:7928" children="Ỹ" />
        <PText {...props} title="U+1EF9 | Dec:7929" children="ỹ" />
        <PText {...props} title="U+1EFA | Dec:7930" children="Ỻ" />
        <PText {...props} title="U+1EFB | Dec:7931" children="ỻ" />
        <PText {...props} title="U+1EFC | Dec:7932" children="Ỽ" />
        <PText {...props} title="U+1EFD | Dec:7933" children="ỽ" />
        <PText {...props} title="U+1EFE | Dec:7934" children="Ỿ" />
        <PText {...props} title="U+1EFF | Dec:7935" children="ỿ" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+2000-206F (Porsche Next "General Punctuation")</PHeadline>
        <PText {...props} title="U+2000 | Dec:8192" />
        <PText {...props} title="U+2001 | Dec:8193" />
        <PText {...props} title="U+2002 | Dec:8194" children="&ensp;" />
        <PText {...props} title="U+2003 | Dec:8195" children="&emsp;" />
        <PText {...props} title="U+2004 | Dec:8196" />
        <PText {...props} title="U+2005 | Dec:8197" />
        <PText {...props} title="U+2006 | Dec:8198" />
        <PText {...props} title="U+2007 | Dec:8199" />
        <PText {...props} title="U+2008 | Dec:8200" />
        <PText {...props} title="U+2009 | Dec:8201" children="&thinsp;" />
        <PText {...props} title="U+200A | Dec:8202" children="&#8202;" />
        <PText {...props} title="U+200B | Dec:8203" children="&#8203;" />
        <PText {...props} title="U+200C | Dec:8204" children="&zwnj;" />
        <PText {...props} title="U+200D | Dec:8205" children="&zwj;" />
        <PText {...props} title="U+200E | Dec:8206" children="&lrm;" />
        <PText {...props} title="U+200F | Dec:8207" children="&rlm;" />
        <PText {...props} title="U+2010 | Dec:8208" children="‐" />
        <PText {...props} title="U+2011 | Dec:8209" children="‑" />
        <PText {...props} title="U+2012 | Dec:8210" children="‒" />
        <PText {...props} title="U+2013 | Dec:8211" children="–" />
        <PText {...props} title="U+2014 | Dec:8212" children="—" />
        <PText {...props} title="U+2015 | Dec:8213" children="―" />
        <PText {...props} title="U+2016 | Dec:8214" children="‖" />
        <PText {...props} title="U+2017 | Dec:8215" children="‗" />
        <PText {...props} title="U+2018 | Dec:8216" children="‘" />
        <PText {...props} title="U+2019 | Dec:8217" children="’" />
        <PText {...props} title="U+201A | Dec:8218" children="‚" />
        <PText {...props} title="U+201B | Dec:8219" children="‛" />
        <PText {...props} title="U+201C | Dec:8220" children="“" />
        <PText {...props} title="U+201D | Dec:8221" children="”" />
        <PText {...props} title="U+201E | Dec:8222" children="„" />
        <PText {...props} title="U+201F | Dec:8223" children="‟" />
        <PText {...props} title="U+2020 | Dec:8224" children="†" />
        <PText {...props} title="U+2021 | Dec:8225" children="‡" />
        <PText {...props} title="U+2022 | Dec:8226" children="•" />
        <PText {...props} title="U+2023 | Dec:8227" children="‣" />
        <PText {...props} title="U+2024 | Dec:8228" children="․" />
        <PText {...props} title="U+2025 | Dec:8229" children="‥" />
        <PText {...props} title="U+2026 | Dec:8230" children="…" />
        <PText {...props} title="U+2027 | Dec:8231" children="‧" />
        <PText {...props} title="U+2028 | Dec:8232" />
        <PText {...props} title="U+2029 | Dec:8233" />
        <PText {...props} title="U+202A | Dec:8234" children="&#8234;" />
        <PText {...props} title="U+202B | Dec:8235" children="&#8235;" />
        <PText {...props} title="U+202C | Dec:8236" children="&#8236;" />
        <PText {...props} title="U+202D | Dec:8237" children="&#8237;" />
        <PText {...props} title="U+202E | Dec:8238" children="&#8238;" />
        <PText {...props} title="U+202F | Dec:8239" />
        <PText {...props} title="U+2030 | Dec:8240" children="‰" />
        <PText {...props} title="U+2031 | Dec:8241" children="‱" />
        <PText {...props} title="U+2032 | Dec:8242" children="′" />
        <PText {...props} title="U+2033 | Dec:8243" children="″" />
        <PText {...props} title="U+2034 | Dec:8244" children="‴" />
        <PText {...props} title="U+2035 | Dec:8245" children="‵" />
        <PText {...props} title="U+2036 | Dec:8246" children="‶" />
        <PText {...props} title="U+2037 | Dec:8247" children="‷" />
        <PText {...props} title="U+2038 | Dec:8248" children="‸" />
        <PText {...props} title="U+2039 | Dec:8249" children="‹" />
        <PText {...props} title="U+203A | Dec:8250" children="›" />
        <PText {...props} title="U+203B | Dec:8251" children="※" />
        <PText {...props} title="U+203C | Dec:8252" children="‼" />
        <PText {...props} title="U+203D | Dec:8253" children="‽" />
        <PText {...props} title="U+203E | Dec:8254" children="‾" />
        <PText {...props} title="U+203F | Dec:8255" children="‿" />
        <PText {...props} title="U+2040 | Dec:8256" children="⁀" />
        <PText {...props} title="U+2041 | Dec:8257" children="⁁" />
        <PText {...props} title="U+2042 | Dec:8258" children="⁂" />
        <PText {...props} title="U+2043 | Dec:8259" children="⁃" />
        <PText {...props} title="U+2044 | Dec:8260" children="⁄" />
        <PText {...props} title="U+2045 | Dec:8261" children="⁅" />
        <PText {...props} title="U+2046 | Dec:8262" children="⁆" />
        <PText {...props} title="U+2047 | Dec:8263" children="⁇" />
        <PText {...props} title="U+2048 | Dec:8264" children="⁈" />
        <PText {...props} title="U+2049 | Dec:8265" children="⁉" />
        <PText {...props} title="U+204A | Dec:8266" children="⁊" />
        <PText {...props} title="U+204B | Dec:8267" children="⁋" />
        <PText {...props} title="U+204C | Dec:8268" children="⁌" />
        <PText {...props} title="U+204D | Dec:8269" children="⁍" />
        <PText {...props} title="U+204E | Dec:8270" children="⁎" />
        <PText {...props} title="U+204F | Dec:8271" children="⁏" />
        <PText {...props} title="U+2050 | Dec:8272" children="⁐" />
        <PText {...props} title="U+2051 | Dec:8273" children="⁑" />
        <PText {...props} title="U+2052 | Dec:8274" children="⁒" />
        <PText {...props} title="U+2053 | Dec:8275" children="⁓" />
        <PText {...props} title="U+2054 | Dec:8276" children="⁔" />
        <PText {...props} title="U+2055 | Dec:8277" children="⁕" />
        <PText {...props} title="U+2056 | Dec:8278" children="⁖" />
        <PText {...props} title="U+2057 | Dec:8279" children="⁗" />
        <PText {...props} title="U+2058 | Dec:8280" children="⁘" />
        <PText {...props} title="U+2059 | Dec:8281" children="⁙" />
        <PText {...props} title="U+205A | Dec:8282" children="⁚" />
        <PText {...props} title="U+205B | Dec:8283" children="⁛" />
        <PText {...props} title="U+205C | Dec:8284" children="⁜" />
        <PText {...props} title="U+205D | Dec:8285" children="⁝" />
        <PText {...props} title="U+205E | Dec:8286" children="⁞" />
        <PText {...props} title="U+205F | Dec:8287" />
        <PText {...props} title="U+2060 | Dec:8288" children="⁠" />
        <PText {...props} title="U+2061 | Dec:8289" children="⁡" />
        <PText {...props} title="U+2062 | Dec:8290" children="⁢" />
        <PText {...props} title="U+2063 | Dec:8291" children="⁣" />
        <PText {...props} title="U+2064 | Dec:8292" children="⁤" />
        <PText {...props} title="U+2065 | Dec:8293" children="⁥" />
        <PText {...props} title="U+2066 | Dec:8294" children="⁦" />
        <PText {...props} title="U+2067 | Dec:8295" children="⁧" />
        <PText {...props} title="U+2068 | Dec:8296" children="⁨" />
        <PText {...props} title="U+2069 | Dec:8297" children="⁩" />
        <PText {...props} title="U+206A | Dec:8298" children="⁪" />
        <PText {...props} title="U+206B | Dec:8299" children="⁫" />
        <PText {...props} title="U+206C | Dec:8300" children="⁬" />
        <PText {...props} title="U+206D | Dec:8301" children="⁭" />
        <PText {...props} title="U+206E | Dec:8302" children="⁮" />
        <PText {...props} title="U+206F | Dec:8303" children="⁯" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+2070-209F (Porsche Next "Superscripts and Subscripts")</PHeadline>
        <PText {...props} title="U+2070 | Dec:8304" children="⁰" />
        <PText {...props} title="U+2071 | Dec:8305" children="ⁱ" />
        <PText {...props} title="U+2072 | Dec:8306" children="⁲" />
        <PText {...props} title="U+2073 | Dec:8307" children="⁳" />
        <PText {...props} title="U+2074 | Dec:8308" children="⁴" />
        <PText {...props} title="U+2075 | Dec:8309" children="⁵" />
        <PText {...props} title="U+2076 | Dec:8310" children="⁶" />
        <PText {...props} title="U+2077 | Dec:8311" children="⁷" />
        <PText {...props} title="U+2078 | Dec:8312" children="⁸" />
        <PText {...props} title="U+2079 | Dec:8313" children="⁹" />
        <PText {...props} title="U+207A | Dec:8314" children="⁺" />
        <PText {...props} title="U+207B | Dec:8315" children="⁻" />
        <PText {...props} title="U+207C | Dec:8316" children="⁼" />
        <PText {...props} title="U+207D | Dec:8317" children="⁽" />
        <PText {...props} title="U+207E | Dec:8318" children="⁾" />
        <PText {...props} title="U+207F | Dec:8319" children="ⁿ" />
        <PText {...props} title="U+2080 | Dec:8320" children="₀" />
        <PText {...props} title="U+2081 | Dec:8321" children="₁" />
        <PText {...props} title="U+2082 | Dec:8322" children="₂" />
        <PText {...props} title="U+2083 | Dec:8323" children="₃" />
        <PText {...props} title="U+2084 | Dec:8324" children="₄" />
        <PText {...props} title="U+2085 | Dec:8325" children="₅" />
        <PText {...props} title="U+2086 | Dec:8326" children="₆" />
        <PText {...props} title="U+2087 | Dec:8327" children="₇" />
        <PText {...props} title="U+2088 | Dec:8328" children="₈" />
        <PText {...props} title="U+2089 | Dec:8329" children="₉" />
        <PText {...props} title="U+208A | Dec:8330" children="₊" />
        <PText {...props} title="U+208B | Dec:8331" children="₋" />
        <PText {...props} title="U+208C | Dec:8332" children="₌" />
        <PText {...props} title="U+208D | Dec:8333" children="₍" />
        <PText {...props} title="U+208E | Dec:8334" children="₎" />
        <PText {...props} title="U+208F | Dec:8335" children="₏" />
        <PText {...props} title="U+2090 | Dec:8336" children="ₐ" />
        <PText {...props} title="U+2091 | Dec:8337" children="ₑ" />
        <PText {...props} title="U+2092 | Dec:8338" children="ₒ" />
        <PText {...props} title="U+2093 | Dec:8339" children="ₓ" />
        <PText {...props} title="U+2094 | Dec:8340" children="ₔ" />
        <PText {...props} title="U+2095 | Dec:8341" children="ₕ" />
        <PText {...props} title="U+2096 | Dec:8342" children="ₖ" />
        <PText {...props} title="U+2097 | Dec:8343" children="ₗ" />
        <PText {...props} title="U+2098 | Dec:8344" children="ₘ" />
        <PText {...props} title="U+2099 | Dec:8345" children="ₙ" />
        <PText {...props} title="U+209A | Dec:8346" children="ₚ" />
        <PText {...props} title="U+209B | Dec:8347" children="ₛ" />
        <PText {...props} title="U+209C | Dec:8348" children="ₜ" />
        <PText {...props} title="U+209D | Dec:8349" children="₝" />
        <PText {...props} title="U+209E | Dec:8350" children="₞" />
        <PText {...props} title="U+209F | Dec:8351" children="₟" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+20A0-20CF (Porsche Next "Currency Symbols")</PHeadline>
        <PText {...props} title="U+20A0 | Dec:8352" children="₠" />
        <PText {...props} title="U+20A1 | Dec:8353" children="₡" />
        <PText {...props} title="U+20A2 | Dec:8354" children="₢" />
        <PText {...props} title="U+20A3 | Dec:8355" children="₣" />
        <PText {...props} title="U+20A4 | Dec:8356" children="₤" />
        <PText {...props} title="U+20A5 | Dec:8357" children="₥" />
        <PText {...props} title="U+20A6 | Dec:8358" children="₦" />
        <PText {...props} title="U+20A7 | Dec:8359" children="₧" />
        <PText {...props} title="U+20A8 | Dec:8360" children="₨" />
        <PText {...props} title="U+20A9 | Dec:8361" children="₩" />
        <PText {...props} title="U+20AA | Dec:8362" children="₪" />
        <PText {...props} title="U+20AB | Dec:8363" children="₫" />
        <PText {...props} title="U+20AC | Dec:8364" children="€" />
        <PText {...props} title="U+20AD | Dec:8365" children="₭" />
        <PText {...props} title="U+20AE | Dec:8366" children="₮" />
        <PText {...props} title="U+20AF | Dec:8367" children="₯" />
        <PText {...props} title="U+20B0 | Dec:8368" children="₰" />
        <PText {...props} title="U+20B1 | Dec:8369" children="₱" />
        <PText {...props} title="U+20B2 | Dec:8370" children="₲" />
        <PText {...props} title="U+20B3 | Dec:8371" children="₳" />
        <PText {...props} title="U+20B4 | Dec:8372" children="₴" />
        <PText {...props} title="U+20B5 | Dec:8373" children="₵" />
        <PText {...props} title="U+20B6 | Dec:8374" children="₶" />
        <PText {...props} title="U+20B7 | Dec:8375" children="₷" />
        <PText {...props} title="U+20B8 | Dec:8376" children="₸" />
        <PText {...props} title="U+20B9 | Dec:8377" children="₹" />
        <PText {...props} title="U+20BA | Dec:8378" children="₺" />
        <PText {...props} title="U+20BB | Dec:8379" children="₻" />
        <PText {...props} title="U+20BC | Dec:8380" children="₼" />
        <PText {...props} title="U+20BD | Dec:8381" children="₽" />
        <PText {...props} title="U+20BE | Dec:8382" children="₾" />
        <PText {...props} title="U+20BF | Dec:8383" children="₿" />
        <PText {...props} title="U+20C0 | Dec:8384" children="⃀" />
        <PText {...props} title="U+20C1 | Dec:8385" children="⃁" />
        <PText {...props} title="U+20C2 | Dec:8386" children="⃂" />
        <PText {...props} title="U+20C3 | Dec:8387" children="⃃" />
        <PText {...props} title="U+20C4 | Dec:8388" children="⃄" />
        <PText {...props} title="U+20C5 | Dec:8389" children="⃅" />
        <PText {...props} title="U+20C6 | Dec:8390" children="⃆" />
        <PText {...props} title="U+20C7 | Dec:8391" children="⃇" />
        <PText {...props} title="U+20C8 | Dec:8392" children="⃈" />
        <PText {...props} title="U+20C9 | Dec:8393" children="⃉" />
        <PText {...props} title="U+20CA | Dec:8394" children="⃊" />
        <PText {...props} title="U+20CB | Dec:8395" children="⃋" />
        <PText {...props} title="U+20CC | Dec:8396" children="⃌" />
        <PText {...props} title="U+20CD | Dec:8397" children="⃍" />
        <PText {...props} title="U+20CE | Dec:8398" children="⃎" />
        <PText {...props} title="U+20CF | Dec:8399" children="⃏" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+2100-214F (Porsche Next "Letterlike Symbols")</PHeadline>
        <PText {...props} title="U+2100 | Dec:8448" children="℀" />
        <PText {...props} title="U+2101 | Dec:8449" children="℁" />
        <PText {...props} title="U+2102 | Dec:8450" children="ℂ" />
        <PText {...props} title="U+2103 | Dec:8451" children="℃" />
        <PText {...props} title="U+2104 | Dec:8452" children="℄" />
        <PText {...props} title="U+2105 | Dec:8453" children="℅" />
        <PText {...props} title="U+2106 | Dec:8454" children="℆" />
        <PText {...props} title="U+2107 | Dec:8455" children="ℇ" />
        <PText {...props} title="U+2108 | Dec:8456" children="℈" />
        <PText {...props} title="U+2109 | Dec:8457" children="℉" />
        <PText {...props} title="U+210A | Dec:8458" children="ℊ" />
        <PText {...props} title="U+210B | Dec:8459" children="ℋ" />
        <PText {...props} title="U+210C | Dec:8460" children="ℌ" />
        <PText {...props} title="U+210D | Dec:8461" children="ℍ" />
        <PText {...props} title="U+210E | Dec:8462" children="ℎ" />
        <PText {...props} title="U+210F | Dec:8463" children="ℏ" />
        <PText {...props} title="U+2110 | Dec:8464" children="ℐ" />
        <PText {...props} title="U+2111 | Dec:8465" children="ℑ" />
        <PText {...props} title="U+2112 | Dec:8466" children="ℒ" />
        <PText {...props} title="U+2113 | Dec:8467" children="ℓ" />
        <PText {...props} title="U+2114 | Dec:8468" children="℔" />
        <PText {...props} title="U+2115 | Dec:8469" children="ℕ" />
        <PText {...props} title="U+2116 | Dec:8470" children="№" />
        <PText {...props} title="U+2117 | Dec:8471" children="℗" />
        <PText {...props} title="U+2118 | Dec:8472" children="℘" />
        <PText {...props} title="U+2119 | Dec:8473" children="ℙ" />
        <PText {...props} title="U+211A | Dec:8474" children="ℚ" />
        <PText {...props} title="U+211B | Dec:8475" children="ℛ" />
        <PText {...props} title="U+211C | Dec:8476" children="ℜ" />
        <PText {...props} title="U+211D | Dec:8477" children="ℝ" />
        <PText {...props} title="U+211E | Dec:8478" children="℞" />
        <PText {...props} title="U+211F | Dec:8479" children="℟" />
        <PText {...props} title="U+2120 | Dec:8480" children="℠" />
        <PText {...props} title="U+2121 | Dec:8481" children="℡" />
        <PText {...props} title="U+2122 | Dec:8482" children="™" />
        <PText {...props} title="U+2123 | Dec:8483" children="℣" />
        <PText {...props} title="U+2124 | Dec:8484" children="ℤ" />
        <PText {...props} title="U+2125 | Dec:8485" children="℥" />
        <PText {...props} title="U+2126 | Dec:8486" children="Ω" />
        <PText {...props} title="U+2127 | Dec:8487" children="℧" />
        <PText {...props} title="U+2128 | Dec:8488" children="ℨ" />
        <PText {...props} title="U+2129 | Dec:8489" children="℩" />
        <PText {...props} title="U+212A | Dec:8490" children="K" />
        <PText {...props} title="U+212B | Dec:8491" children="Å" />
        <PText {...props} title="U+212C | Dec:8492" children="ℬ" />
        <PText {...props} title="U+212D | Dec:8493" children="ℭ" />
        <PText {...props} title="U+212E | Dec:8494" children="℮" />
        <PText {...props} title="U+212F | Dec:8495" children="ℯ" />
        <PText {...props} title="U+2130 | Dec:8496" children="ℰ" />
        <PText {...props} title="U+2131 | Dec:8497" children="ℱ" />
        <PText {...props} title="U+2132 | Dec:8498" children="Ⅎ" />
        <PText {...props} title="U+2133 | Dec:8499" children="ℳ" />
        <PText {...props} title="U+2134 | Dec:8500" children="ℴ" />
        <PText {...props} title="U+2135 | Dec:8501" children="ℵ" />
        <PText {...props} title="U+2136 | Dec:8502" children="ℶ" />
        <PText {...props} title="U+2137 | Dec:8503" children="ℷ" />
        <PText {...props} title="U+2138 | Dec:8504" children="ℸ" />
        <PText {...props} title="U+2139 | Dec:8505" children="ℹ" />
        <PText {...props} title="U+213A | Dec:8506" children="℺" />
        <PText {...props} title="U+213B | Dec:8507" children="℻" />
        <PText {...props} title="U+213C | Dec:8508" children="ℼ" />
        <PText {...props} title="U+213D | Dec:8509" children="ℽ" />
        <PText {...props} title="U+213E | Dec:8510" children="ℾ" />
        <PText {...props} title="U+213F | Dec:8511" children="ℿ" />
        <PText {...props} title="U+2140 | Dec:8512" children="⅀" />
        <PText {...props} title="U+2141 | Dec:8513" children="⅁" />
        <PText {...props} title="U+2142 | Dec:8514" children="⅂" />
        <PText {...props} title="U+2143 | Dec:8515" children="⅃" />
        <PText {...props} title="U+2144 | Dec:8516" children="⅄" />
        <PText {...props} title="U+2145 | Dec:8517" children="ⅅ" />
        <PText {...props} title="U+2146 | Dec:8518" children="ⅆ" />
        <PText {...props} title="U+2147 | Dec:8519" children="ⅇ" />
        <PText {...props} title="U+2148 | Dec:8520" children="ⅈ" />
        <PText {...props} title="U+2149 | Dec:8521" children="ⅉ" />
        <PText {...props} title="U+214A | Dec:8522" children="⅊" />
        <PText {...props} title="U+214B | Dec:8523" children="⅋" />
        <PText {...props} title="U+214C | Dec:8524" children="⅌" />
        <PText {...props} title="U+214D | Dec:8525" children="⅍" />
        <PText {...props} title="U+214E | Dec:8526" children="ⅎ" />
        <PText {...props} title="U+214F | Dec:8527" children="⅏" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+2150-218F (Porsche Next "Number Forms")</PHeadline>
        <PText {...props} title="U+2150 | Dec:8528" children="⅐" />
        <PText {...props} title="U+2151 | Dec:8529" children="⅑" />
        <PText {...props} title="U+2152 | Dec:8530" children="⅒" />
        <PText {...props} title="U+2153 | Dec:8531" children="⅓" />
        <PText {...props} title="U+2154 | Dec:8532" children="⅔" />
        <PText {...props} title="U+2155 | Dec:8533" children="⅕" />
        <PText {...props} title="U+2156 | Dec:8534" children="⅖" />
        <PText {...props} title="U+2157 | Dec:8535" children="⅗" />
        <PText {...props} title="U+2158 | Dec:8536" children="⅘" />
        <PText {...props} title="U+2159 | Dec:8537" children="⅙" />
        <PText {...props} title="U+215A | Dec:8538" children="⅚" />
        <PText {...props} title="U+215B | Dec:8539" children="⅛" />
        <PText {...props} title="U+215C | Dec:8540" children="⅜" />
        <PText {...props} title="U+215D | Dec:8541" children="⅝" />
        <PText {...props} title="U+215E | Dec:8542" children="⅞" />
        <PText {...props} title="U+215F | Dec:8543" children="⅟" />
        <PText {...props} title="U+2160 | Dec:8544" children="Ⅰ" />
        <PText {...props} title="U+2161 | Dec:8545" children="Ⅱ" />
        <PText {...props} title="U+2162 | Dec:8546" children="Ⅲ" />
        <PText {...props} title="U+2163 | Dec:8547" children="Ⅳ" />
        <PText {...props} title="U+2164 | Dec:8548" children="Ⅴ" />
        <PText {...props} title="U+2165 | Dec:8549" children="Ⅵ" />
        <PText {...props} title="U+2166 | Dec:8550" children="Ⅶ" />
        <PText {...props} title="U+2167 | Dec:8551" children="Ⅷ" />
        <PText {...props} title="U+2168 | Dec:8552" children="Ⅸ" />
        <PText {...props} title="U+2169 | Dec:8553" children="Ⅹ" />
        <PText {...props} title="U+216A | Dec:8554" children="Ⅺ" />
        <PText {...props} title="U+216B | Dec:8555" children="Ⅻ" />
        <PText {...props} title="U+216C | Dec:8556" children="Ⅼ" />
        <PText {...props} title="U+216D | Dec:8557" children="Ⅽ" />
        <PText {...props} title="U+216E | Dec:8558" children="Ⅾ" />
        <PText {...props} title="U+216F | Dec:8559" children="Ⅿ" />
        <PText {...props} title="U+2170 | Dec:8560" children="ⅰ" />
        <PText {...props} title="U+2171 | Dec:8561" children="ⅱ" />
        <PText {...props} title="U+2172 | Dec:8562" children="ⅲ" />
        <PText {...props} title="U+2173 | Dec:8563" children="ⅳ" />
        <PText {...props} title="U+2174 | Dec:8564" children="ⅴ" />
        <PText {...props} title="U+2175 | Dec:8565" children="ⅵ" />
        <PText {...props} title="U+2176 | Dec:8566" children="ⅶ" />
        <PText {...props} title="U+2177 | Dec:8567" children="ⅷ" />
        <PText {...props} title="U+2178 | Dec:8568" children="ⅸ" />
        <PText {...props} title="U+2179 | Dec:8569" children="ⅹ" />
        <PText {...props} title="U+217A | Dec:8570" children="ⅺ" />
        <PText {...props} title="U+217B | Dec:8571" children="ⅻ" />
        <PText {...props} title="U+217C | Dec:8572" children="ⅼ" />
        <PText {...props} title="U+217D | Dec:8573" children="ⅽ" />
        <PText {...props} title="U+217E | Dec:8574" children="ⅾ" />
        <PText {...props} title="U+217F | Dec:8575" children="ⅿ" />
        <PText {...props} title="U+2180 | Dec:8576" children="ↀ" />
        <PText {...props} title="U+2181 | Dec:8577" children="ↁ" />
        <PText {...props} title="U+2182 | Dec:8578" children="ↂ" />
        <PText {...props} title="U+2183 | Dec:8579" children="Ↄ" />
        <PText {...props} title="U+2184 | Dec:8580" children="ↄ" />
        <PText {...props} title="U+2185 | Dec:8581" children="ↅ" />
        <PText {...props} title="U+2186 | Dec:8582" children="ↆ" />
        <PText {...props} title="U+2187 | Dec:8583" children="ↇ" />
        <PText {...props} title="U+2188 | Dec:8584" children="ↈ" />
        <PText {...props} title="U+2189 | Dec:8585" children="↉" />
        <PText {...props} title="U+218A | Dec:8586" children="↊" />
        <PText {...props} title="U+218B | Dec:8587" children="↋" />
        <PText {...props} title="U+218C | Dec:8588" children="↌" />
        <PText {...props} title="U+218D | Dec:8589" children="↍" />
        <PText {...props} title="U+218E | Dec:8590" children="↎" />
        <PText {...props} title="U+218F | Dec:8591" children="↏" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+2190-21FF (Porsche Next "Arrows")</PHeadline>
        <PText {...props} title="U+2190 | Dec:8592" children="←" />
        <PText {...props} title="U+2191 | Dec:8593" children="↑" />
        <PText {...props} title="U+2192 | Dec:8594" children="→" />
        <PText {...props} title="U+2193 | Dec:8595" children="↓" />
        <PText {...props} title="U+2194 | Dec:8596" children="↔" />
        <PText {...props} title="U+2195 | Dec:8597" children="↕" />
        <PText {...props} title="U+2196 | Dec:8598" children="↖" />
        <PText {...props} title="U+2197 | Dec:8599" children="↗" />
        <PText {...props} title="U+2198 | Dec:8600" children="↘" />
        <PText {...props} title="U+2199 | Dec:8601" children="↙" />
        <PText {...props} title="U+219A | Dec:8602" children="↚" />
        <PText {...props} title="U+219B | Dec:8603" children="↛" />
        <PText {...props} title="U+219C | Dec:8604" children="↜" />
        <PText {...props} title="U+219D | Dec:8605" children="↝" />
        <PText {...props} title="U+219E | Dec:8606" children="↞" />
        <PText {...props} title="U+219F | Dec:8607" children="↟" />
        <PText {...props} title="U+21A0 | Dec:8608" children="↠" />
        <PText {...props} title="U+21A1 | Dec:8609" children="↡" />
        <PText {...props} title="U+21A2 | Dec:8610" children="↢" />
        <PText {...props} title="U+21A3 | Dec:8611" children="↣" />
        <PText {...props} title="U+21A4 | Dec:8612" children="↤" />
        <PText {...props} title="U+21A5 | Dec:8613" children="↥" />
        <PText {...props} title="U+21A6 | Dec:8614" children="↦" />
        <PText {...props} title="U+21A7 | Dec:8615" children="↧" />
        <PText {...props} title="U+21A8 | Dec:8616" children="↨" />
        <PText {...props} title="U+21A9 | Dec:8617" children="↩" />
        <PText {...props} title="U+21AA | Dec:8618" children="↪" />
        <PText {...props} title="U+21AB | Dec:8619" children="↫" />
        <PText {...props} title="U+21AC | Dec:8620" children="↬" />
        <PText {...props} title="U+21AD | Dec:8621" children="↭" />
        <PText {...props} title="U+21AE | Dec:8622" children="↮" />
        <PText {...props} title="U+21AF | Dec:8623" children="↯" />
        <PText {...props} title="U+21B0 | Dec:8624" children="↰" />
        <PText {...props} title="U+21B1 | Dec:8625" children="↱" />
        <PText {...props} title="U+21B2 | Dec:8626" children="↲" />
        <PText {...props} title="U+21B3 | Dec:8627" children="↳" />
        <PText {...props} title="U+21B4 | Dec:8628" children="↴" />
        <PText {...props} title="U+21B5 | Dec:8629" children="↵" />
        <PText {...props} title="U+21B6 | Dec:8630" children="↶" />
        <PText {...props} title="U+21B7 | Dec:8631" children="↷" />
        <PText {...props} title="U+21B8 | Dec:8632" children="↸" />
        <PText {...props} title="U+21B9 | Dec:8633" children="↹" />
        <PText {...props} title="U+21BA | Dec:8634" children="↺" />
        <PText {...props} title="U+21BB | Dec:8635" children="↻" />
        <PText {...props} title="U+21BC | Dec:8636" children="↼" />
        <PText {...props} title="U+21BD | Dec:8637" children="↽" />
        <PText {...props} title="U+21BE | Dec:8638" children="↾" />
        <PText {...props} title="U+21BF | Dec:8639" children="↿" />
        <PText {...props} title="U+21C0 | Dec:8640" children="⇀" />
        <PText {...props} title="U+21C1 | Dec:8641" children="⇁" />
        <PText {...props} title="U+21C2 | Dec:8642" children="⇂" />
        <PText {...props} title="U+21C3 | Dec:8643" children="⇃" />
        <PText {...props} title="U+21C4 | Dec:8644" children="⇄" />
        <PText {...props} title="U+21C5 | Dec:8645" children="⇅" />
        <PText {...props} title="U+21C6 | Dec:8646" children="⇆" />
        <PText {...props} title="U+21C7 | Dec:8647" children="⇇" />
        <PText {...props} title="U+21C8 | Dec:8648" children="⇈" />
        <PText {...props} title="U+21C9 | Dec:8649" children="⇉" />
        <PText {...props} title="U+21CA | Dec:8650" children="⇊" />
        <PText {...props} title="U+21CB | Dec:8651" children="⇋" />
        <PText {...props} title="U+21CC | Dec:8652" children="⇌" />
        <PText {...props} title="U+21CD | Dec:8653" children="⇍" />
        <PText {...props} title="U+21CE | Dec:8654" children="⇎" />
        <PText {...props} title="U+21CF | Dec:8655" children="⇏" />
        <PText {...props} title="U+21D0 | Dec:8656" children="⇐" />
        <PText {...props} title="U+21D1 | Dec:8657" children="⇑" />
        <PText {...props} title="U+21D2 | Dec:8658" children="⇒" />
        <PText {...props} title="U+21D3 | Dec:8659" children="⇓" />
        <PText {...props} title="U+21D4 | Dec:8660" children="⇔" />
        <PText {...props} title="U+21D5 | Dec:8661" children="⇕" />
        <PText {...props} title="U+21D6 | Dec:8662" children="⇖" />
        <PText {...props} title="U+21D7 | Dec:8663" children="⇗" />
        <PText {...props} title="U+21D8 | Dec:8664" children="⇘" />
        <PText {...props} title="U+21D9 | Dec:8665" children="⇙" />
        <PText {...props} title="U+21DA | Dec:8666" children="⇚" />
        <PText {...props} title="U+21DB | Dec:8667" children="⇛" />
        <PText {...props} title="U+21DC | Dec:8668" children="⇜" />
        <PText {...props} title="U+21DD | Dec:8669" children="⇝" />
        <PText {...props} title="U+21DE | Dec:8670" children="⇞" />
        <PText {...props} title="U+21DF | Dec:8671" children="⇟" />
        <PText {...props} title="U+21E0 | Dec:8672" children="⇠" />
        <PText {...props} title="U+21E1 | Dec:8673" children="⇡" />
        <PText {...props} title="U+21E2 | Dec:8674" children="⇢" />
        <PText {...props} title="U+21E3 | Dec:8675" children="⇣" />
        <PText {...props} title="U+21E4 | Dec:8676" children="⇤" />
        <PText {...props} title="U+21E5 | Dec:8677" children="⇥" />
        <PText {...props} title="U+21E6 | Dec:8678" children="⇦" />
        <PText {...props} title="U+21E7 | Dec:8679" children="⇧" />
        <PText {...props} title="U+21E8 | Dec:8680" children="⇨" />
        <PText {...props} title="U+21E9 | Dec:8681" children="⇩" />
        <PText {...props} title="U+21EA | Dec:8682" children="⇪" />
        <PText {...props} title="U+21EB | Dec:8683" children="⇫" />
        <PText {...props} title="U+21EC | Dec:8684" children="⇬" />
        <PText {...props} title="U+21ED | Dec:8685" children="⇭" />
        <PText {...props} title="U+21EE | Dec:8686" children="⇮" />
        <PText {...props} title="U+21EF | Dec:8687" children="⇯" />
        <PText {...props} title="U+21F0 | Dec:8688" children="⇰" />
        <PText {...props} title="U+21F1 | Dec:8689" children="⇱" />
        <PText {...props} title="U+21F2 | Dec:8690" children="⇲" />
        <PText {...props} title="U+21F3 | Dec:8691" children="⇳" />
        <PText {...props} title="U+21F4 | Dec:8692" children="⇴" />
        <PText {...props} title="U+21F5 | Dec:8693" children="⇵" />
        <PText {...props} title="U+21F6 | Dec:8694" children="⇶" />
        <PText {...props} title="U+21F7 | Dec:8695" children="⇷" />
        <PText {...props} title="U+21F8 | Dec:8696" children="⇸" />
        <PText {...props} title="U+21F9 | Dec:8697" children="⇹" />
        <PText {...props} title="U+21FA | Dec:8698" children="⇺" />
        <PText {...props} title="U+21FB | Dec:8699" children="⇻" />
        <PText {...props} title="U+21FC | Dec:8700" children="⇼" />
        <PText {...props} title="U+21FD | Dec:8701" children="⇽" />
        <PText {...props} title="U+21FE | Dec:8702" children="⇾" />
        <PText {...props} title="U+21FF | Dec:8703" children="⇿" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+2200-22FF (Porsche Next "Mathematical Operators")</PHeadline>
        <PText {...props} title="U+2200 | Dec:8704" children="∀" />
        <PText {...props} title="U+2201 | Dec:8705" children="∁" />
        <PText {...props} title="U+2202 | Dec:8706" children="∂" />
        <PText {...props} title="U+2203 | Dec:8707" children="∃" />
        <PText {...props} title="U+2204 | Dec:8708" children="∄" />
        <PText {...props} title="U+2205 | Dec:8709" children="∅" />
        <PText {...props} title="U+2206 | Dec:8710" children="∆" />
        <PText {...props} title="U+2207 | Dec:8711" children="∇" />
        <PText {...props} title="U+2208 | Dec:8712" children="∈" />
        <PText {...props} title="U+2209 | Dec:8713" children="∉" />
        <PText {...props} title="U+220A | Dec:8714" children="∊" />
        <PText {...props} title="U+220B | Dec:8715" children="∋" />
        <PText {...props} title="U+220C | Dec:8716" children="∌" />
        <PText {...props} title="U+220D | Dec:8717" children="∍" />
        <PText {...props} title="U+220E | Dec:8718" children="∎" />
        <PText {...props} title="U+220F | Dec:8719" children="∏" />
        <PText {...props} title="U+2210 | Dec:8720" children="∐" />
        <PText {...props} title="U+2211 | Dec:8721" children="∑" />
        <PText {...props} title="U+2212 | Dec:8722" children="−" />
        <PText {...props} title="U+2213 | Dec:8723" children="∓" />
        <PText {...props} title="U+2214 | Dec:8724" children="∔" />
        <PText {...props} title="U+2215 | Dec:8725" children="∕" />
        <PText {...props} title="U+2216 | Dec:8726" children="∖" />
        <PText {...props} title="U+2217 | Dec:8727" children="∗" />
        <PText {...props} title="U+2218 | Dec:8728" children="∘" />
        <PText {...props} title="U+2219 | Dec:8729" children="∙" />
        <PText {...props} title="U+221A | Dec:8730" children="√" />
        <PText {...props} title="U+221B | Dec:8731" children="∛" />
        <PText {...props} title="U+221C | Dec:8732" children="∜" />
        <PText {...props} title="U+221D | Dec:8733" children="∝" />
        <PText {...props} title="U+221E | Dec:8734" children="∞" />
        <PText {...props} title="U+221F | Dec:8735" children="∟" />
        <PText {...props} title="U+2220 | Dec:8736" children="∠" />
        <PText {...props} title="U+2221 | Dec:8737" children="∡" />
        <PText {...props} title="U+2222 | Dec:8738" children="∢" />
        <PText {...props} title="U+2223 | Dec:8739" children="∣" />
        <PText {...props} title="U+2224 | Dec:8740" children="∤" />
        <PText {...props} title="U+2225 | Dec:8741" children="∥" />
        <PText {...props} title="U+2226 | Dec:8742" children="∦" />
        <PText {...props} title="U+2227 | Dec:8743" children="∧" />
        <PText {...props} title="U+2228 | Dec:8744" children="∨" />
        <PText {...props} title="U+2229 | Dec:8745" children="∩" />
        <PText {...props} title="U+222A | Dec:8746" children="∪" />
        <PText {...props} title="U+222B | Dec:8747" children="∫" />
        <PText {...props} title="U+222C | Dec:8748" children="∬" />
        <PText {...props} title="U+222D | Dec:8749" children="∭" />
        <PText {...props} title="U+222E | Dec:8750" children="∮" />
        <PText {...props} title="U+222F | Dec:8751" children="∯" />
        <PText {...props} title="U+2230 | Dec:8752" children="∰" />
        <PText {...props} title="U+2231 | Dec:8753" children="∱" />
        <PText {...props} title="U+2232 | Dec:8754" children="∲" />
        <PText {...props} title="U+2233 | Dec:8755" children="∳" />
        <PText {...props} title="U+2234 | Dec:8756" children="∴" />
        <PText {...props} title="U+2235 | Dec:8757" children="∵" />
        <PText {...props} title="U+2236 | Dec:8758" children="∶" />
        <PText {...props} title="U+2237 | Dec:8759" children="∷" />
        <PText {...props} title="U+2238 | Dec:8760" children="∸" />
        <PText {...props} title="U+2239 | Dec:8761" children="∹" />
        <PText {...props} title="U+223A | Dec:8762" children="∺" />
        <PText {...props} title="U+223B | Dec:8763" children="∻" />
        <PText {...props} title="U+223C | Dec:8764" children="∼" />
        <PText {...props} title="U+223D | Dec:8765" children="∽" />
        <PText {...props} title="U+223E | Dec:8766" children="∾" />
        <PText {...props} title="U+223F | Dec:8767" children="∿" />
        <PText {...props} title="U+2240 | Dec:8768" children="≀" />
        <PText {...props} title="U+2241 | Dec:8769" children="≁" />
        <PText {...props} title="U+2242 | Dec:8770" children="≂" />
        <PText {...props} title="U+2243 | Dec:8771" children="≃" />
        <PText {...props} title="U+2244 | Dec:8772" children="≄" />
        <PText {...props} title="U+2245 | Dec:8773" children="≅" />
        <PText {...props} title="U+2246 | Dec:8774" children="≆" />
        <PText {...props} title="U+2247 | Dec:8775" children="≇" />
        <PText {...props} title="U+2248 | Dec:8776" children="≈" />
        <PText {...props} title="U+2249 | Dec:8777" children="≉" />
        <PText {...props} title="U+224A | Dec:8778" children="≊" />
        <PText {...props} title="U+224B | Dec:8779" children="≋" />
        <PText {...props} title="U+224C | Dec:8780" children="≌" />
        <PText {...props} title="U+224D | Dec:8781" children="≍" />
        <PText {...props} title="U+224E | Dec:8782" children="≎" />
        <PText {...props} title="U+224F | Dec:8783" children="≏" />
        <PText {...props} title="U+2250 | Dec:8784" children="≐" />
        <PText {...props} title="U+2251 | Dec:8785" children="≑" />
        <PText {...props} title="U+2252 | Dec:8786" children="≒" />
        <PText {...props} title="U+2253 | Dec:8787" children="≓" />
        <PText {...props} title="U+2254 | Dec:8788" children="≔" />
        <PText {...props} title="U+2255 | Dec:8789" children="≕" />
        <PText {...props} title="U+2256 | Dec:8790" children="≖" />
        <PText {...props} title="U+2257 | Dec:8791" children="≗" />
        <PText {...props} title="U+2258 | Dec:8792" children="≘" />
        <PText {...props} title="U+2259 | Dec:8793" children="≙" />
        <PText {...props} title="U+225A | Dec:8794" children="≚" />
        <PText {...props} title="U+225B | Dec:8795" children="≛" />
        <PText {...props} title="U+225C | Dec:8796" children="≜" />
        <PText {...props} title="U+225D | Dec:8797" children="≝" />
        <PText {...props} title="U+225E | Dec:8798" children="≞" />
        <PText {...props} title="U+225F | Dec:8799" children="≟" />
        <PText {...props} title="U+2260 | Dec:8800" children="≠" />
        <PText {...props} title="U+2261 | Dec:8801" children="≡" />
        <PText {...props} title="U+2262 | Dec:8802" children="≢" />
        <PText {...props} title="U+2263 | Dec:8803" children="≣" />
        <PText {...props} title="U+2264 | Dec:8804" children="≤" />
        <PText {...props} title="U+2265 | Dec:8805" children="≥" />
        <PText {...props} title="U+2266 | Dec:8806" children="≦" />
        <PText {...props} title="U+2267 | Dec:8807" children="≧" />
        <PText {...props} title="U+2268 | Dec:8808" children="≨" />
        <PText {...props} title="U+2269 | Dec:8809" children="≩" />
        <PText {...props} title="U+226A | Dec:8810" children="≪" />
        <PText {...props} title="U+226B | Dec:8811" children="≫" />
        <PText {...props} title="U+226C | Dec:8812" children="≬" />
        <PText {...props} title="U+226D | Dec:8813" children="≭" />
        <PText {...props} title="U+226E | Dec:8814" children="≮" />
        <PText {...props} title="U+226F | Dec:8815" children="≯" />
        <PText {...props} title="U+2270 | Dec:8816" children="≰" />
        <PText {...props} title="U+2271 | Dec:8817" children="≱" />
        <PText {...props} title="U+2272 | Dec:8818" children="≲" />
        <PText {...props} title="U+2273 | Dec:8819" children="≳" />
        <PText {...props} title="U+2274 | Dec:8820" children="≴" />
        <PText {...props} title="U+2275 | Dec:8821" children="≵" />
        <PText {...props} title="U+2276 | Dec:8822" children="≶" />
        <PText {...props} title="U+2277 | Dec:8823" children="≷" />
        <PText {...props} title="U+2278 | Dec:8824" children="≸" />
        <PText {...props} title="U+2279 | Dec:8825" children="≹" />
        <PText {...props} title="U+227A | Dec:8826" children="≺" />
        <PText {...props} title="U+227B | Dec:8827" children="≻" />
        <PText {...props} title="U+227C | Dec:8828" children="≼" />
        <PText {...props} title="U+227D | Dec:8829" children="≽" />
        <PText {...props} title="U+227E | Dec:8830" children="≾" />
        <PText {...props} title="U+227F | Dec:8831" children="≿" />
        <PText {...props} title="U+2280 | Dec:8832" children="⊀" />
        <PText {...props} title="U+2281 | Dec:8833" children="⊁" />
        <PText {...props} title="U+2282 | Dec:8834" children="⊂" />
        <PText {...props} title="U+2283 | Dec:8835" children="⊃" />
        <PText {...props} title="U+2284 | Dec:8836" children="⊄" />
        <PText {...props} title="U+2285 | Dec:8837" children="⊅" />
        <PText {...props} title="U+2286 | Dec:8838" children="⊆" />
        <PText {...props} title="U+2287 | Dec:8839" children="⊇" />
        <PText {...props} title="U+2288 | Dec:8840" children="⊈" />
        <PText {...props} title="U+2289 | Dec:8841" children="⊉" />
        <PText {...props} title="U+228A | Dec:8842" children="⊊" />
        <PText {...props} title="U+228B | Dec:8843" children="⊋" />
        <PText {...props} title="U+228C | Dec:8844" children="⊌" />
        <PText {...props} title="U+228D | Dec:8845" children="⊍" />
        <PText {...props} title="U+228E | Dec:8846" children="⊎" />
        <PText {...props} title="U+228F | Dec:8847" children="⊏" />
        <PText {...props} title="U+2290 | Dec:8848" children="⊐" />
        <PText {...props} title="U+2291 | Dec:8849" children="⊑" />
        <PText {...props} title="U+2292 | Dec:8850" children="⊒" />
        <PText {...props} title="U+2293 | Dec:8851" children="⊓" />
        <PText {...props} title="U+2294 | Dec:8852" children="⊔" />
        <PText {...props} title="U+2295 | Dec:8853" children="⊕" />
        <PText {...props} title="U+2296 | Dec:8854" children="⊖" />
        <PText {...props} title="U+2297 | Dec:8855" children="⊗" />
        <PText {...props} title="U+2298 | Dec:8856" children="⊘" />
        <PText {...props} title="U+2299 | Dec:8857" children="⊙" />
        <PText {...props} title="U+229A | Dec:8858" children="⊚" />
        <PText {...props} title="U+229B | Dec:8859" children="⊛" />
        <PText {...props} title="U+229C | Dec:8860" children="⊜" />
        <PText {...props} title="U+229D | Dec:8861" children="⊝" />
        <PText {...props} title="U+229E | Dec:8862" children="⊞" />
        <PText {...props} title="U+229F | Dec:8863" children="⊟" />
        <PText {...props} title="U+22A0 | Dec:8864" children="⊠" />
        <PText {...props} title="U+22A1 | Dec:8865" children="⊡" />
        <PText {...props} title="U+22A2 | Dec:8866" children="⊢" />
        <PText {...props} title="U+22A3 | Dec:8867" children="⊣" />
        <PText {...props} title="U+22A4 | Dec:8868" children="⊤" />
        <PText {...props} title="U+22A5 | Dec:8869" children="⊥" />
        <PText {...props} title="U+22A6 | Dec:8870" children="⊦" />
        <PText {...props} title="U+22A7 | Dec:8871" children="⊧" />
        <PText {...props} title="U+22A8 | Dec:8872" children="⊨" />
        <PText {...props} title="U+22A9 | Dec:8873" children="⊩" />
        <PText {...props} title="U+22AA | Dec:8874" children="⊪" />
        <PText {...props} title="U+22AB | Dec:8875" children="⊫" />
        <PText {...props} title="U+22AC | Dec:8876" children="⊬" />
        <PText {...props} title="U+22AD | Dec:8877" children="⊭" />
        <PText {...props} title="U+22AE | Dec:8878" children="⊮" />
        <PText {...props} title="U+22AF | Dec:8879" children="⊯" />
        <PText {...props} title="U+22B0 | Dec:8880" children="⊰" />
        <PText {...props} title="U+22B1 | Dec:8881" children="⊱" />
        <PText {...props} title="U+22B2 | Dec:8882" children="⊲" />
        <PText {...props} title="U+22B3 | Dec:8883" children="⊳" />
        <PText {...props} title="U+22B4 | Dec:8884" children="⊴" />
        <PText {...props} title="U+22B5 | Dec:8885" children="⊵" />
        <PText {...props} title="U+22B6 | Dec:8886" children="⊶" />
        <PText {...props} title="U+22B7 | Dec:8887" children="⊷" />
        <PText {...props} title="U+22B8 | Dec:8888" children="⊸" />
        <PText {...props} title="U+22B9 | Dec:8889" children="⊹" />
        <PText {...props} title="U+22BA | Dec:8890" children="⊺" />
        <PText {...props} title="U+22BB | Dec:8891" children="⊻" />
        <PText {...props} title="U+22BC | Dec:8892" children="⊼" />
        <PText {...props} title="U+22BD | Dec:8893" children="⊽" />
        <PText {...props} title="U+22BE | Dec:8894" children="⊾" />
        <PText {...props} title="U+22BF | Dec:8895" children="⊿" />
        <PText {...props} title="U+22C0 | Dec:8896" children="⋀" />
        <PText {...props} title="U+22C1 | Dec:8897" children="⋁" />
        <PText {...props} title="U+22C2 | Dec:8898" children="⋂" />
        <PText {...props} title="U+22C3 | Dec:8899" children="⋃" />
        <PText {...props} title="U+22C4 | Dec:8900" children="⋄" />
        <PText {...props} title="U+22C5 | Dec:8901" children="⋅" />
        <PText {...props} title="U+22C6 | Dec:8902" children="⋆" />
        <PText {...props} title="U+22C7 | Dec:8903" children="⋇" />
        <PText {...props} title="U+22C8 | Dec:8904" children="⋈" />
        <PText {...props} title="U+22C9 | Dec:8905" children="⋉" />
        <PText {...props} title="U+22CA | Dec:8906" children="⋊" />
        <PText {...props} title="U+22CB | Dec:8907" children="⋋" />
        <PText {...props} title="U+22CC | Dec:8908" children="⋌" />
        <PText {...props} title="U+22CD | Dec:8909" children="⋍" />
        <PText {...props} title="U+22CE | Dec:8910" children="⋎" />
        <PText {...props} title="U+22CF | Dec:8911" children="⋏" />
        <PText {...props} title="U+22D0 | Dec:8912" children="⋐" />
        <PText {...props} title="U+22D1 | Dec:8913" children="⋑" />
        <PText {...props} title="U+22D2 | Dec:8914" children="⋒" />
        <PText {...props} title="U+22D3 | Dec:8915" children="⋓" />
        <PText {...props} title="U+22D4 | Dec:8916" children="⋔" />
        <PText {...props} title="U+22D5 | Dec:8917" children="⋕" />
        <PText {...props} title="U+22D6 | Dec:8918" children="⋖" />
        <PText {...props} title="U+22D7 | Dec:8919" children="⋗" />
        <PText {...props} title="U+22D8 | Dec:8920" children="⋘" />
        <PText {...props} title="U+22D9 | Dec:8921" children="⋙" />
        <PText {...props} title="U+22DA | Dec:8922" children="⋚" />
        <PText {...props} title="U+22DB | Dec:8923" children="⋛" />
        <PText {...props} title="U+22DC | Dec:8924" children="⋜" />
        <PText {...props} title="U+22DD | Dec:8925" children="⋝" />
        <PText {...props} title="U+22DE | Dec:8926" children="⋞" />
        <PText {...props} title="U+22DF | Dec:8927" children="⋟" />
        <PText {...props} title="U+22E0 | Dec:8928" children="⋠" />
        <PText {...props} title="U+22E1 | Dec:8929" children="⋡" />
        <PText {...props} title="U+22E2 | Dec:8930" children="⋢" />
        <PText {...props} title="U+22E3 | Dec:8931" children="⋣" />
        <PText {...props} title="U+22E4 | Dec:8932" children="⋤" />
        <PText {...props} title="U+22E5 | Dec:8933" children="⋥" />
        <PText {...props} title="U+22E6 | Dec:8934" children="⋦" />
        <PText {...props} title="U+22E7 | Dec:8935" children="⋧" />
        <PText {...props} title="U+22E8 | Dec:8936" children="⋨" />
        <PText {...props} title="U+22E9 | Dec:8937" children="⋩" />
        <PText {...props} title="U+22EA | Dec:8938" children="⋪" />
        <PText {...props} title="U+22EB | Dec:8939" children="⋫" />
        <PText {...props} title="U+22EC | Dec:8940" children="⋬" />
        <PText {...props} title="U+22ED | Dec:8941" children="⋭" />
        <PText {...props} title="U+22EE | Dec:8942" children="⋮" />
        <PText {...props} title="U+22EF | Dec:8943" children="⋯" />
        <PText {...props} title="U+22F0 | Dec:8944" children="⋰" />
        <PText {...props} title="U+22F1 | Dec:8945" children="⋱" />
        <PText {...props} title="U+22F2 | Dec:8946" children="⋲" />
        <PText {...props} title="U+22F3 | Dec:8947" children="⋳" />
        <PText {...props} title="U+22F4 | Dec:8948" children="⋴" />
        <PText {...props} title="U+22F5 | Dec:8949" children="⋵" />
        <PText {...props} title="U+22F6 | Dec:8950" children="⋶" />
        <PText {...props} title="U+22F7 | Dec:8951" children="⋷" />
        <PText {...props} title="U+22F8 | Dec:8952" children="⋸" />
        <PText {...props} title="U+22F9 | Dec:8953" children="⋹" />
        <PText {...props} title="U+22FA | Dec:8954" children="⋺" />
        <PText {...props} title="U+22FB | Dec:8955" children="⋻" />
        <PText {...props} title="U+22FC | Dec:8956" children="⋼" />
        <PText {...props} title="U+22FD | Dec:8957" children="⋽" />
        <PText {...props} title="U+22FE | Dec:8958" children="⋾" />
        <PText {...props} title="U+22FF | Dec:8959" children="⋿" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+25A0-25FF (Porsche Next "Geometric Shapes")</PHeadline>
        <PText {...props} title="U+25A0 | Dec:9632" children="■" />
        <PText {...props} title="U+25A1 | Dec:9633" children="□" />
        <PText {...props} title="U+25A2 | Dec:9634" children="▢" />
        <PText {...props} title="U+25A3 | Dec:9635" children="▣" />
        <PText {...props} title="U+25A4 | Dec:9636" children="▤" />
        <PText {...props} title="U+25A5 | Dec:9637" children="▥" />
        <PText {...props} title="U+25A6 | Dec:9638" children="▦" />
        <PText {...props} title="U+25A7 | Dec:9639" children="▧" />
        <PText {...props} title="U+25A8 | Dec:9640" children="▨" />
        <PText {...props} title="U+25A9 | Dec:9641" children="▩" />
        <PText {...props} title="U+25AA | Dec:9642" children="▪" />
        <PText {...props} title="U+25AB | Dec:9643" children="▫" />
        <PText {...props} title="U+25AC | Dec:9644" children="▬" />
        <PText {...props} title="U+25AD | Dec:9645" children="▭" />
        <PText {...props} title="U+25AE | Dec:9646" children="▮" />
        <PText {...props} title="U+25AF | Dec:9647" children="▯" />
        <PText {...props} title="U+25B0 | Dec:9648" children="▰" />
        <PText {...props} title="U+25B1 | Dec:9649" children="▱" />
        <PText {...props} title="U+25B2 | Dec:9650" children="▲" />
        <PText {...props} title="U+25B3 | Dec:9651" children="△" />
        <PText {...props} title="U+25B4 | Dec:9652" children="▴" />
        <PText {...props} title="U+25B5 | Dec:9653" children="▵" />
        <PText {...props} title="U+25B6 | Dec:9654" children="▶" />
        <PText {...props} title="U+25B7 | Dec:9655" children="▷" />
        <PText {...props} title="U+25B8 | Dec:9656" children="▸" />
        <PText {...props} title="U+25B9 | Dec:9657" children="▹" />
        <PText {...props} title="U+25BA | Dec:9658" children="►" />
        <PText {...props} title="U+25BB | Dec:9659" children="▻" />
        <PText {...props} title="U+25BC | Dec:9660" children="▼" />
        <PText {...props} title="U+25BD | Dec:9661" children="▽" />
        <PText {...props} title="U+25BE | Dec:9662" children="▾" />
        <PText {...props} title="U+25BF | Dec:9663" children="▿" />
        <PText {...props} title="U+25C0 | Dec:9664" children="◀" />
        <PText {...props} title="U+25C1 | Dec:9665" children="◁" />
        <PText {...props} title="U+25C2 | Dec:9666" children="◂" />
        <PText {...props} title="U+25C3 | Dec:9667" children="◃" />
        <PText {...props} title="U+25C4 | Dec:9668" children="◄" />
        <PText {...props} title="U+25C5 | Dec:9669" children="◅" />
        <PText {...props} title="U+25C6 | Dec:9670" children="◆" />
        <PText {...props} title="U+25C7 | Dec:9671" children="◇" />
        <PText {...props} title="U+25C8 | Dec:9672" children="◈" />
        <PText {...props} title="U+25C9 | Dec:9673" children="◉" />
        <PText {...props} title="U+25CA | Dec:9674" children="◊" />
        <PText {...props} title="U+25CB | Dec:9675" children="○" />
        <PText {...props} title="U+25CC | Dec:9676" children="◌" />
        <PText {...props} title="U+25CD | Dec:9677" children="◍" />
        <PText {...props} title="U+25CE | Dec:9678" children="◎" />
        <PText {...props} title="U+25CF | Dec:9679" children="●" />
        <PText {...props} title="U+25D0 | Dec:9680" children="◐" />
        <PText {...props} title="U+25D1 | Dec:9681" children="◑" />
        <PText {...props} title="U+25D2 | Dec:9682" children="◒" />
        <PText {...props} title="U+25D3 | Dec:9683" children="◓" />
        <PText {...props} title="U+25D4 | Dec:9684" children="◔" />
        <PText {...props} title="U+25D5 | Dec:9685" children="◕" />
        <PText {...props} title="U+25D6 | Dec:9686" children="◖" />
        <PText {...props} title="U+25D7 | Dec:9687" children="◗" />
        <PText {...props} title="U+25D8 | Dec:9688" children="◘" />
        <PText {...props} title="U+25D9 | Dec:9689" children="◙" />
        <PText {...props} title="U+25DA | Dec:9690" children="◚" />
        <PText {...props} title="U+25DB | Dec:9691" children="◛" />
        <PText {...props} title="U+25DC | Dec:9692" children="◜" />
        <PText {...props} title="U+25DD | Dec:9693" children="◝" />
        <PText {...props} title="U+25DE | Dec:9694" children="◞" />
        <PText {...props} title="U+25DF | Dec:9695" children="◟" />
        <PText {...props} title="U+25E0 | Dec:9696" children="◠" />
        <PText {...props} title="U+25E1 | Dec:9697" children="◡" />
        <PText {...props} title="U+25E2 | Dec:9698" children="◢" />
        <PText {...props} title="U+25E3 | Dec:9699" children="◣" />
        <PText {...props} title="U+25E4 | Dec:9700" children="◤" />
        <PText {...props} title="U+25E5 | Dec:9701" children="◥" />
        <PText {...props} title="U+25E6 | Dec:9702" children="◦" />
        <PText {...props} title="U+25E7 | Dec:9703" children="◧" />
        <PText {...props} title="U+25E8 | Dec:9704" children="◨" />
        <PText {...props} title="U+25E9 | Dec:9705" children="◩" />
        <PText {...props} title="U+25EA | Dec:9706" children="◪" />
        <PText {...props} title="U+25EB | Dec:9707" children="◫" />
        <PText {...props} title="U+25EC | Dec:9708" children="◬" />
        <PText {...props} title="U+25ED | Dec:9709" children="◭" />
        <PText {...props} title="U+25EE | Dec:9710" children="◮" />
        <PText {...props} title="U+25EF | Dec:9711" children="◯" />
        <PText {...props} title="U+25F0 | Dec:9712" children="◰" />
        <PText {...props} title="U+25F1 | Dec:9713" children="◱" />
        <PText {...props} title="U+25F2 | Dec:9714" children="◲" />
        <PText {...props} title="U+25F3 | Dec:9715" children="◳" />
        <PText {...props} title="U+25F4 | Dec:9716" children="◴" />
        <PText {...props} title="U+25F5 | Dec:9717" children="◵" />
        <PText {...props} title="U+25F6 | Dec:9718" children="◶" />
        <PText {...props} title="U+25F7 | Dec:9719" children="◷" />
        <PText {...props} title="U+25F8 | Dec:9720" children="◸" />
        <PText {...props} title="U+25F9 | Dec:9721" children="◹" />
        <PText {...props} title="U+25FA | Dec:9722" children="◺" />
        <PText {...props} title="U+25FB | Dec:9723" children="◻" />
        <PText {...props} title="U+25FC | Dec:9724" children="◼" />
        <PText {...props} title="U+25FD | Dec:9725" children="◽" />
        <PText {...props} title="U+25FE | Dec:9726" children="◾" />
        <PText {...props} title="U+25FF | Dec:9727" children="◿" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+2600-26FF (Porsche Next "Miscellaneous Symbols")</PHeadline>
        <PText {...props} title="U+2600 | Dec:9728" children="☀" />
        <PText {...props} title="U+2601 | Dec:9729" children="☁" />
        <PText {...props} title="U+2602 | Dec:9730" children="☂" />
        <PText {...props} title="U+2603 | Dec:9731" children="☃" />
        <PText {...props} title="U+2604 | Dec:9732" children="☄" />
        <PText {...props} title="U+2605 | Dec:9733" children="★" />
        <PText {...props} title="U+2606 | Dec:9734" children="☆" />
        <PText {...props} title="U+2607 | Dec:9735" children="☇" />
        <PText {...props} title="U+2608 | Dec:9736" children="☈" />
        <PText {...props} title="U+2609 | Dec:9737" children="☉" />
        <PText {...props} title="U+260A | Dec:9738" children="☊" />
        <PText {...props} title="U+260B | Dec:9739" children="☋" />
        <PText {...props} title="U+260C | Dec:9740" children="☌" />
        <PText {...props} title="U+260D | Dec:9741" children="☍" />
        <PText {...props} title="U+260E | Dec:9742" children="☎" />
        <PText {...props} title="U+260F | Dec:9743" children="☏" />
        <PText {...props} title="U+2610 | Dec:9744" children="☐" />
        <PText {...props} title="U+2611 | Dec:9745" children="☑" />
        <PText {...props} title="U+2612 | Dec:9746" children="☒" />
        <PText {...props} title="U+2613 | Dec:9747" children="☓" />
        <PText {...props} title="U+2614 | Dec:9748" children="☔" />
        <PText {...props} title="U+2615 | Dec:9749" children="☕" />
        <PText {...props} title="U+2616 | Dec:9750" children="☖" />
        <PText {...props} title="U+2617 | Dec:9751" children="☗" />
        <PText {...props} title="U+2618 | Dec:9752" children="☘" />
        <PText {...props} title="U+2619 | Dec:9753" children="☙" />
        <PText {...props} title="U+261A | Dec:9754" children="☚" />
        <PText {...props} title="U+261B | Dec:9755" children="☛" />
        <PText {...props} title="U+261C | Dec:9756" children="☜" />
        <PText {...props} title="U+261D | Dec:9757" children="☝" />
        <PText {...props} title="U+261E | Dec:9758" children="☞" />
        <PText {...props} title="U+261F | Dec:9759" children="☟" />
        <PText {...props} title="U+2620 | Dec:9760" children="☠" />
        <PText {...props} title="U+2621 | Dec:9761" children="☡" />
        <PText {...props} title="U+2622 | Dec:9762" children="☢" />
        <PText {...props} title="U+2623 | Dec:9763" children="☣" />
        <PText {...props} title="U+2624 | Dec:9764" children="☤" />
        <PText {...props} title="U+2625 | Dec:9765" children="☥" />
        <PText {...props} title="U+2626 | Dec:9766" children="☦" />
        <PText {...props} title="U+2627 | Dec:9767" children="☧" />
        <PText {...props} title="U+2628 | Dec:9768" children="☨" />
        <PText {...props} title="U+2629 | Dec:9769" children="☩" />
        <PText {...props} title="U+262A | Dec:9770" children="☪" />
        <PText {...props} title="U+262B | Dec:9771" children="☫" />
        <PText {...props} title="U+262C | Dec:9772" children="☬" />
        <PText {...props} title="U+262D | Dec:9773" children="☭" />
        <PText {...props} title="U+262E | Dec:9774" children="☮" />
        <PText {...props} title="U+262F | Dec:9775" children="☯" />
        <PText {...props} title="U+2630 | Dec:9776" children="☰" />
        <PText {...props} title="U+2631 | Dec:9777" children="☱" />
        <PText {...props} title="U+2632 | Dec:9778" children="☲" />
        <PText {...props} title="U+2633 | Dec:9779" children="☳" />
        <PText {...props} title="U+2634 | Dec:9780" children="☴" />
        <PText {...props} title="U+2635 | Dec:9781" children="☵" />
        <PText {...props} title="U+2636 | Dec:9782" children="☶" />
        <PText {...props} title="U+2637 | Dec:9783" children="☷" />
        <PText {...props} title="U+2638 | Dec:9784" children="☸" />
        <PText {...props} title="U+2639 | Dec:9785" children="☹" />
        <PText {...props} title="U+263A | Dec:9786" children="☺" />
        <PText {...props} title="U+263B | Dec:9787" children="☻" />
        <PText {...props} title="U+263C | Dec:9788" children="☼" />
        <PText {...props} title="U+263D | Dec:9789" children="☽" />
        <PText {...props} title="U+263E | Dec:9790" children="☾" />
        <PText {...props} title="U+263F | Dec:9791" children="☿" />
        <PText {...props} title="U+2640 | Dec:9792" children="♀" />
        <PText {...props} title="U+2641 | Dec:9793" children="♁" />
        <PText {...props} title="U+2642 | Dec:9794" children="♂" />
        <PText {...props} title="U+2643 | Dec:9795" children="♃" />
        <PText {...props} title="U+2644 | Dec:9796" children="♄" />
        <PText {...props} title="U+2645 | Dec:9797" children="♅" />
        <PText {...props} title="U+2646 | Dec:9798" children="♆" />
        <PText {...props} title="U+2647 | Dec:9799" children="♇" />
        <PText {...props} title="U+2648 | Dec:9800" children="♈" />
        <PText {...props} title="U+2649 | Dec:9801" children="♉" />
        <PText {...props} title="U+264A | Dec:9802" children="♊" />
        <PText {...props} title="U+264B | Dec:9803" children="♋" />
        <PText {...props} title="U+264C | Dec:9804" children="♌" />
        <PText {...props} title="U+264D | Dec:9805" children="♍" />
        <PText {...props} title="U+264E | Dec:9806" children="♎" />
        <PText {...props} title="U+264F | Dec:9807" children="♏" />
        <PText {...props} title="U+2650 | Dec:9808" children="♐" />
        <PText {...props} title="U+2651 | Dec:9809" children="♑" />
        <PText {...props} title="U+2652 | Dec:9810" children="♒" />
        <PText {...props} title="U+2653 | Dec:9811" children="♓" />
        <PText {...props} title="U+2654 | Dec:9812" children="♔" />
        <PText {...props} title="U+2655 | Dec:9813" children="♕" />
        <PText {...props} title="U+2656 | Dec:9814" children="♖" />
        <PText {...props} title="U+2657 | Dec:9815" children="♗" />
        <PText {...props} title="U+2658 | Dec:9816" children="♘" />
        <PText {...props} title="U+2659 | Dec:9817" children="♙" />
        <PText {...props} title="U+265A | Dec:9818" children="♚" />
        <PText {...props} title="U+265B | Dec:9819" children="♛" />
        <PText {...props} title="U+265C | Dec:9820" children="♜" />
        <PText {...props} title="U+265D | Dec:9821" children="♝" />
        <PText {...props} title="U+265E | Dec:9822" children="♞" />
        <PText {...props} title="U+265F | Dec:9823" children="♟" />
        <PText {...props} title="U+2660 | Dec:9824" children="♠" />
        <PText {...props} title="U+2661 | Dec:9825" children="♡" />
        <PText {...props} title="U+2662 | Dec:9826" children="♢" />
        <PText {...props} title="U+2663 | Dec:9827" children="♣" />
        <PText {...props} title="U+2664 | Dec:9828" children="♤" />
        <PText {...props} title="U+2665 | Dec:9829" children="♥" />
        <PText {...props} title="U+2666 | Dec:9830" children="♦" />
        <PText {...props} title="U+2667 | Dec:9831" children="♧" />
        <PText {...props} title="U+2668 | Dec:9832" children="♨" />
        <PText {...props} title="U+2669 | Dec:9833" children="♩" />
        <PText {...props} title="U+266A | Dec:9834" children="♪" />
        <PText {...props} title="U+266B | Dec:9835" children="♫" />
        <PText {...props} title="U+266C | Dec:9836" children="♬" />
        <PText {...props} title="U+266D | Dec:9837" children="♭" />
        <PText {...props} title="U+266E | Dec:9838" children="♮" />
        <PText {...props} title="U+266F | Dec:9839" children="♯" />
        <PText {...props} title="U+2670 | Dec:9840" children="♰" />
        <PText {...props} title="U+2671 | Dec:9841" children="♱" />
        <PText {...props} title="U+2672 | Dec:9842" children="♲" />
        <PText {...props} title="U+2673 | Dec:9843" children="♳" />
        <PText {...props} title="U+2674 | Dec:9844" children="♴" />
        <PText {...props} title="U+2675 | Dec:9845" children="♵" />
        <PText {...props} title="U+2676 | Dec:9846" children="♶" />
        <PText {...props} title="U+2677 | Dec:9847" children="♷" />
        <PText {...props} title="U+2678 | Dec:9848" children="♸" />
        <PText {...props} title="U+2679 | Dec:9849" children="♹" />
        <PText {...props} title="U+267A | Dec:9850" children="♺" />
        <PText {...props} title="U+267B | Dec:9851" children="♻" />
        <PText {...props} title="U+267C | Dec:9852" children="♼" />
        <PText {...props} title="U+267D | Dec:9853" children="♽" />
        <PText {...props} title="U+267E | Dec:9854" children="♾" />
        <PText {...props} title="U+267F | Dec:9855" children="♿" />
        <PText {...props} title="U+2680 | Dec:9856" children="⚀" />
        <PText {...props} title="U+2681 | Dec:9857" children="⚁" />
        <PText {...props} title="U+2682 | Dec:9858" children="⚂" />
        <PText {...props} title="U+2683 | Dec:9859" children="⚃" />
        <PText {...props} title="U+2684 | Dec:9860" children="⚄" />
        <PText {...props} title="U+2685 | Dec:9861" children="⚅" />
        <PText {...props} title="U+2686 | Dec:9862" children="⚆" />
        <PText {...props} title="U+2687 | Dec:9863" children="⚇" />
        <PText {...props} title="U+2688 | Dec:9864" children="⚈" />
        <PText {...props} title="U+2689 | Dec:9865" children="⚉" />
        <PText {...props} title="U+268A | Dec:9866" children="⚊" />
        <PText {...props} title="U+268B | Dec:9867" children="⚋" />
        <PText {...props} title="U+268C | Dec:9868" children="⚌" />
        <PText {...props} title="U+268D | Dec:9869" children="⚍" />
        <PText {...props} title="U+268E | Dec:9870" children="⚎" />
        <PText {...props} title="U+268F | Dec:9871" children="⚏" />
        <PText {...props} title="U+2690 | Dec:9872" children="⚐" />
        <PText {...props} title="U+2691 | Dec:9873" children="⚑" />
        <PText {...props} title="U+2692 | Dec:9874" children="⚒" />
        <PText {...props} title="U+2693 | Dec:9875" children="⚓" />
        <PText {...props} title="U+2694 | Dec:9876" children="⚔" />
        <PText {...props} title="U+2695 | Dec:9877" children="⚕" />
        <PText {...props} title="U+2696 | Dec:9878" children="⚖" />
        <PText {...props} title="U+2697 | Dec:9879" children="⚗" />
        <PText {...props} title="U+2698 | Dec:9880" children="⚘" />
        <PText {...props} title="U+2699 | Dec:9881" children="⚙" />
        <PText {...props} title="U+269A | Dec:9882" children="⚚" />
        <PText {...props} title="U+269B | Dec:9883" children="⚛" />
        <PText {...props} title="U+269C | Dec:9884" children="⚜" />
        <PText {...props} title="U+269D | Dec:9885" children="⚝" />
        <PText {...props} title="U+269E | Dec:9886" children="⚞" />
        <PText {...props} title="U+269F | Dec:9887" children="⚟" />
        <PText {...props} title="U+26A0 | Dec:9888" children="⚠" />
        <PText {...props} title="U+26A1 | Dec:9889" children="⚡" />
        <PText {...props} title="U+26A2 | Dec:9890" children="⚢" />
        <PText {...props} title="U+26A3 | Dec:9891" children="⚣" />
        <PText {...props} title="U+26A4 | Dec:9892" children="⚤" />
        <PText {...props} title="U+26A5 | Dec:9893" children="⚥" />
        <PText {...props} title="U+26A6 | Dec:9894" children="⚦" />
        <PText {...props} title="U+26A7 | Dec:9895" children="⚧" />
        <PText {...props} title="U+26A8 | Dec:9896" children="⚨" />
        <PText {...props} title="U+26A9 | Dec:9897" children="⚩" />
        <PText {...props} title="U+26AA | Dec:9898" children="⚪" />
        <PText {...props} title="U+26AB | Dec:9899" children="⚫" />
        <PText {...props} title="U+26AC | Dec:9900" children="⚬" />
        <PText {...props} title="U+26AD | Dec:9901" children="⚭" />
        <PText {...props} title="U+26AE | Dec:9902" children="⚮" />
        <PText {...props} title="U+26AF | Dec:9903" children="⚯" />
        <PText {...props} title="U+26B0 | Dec:9904" children="⚰" />
        <PText {...props} title="U+26B1 | Dec:9905" children="⚱" />
        <PText {...props} title="U+26B2 | Dec:9906" children="⚲" />
        <PText {...props} title="U+26B3 | Dec:9907" children="⚳" />
        <PText {...props} title="U+26B4 | Dec:9908" children="⚴" />
        <PText {...props} title="U+26B5 | Dec:9909" children="⚵" />
        <PText {...props} title="U+26B6 | Dec:9910" children="⚶" />
        <PText {...props} title="U+26B7 | Dec:9911" children="⚷" />
        <PText {...props} title="U+26B8 | Dec:9912" children="⚸" />
        <PText {...props} title="U+26B9 | Dec:9913" children="⚹" />
        <PText {...props} title="U+26BA | Dec:9914" children="⚺" />
        <PText {...props} title="U+26BB | Dec:9915" children="⚻" />
        <PText {...props} title="U+26BC | Dec:9916" children="⚼" />
        <PText {...props} title="U+26BD | Dec:9917" children="⚽" />
        <PText {...props} title="U+26BE | Dec:9918" children="⚾" />
        <PText {...props} title="U+26BF | Dec:9919" children="⚿" />
        <PText {...props} title="U+26C0 | Dec:9920" children="⛀" />
        <PText {...props} title="U+26C1 | Dec:9921" children="⛁" />
        <PText {...props} title="U+26C2 | Dec:9922" children="⛂" />
        <PText {...props} title="U+26C3 | Dec:9923" children="⛃" />
        <PText {...props} title="U+26C4 | Dec:9924" children="⛄" />
        <PText {...props} title="U+26C5 | Dec:9925" children="⛅" />
        <PText {...props} title="U+26C6 | Dec:9926" children="⛆" />
        <PText {...props} title="U+26C7 | Dec:9927" children="⛇" />
        <PText {...props} title="U+26C8 | Dec:9928" children="⛈" />
        <PText {...props} title="U+26C9 | Dec:9929" children="⛉" />
        <PText {...props} title="U+26CA | Dec:9930" children="⛊" />
        <PText {...props} title="U+26CB | Dec:9931" children="⛋" />
        <PText {...props} title="U+26CC | Dec:9932" children="⛌" />
        <PText {...props} title="U+26CD | Dec:9933" children="⛍" />
        <PText {...props} title="U+26CE | Dec:9934" children="⛎" />
        <PText {...props} title="U+26CF | Dec:9935" children="⛏" />
        <PText {...props} title="U+26D0 | Dec:9936" children="⛐" />
        <PText {...props} title="U+26D1 | Dec:9937" children="⛑" />
        <PText {...props} title="U+26D2 | Dec:9938" children="⛒" />
        <PText {...props} title="U+26D3 | Dec:9939" children="⛓" />
        <PText {...props} title="U+26D4 | Dec:9940" children="⛔" />
        <PText {...props} title="U+26D5 | Dec:9941" children="⛕" />
        <PText {...props} title="U+26D6 | Dec:9942" children="⛖" />
        <PText {...props} title="U+26D7 | Dec:9943" children="⛗" />
        <PText {...props} title="U+26D8 | Dec:9944" children="⛘" />
        <PText {...props} title="U+26D9 | Dec:9945" children="⛙" />
        <PText {...props} title="U+26DA | Dec:9946" children="⛚" />
        <PText {...props} title="U+26DB | Dec:9947" children="⛛" />
        <PText {...props} title="U+26DC | Dec:9948" children="⛜" />
        <PText {...props} title="U+26DD | Dec:9949" children="⛝" />
        <PText {...props} title="U+26DE | Dec:9950" children="⛞" />
        <PText {...props} title="U+26DF | Dec:9951" children="⛟" />
        <PText {...props} title="U+26E0 | Dec:9952" children="⛠" />
        <PText {...props} title="U+26E1 | Dec:9953" children="⛡" />
        <PText {...props} title="U+26E2 | Dec:9954" children="⛢" />
        <PText {...props} title="U+26E3 | Dec:9955" children="⛣" />
        <PText {...props} title="U+26E4 | Dec:9956" children="⛤" />
        <PText {...props} title="U+26E5 | Dec:9957" children="⛥" />
        <PText {...props} title="U+26E6 | Dec:9958" children="⛦" />
        <PText {...props} title="U+26E7 | Dec:9959" children="⛧" />
        <PText {...props} title="U+26E8 | Dec:9960" children="⛨" />
        <PText {...props} title="U+26E9 | Dec:9961" children="⛩" />
        <PText {...props} title="U+26EA | Dec:9962" children="⛪" />
        <PText {...props} title="U+26EB | Dec:9963" children="⛫" />
        <PText {...props} title="U+26EC | Dec:9964" children="⛬" />
        <PText {...props} title="U+26ED | Dec:9965" children="⛭" />
        <PText {...props} title="U+26EE | Dec:9966" children="⛮" />
        <PText {...props} title="U+26EF | Dec:9967" children="⛯" />
        <PText {...props} title="U+26F0 | Dec:9968" children="⛰" />
        <PText {...props} title="U+26F1 | Dec:9969" children="⛱" />
        <PText {...props} title="U+26F2 | Dec:9970" children="⛲" />
        <PText {...props} title="U+26F3 | Dec:9971" children="⛳" />
        <PText {...props} title="U+26F4 | Dec:9972" children="⛴" />
        <PText {...props} title="U+26F5 | Dec:9973" children="⛵" />
        <PText {...props} title="U+26F6 | Dec:9974" children="⛶" />
        <PText {...props} title="U+26F7 | Dec:9975" children="⛷" />
        <PText {...props} title="U+26F8 | Dec:9976" children="⛸" />
        <PText {...props} title="U+26F9 | Dec:9977" children="⛹" />
        <PText {...props} title="U+26FA | Dec:9978" children="⛺" />
        <PText {...props} title="U+26FB | Dec:9979" children="⛻" />
        <PText {...props} title="U+26FC | Dec:9980" children="⛼" />
        <PText {...props} title="U+26FD | Dec:9981" children="⛽" />
        <PText {...props} title="U+26FE | Dec:9982" children="⛾" />
        <PText {...props} title="U+26FF | Dec:9983" children="⛿" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+FB00-FB4F (Porsche Next "Alphabetic Presentation Forms")</PHeadline>
        <PText {...props} title="U+FB00 | Dec:64256" children="ﬀ" />
        <PText {...props} title="U+FB01 | Dec:64257" children="ﬁ" />
        <PText {...props} title="U+FB02 | Dec:64258" children="ﬂ" />
        <PText {...props} title="U+FB03 | Dec:64259" children="ﬃ" />
        <PText {...props} title="U+FB04 | Dec:64260" children="ﬄ" />
        <PText {...props} title="U+FB05 | Dec:64261" children="ﬅ" />
        <PText {...props} title="U+FB06 | Dec:64262" children="ﬆ" />
        <PText {...props} title="U+FB07 | Dec:64263" children="﬇" />
        <PText {...props} title="U+FB08 | Dec:64264" children="﬈" />
        <PText {...props} title="U+FB09 | Dec:64265" children="﬉" />
        <PText {...props} title="U+FB0A | Dec:64266" children="﬊" />
        <PText {...props} title="U+FB0B | Dec:64267" children="﬋" />
        <PText {...props} title="U+FB0C | Dec:64268" children="﬌" />
        <PText {...props} title="U+FB0D | Dec:64269" children="﬍" />
        <PText {...props} title="U+FB0E | Dec:64270" children="﬎" />
        <PText {...props} title="U+FB0F | Dec:64271" children="﬏" />
        <PText {...props} title="U+FB10 | Dec:64272" children="﬐" />
        <PText {...props} title="U+FB11 | Dec:64273" children="﬑" />
        <PText {...props} title="U+FB12 | Dec:64274" children="﬒" />
        <PText {...props} title="U+FB13 | Dec:64275" children="ﬓ" />
        <PText {...props} title="U+FB14 | Dec:64276" children="ﬔ" />
        <PText {...props} title="U+FB15 | Dec:64277" children="ﬕ" />
        <PText {...props} title="U+FB16 | Dec:64278" children="ﬖ" />
        <PText {...props} title="U+FB17 | Dec:64279" children="ﬗ" />
        <PText {...props} title="U+FB18 | Dec:64280" children="﬘" />
        <PText {...props} title="U+FB19 | Dec:64281" children="﬙" />
        <PText {...props} title="U+FB1A | Dec:64282" children="﬚" />
        <PText {...props} title="U+FB1B | Dec:64283" children="﬛" />
        <PText {...props} title="U+FB1C | Dec:64284" children="﬜" />
        <PText {...props} title="U+FB1D | Dec:64285" children="יִ" />
        <PText {...props} title="U+FB1E | Dec:64286" children="ﬞ" />
        <PText {...props} title="U+FB1F | Dec:64287" children="ײַ" />
        <PText {...props} title="U+FB20 | Dec:64288" children="ﬠ" />
        <PText {...props} title="U+FB21 | Dec:64289" children="ﬡ" />
        <PText {...props} title="U+FB22 | Dec:64290" children="ﬢ" />
        <PText {...props} title="U+FB23 | Dec:64291" children="ﬣ" />
        <PText {...props} title="U+FB24 | Dec:64292" children="ﬤ" />
        <PText {...props} title="U+FB25 | Dec:64293" children="ﬥ" />
        <PText {...props} title="U+FB26 | Dec:64294" children="ﬦ" />
        <PText {...props} title="U+FB27 | Dec:64295" children="ﬧ" />
        <PText {...props} title="U+FB28 | Dec:64296" children="ﬨ" />
        <PText {...props} title="U+FB29 | Dec:64297" children="﬩" />
        <PText {...props} title="U+FB2A | Dec:64298" children="שׁ" />
        <PText {...props} title="U+FB2B | Dec:64299" children="שׂ" />
        <PText {...props} title="U+FB2C | Dec:64300" children="שּׁ" />
        <PText {...props} title="U+FB2D | Dec:64301" children="שּׂ" />
        <PText {...props} title="U+FB2E | Dec:64302" children="אַ" />
        <PText {...props} title="U+FB2F | Dec:64303" children="אָ" />
        <PText {...props} title="U+FB30 | Dec:64304" children="אּ" />
        <PText {...props} title="U+FB31 | Dec:64305" children="בּ" />
        <PText {...props} title="U+FB32 | Dec:64306" children="גּ" />
        <PText {...props} title="U+FB33 | Dec:64307" children="דּ" />
        <PText {...props} title="U+FB34 | Dec:64308" children="הּ" />
        <PText {...props} title="U+FB35 | Dec:64309" children="וּ" />
        <PText {...props} title="U+FB36 | Dec:64310" children="זּ" />
        <PText {...props} title="U+FB37 | Dec:64311" children="﬷" />
        <PText {...props} title="U+FB38 | Dec:64312" children="טּ" />
        <PText {...props} title="U+FB39 | Dec:64313" children="יּ" />
        <PText {...props} title="U+FB3A | Dec:64314" children="ךּ" />
        <PText {...props} title="U+FB3B | Dec:64315" children="כּ" />
        <PText {...props} title="U+FB3C | Dec:64316" children="לּ" />
        <PText {...props} title="U+FB3D | Dec:64317" children="﬽" />
        <PText {...props} title="U+FB3E | Dec:64318" children="מּ" />
        <PText {...props} title="U+FB3F | Dec:64319" children="﬿" />
        <PText {...props} title="U+FB40 | Dec:64320" children="נּ" />
        <PText {...props} title="U+FB41 | Dec:64321" children="סּ" />
        <PText {...props} title="U+FB42 | Dec:64322" children="﭂" />
        <PText {...props} title="U+FB43 | Dec:64323" children="ףּ" />
        <PText {...props} title="U+FB44 | Dec:64324" children="פּ" />
        <PText {...props} title="U+FB45 | Dec:64325" children="﭅" />
        <PText {...props} title="U+FB46 | Dec:64326" children="צּ" />
        <PText {...props} title="U+FB47 | Dec:64327" children="קּ" />
        <PText {...props} title="U+FB48 | Dec:64328" children="רּ" />
        <PText {...props} title="U+FB49 | Dec:64329" children="שּ" />
        <PText {...props} title="U+FB4A | Dec:64330" children="תּ" />
        <PText {...props} title="U+FB4B | Dec:64331" children="וֹ" />
        <PText {...props} title="U+FB4C | Dec:64332" children="בֿ" />
        <PText {...props} title="U+FB4D | Dec:64333" children="כֿ" />
        <PText {...props} title="U+FB4E | Dec:64334" children="פֿ" />
        <PText {...props} title="U+FB4F | Dec:64335" children="ﭏ" />
        <br />
        <br />
        <PHeadline variant="headline-4">Range: U+FE70-FEFF (Porsche Next "Arabic Presentation Forms-B")</PHeadline>
        <PText {...props} title="U+FE70 | Dec:65136" children="ﹰ" />
        <PText {...props} title="U+FE71 | Dec:65137" children="ﹱ" />
        <PText {...props} title="U+FE72 | Dec:65138" children="ﹲ" />
        <PText {...props} title="U+FE73 | Dec:65139" children="ﹳ" />
        <PText {...props} title="U+FE74 | Dec:65140" children="ﹴ" />
        <PText {...props} title="U+FE75 | Dec:65141" children="﹵" />
        <PText {...props} title="U+FE76 | Dec:65142" children="ﹶ" />
        <PText {...props} title="U+FE77 | Dec:65143" children="ﹷ" />
        <PText {...props} title="U+FE78 | Dec:65144" children="ﹸ" />
        <PText {...props} title="U+FE79 | Dec:65145" children="ﹹ" />
        <PText {...props} title="U+FE7A | Dec:65146" children="ﹺ" />
        <PText {...props} title="U+FE7B | Dec:65147" children="ﹻ" />
        <PText {...props} title="U+FE7C | Dec:65148" children="ﹼ" />
        <PText {...props} title="U+FE7D | Dec:65149" children="ﹽ" />
        <PText {...props} title="U+FE7E | Dec:65150" children="ﹾ" />
        <PText {...props} title="U+FE7F | Dec:65151" children="ﹿ" />
        <PText {...props} title="U+FE80 | Dec:65152" children="ﺀ" />
        <PText {...props} title="U+FE81 | Dec:65153" children="ﺁ" />
        <PText {...props} title="U+FE82 | Dec:65154" children="ﺂ" />
        <PText {...props} title="U+FE83 | Dec:65155" children="ﺃ" />
        <PText {...props} title="U+FE84 | Dec:65156" children="ﺄ" />
        <PText {...props} title="U+FE85 | Dec:65157" children="ﺅ" />
        <PText {...props} title="U+FE86 | Dec:65158" children="ﺆ" />
        <PText {...props} title="U+FE87 | Dec:65159" children="ﺇ" />
        <PText {...props} title="U+FE88 | Dec:65160" children="ﺈ" />
        <PText {...props} title="U+FE89 | Dec:65161" children="ﺉ" />
        <PText {...props} title="U+FE8A | Dec:65162" children="ﺊ" />
        <PText {...props} title="U+FE8B | Dec:65163" children="ﺋ" />
        <PText {...props} title="U+FE8C | Dec:65164" children="ﺌ" />
        <PText {...props} title="U+FE8D | Dec:65165" children="ﺍ" />
        <PText {...props} title="U+FE8E | Dec:65166" children="ﺎ" />
        <PText {...props} title="U+FE8F | Dec:65167" children="ﺏ" />
        <PText {...props} title="U+FE90 | Dec:65168" children="ﺐ" />
        <PText {...props} title="U+FE91 | Dec:65169" children="ﺑ" />
        <PText {...props} title="U+FE92 | Dec:65170" children="ﺒ" />
        <PText {...props} title="U+FE93 | Dec:65171" children="ﺓ" />
        <PText {...props} title="U+FE94 | Dec:65172" children="ﺔ" />
        <PText {...props} title="U+FE95 | Dec:65173" children="ﺕ" />
        <PText {...props} title="U+FE96 | Dec:65174" children="ﺖ" />
        <PText {...props} title="U+FE97 | Dec:65175" children="ﺗ" />
        <PText {...props} title="U+FE98 | Dec:65176" children="ﺘ" />
        <PText {...props} title="U+FE99 | Dec:65177" children="ﺙ" />
        <PText {...props} title="U+FE9A | Dec:65178" children="ﺚ" />
        <PText {...props} title="U+FE9B | Dec:65179" children="ﺛ" />
        <PText {...props} title="U+FE9C | Dec:65180" children="ﺜ" />
        <PText {...props} title="U+FE9D | Dec:65181" children="ﺝ" />
        <PText {...props} title="U+FE9E | Dec:65182" children="ﺞ" />
        <PText {...props} title="U+FE9F | Dec:65183" children="ﺟ" />
        <PText {...props} title="U+FEA0 | Dec:65184" children="ﺠ" />
        <PText {...props} title="U+FEA1 | Dec:65185" children="ﺡ" />
        <PText {...props} title="U+FEA2 | Dec:65186" children="ﺢ" />
        <PText {...props} title="U+FEA3 | Dec:65187" children="ﺣ" />
        <PText {...props} title="U+FEA4 | Dec:65188" children="ﺤ" />
        <PText {...props} title="U+FEA5 | Dec:65189" children="ﺥ" />
        <PText {...props} title="U+FEA6 | Dec:65190" children="ﺦ" />
        <PText {...props} title="U+FEA7 | Dec:65191" children="ﺧ" />
        <PText {...props} title="U+FEA8 | Dec:65192" children="ﺨ" />
        <PText {...props} title="U+FEA9 | Dec:65193" children="ﺩ" />
        <PText {...props} title="U+FEAA | Dec:65194" children="ﺪ" />
        <PText {...props} title="U+FEAB | Dec:65195" children="ﺫ" />
        <PText {...props} title="U+FEAC | Dec:65196" children="ﺬ" />
        <PText {...props} title="U+FEAD | Dec:65197" children="ﺭ" />
        <PText {...props} title="U+FEAE | Dec:65198" children="ﺮ" />
        <PText {...props} title="U+FEAF | Dec:65199" children="ﺯ" />
        <PText {...props} title="U+FEB0 | Dec:65200" children="ﺰ" />
        <PText {...props} title="U+FEB1 | Dec:65201" children="ﺱ" />
        <PText {...props} title="U+FEB2 | Dec:65202" children="ﺲ" />
        <PText {...props} title="U+FEB3 | Dec:65203" children="ﺳ" />
        <PText {...props} title="U+FEB4 | Dec:65204" children="ﺴ" />
        <PText {...props} title="U+FEB5 | Dec:65205" children="ﺵ" />
        <PText {...props} title="U+FEB6 | Dec:65206" children="ﺶ" />
        <PText {...props} title="U+FEB7 | Dec:65207" children="ﺷ" />
        <PText {...props} title="U+FEB8 | Dec:65208" children="ﺸ" />
        <PText {...props} title="U+FEB9 | Dec:65209" children="ﺹ" />
        <PText {...props} title="U+FEBA | Dec:65210" children="ﺺ" />
        <PText {...props} title="U+FEBB | Dec:65211" children="ﺻ" />
        <PText {...props} title="U+FEBC | Dec:65212" children="ﺼ" />
        <PText {...props} title="U+FEBD | Dec:65213" children="ﺽ" />
        <PText {...props} title="U+FEBE | Dec:65214" children="ﺾ" />
        <PText {...props} title="U+FEBF | Dec:65215" children="ﺿ" />
        <PText {...props} title="U+FEC0 | Dec:65216" children="ﻀ" />
        <PText {...props} title="U+FEC1 | Dec:65217" children="ﻁ" />
        <PText {...props} title="U+FEC2 | Dec:65218" children="ﻂ" />
        <PText {...props} title="U+FEC3 | Dec:65219" children="ﻃ" />
        <PText {...props} title="U+FEC4 | Dec:65220" children="ﻄ" />
        <PText {...props} title="U+FEC5 | Dec:65221" children="ﻅ" />
        <PText {...props} title="U+FEC6 | Dec:65222" children="ﻆ" />
        <PText {...props} title="U+FEC7 | Dec:65223" children="ﻇ" />
        <PText {...props} title="U+FEC8 | Dec:65224" children="ﻈ" />
        <PText {...props} title="U+FEC9 | Dec:65225" children="ﻉ" />
        <PText {...props} title="U+FECA | Dec:65226" children="ﻊ" />
        <PText {...props} title="U+FECB | Dec:65227" children="ﻋ" />
        <PText {...props} title="U+FECC | Dec:65228" children="ﻌ" />
        <PText {...props} title="U+FECD | Dec:65229" children="ﻍ" />
        <PText {...props} title="U+FECE | Dec:65230" children="ﻎ" />
        <PText {...props} title="U+FECF | Dec:65231" children="ﻏ" />
        <PText {...props} title="U+FED0 | Dec:65232" children="ﻐ" />
        <PText {...props} title="U+FED1 | Dec:65233" children="ﻑ" />
        <PText {...props} title="U+FED2 | Dec:65234" children="ﻒ" />
        <PText {...props} title="U+FED3 | Dec:65235" children="ﻓ" />
        <PText {...props} title="U+FED4 | Dec:65236" children="ﻔ" />
        <PText {...props} title="U+FED5 | Dec:65237" children="ﻕ" />
        <PText {...props} title="U+FED6 | Dec:65238" children="ﻖ" />
        <PText {...props} title="U+FED7 | Dec:65239" children="ﻗ" />
        <PText {...props} title="U+FED8 | Dec:65240" children="ﻘ" />
        <PText {...props} title="U+FED9 | Dec:65241" children="ﻙ" />
        <PText {...props} title="U+FEDA | Dec:65242" children="ﻚ" />
        <PText {...props} title="U+FEDB | Dec:65243" children="ﻛ" />
        <PText {...props} title="U+FEDC | Dec:65244" children="ﻜ" />
        <PText {...props} title="U+FEDD | Dec:65245" children="ﻝ" />
        <PText {...props} title="U+FEDE | Dec:65246" children="ﻞ" />
        <PText {...props} title="U+FEDF | Dec:65247" children="ﻟ" />
        <PText {...props} title="U+FEE0 | Dec:65248" children="ﻠ" />
        <PText {...props} title="U+FEE1 | Dec:65249" children="ﻡ" />
        <PText {...props} title="U+FEE2 | Dec:65250" children="ﻢ" />
        <PText {...props} title="U+FEE3 | Dec:65251" children="ﻣ" />
        <PText {...props} title="U+FEE4 | Dec:65252" children="ﻤ" />
        <PText {...props} title="U+FEE5 | Dec:65253" children="ﻥ" />
        <PText {...props} title="U+FEE6 | Dec:65254" children="ﻦ" />
        <PText {...props} title="U+FEE7 | Dec:65255" children="ﻧ" />
        <PText {...props} title="U+FEE8 | Dec:65256" children="ﻨ" />
        <PText {...props} title="U+FEE9 | Dec:65257" children="ﻩ" />
        <PText {...props} title="U+FEEA | Dec:65258" children="ﻪ" />
        <PText {...props} title="U+FEEB | Dec:65259" children="ﻫ" />
        <PText {...props} title="U+FEEC | Dec:65260" children="ﻬ" />
        <PText {...props} title="U+FEED | Dec:65261" children="ﻭ" />
        <PText {...props} title="U+FEEE | Dec:65262" children="ﻮ" />
        <PText {...props} title="U+FEEF | Dec:65263" children="ﻯ" />
        <PText {...props} title="U+FEF0 | Dec:65264" children="ﻰ" />
        <PText {...props} title="U+FEF1 | Dec:65265" children="ﻱ" />
        <PText {...props} title="U+FEF2 | Dec:65266" children="ﻲ" />
        <PText {...props} title="U+FEF3 | Dec:65267" children="ﻳ" />
        <PText {...props} title="U+FEF4 | Dec:65268" children="ﻴ" />
        <PText {...props} title="U+FEF5 | Dec:65269" children="ﻵ" />
        <PText {...props} title="U+FEF6 | Dec:65270" children="ﻶ" />
        <PText {...props} title="U+FEF7 | Dec:65271" children="ﻷ" />
        <PText {...props} title="U+FEF8 | Dec:65272" children="ﻸ" />
        <PText {...props} title="U+FEF9 | Dec:65273" children="ﻹ" />
        <PText {...props} title="U+FEFA | Dec:65274" children="ﻺ" />
        <PText {...props} title="U+FEFB | Dec:65275" children="ﻻ" />
        <PText {...props} title="U+FEFC | Dec:65276" children="ﻼ" />
        <PText {...props} title="U+FEFD | Dec:65277" children="﻽" />
        <PText {...props} title="U+FEFE | Dec:65278" children="﻾" />
        <PText {...props} title="U+FEFF | Dec:65279" children="&#65279;" />
      </div>

      <div className="playground" title="should show typography in greek and coptic charset">
        <PHeadline>Greek and Coptic</PHeadline>
        <br />
        <PHeadline variant="headline-4">Range: U+0370-03FF (Porsche Next)</PHeadline>
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

      <div className="playground" title="should show typography in cyril charset">
        <PHeadline>Cyril</PHeadline>
        <br />
        <PHeadline variant="headline-4">Range: U+0400-04FF (Porsche Next)</PHeadline>
        <PText {...props} title="U+0400 | Dec:1024" children="Ѐ" />
        <PText {...props} title="U+0401 | Dec:1025" children="Ё" />
        <PText {...props} title="U+0402 | Dec:1026" children="Ђ" />
        <PText {...props} title="U+0403 | Dec:1027" children="Ѓ" />
        <PText {...props} title="U+0404 | Dec:1028" children="Є" />
        <PText {...props} title="U+0405 | Dec:1029" children="Ѕ" />
        <PText {...props} title="U+0406 | Dec:1030" children="І" />
        <PText {...props} title="U+0407 | Dec:1031" children="Ї" />
        <PText {...props} title="U+0408 | Dec:1032" children="Ј" />
        <PText {...props} title="U+0409 | Dec:1033" children="Љ" />
        <PText {...props} title="U+040A | Dec:1034" children="Њ" />
        <PText {...props} title="U+040B | Dec:1035" children="Ћ" />
        <PText {...props} title="U+040C | Dec:1036" children="Ќ" />
        <PText {...props} title="U+040D | Dec:1037" children="Ѝ" />
        <PText {...props} title="U+040E | Dec:1038" children="Ў" />
        <PText {...props} title="U+040F | Dec:1039" children="Џ" />
        <PText {...props} title="U+0410 | Dec:1040" children="А" />
        <PText {...props} title="U+0411 | Dec:1041" children="Б" />
        <PText {...props} title="U+0412 | Dec:1042" children="В" />
        <PText {...props} title="U+0413 | Dec:1043" children="Г" />
        <PText {...props} title="U+0414 | Dec:1044" children="Д" />
        <PText {...props} title="U+0415 | Dec:1045" children="Е" />
        <PText {...props} title="U+0416 | Dec:1046" children="Ж" />
        <PText {...props} title="U+0417 | Dec:1047" children="З" />
        <PText {...props} title="U+0418 | Dec:1048" children="И" />
        <PText {...props} title="U+0419 | Dec:1049" children="Й" />
        <PText {...props} title="U+041A | Dec:1050" children="К" />
        <PText {...props} title="U+041B | Dec:1051" children="Л" />
        <PText {...props} title="U+041C | Dec:1052" children="М" />
        <PText {...props} title="U+041D | Dec:1053" children="Н" />
        <PText {...props} title="U+041E | Dec:1054" children="О" />
        <PText {...props} title="U+041F | Dec:1055" children="П" />
        <PText {...props} title="U+0420 | Dec:1056" children="Р" />
        <PText {...props} title="U+0421 | Dec:1057" children="С" />
        <PText {...props} title="U+0422 | Dec:1058" children="Т" />
        <PText {...props} title="U+0423 | Dec:1059" children="У" />
        <PText {...props} title="U+0424 | Dec:1060" children="Ф" />
        <PText {...props} title="U+0425 | Dec:1061" children="Х" />
        <PText {...props} title="U+0426 | Dec:1062" children="Ц" />
        <PText {...props} title="U+0427 | Dec:1063" children="Ч" />
        <PText {...props} title="U+0428 | Dec:1064" children="Ш" />
        <PText {...props} title="U+0429 | Dec:1065" children="Щ" />
        <PText {...props} title="U+042A | Dec:1066" children="Ъ" />
        <PText {...props} title="U+042B | Dec:1067" children="Ы" />
        <PText {...props} title="U+042C | Dec:1068" children="Ь" />
        <PText {...props} title="U+042D | Dec:1069" children="Э" />
        <PText {...props} title="U+042E | Dec:1070" children="Ю" />
        <PText {...props} title="U+042F | Dec:1071" children="Я" />
        <PText {...props} title="U+0430 | Dec:1072" children="а" />
        <PText {...props} title="U+0431 | Dec:1073" children="б" />
        <PText {...props} title="U+0432 | Dec:1074" children="в" />
        <PText {...props} title="U+0433 | Dec:1075" children="г" />
        <PText {...props} title="U+0434 | Dec:1076" children="д" />
        <PText {...props} title="U+0435 | Dec:1077" children="е" />
        <PText {...props} title="U+0436 | Dec:1078" children="ж" />
        <PText {...props} title="U+0437 | Dec:1079" children="з" />
        <PText {...props} title="U+0438 | Dec:1080" children="и" />
        <PText {...props} title="U+0439 | Dec:1081" children="й" />
        <PText {...props} title="U+043A | Dec:1082" children="к" />
        <PText {...props} title="U+043B | Dec:1083" children="л" />
        <PText {...props} title="U+043C | Dec:1084" children="м" />
        <PText {...props} title="U+043D | Dec:1085" children="н" />
        <PText {...props} title="U+043E | Dec:1086" children="о" />
        <PText {...props} title="U+043F | Dec:1087" children="п" />
        <PText {...props} title="U+0440 | Dec:1088" children="р" />
        <PText {...props} title="U+0441 | Dec:1089" children="с" />
        <PText {...props} title="U+0442 | Dec:1090" children="т" />
        <PText {...props} title="U+0443 | Dec:1091" children="у" />
        <PText {...props} title="U+0444 | Dec:1092" children="ф" />
        <PText {...props} title="U+0445 | Dec:1093" children="х" />
        <PText {...props} title="U+0446 | Dec:1094" children="ц" />
        <PText {...props} title="U+0447 | Dec:1095" children="ч" />
        <PText {...props} title="U+0448 | Dec:1096" children="ш" />
        <PText {...props} title="U+0449 | Dec:1097" children="щ" />
        <PText {...props} title="U+044A | Dec:1098" children="ъ" />
        <PText {...props} title="U+044B | Dec:1099" children="ы" />
        <PText {...props} title="U+044C | Dec:1100" children="ь" />
        <PText {...props} title="U+044D | Dec:1101" children="э" />
        <PText {...props} title="U+044E | Dec:1102" children="ю" />
        <PText {...props} title="U+044F | Dec:1103" children="я" />
        <PText {...props} title="U+0450 | Dec:1104" children="ѐ" />
        <PText {...props} title="U+0451 | Dec:1105" children="ё" />
        <PText {...props} title="U+0452 | Dec:1106" children="ђ" />
        <PText {...props} title="U+0453 | Dec:1107" children="ѓ" />
        <PText {...props} title="U+0454 | Dec:1108" children="є" />
        <PText {...props} title="U+0455 | Dec:1109" children="ѕ" />
        <PText {...props} title="U+0456 | Dec:1110" children="і" />
        <PText {...props} title="U+0457 | Dec:1111" children="ї" />
        <PText {...props} title="U+0458 | Dec:1112" children="ј" />
        <PText {...props} title="U+0459 | Dec:1113" children="љ" />
        <PText {...props} title="U+045A | Dec:1114" children="њ" />
        <PText {...props} title="U+045B | Dec:1115" children="ћ" />
        <PText {...props} title="U+045C | Dec:1116" children="ќ" />
        <PText {...props} title="U+045D | Dec:1117" children="ѝ" />
        <PText {...props} title="U+045E | Dec:1118" children="ў" />
        <PText {...props} title="U+045F | Dec:1119" children="џ" />
        <PText {...props} title="U+0460 | Dec:1120" children="Ѡ" />
        <PText {...props} title="U+0461 | Dec:1121" children="ѡ" />
        <PText {...props} title="U+0462 | Dec:1122" children="Ѣ" />
        <PText {...props} title="U+0463 | Dec:1123" children="ѣ" />
        <PText {...props} title="U+0464 | Dec:1124" children="Ѥ" />
        <PText {...props} title="U+0465 | Dec:1125" children="ѥ" />
        <PText {...props} title="U+0466 | Dec:1126" children="Ѧ" />
        <PText {...props} title="U+0467 | Dec:1127" children="ѧ" />
        <PText {...props} title="U+0468 | Dec:1128" children="Ѩ" />
        <PText {...props} title="U+0469 | Dec:1129" children="ѩ" />
        <PText {...props} title="U+046A | Dec:1130" children="Ѫ" />
        <PText {...props} title="U+046B | Dec:1131" children="ѫ" />
        <PText {...props} title="U+046C | Dec:1132" children="Ѭ" />
        <PText {...props} title="U+046D | Dec:1133" children="ѭ" />
        <PText {...props} title="U+046E | Dec:1134" children="Ѯ" />
        <PText {...props} title="U+046F | Dec:1135" children="ѯ" />
        <PText {...props} title="U+0470 | Dec:1136" children="Ѱ" />
        <PText {...props} title="U+0471 | Dec:1137" children="ѱ" />
        <PText {...props} title="U+0472 | Dec:1138" children="Ѳ" />
        <PText {...props} title="U+0473 | Dec:1139" children="ѳ" />
        <PText {...props} title="U+0474 | Dec:1140" children="Ѵ" />
        <PText {...props} title="U+0475 | Dec:1141" children="ѵ" />
        <PText {...props} title="U+0476 | Dec:1142" children="Ѷ" />
        <PText {...props} title="U+0477 | Dec:1143" children="ѷ" />
        <PText {...props} title="U+0478 | Dec:1144" children="Ѹ" />
        <PText {...props} title="U+0479 | Dec:1145" children="ѹ" />
        <PText {...props} title="U+047A | Dec:1146" children="Ѻ" />
        <PText {...props} title="U+047B | Dec:1147" children="ѻ" />
        <PText {...props} title="U+047C | Dec:1148" children="Ѽ" />
        <PText {...props} title="U+047D | Dec:1149" children="ѽ" />
        <PText {...props} title="U+047E | Dec:1150" children="Ѿ" />
        <PText {...props} title="U+047F | Dec:1151" children="ѿ" />
        <PText {...props} title="U+0480 | Dec:1152" children="Ҁ" />
        <PText {...props} title="U+0481 | Dec:1153" children="ҁ" />
        <PText {...props} title="U+0482 | Dec:1154" children="҂" />
        <PText {...props} title="U+0483 | Dec:1155" children="҃" />
        <PText {...props} title="U+0484 | Dec:1156" children="҄" />
        <PText {...props} title="U+0485 | Dec:1157" children="҅" />
        <PText {...props} title="U+0486 | Dec:1158" children="҆" />
        <PText {...props} title="U+0487 | Dec:1159" children="҇" />
        <PText {...props} title="U+0488 | Dec:1160" children="҈" />
        <PText {...props} title="U+0489 | Dec:1161" children="҉" />
        <PText {...props} title="U+048A | Dec:1162" children="Ҋ" />
        <PText {...props} title="U+048B | Dec:1163" children="ҋ" />
        <PText {...props} title="U+048C | Dec:1164" children="Ҍ" />
        <PText {...props} title="U+048D | Dec:1165" children="ҍ" />
        <PText {...props} title="U+048E | Dec:1166" children="Ҏ" />
        <PText {...props} title="U+048F | Dec:1167" children="ҏ" />
        <PText {...props} title="U+0490 | Dec:1168" children="Ґ" />
        <PText {...props} title="U+0491 | Dec:1169" children="ґ" />
        <PText {...props} title="U+0492 | Dec:1170" children="Ғ" />
        <PText {...props} title="U+0493 | Dec:1171" children="ғ" />
        <PText {...props} title="U+0494 | Dec:1172" children="Ҕ" />
        <PText {...props} title="U+0495 | Dec:1173" children="ҕ" />
        <PText {...props} title="U+0496 | Dec:1174" children="Җ" />
        <PText {...props} title="U+0497 | Dec:1175" children="җ" />
        <PText {...props} title="U+0498 | Dec:1176" children="Ҙ" />
        <PText {...props} title="U+0499 | Dec:1177" children="ҙ" />
        <PText {...props} title="U+049A | Dec:1178" children="Қ" />
        <PText {...props} title="U+049B | Dec:1179" children="қ" />
        <PText {...props} title="U+049C | Dec:1180" children="Ҝ" />
        <PText {...props} title="U+049D | Dec:1181" children="ҝ" />
        <PText {...props} title="U+049E | Dec:1182" children="Ҟ" />
        <PText {...props} title="U+049F | Dec:1183" children="ҟ" />
        <PText {...props} title="U+04A0 | Dec:1184" children="Ҡ" />
        <PText {...props} title="U+04A1 | Dec:1185" children="ҡ" />
        <PText {...props} title="U+04A2 | Dec:1186" children="Ң" />
        <PText {...props} title="U+04A3 | Dec:1187" children="ң" />
        <PText {...props} title="U+04A4 | Dec:1188" children="Ҥ" />
        <PText {...props} title="U+04A5 | Dec:1189" children="ҥ" />
        <PText {...props} title="U+04A6 | Dec:1190" children="Ҧ" />
        <PText {...props} title="U+04A7 | Dec:1191" children="ҧ" />
        <PText {...props} title="U+04A8 | Dec:1192" children="Ҩ" />
        <PText {...props} title="U+04A9 | Dec:1193" children="ҩ" />
        <PText {...props} title="U+04AA | Dec:1194" children="Ҫ" />
        <PText {...props} title="U+04AB | Dec:1195" children="ҫ" />
        <PText {...props} title="U+04AC | Dec:1196" children="Ҭ" />
        <PText {...props} title="U+04AD | Dec:1197" children="ҭ" />
        <PText {...props} title="U+04AE | Dec:1198" children="Ү" />
        <PText {...props} title="U+04AF | Dec:1199" children="ү" />
        <PText {...props} title="U+04B0 | Dec:1200" children="Ұ" />
        <PText {...props} title="U+04B1 | Dec:1201" children="ұ" />
        <PText {...props} title="U+04B2 | Dec:1202" children="Ҳ" />
        <PText {...props} title="U+04B3 | Dec:1203" children="ҳ" />
        <PText {...props} title="U+04B4 | Dec:1204" children="Ҵ" />
        <PText {...props} title="U+04B5 | Dec:1205" children="ҵ" />
        <PText {...props} title="U+04B6 | Dec:1206" children="Ҷ" />
        <PText {...props} title="U+04B7 | Dec:1207" children="ҷ" />
        <PText {...props} title="U+04B8 | Dec:1208" children="Ҹ" />
        <PText {...props} title="U+04B9 | Dec:1209" children="ҹ" />
        <PText {...props} title="U+04BA | Dec:1210" children="Һ" />
        <PText {...props} title="U+04BB | Dec:1211" children="һ" />
        <PText {...props} title="U+04BC | Dec:1212" children="Ҽ" />
        <PText {...props} title="U+04BD | Dec:1213" children="ҽ" />
        <PText {...props} title="U+04BE | Dec:1214" children="Ҿ" />
        <PText {...props} title="U+04BF | Dec:1215" children="ҿ" />
        <PText {...props} title="U+04C0 | Dec:1216" children="Ӏ" />
        <PText {...props} title="U+04C1 | Dec:1217" children="Ӂ" />
        <PText {...props} title="U+04C2 | Dec:1218" children="ӂ" />
        <PText {...props} title="U+04C3 | Dec:1219" children="Ӄ" />
        <PText {...props} title="U+04C4 | Dec:1220" children="ӄ" />
        <PText {...props} title="U+04C5 | Dec:1221" children="Ӆ" />
        <PText {...props} title="U+04C6 | Dec:1222" children="ӆ" />
        <PText {...props} title="U+04C7 | Dec:1223" children="Ӈ" />
        <PText {...props} title="U+04C8 | Dec:1224" children="ӈ" />
        <PText {...props} title="U+04C9 | Dec:1225" children="Ӊ" />
        <PText {...props} title="U+04CA | Dec:1226" children="ӊ" />
        <PText {...props} title="U+04CB | Dec:1227" children="Ӌ" />
        <PText {...props} title="U+04CC | Dec:1228" children="ӌ" />
        <PText {...props} title="U+04CD | Dec:1229" children="Ӎ" />
        <PText {...props} title="U+04CE | Dec:1230" children="ӎ" />
        <PText {...props} title="U+04CF | Dec:1231" children="ӏ" />
        <PText {...props} title="U+04D0 | Dec:1232" children="Ӑ" />
        <PText {...props} title="U+04D1 | Dec:1233" children="ӑ" />
        <PText {...props} title="U+04D2 | Dec:1234" children="Ӓ" />
        <PText {...props} title="U+04D3 | Dec:1235" children="ӓ" />
        <PText {...props} title="U+04D4 | Dec:1236" children="Ӕ" />
        <PText {...props} title="U+04D5 | Dec:1237" children="ӕ" />
        <PText {...props} title="U+04D6 | Dec:1238" children="Ӗ" />
        <PText {...props} title="U+04D7 | Dec:1239" children="ӗ" />
        <PText {...props} title="U+04D8 | Dec:1240" children="Ә" />
        <PText {...props} title="U+04D9 | Dec:1241" children="ә" />
        <PText {...props} title="U+04DA | Dec:1242" children="Ӛ" />
        <PText {...props} title="U+04DB | Dec:1243" children="ӛ" />
        <PText {...props} title="U+04DC | Dec:1244" children="Ӝ" />
        <PText {...props} title="U+04DD | Dec:1245" children="ӝ" />
        <PText {...props} title="U+04DE | Dec:1246" children="Ӟ" />
        <PText {...props} title="U+04DF | Dec:1247" children="ӟ" />
        <PText {...props} title="U+04E0 | Dec:1248" children="Ӡ" />
        <PText {...props} title="U+04E1 | Dec:1249" children="ӡ" />
        <PText {...props} title="U+04E2 | Dec:1250" children="Ӣ" />
        <PText {...props} title="U+04E3 | Dec:1251" children="ӣ" />
        <PText {...props} title="U+04E4 | Dec:1252" children="Ӥ" />
        <PText {...props} title="U+04E5 | Dec:1253" children="ӥ" />
        <PText {...props} title="U+04E6 | Dec:1254" children="Ӧ" />
        <PText {...props} title="U+04E7 | Dec:1255" children="ӧ" />
        <PText {...props} title="U+04E8 | Dec:1256" children="Ө" />
        <PText {...props} title="U+04E9 | Dec:1257" children="ө" />
        <PText {...props} title="U+04EA | Dec:1258" children="Ӫ" />
        <PText {...props} title="U+04EB | Dec:1259" children="ӫ" />
        <PText {...props} title="U+04EC | Dec:1260" children="Ӭ" />
        <PText {...props} title="U+04ED | Dec:1261" children="ӭ" />
        <PText {...props} title="U+04EE | Dec:1262" children="Ӯ" />
        <PText {...props} title="U+04EF | Dec:1263" children="ӯ" />
        <PText {...props} title="U+04F0 | Dec:1264" children="Ӱ" />
        <PText {...props} title="U+04F1 | Dec:1265" children="ӱ" />
        <PText {...props} title="U+04F2 | Dec:1266" children="Ӳ" />
        <PText {...props} title="U+04F3 | Dec:1267" children="ӳ" />
        <PText {...props} title="U+04F4 | Dec:1268" children="Ӵ" />
        <PText {...props} title="U+04F5 | Dec:1269" children="ӵ" />
        <PText {...props} title="U+04F6 | Dec:1270" children="Ӷ" />
        <PText {...props} title="U+04F7 | Dec:1271" children="ӷ" />
        <PText {...props} title="U+04F8 | Dec:1272" children="Ӹ" />
        <PText {...props} title="U+04F9 | Dec:1273" children="ӹ" />
        <PText {...props} title="U+04FA | Dec:1274" children="Ӻ" />
        <PText {...props} title="U+04FB | Dec:1275" children="ӻ" />
        <PText {...props} title="U+04FC | Dec:1276" children="Ӽ" />
        <PText {...props} title="U+04FD | Dec:1277" children="ӽ" />
        <PText {...props} title="U+04FE | Dec:1278" children="Ӿ" />
        <PText {...props} title="U+04FF | Dec:1279" children="ӿ" />
      </div>

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
    </>
  );
};
