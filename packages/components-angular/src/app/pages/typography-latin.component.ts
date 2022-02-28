/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-typography-latin',
  styles: [
    `
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
    `,
  ],
  template: `
    <div class="playground" title="should show typography in basic latin charset">
      <h2>Porsche Next Latin</h2>
      <h4>Range: U+0020-007F ("Basic Latin")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U++0020 | Dec: 32"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0021 | Dec: 33">!</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0022 | Dec: 34">"</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0023 | Dec: 35">#</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0024 | Dec: 36">$</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0025 | Dec: 37">%</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0026 | Dec: 38">&amp;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0027 | Dec: 39">'</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0028 | Dec: 40">(</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0029 | Dec: 41">)</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++002A | Dec: 42">*</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++002B | Dec: 43">+</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++002C | Dec: 44">,</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++002D | Dec: 45">-</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++002E | Dec: 46">.</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++002F | Dec: 47">/</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0030 | Dec: 48">0</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0031 | Dec: 49">1</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0032 | Dec: 50">2</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0033 | Dec: 51">3</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0034 | Dec: 52">4</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0035 | Dec: 53">5</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0036 | Dec: 54">6</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0037 | Dec: 55">7</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0038 | Dec: 56">8</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0039 | Dec: 57">9</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++003A | Dec: 58">:</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++003B | Dec: 59">;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++003C | Dec: 60">&lt;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++003D | Dec: 61">=</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++003E | Dec: 62">&gt;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++003F | Dec: 63">?</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0040 | Dec: 64">@</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0041 | Dec: 65">A</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0042 | Dec: 66">B</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0043 | Dec: 67">C</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0044 | Dec: 68">D</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0045 | Dec: 69">E</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0046 | Dec: 70">F</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0047 | Dec: 71">G</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0048 | Dec: 72">H</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0049 | Dec: 73">I</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++004A | Dec: 74">J</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++004B | Dec: 75">K</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++004C | Dec: 76">L</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++004D | Dec: 77">M</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++004E | Dec: 78">N</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++004F | Dec: 79">O</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0050 | Dec: 80">P</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0051 | Dec: 81">Q</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0052 | Dec: 82">R</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0053 | Dec: 83">S</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0054 | Dec: 84">T</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0055 | Dec: 85">U</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0056 | Dec: 86">V</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0057 | Dec: 87">W</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0058 | Dec: 88">X</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0059 | Dec: 89">Y</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++005A | Dec: 90">Z</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++005B | Dec: 91">[</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++005C | Dec: 92">\\</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++005D | Dec: 93">]</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++005E | Dec: 94">^</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++005F | Dec: 95">_</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0060 | Dec: 96">\`</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0061 | Dec: 97">a</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0062 | Dec: 98">b</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0063 | Dec: 99">c</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0064 | Dec: 100">d</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0065 | Dec: 101">e</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0066 | Dec: 102">f</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0067 | Dec: 103">g</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0068 | Dec: 104">h</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0069 | Dec: 105">i</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++006A | Dec: 106">j</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++006B | Dec: 107">k</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++006C | Dec: 108">l</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++006D | Dec: 109">m</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++006E | Dec: 110">n</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++006F | Dec: 111">o</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0070 | Dec: 112">p</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0071 | Dec: 113">q</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0072 | Dec: 114">r</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0073 | Dec: 115">s</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0074 | Dec: 116">t</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0075 | Dec: 117">u</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0076 | Dec: 118">v</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0077 | Dec: 119">w</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0078 | Dec: 120">x</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++0079 | Dec: 121">y</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++007A | Dec: 122">z</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++007B | Dec: 123">&#123;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++007C | Dec: 124">|</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++007D | Dec: 125">&#125;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++007E | Dec: 126">~</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U++007F | Dec: 127">␡</p-text>

      <h4>Range: U+0080-00FF ("Latin-1 Supplement")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+0080 | Dec: 128"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0081 | Dec: 129"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0082 | Dec: 130"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0083 | Dec: 131"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0084 | Dec: 132"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0085 | Dec: 133"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0086 | Dec: 134"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0087 | Dec: 135"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0088 | Dec: 136"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0089 | Dec: 137"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+008A | Dec: 138"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+008B | Dec: 139"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+008C | Dec: 140"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+008D | Dec: 141"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+008E | Dec: 142"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+008F | Dec: 143"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0090 | Dec: 144"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0091 | Dec: 145"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0092 | Dec: 146"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0093 | Dec: 147"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0094 | Dec: 148"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0095 | Dec: 149"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0096 | Dec: 150"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0097 | Dec: 151"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0098 | Dec: 152"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0099 | Dec: 153"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+009A | Dec: 154"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+009B | Dec: 155"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+009C | Dec: 156"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+009D | Dec: 157"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+009E | Dec: 158"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+009F | Dec: 159"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A0 | Dec: 160">&nbsp;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A1 | Dec: 161">¡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A2 | Dec: 162">¢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A3 | Dec: 163">£</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A4 | Dec: 164">¤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A5 | Dec: 165">¥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A6 | Dec: 166">¦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A7 | Dec: 167">§</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A8 | Dec: 168">¨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00A9 | Dec: 169">©</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00AA | Dec: 170">ª</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00AB | Dec: 171">«</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00AC | Dec: 172">¬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00AD | Dec: 173">&shy;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00AE | Dec: 174">®</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00AF | Dec: 175">¯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B0 | Dec: 176">°</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B1 | Dec: 177">±</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B2 | Dec: 178">²</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B3 | Dec: 179">³</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B4 | Dec: 180">´</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B5 | Dec: 181">µ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B6 | Dec: 182">¶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B7 | Dec: 183">·</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B8 | Dec: 184">¸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00B9 | Dec: 185">¹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00BA | Dec: 186">º</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00BB | Dec: 187">»</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00BC | Dec: 188">¼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00BD | Dec: 189">½</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00BE | Dec: 190">¾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00BF | Dec: 191">¿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C0 | Dec: 192">À</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C1 | Dec: 193">Á</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C2 | Dec: 194">Â</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C3 | Dec: 195">Ã</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C4 | Dec: 196">Ä</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C5 | Dec: 197">Å</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C6 | Dec: 198">Æ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C7 | Dec: 199">Ç</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C8 | Dec: 200">È</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00C9 | Dec: 201">É</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00CA | Dec: 202">Ê</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00CB | Dec: 203">Ë</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00CC | Dec: 204">Ì</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00CD | Dec: 205">Í</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00CE | Dec: 206">Î</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00CF | Dec: 207">Ï</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D0 | Dec: 208">Ð</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D1 | Dec: 209">Ñ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D2 | Dec: 210">Ò</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D3 | Dec: 211">Ó</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D4 | Dec: 212">Ô</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D5 | Dec: 213">Õ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D6 | Dec: 214">Ö</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D7 | Dec: 215">×</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D8 | Dec: 216">Ø</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00D9 | Dec: 217">Ù</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00DA | Dec: 218">Ú</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00DB | Dec: 219">Û</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00DC | Dec: 220">Ü</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00DD | Dec: 221">Ý</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00DE | Dec: 222">Þ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00DF | Dec: 223">ß</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E0 | Dec: 224">à</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E1 | Dec: 225">á</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E2 | Dec: 226">â</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E3 | Dec: 227">ã</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E4 | Dec: 228">ä</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E5 | Dec: 229">å</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E6 | Dec: 230">æ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E7 | Dec: 231">ç</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E8 | Dec: 232">è</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00E9 | Dec: 233">é</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00EA | Dec: 234">ê</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00EB | Dec: 235">ë</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00EC | Dec: 236">ì</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00ED | Dec: 237">í</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00EE | Dec: 238">î</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00EF | Dec: 239">ï</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F0 | Dec: 240">ð</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F1 | Dec: 241">ñ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F2 | Dec: 242">ò</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F3 | Dec: 243">ó</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F4 | Dec: 244">ô</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F5 | Dec: 245">õ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F6 | Dec: 246">ö</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F7 | Dec: 247">÷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F8 | Dec: 248">ø</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00F9 | Dec: 249">ù</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00FA | Dec: 250">ú</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00FB | Dec: 251">û</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00FC | Dec: 252">ü</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00FD | Dec: 253">ý</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00FE | Dec: 254">þ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+00FF | Dec: 255">ÿ</p-text>

      <h4>Range: U+0100-017F ("Latin Extended-A")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+0100 | Dec: 256">Ā</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0101 | Dec: 257">ā</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0102 | Dec: 258">Ă</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0103 | Dec: 259">ă</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0104 | Dec: 260">Ą</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0105 | Dec: 261">ą</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0106 | Dec: 262">Ć</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0107 | Dec: 263">ć</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0108 | Dec: 264">Ĉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0109 | Dec: 265">ĉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+010A | Dec: 266">Ċ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+010B | Dec: 267">ċ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+010C | Dec: 268">Č</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+010D | Dec: 269">č</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+010E | Dec: 270">Ď</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+010F | Dec: 271">ď</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0110 | Dec: 272">Đ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0111 | Dec: 273">đ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0112 | Dec: 274">Ē</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0113 | Dec: 275">ē</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0114 | Dec: 276">Ĕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0115 | Dec: 277">ĕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0116 | Dec: 278">Ė</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0117 | Dec: 279">ė</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0118 | Dec: 280">Ę</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0119 | Dec: 281">ę</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+011A | Dec: 282">Ě</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+011B | Dec: 283">ě</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+011C | Dec: 284">Ĝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+011D | Dec: 285">ĝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+011E | Dec: 286">Ğ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+011F | Dec: 287">ğ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0120 | Dec: 288">Ġ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0121 | Dec: 289">ġ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0122 | Dec: 290">Ģ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0123 | Dec: 291">ģ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0124 | Dec: 292">Ĥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0125 | Dec: 293">ĥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0126 | Dec: 294">Ħ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0127 | Dec: 295">ħ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0128 | Dec: 296">Ĩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0129 | Dec: 297">ĩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+012A | Dec: 298">Ī</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+012B | Dec: 299">ī</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+012C | Dec: 300">Ĭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+012D | Dec: 301">ĭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+012E | Dec: 302">Į</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+012F | Dec: 303">į</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0130 | Dec: 304">İ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0131 | Dec: 305">ı</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0132 | Dec: 306">Ĳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0133 | Dec: 307">ĳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0134 | Dec: 308">Ĵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0135 | Dec: 309">ĵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0136 | Dec: 310">Ķ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0137 | Dec: 311">ķ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0138 | Dec: 312">ĸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0139 | Dec: 313">Ĺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+013A | Dec: 314">ĺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+013B | Dec: 315">Ļ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+013C | Dec: 316">ļ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+013D | Dec: 317">Ľ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+013E | Dec: 318">ľ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+013F | Dec: 319">Ŀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0140 | Dec: 320">ŀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0141 | Dec: 321">Ł</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0142 | Dec: 322">ł</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0143 | Dec: 323">Ń</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0144 | Dec: 324">ń</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0145 | Dec: 325">Ņ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0146 | Dec: 326">ņ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0147 | Dec: 327">Ň</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0148 | Dec: 328">ň</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0149 | Dec: 329">ŉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+014A | Dec: 330">Ŋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+014B | Dec: 331">ŋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+014C | Dec: 332">Ō</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+014D | Dec: 333">ō</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+014E | Dec: 334">Ŏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+014F | Dec: 335">ŏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0150 | Dec: 336">Ő</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0151 | Dec: 337">ő</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0152 | Dec: 338">Œ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0153 | Dec: 339">œ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0154 | Dec: 340">Ŕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0155 | Dec: 341">ŕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0156 | Dec: 342">Ŗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0157 | Dec: 343">ŗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0158 | Dec: 344">Ř</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0159 | Dec: 345">ř</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+015A | Dec: 346">Ś</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+015B | Dec: 347">ś</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+015C | Dec: 348">Ŝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+015D | Dec: 349">ŝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+015E | Dec: 350">Ş</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+015F | Dec: 351">ş</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0160 | Dec: 352">Š</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0161 | Dec: 353">š</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0162 | Dec: 354">Ţ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0163 | Dec: 355">ţ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0164 | Dec: 356">Ť</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0165 | Dec: 357">ť</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0166 | Dec: 358">Ŧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0167 | Dec: 359">ŧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0168 | Dec: 360">Ũ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0169 | Dec: 361">ũ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+016A | Dec: 362">Ū</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+016B | Dec: 363">ū</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+016C | Dec: 364">Ŭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+016D | Dec: 365">ŭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+016E | Dec: 366">Ů</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+016F | Dec: 367">ů</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0170 | Dec: 368">Ű</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0171 | Dec: 369">ű</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0172 | Dec: 370">Ų</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0173 | Dec: 371">ų</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0174 | Dec: 372">Ŵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0175 | Dec: 373">ŵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0176 | Dec: 374">Ŷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0177 | Dec: 375">ŷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0178 | Dec: 376">Ÿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0179 | Dec: 377">Ź</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+017A | Dec: 378">ź</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+017B | Dec: 379">Ż</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+017C | Dec: 380">ż</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+017D | Dec: 381">Ž</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+017E | Dec: 382">ž</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+017F | Dec: 383">ſ</p-text>

      <h4>Range: U+0180-024F ("Latin Extended-B")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+0180 | Dec: 384">ƀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0181 | Dec: 385">Ɓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0182 | Dec: 386">Ƃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0183 | Dec: 387">ƃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0184 | Dec: 388">Ƅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0185 | Dec: 389">ƅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0186 | Dec: 390">Ɔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0187 | Dec: 391">Ƈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0188 | Dec: 392">ƈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0189 | Dec: 393">Ɖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+018A | Dec: 394">Ɗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+018B | Dec: 395">Ƌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+018C | Dec: 396">ƌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+018D | Dec: 397">ƍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+018E | Dec: 398">Ǝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+018F | Dec: 399">Ə</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0190 | Dec: 400">Ɛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0191 | Dec: 401">Ƒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0192 | Dec: 402">ƒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0193 | Dec: 403">Ɠ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0194 | Dec: 404">Ɣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0195 | Dec: 405">ƕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0196 | Dec: 406">Ɩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0197 | Dec: 407">Ɨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0198 | Dec: 408">Ƙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0199 | Dec: 409">ƙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+019A | Dec: 410">ƚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+019B | Dec: 411">ƛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+019C | Dec: 412">Ɯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+019D | Dec: 413">Ɲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+019E | Dec: 414">ƞ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+019F | Dec: 415">Ɵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A0 | Dec: 416">Ơ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A1 | Dec: 417">ơ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A2 | Dec: 418">Ƣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A3 | Dec: 419">ƣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A4 | Dec: 420">Ƥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A5 | Dec: 421">ƥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A6 | Dec: 422">Ʀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A7 | Dec: 423">Ƨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A8 | Dec: 424">ƨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01A9 | Dec: 425">Ʃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01AA | Dec: 426">ƪ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01AB | Dec: 427">ƫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01AC | Dec: 428">Ƭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01AD | Dec: 429">ƭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01AE | Dec: 430">Ʈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01AF | Dec: 431">Ư</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B0 | Dec: 432">ư</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B1 | Dec: 433">Ʊ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B2 | Dec: 434">Ʋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B3 | Dec: 435">Ƴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B4 | Dec: 436">ƴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B5 | Dec: 437">Ƶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B6 | Dec: 438">ƶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B7 | Dec: 439">Ʒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B8 | Dec: 440">Ƹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01B9 | Dec: 441">ƹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01BA | Dec: 442">ƺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01BB | Dec: 443">ƻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01BC | Dec: 444">Ƽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01BD | Dec: 445">ƽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01BE | Dec: 446">ƾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01BF | Dec: 447">ƿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C0 | Dec: 448">ǀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C1 | Dec: 449">ǁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C2 | Dec: 450">ǂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C3 | Dec: 451">ǃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C4 | Dec: 452">Ǆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C5 | Dec: 453">ǅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C6 | Dec: 454">ǆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C7 | Dec: 455">Ǉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C8 | Dec: 456">ǈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01C9 | Dec: 457">ǉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01CA | Dec: 458">Ǌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01CB | Dec: 459">ǋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01CC | Dec: 460">ǌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01CD | Dec: 461">Ǎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01CE | Dec: 462">ǎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01CF | Dec: 463">Ǐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D0 | Dec: 464">ǐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D1 | Dec: 465">Ǒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D2 | Dec: 466">ǒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D3 | Dec: 467">Ǔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D4 | Dec: 468">ǔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D5 | Dec: 469">Ǖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D6 | Dec: 470">ǖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D7 | Dec: 471">Ǘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D8 | Dec: 472">ǘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01D9 | Dec: 473">Ǚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01DA | Dec: 474">ǚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01DB | Dec: 475">Ǜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01DC | Dec: 476">ǜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01DD | Dec: 477">ǝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01DE | Dec: 478">Ǟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01DF | Dec: 479">ǟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E0 | Dec: 480">Ǡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E1 | Dec: 481">ǡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E2 | Dec: 482">Ǣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E3 | Dec: 483">ǣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E4 | Dec: 484">Ǥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E5 | Dec: 485">ǥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E6 | Dec: 486">Ǧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E7 | Dec: 487">ǧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E8 | Dec: 488">Ǩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01E9 | Dec: 489">ǩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01EA | Dec: 490">Ǫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01EB | Dec: 491">ǫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01EC | Dec: 492">Ǭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01ED | Dec: 493">ǭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01EE | Dec: 494">Ǯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01EF | Dec: 495">ǯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F0 | Dec: 496">ǰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F1 | Dec: 497">Ǳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F2 | Dec: 498">ǲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F3 | Dec: 499">ǳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F4 | Dec: 500">Ǵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F5 | Dec: 501">ǵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F6 | Dec: 502">Ƕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F7 | Dec: 503">Ƿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F8 | Dec: 504">Ǹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01F9 | Dec: 505">ǹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01FA | Dec: 506">Ǻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01FB | Dec: 507">ǻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01FC | Dec: 508">Ǽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01FD | Dec: 509">ǽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01FE | Dec: 510">Ǿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+01FF | Dec: 511">ǿ</p-text>

      <h4>Range: U+0250-02AF ("IPA Extensions")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+0250 | Dec:592">ɐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0251 | Dec:593">ɑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0252 | Dec:594">ɒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0253 | Dec:595">ɓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0254 | Dec:596">ɔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0255 | Dec:597">ɕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0256 | Dec:598">ɖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0257 | Dec:599">ɗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0258 | Dec:600">ɘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0259 | Dec:601">ə</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+025A | Dec:602">ɚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+025B | Dec:603">ɛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+025C | Dec:604">ɜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+025D | Dec:605">ɝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+025E | Dec:606">ɞ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+025F | Dec:607">ɟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0260 | Dec:608">ɠ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0261 | Dec:609">ɡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0262 | Dec:610">ɢ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0263 | Dec:611">ɣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0264 | Dec:612">ɤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0265 | Dec:613">ɥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0266 | Dec:614">ɦ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0267 | Dec:615">ɧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0268 | Dec:616">ɨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0269 | Dec:617">ɩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+026A | Dec:618">ɪ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+026B | Dec:619">ɫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+026C | Dec:620">ɬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+026D | Dec:621">ɭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+026E | Dec:622">ɮ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+026F | Dec:623">ɯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0270 | Dec:624">ɰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0271 | Dec:625">ɱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0272 | Dec:626">ɲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0273 | Dec:627">ɳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0274 | Dec:628">ɴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0275 | Dec:629">ɵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0276 | Dec:630">ɶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0277 | Dec:631">ɷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0278 | Dec:632">ɸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0279 | Dec:633">ɹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+027A | Dec:634">ɺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+027B | Dec:635">ɻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+027C | Dec:636">ɼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+027D | Dec:637">ɽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+027E | Dec:638">ɾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+027F | Dec:639">ɿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0280 | Dec:640">ʀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0281 | Dec:641">ʁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0282 | Dec:642">ʂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0283 | Dec:643">ʃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0284 | Dec:644">ʄ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0285 | Dec:645">ʅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0286 | Dec:646">ʆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0287 | Dec:647">ʇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0288 | Dec:648">ʈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0289 | Dec:649">ʉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+028A | Dec:650">ʊ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+028B | Dec:651">ʋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+028C | Dec:652">ʌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+028D | Dec:653">ʍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+028E | Dec:654">ʎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+028F | Dec:655">ʏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0290 | Dec:656">ʐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0291 | Dec:657">ʑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0292 | Dec:658">ʒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0293 | Dec:659">ʓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0294 | Dec:660">ʔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0295 | Dec:661">ʕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0296 | Dec:662">ʖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0297 | Dec:663">ʗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0298 | Dec:664">ʘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0299 | Dec:665">ʙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+029A | Dec:666">ʚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+029B | Dec:667">ʛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+029C | Dec:668">ʜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+029D | Dec:669">ʝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+029E | Dec:670">ʞ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+029F | Dec:671">ʟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A0 | Dec:672">ʠ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A1 | Dec:673">ʡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A2 | Dec:674">ʢ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A3 | Dec:675">ʣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A4 | Dec:676">ʤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A5 | Dec:677">ʥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A6 | Dec:678">ʦ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A7 | Dec:679">ʧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A8 | Dec:680">ʨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02A9 | Dec:681">ʩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02AA | Dec:682">ʪ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02AB | Dec:683">ʫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02AC | Dec:684">ʬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02AD | Dec:685">ʭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02AE | Dec:686">ʮ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02AF | Dec:687">ʯ</p-text>

      <h4>Range: U+02B0-02FF ("Spacing Modifier Letters")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B0 | Dec:688">ʰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B1 | Dec:689">ʱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B2 | Dec:690">ʲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B3 | Dec:691">ʳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B4 | Dec:692">ʴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B5 | Dec:693">ʵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B6 | Dec:694">ʶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B7 | Dec:695">ʷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B8 | Dec:696">ʸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02B9 | Dec:697">ʹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02BA | Dec:698">ʺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02BB | Dec:699">ʻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02BC | Dec:700">ʼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02BD | Dec:701">ʽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02BE | Dec:702">ʾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02BF | Dec:703">ʿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C0 | Dec:704">ˀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C1 | Dec:705">ˁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C2 | Dec:706">˂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C3 | Dec:707">˃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C4 | Dec:708">˄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C5 | Dec:709">˅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C6 | Dec:710">ˆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C7 | Dec:711">ˇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C8 | Dec:712">ˈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02C9 | Dec:713">ˉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02CA | Dec:714">ˊ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02CB | Dec:715">ˋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02CC | Dec:716">ˌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02CD | Dec:717">ˍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02CE | Dec:718">ˎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02CF | Dec:719">ˏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D0 | Dec:720">ː</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D1 | Dec:721">ˑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D2 | Dec:722">˒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D3 | Dec:723">˓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D4 | Dec:724">˔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D5 | Dec:725">˕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D6 | Dec:726">˖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D7 | Dec:727">˗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D8 | Dec:728">˘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02D9 | Dec:729">˙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02DA | Dec:730">˚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02DB | Dec:731">˛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02DC | Dec:732">˜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02DD | Dec:733">˝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02DE | Dec:734">˞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02DF | Dec:735">˟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E0 | Dec:736">ˠ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E1 | Dec:737">ˡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E2 | Dec:738">ˢ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E3 | Dec:739">ˣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E4 | Dec:740">ˤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E5 | Dec:741">˥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E6 | Dec:742">˦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E7 | Dec:743">˧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E8 | Dec:744">˨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02E9 | Dec:745">˩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02EA | Dec:746">˪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02EB | Dec:747">˫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02EC | Dec:748">ˬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02ED | Dec:749">˭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02EE | Dec:750">ˮ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02EF | Dec:751">˯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F0 | Dec:752">˰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F1 | Dec:753">˱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F2 | Dec:754">˲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F3 | Dec:755">˳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F4 | Dec:756">˴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F5 | Dec:757">˵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F6 | Dec:758">˶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F7 | Dec:759">˷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F8 | Dec:760">˸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02F9 | Dec:761">˹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02FA | Dec:762">˺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02FB | Dec:763">˻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02FC | Dec:764">˼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02FD | Dec:765">˽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02FE | Dec:766">˾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+02FF | Dec:767">˿</p-text>

      <h4>Range: U+0300-036F ("Combining Diacritical Marks")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+0300 | Dec:768">̀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0301 | Dec:769">́</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0302 | Dec:770">̂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0303 | Dec:771">̃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0304 | Dec:772">̄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0305 | Dec:773">̅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0306 | Dec:774">̆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0307 | Dec:775">̇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0308 | Dec:776">̈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0309 | Dec:777">̉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+030A | Dec:778">̊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+030B | Dec:779">̋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+030C | Dec:780">̌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+030D | Dec:781">̍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+030E | Dec:782">̎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+030F | Dec:783">̏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0310 | Dec:784">̐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0311 | Dec:785">̑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0312 | Dec:786">̒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0313 | Dec:787">̓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0314 | Dec:788">̔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0315 | Dec:789">̕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0316 | Dec:790">̖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0317 | Dec:791">̗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0318 | Dec:792">̘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0319 | Dec:793">̙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+031A | Dec:794">̚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+031B | Dec:795">̛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+031C | Dec:796">̜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+031D | Dec:797">̝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+031E | Dec:798">̞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+031F | Dec:799">̟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0320 | Dec:800">̠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0321 | Dec:801">̡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0322 | Dec:802">̢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0323 | Dec:803">̣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0324 | Dec:804">̤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0325 | Dec:805">̥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0326 | Dec:806">̦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0327 | Dec:807">̧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0328 | Dec:808">̨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0329 | Dec:809">̩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+032A | Dec:810">̪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+032B | Dec:811">̫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+032C | Dec:812">̬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+032D | Dec:813">̭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+032E | Dec:814">̮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+032F | Dec:815">̯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0330 | Dec:816">̰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0331 | Dec:817">̱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0332 | Dec:818">̲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0333 | Dec:819">̳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0334 | Dec:820">̴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0335 | Dec:821">̵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0336 | Dec:822">̶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0337 | Dec:823">̷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0338 | Dec:824"≯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0339 | Dec:825">̹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+033A | Dec:826">̺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+033B | Dec:827">̻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+033C | Dec:828">̼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+033D | Dec:829">̽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+033E | Dec:830">̾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+033F | Dec:831">̿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0340 | Dec:832">̀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0341 | Dec:833">́</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0342 | Dec:834">͂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0343 | Dec:835">̓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0344 | Dec:836">̈́</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0345 | Dec:837">ͅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0346 | Dec:838">͆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0347 | Dec:839">͇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0348 | Dec:840">͈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0349 | Dec:841">͉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+034A | Dec:842">͊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+034B | Dec:843">͋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+034C | Dec:844">͌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+034D | Dec:845">͍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+034E | Dec:846">͎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+034F | Dec:847">͏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0350 | Dec:848">͐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0351 | Dec:849">͑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0352 | Dec:850">͒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0353 | Dec:851">͓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0354 | Dec:852">͔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0355 | Dec:853">͕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0356 | Dec:854">͖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0357 | Dec:855">͗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0358 | Dec:856">͘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0359 | Dec:857">͙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+035A | Dec:858">͚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+035B | Dec:859">͛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+035C | Dec:860">͜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+035D | Dec:861">͝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+035E | Dec:862">͞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+035F | Dec:863">͟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0360 | Dec:864">͠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0361 | Dec:865">͡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0362 | Dec:866">͢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0363 | Dec:867">ͣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0364 | Dec:868">ͤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0365 | Dec:869">ͥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0366 | Dec:870">ͦ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0367 | Dec:871">ͧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0368 | Dec:872">ͨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0369 | Dec:873">ͩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+036A | Dec:874">ͪ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+036B | Dec:875">ͫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+036C | Dec:876">ͬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+036D | Dec:877">ͭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+036E | Dec:878">ͮ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+036F | Dec:879">ͯ</p-text>

      <h4>Range: U+0E00-0E7F ("Thai")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E00 | Dec:3584">฀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E01 | Dec:3585">ก</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E02 | Dec:3586">ข</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E03 | Dec:3587">ฃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E04 | Dec:3588">ค</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E05 | Dec:3589">ฅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E06 | Dec:3590">ฆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E07 | Dec:3591">ง</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E08 | Dec:3592">จ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E09 | Dec:3593">ฉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E0A | Dec:3594">ช</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E0B | Dec:3595">ซ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E0C | Dec:3596">ฌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E0D | Dec:3597">ญ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E0E | Dec:3598">ฎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E0F | Dec:3599">ฏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E10 | Dec:3600">ฐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E11 | Dec:3601">ฑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E12 | Dec:3602">ฒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E13 | Dec:3603">ณ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E14 | Dec:3604">ด</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E15 | Dec:3605">ต</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E16 | Dec:3606">ถ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E17 | Dec:3607">ท</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E18 | Dec:3608">ธ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E19 | Dec:3609">น</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E1A | Dec:3610">บ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E1B | Dec:3611">ป</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E1C | Dec:3612">ผ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E1D | Dec:3613">ฝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E1E | Dec:3614">พ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E1F | Dec:3615">ฟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E20 | Dec:3616">ภ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E21 | Dec:3617">ม</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E22 | Dec:3618">ย</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E23 | Dec:3619">ร</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E24 | Dec:3620">ฤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E25 | Dec:3621">ล</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E26 | Dec:3622">ฦ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E27 | Dec:3623">ว</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E28 | Dec:3624">ศ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E29 | Dec:3625">ษ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E2A | Dec:3626">ส</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E2B | Dec:3627">ห</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E2C | Dec:3628">ฬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E2D | Dec:3629">อ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E2E | Dec:3630">ฮ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E2F | Dec:3631">ฯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E30 | Dec:3632">ะ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E31 | Dec:3633">ั</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E32 | Dec:3634">า</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E33 | Dec:3635">ำ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E34 | Dec:3636">ิ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E35 | Dec:3637">ี</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E36 | Dec:3638">ึ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E37 | Dec:3639">ื</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E38 | Dec:3640">ุ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E39 | Dec:3641">ู</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E3A | Dec:3642">ฺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E3B | Dec:3643">฻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E3C | Dec:3644">฼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E3D | Dec:3645">฽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E3E | Dec:3646">฾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E3F | Dec:3647">฿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E40 | Dec:3648">เ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E41 | Dec:3649">แ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E42 | Dec:3650">โ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E43 | Dec:3651">ใ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E44 | Dec:3652">ไ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E45 | Dec:3653">ๅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E46 | Dec:3654">ๆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E47 | Dec:3655">็</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E48 | Dec:3656">่</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E49 | Dec:3657">้</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E4A | Dec:3658">๊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E4B | Dec:3659">๋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E4C | Dec:3660">์</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E4D | Dec:3661">ํ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E4E | Dec:3662">๎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E4F | Dec:3663">๏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E50 | Dec:3664">๐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E51 | Dec:3665">๑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E52 | Dec:3666">๒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E53 | Dec:3667">๓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E54 | Dec:3668">๔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E55 | Dec:3669">๕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E56 | Dec:3670">๖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E57 | Dec:3671">๗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E58 | Dec:3672">๘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E59 | Dec:3673">๙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E5A | Dec:3674">๚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E5B | Dec:3675">๛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E5C | Dec:3676">๜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E5D | Dec:3677">๝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E5E | Dec:3678">๞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E5F | Dec:3679">๟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E60 | Dec:3680">๠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E61 | Dec:3681">๡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E62 | Dec:3682">๢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E63 | Dec:3683">๣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E64 | Dec:3684">๤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E65 | Dec:3685">๥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E66 | Dec:3686">๦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E67 | Dec:3687">๧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E68 | Dec:3688">๨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E69 | Dec:3689">๩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E6A | Dec:3690">๪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E6B | Dec:3691">๫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E6C | Dec:3692">๬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E6D | Dec:3693">๭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E6E | Dec:3694">๮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E6F | Dec:3695">๯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E70 | Dec:3696">๰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E71 | Dec:3697">๱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E72 | Dec:3698">๲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E73 | Dec:3699">๳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E74 | Dec:3700">๴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E75 | Dec:3701">๵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E76 | Dec:3702">๶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E77 | Dec:3703">๷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E78 | Dec:3704">๸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E79 | Dec:3705">๹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E7A | Dec:3706">๺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E7B | Dec:3707">๻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E7C | Dec:3708">๼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E7D | Dec:3709">๽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E7E | Dec:3710">๾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+0E7F | Dec:3711">๿</p-text>

      <h4>Range: U+1E00-1EFF ("Latin Extended Additional")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E00 | Dec:7680">Ḁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E01 | Dec:7681">ḁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E02 | Dec:7682">Ḃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E03 | Dec:7683">ḃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E04 | Dec:7684">Ḅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E05 | Dec:7685">ḅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E06 | Dec:7686">Ḇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E07 | Dec:7687">ḇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E08 | Dec:7688">Ḉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E09 | Dec:7689">ḉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E0A | Dec:7690">Ḋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E0B | Dec:7691">ḋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E0C | Dec:7692">Ḍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E0D | Dec:7693">ḍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E0E | Dec:7694">Ḏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E0F | Dec:7695">ḏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E10 | Dec:7696">Ḑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E11 | Dec:7697">ḑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E12 | Dec:7698">Ḓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E13 | Dec:7699">ḓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E14 | Dec:7700">Ḕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E15 | Dec:7701">ḕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E16 | Dec:7702">Ḗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E17 | Dec:7703">ḗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E18 | Dec:7704">Ḙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E19 | Dec:7705">ḙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E1A | Dec:7706">Ḛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E1B | Dec:7707">ḛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E1C | Dec:7708">Ḝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E1D | Dec:7709">ḝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E1E | Dec:7710">Ḟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E1F | Dec:7711">ḟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E20 | Dec:7712">Ḡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E21 | Dec:7713">ḡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E22 | Dec:7714">Ḣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E23 | Dec:7715">ḣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E24 | Dec:7716">Ḥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E25 | Dec:7717">ḥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E26 | Dec:7718">Ḧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E27 | Dec:7719">ḧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E28 | Dec:7720">Ḩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E29 | Dec:7721">ḩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E2A | Dec:7722">Ḫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E2B | Dec:7723">ḫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E2C | Dec:7724">Ḭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E2D | Dec:7725">ḭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E2E | Dec:7726">Ḯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E2F | Dec:7727">ḯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E30 | Dec:7728">Ḱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E31 | Dec:7729">ḱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E32 | Dec:7730">Ḳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E33 | Dec:7731">ḳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E34 | Dec:7732">Ḵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E35 | Dec:7733">ḵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E36 | Dec:7734">Ḷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E37 | Dec:7735">ḷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E38 | Dec:7736">Ḹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E39 | Dec:7737">ḹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E3A | Dec:7738">Ḻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E3B | Dec:7739">ḻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E3C | Dec:7740">Ḽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E3D | Dec:7741">ḽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E3E | Dec:7742">Ḿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E3F | Dec:7743">ḿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E40 | Dec:7744">Ṁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E41 | Dec:7745">ṁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E42 | Dec:7746">Ṃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E43 | Dec:7747">ṃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E44 | Dec:7748">Ṅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E45 | Dec:7749">ṅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E46 | Dec:7750">Ṇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E47 | Dec:7751">ṇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E48 | Dec:7752">Ṉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E49 | Dec:7753">ṉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E4A | Dec:7754">Ṋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E4B | Dec:7755">ṋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E4C | Dec:7756">Ṍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E4D | Dec:7757">ṍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E4E | Dec:7758">Ṏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E4F | Dec:7759">ṏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E50 | Dec:7760">Ṑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E51 | Dec:7761">ṑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E52 | Dec:7762">Ṓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E53 | Dec:7763">ṓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E54 | Dec:7764">Ṕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E55 | Dec:7765">ṕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E56 | Dec:7766">Ṗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E57 | Dec:7767">ṗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E58 | Dec:7768">Ṙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E59 | Dec:7769">ṙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E5A | Dec:7770">Ṛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E5B | Dec:7771">ṛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E5C | Dec:7772">Ṝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E5D | Dec:7773">ṝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E5E | Dec:7774">Ṟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E5F | Dec:7775">ṟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E60 | Dec:7776">Ṡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E61 | Dec:7777">ṡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E62 | Dec:7778">Ṣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E63 | Dec:7779">ṣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E64 | Dec:7780">Ṥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E65 | Dec:7781">ṥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E66 | Dec:7782">Ṧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E67 | Dec:7783">ṧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E68 | Dec:7784">Ṩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E69 | Dec:7785">ṩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E6A | Dec:7786">Ṫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E6B | Dec:7787">ṫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E6C | Dec:7788">Ṭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E6D | Dec:7789">ṭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E6E | Dec:7790">Ṯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E6F | Dec:7791">ṯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E70 | Dec:7792">Ṱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E71 | Dec:7793">ṱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E72 | Dec:7794">Ṳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E73 | Dec:7795">ṳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E74 | Dec:7796">Ṵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E75 | Dec:7797">ṵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E76 | Dec:7798">Ṷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E77 | Dec:7799">ṷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E78 | Dec:7800">Ṹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E79 | Dec:7801">ṹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E7A | Dec:7802">Ṻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E7B | Dec:7803">ṻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E7C | Dec:7804">Ṽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E7D | Dec:7805">ṽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E7E | Dec:7806">Ṿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E7F | Dec:7807">ṿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E80 | Dec:7808">Ẁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E81 | Dec:7809">ẁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E82 | Dec:7810">Ẃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E83 | Dec:7811">ẃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E84 | Dec:7812">Ẅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E85 | Dec:7813">ẅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E86 | Dec:7814">Ẇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E87 | Dec:7815">ẇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E88 | Dec:7816">Ẉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E89 | Dec:7817">ẉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E8A | Dec:7818">Ẋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E8B | Dec:7819">ẋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E8C | Dec:7820">Ẍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E8D | Dec:7821">ẍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E8E | Dec:7822">Ẏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E8F | Dec:7823">ẏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E90 | Dec:7824">Ẑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E91 | Dec:7825">ẑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E92 | Dec:7826">Ẓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E93 | Dec:7827">ẓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E94 | Dec:7828">Ẕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E95 | Dec:7829">ẕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E96 | Dec:7830">ẖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E97 | Dec:7831">ẗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E98 | Dec:7832">ẘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E99 | Dec:7833">ẙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E9A | Dec:7834">ẚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E9B | Dec:7835">ẛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E9C | Dec:7836">ẜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E9D | Dec:7837">ẝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E9E | Dec:7838">ẞ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1E9F | Dec:7839">ẟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA0 | Dec:7840">Ạ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA1 | Dec:7841">ạ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA2 | Dec:7842">Ả</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA3 | Dec:7843">ả</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA4 | Dec:7844">Ấ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA5 | Dec:7845">ấ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA6 | Dec:7846">Ầ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA7 | Dec:7847">ầ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA8 | Dec:7848">Ẩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EA9 | Dec:7849">ẩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EAA | Dec:7850">Ẫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EAB | Dec:7851">ẫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EAC | Dec:7852">Ậ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EAD | Dec:7853">ậ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EAE | Dec:7854">Ắ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EAF | Dec:7855">ắ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB0 | Dec:7856">Ằ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB1 | Dec:7857">ằ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB2 | Dec:7858">Ẳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB3 | Dec:7859">ẳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB4 | Dec:7860">Ẵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB5 | Dec:7861">ẵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB6 | Dec:7862">Ặ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB7 | Dec:7863">ặ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB8 | Dec:7864">Ẹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EB9 | Dec:7865">ẹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EBA | Dec:7866">Ẻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EBB | Dec:7867">ẻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EBC | Dec:7868">Ẽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EBD | Dec:7869">ẽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EBE | Dec:7870">Ế</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EBF | Dec:7871">ế</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC0 | Dec:7872">Ề</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC1 | Dec:7873">ề</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC2 | Dec:7874">Ể</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC3 | Dec:7875">ể</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC4 | Dec:7876">Ễ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC5 | Dec:7877">ễ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC6 | Dec:7878">Ệ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC7 | Dec:7879">ệ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC8 | Dec:7880">Ỉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EC9 | Dec:7881">ỉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ECA | Dec:7882">Ị</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ECB | Dec:7883">ị</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ECC | Dec:7884">Ọ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ECD | Dec:7885">ọ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ECE | Dec:7886">Ỏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ECF | Dec:7887">ỏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED0 | Dec:7888">Ố</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED1 | Dec:7889">ố</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED2 | Dec:7890">Ồ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED3 | Dec:7891">ồ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED4 | Dec:7892">Ổ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED5 | Dec:7893">ổ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED6 | Dec:7894">Ỗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED7 | Dec:7895">ỗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED8 | Dec:7896">Ộ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1ED9 | Dec:7897">ộ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EDA | Dec:7898">Ớ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EDB | Dec:7899">ớ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EDC | Dec:7900">Ờ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EDD | Dec:7901">ờ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EDE | Dec:7902">Ở</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EDF | Dec:7903">ở</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE0 | Dec:7904">Ỡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE1 | Dec:7905">ỡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE2 | Dec:7906">Ợ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE3 | Dec:7907">ợ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE4 | Dec:7908">Ụ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE5 | Dec:7909">ụ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE6 | Dec:7910">Ủ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE7 | Dec:7911">ủ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE8 | Dec:7912">Ứ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EE9 | Dec:7913">ứ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EEA | Dec:7914">Ừ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EEB | Dec:7915">ừ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EEC | Dec:7916">Ử</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EED | Dec:7917">ử</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EEE | Dec:7918">Ữ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EEF | Dec:7919">ữ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF0 | Dec:7920">Ự</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF1 | Dec:7921">ự</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF2 | Dec:7922">Ỳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF3 | Dec:7923">ỳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF4 | Dec:7924">Ỵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF5 | Dec:7925">ỵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF6 | Dec:7926">Ỷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF7 | Dec:7927">ỷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF8 | Dec:7928">Ỹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EF9 | Dec:7929">ỹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EFA | Dec:7930">Ỻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EFB | Dec:7931">ỻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EFC | Dec:7932">Ỽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EFD | Dec:7933">ỽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EFE | Dec:7934">Ỿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+1EFF | Dec:7935">ỿ</p-text>

      <h4>Range: U+2000-206F ("General Punctuation")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+2000 | Dec:8192"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2001 | Dec:8193"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2002 | Dec:8194">&ensp;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2003 | Dec:8195">&emsp;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2004 | Dec:8196"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2005 | Dec:8197"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2006 | Dec:8198"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2007 | Dec:8199"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2008 | Dec:8200"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2009 | Dec:8201">&thinsp;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+200A | Dec:8202">&#8202;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+200B | Dec:8203">&#8203;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+200C | Dec:8204">&zwnj;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+200D | Dec:8205">&zwj;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+200E | Dec:8206">&lrm;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+200F | Dec:8207">&rlm;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2010 | Dec:8208">‐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2011 | Dec:8209">‑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2012 | Dec:8210">‒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2013 | Dec:8211">–</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2014 | Dec:8212">—</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2015 | Dec:8213">―</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2016 | Dec:8214">‖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2017 | Dec:8215">‗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2018 | Dec:8216">‘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2019 | Dec:8217">’</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+201A | Dec:8218">‚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+201B | Dec:8219">‛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+201C | Dec:8220">“</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+201D | Dec:8221">”</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+201E | Dec:8222">„</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+201F | Dec:8223">‟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2020 | Dec:8224">†</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2021 | Dec:8225">‡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2022 | Dec:8226">•</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2023 | Dec:8227">‣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2024 | Dec:8228">․</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2025 | Dec:8229">‥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2026 | Dec:8230">…</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2027 | Dec:8231">‧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2028 | Dec:8232"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2029 | Dec:8233"></p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+202A | Dec:8234">&#8234;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+202B | Dec:8235">&#8235;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+202C | Dec:8236">&#8236;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+202D | Dec:8237">&#8237;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+202E | Dec:8238">&#8238;</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+202F | Dec:8239"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2030 | Dec:8240">‰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2031 | Dec:8241">‱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2032 | Dec:8242">′</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2033 | Dec:8243">″</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2034 | Dec:8244">‴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2035 | Dec:8245">‵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2036 | Dec:8246">‶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2037 | Dec:8247">‷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2038 | Dec:8248">‸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2039 | Dec:8249">‹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+203A | Dec:8250">›</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+203B | Dec:8251">※</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+203C | Dec:8252">‼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+203D | Dec:8253">‽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+203E | Dec:8254">‾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+203F | Dec:8255">‿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2040 | Dec:8256">⁀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2041 | Dec:8257">⁁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2042 | Dec:8258">⁂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2043 | Dec:8259">⁃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2044 | Dec:8260">⁄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2045 | Dec:8261">⁅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2046 | Dec:8262">⁆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2047 | Dec:8263">⁇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2048 | Dec:8264">⁈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2049 | Dec:8265">⁉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+204A | Dec:8266">⁊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+204B | Dec:8267">⁋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+204C | Dec:8268">⁌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+204D | Dec:8269">⁍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+204E | Dec:8270">⁎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+204F | Dec:8271">⁏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2050 | Dec:8272">⁐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2051 | Dec:8273">⁑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2052 | Dec:8274">⁒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2053 | Dec:8275">⁓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2054 | Dec:8276">⁔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2055 | Dec:8277">⁕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2056 | Dec:8278">⁖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2057 | Dec:8279">⁗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2058 | Dec:8280">⁘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2059 | Dec:8281">⁙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+205A | Dec:8282">⁚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+205B | Dec:8283">⁛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+205C | Dec:8284">⁜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+205D | Dec:8285">⁝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+205E | Dec:8286">⁞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+205F | Dec:8287"> </p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2060 | Dec:8288">⁠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2061 | Dec:8289">⁡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2062 | Dec:8290">⁢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2063 | Dec:8291">⁣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2064 | Dec:8292">⁤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2065 | Dec:8293">⁥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2066 | Dec:8294">⁦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2067 | Dec:8295">⁧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2068 | Dec:8296">⁨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2069 | Dec:8297">⁩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+206A | Dec:8298">⁪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+206B | Dec:8299">⁫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+206C | Dec:8300">⁬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+206D | Dec:8301">⁭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+206E | Dec:8302">⁮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+206F | Dec:8303">⁯</p-text>
      <h4>Range: U+2070-209F ("Superscripts and Subscripts")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+2070 | Dec:8304">⁰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2071 | Dec:8305">ⁱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2072 | Dec:8306">⁲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2073 | Dec:8307">⁳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2074 | Dec:8308">⁴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2075 | Dec:8309">⁵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2076 | Dec:8310">⁶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2077 | Dec:8311">⁷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2078 | Dec:8312">⁸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2079 | Dec:8313">⁹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+207A | Dec:8314">⁺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+207B | Dec:8315">⁻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+207C | Dec:8316">⁼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+207D | Dec:8317">⁽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+207E | Dec:8318">⁾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+207F | Dec:8319">ⁿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2080 | Dec:8320">₀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2081 | Dec:8321">₁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2082 | Dec:8322">₂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2083 | Dec:8323">₃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2084 | Dec:8324">₄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2085 | Dec:8325">₅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2086 | Dec:8326">₆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2087 | Dec:8327">₇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2088 | Dec:8328">₈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2089 | Dec:8329">₉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+208A | Dec:8330">₊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+208B | Dec:8331">₋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+208C | Dec:8332">₌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+208D | Dec:8333">₍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+208E | Dec:8334">₎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+208F | Dec:8335">₏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2090 | Dec:8336">ₐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2091 | Dec:8337">ₑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2092 | Dec:8338">ₒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2093 | Dec:8339">ₓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2094 | Dec:8340">ₔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2095 | Dec:8341">ₕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2096 | Dec:8342">ₖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2097 | Dec:8343">ₗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2098 | Dec:8344">ₘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2099 | Dec:8345">ₙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+209A | Dec:8346">ₚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+209B | Dec:8347">ₛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+209C | Dec:8348">ₜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+209D | Dec:8349">₝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+209E | Dec:8350">₞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+209F | Dec:8351">₟</p-text>

      <h4>Range: U+20A0-20CF ("Currency Symbols")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A0 | Dec:8352">₠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A1 | Dec:8353">₡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A2 | Dec:8354">₢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A3 | Dec:8355">₣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A4 | Dec:8356">₤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A5 | Dec:8357">₥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A6 | Dec:8358">₦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A7 | Dec:8359">₧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A8 | Dec:8360">₨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20A9 | Dec:8361">₩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20AA | Dec:8362">₪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20AB | Dec:8363">₫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20AC | Dec:8364">€</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20AD | Dec:8365">₭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20AE | Dec:8366">₮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20AF | Dec:8367">₯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B0 | Dec:8368">₰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B1 | Dec:8369">₱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B2 | Dec:8370">₲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B3 | Dec:8371">₳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B4 | Dec:8372">₴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B5 | Dec:8373">₵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B6 | Dec:8374">₶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B7 | Dec:8375">₷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B8 | Dec:8376">₸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20B9 | Dec:8377">₹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20BA | Dec:8378">₺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20BB | Dec:8379">₻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20BC | Dec:8380">₼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20BD | Dec:8381">₽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20BE | Dec:8382">₾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20BF | Dec:8383">₿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C0 | Dec:8384">⃀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C1 | Dec:8385">⃁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C2 | Dec:8386">⃂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C3 | Dec:8387">⃃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C4 | Dec:8388">⃄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C5 | Dec:8389">⃅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C6 | Dec:8390">⃆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C7 | Dec:8391">⃇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C8 | Dec:8392">⃈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20C9 | Dec:8393">⃉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20CA | Dec:8394">⃊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20CB | Dec:8395">⃋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20CC | Dec:8396">⃌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20CD | Dec:8397">⃍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20CE | Dec:8398">⃎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+20CF | Dec:8399">⃏</p-text>

      <h4>Range: U+2100-214F ("Letterlike Symbols")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+2100 | Dec:8448">℀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2101 | Dec:8449">℁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2102 | Dec:8450">ℂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2103 | Dec:8451">℃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2104 | Dec:8452">℄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2105 | Dec:8453">℅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2106 | Dec:8454">℆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2107 | Dec:8455">ℇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2108 | Dec:8456">℈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2109 | Dec:8457">℉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+210A | Dec:8458">ℊ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+210B | Dec:8459">ℋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+210C | Dec:8460">ℌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+210D | Dec:8461">ℍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+210E | Dec:8462">ℎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+210F | Dec:8463">ℏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2110 | Dec:8464">ℐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2111 | Dec:8465">ℑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2112 | Dec:8466">ℒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2113 | Dec:8467">ℓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2114 | Dec:8468">℔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2115 | Dec:8469">ℕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2116 | Dec:8470">№</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2117 | Dec:8471">℗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2118 | Dec:8472">℘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2119 | Dec:8473">ℙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+211A | Dec:8474">ℚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+211B | Dec:8475">ℛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+211C | Dec:8476">ℜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+211D | Dec:8477">ℝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+211E | Dec:8478">℞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+211F | Dec:8479">℟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2120 | Dec:8480">℠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2121 | Dec:8481">℡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2122 | Dec:8482">™</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2123 | Dec:8483">℣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2124 | Dec:8484">ℤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2125 | Dec:8485">℥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2126 | Dec:8486">Ω</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2127 | Dec:8487">℧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2128 | Dec:8488">ℨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2129 | Dec:8489">℩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+212A | Dec:8490">K</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+212B | Dec:8491">Å</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+212C | Dec:8492">ℬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+212D | Dec:8493">ℭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+212E | Dec:8494">℮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+212F | Dec:8495">ℯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2130 | Dec:8496">ℰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2131 | Dec:8497">ℱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2132 | Dec:8498">Ⅎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2133 | Dec:8499">ℳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2134 | Dec:8500">ℴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2135 | Dec:8501">ℵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2136 | Dec:8502">ℶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2137 | Dec:8503">ℷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2138 | Dec:8504">ℸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2139 | Dec:8505">ℹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+213A | Dec:8506">℺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+213B | Dec:8507">℻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+213C | Dec:8508">ℼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+213D | Dec:8509">ℽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+213E | Dec:8510">ℾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+213F | Dec:8511">ℿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2140 | Dec:8512">⅀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2141 | Dec:8513">⅁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2142 | Dec:8514">⅂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2143 | Dec:8515">⅃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2144 | Dec:8516">⅄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2145 | Dec:8517">ⅅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2146 | Dec:8518">ⅆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2147 | Dec:8519">ⅇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2148 | Dec:8520">ⅈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2149 | Dec:8521">ⅉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+214A | Dec:8522">⅊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+214B | Dec:8523">⅋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+214C | Dec:8524">⅌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+214D | Dec:8525">⅍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+214E | Dec:8526">ⅎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+214F | Dec:8527">⅏</p-text>

      <h4>Range: U+2150-218F ("Number Forms")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+2150 | Dec:8528">⅐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2151 | Dec:8529">⅑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2152 | Dec:8530">⅒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2153 | Dec:8531">⅓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2154 | Dec:8532">⅔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2155 | Dec:8533">⅕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2156 | Dec:8534">⅖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2157 | Dec:8535">⅗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2158 | Dec:8536">⅘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2159 | Dec:8537">⅙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+215A | Dec:8538">⅚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+215B | Dec:8539">⅛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+215C | Dec:8540">⅜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+215D | Dec:8541">⅝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+215E | Dec:8542">⅞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+215F | Dec:8543">⅟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2160 | Dec:8544">Ⅰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2161 | Dec:8545">Ⅱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2162 | Dec:8546">Ⅲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2163 | Dec:8547">Ⅳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2164 | Dec:8548">Ⅴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2165 | Dec:8549">Ⅵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2166 | Dec:8550">Ⅶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2167 | Dec:8551">Ⅷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2168 | Dec:8552">Ⅸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2169 | Dec:8553">Ⅹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+216A | Dec:8554">Ⅺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+216B | Dec:8555">Ⅻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+216C | Dec:8556">Ⅼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+216D | Dec:8557">Ⅽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+216E | Dec:8558">Ⅾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+216F | Dec:8559">Ⅿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2170 | Dec:8560">ⅰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2171 | Dec:8561">ⅱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2172 | Dec:8562">ⅲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2173 | Dec:8563">ⅳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2174 | Dec:8564">ⅴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2175 | Dec:8565">ⅵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2176 | Dec:8566">ⅶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2177 | Dec:8567">ⅷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2178 | Dec:8568">ⅸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2179 | Dec:8569">ⅹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+217A | Dec:8570">ⅺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+217B | Dec:8571">ⅻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+217C | Dec:8572">ⅼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+217D | Dec:8573">ⅽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+217E | Dec:8574">ⅾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+217F | Dec:8575">ⅿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2180 | Dec:8576">ↀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2181 | Dec:8577">ↁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2182 | Dec:8578">ↂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2183 | Dec:8579">Ↄ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2184 | Dec:8580">ↄ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2185 | Dec:8581">ↅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2186 | Dec:8582">ↆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2187 | Dec:8583">ↇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2188 | Dec:8584">ↈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2189 | Dec:8585">↉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+218A | Dec:8586">↊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+218B | Dec:8587">↋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+218C | Dec:8588">↌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+218D | Dec:8589">↍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+218E | Dec:8590">↎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+218F | Dec:8591">↏</p-text>

      <h4>Range: U+2190-21FF ("Arrows")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+2190 | Dec:8592">←</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2191 | Dec:8593">↑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2192 | Dec:8594">→</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2193 | Dec:8595">↓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2194 | Dec:8596">↔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2195 | Dec:8597">↕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2196 | Dec:8598">↖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2197 | Dec:8599">↗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2198 | Dec:8600">↘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2199 | Dec:8601">↙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+219A | Dec:8602">↚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+219B | Dec:8603">↛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+219C | Dec:8604">↜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+219D | Dec:8605">↝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+219E | Dec:8606">↞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+219F | Dec:8607">↟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A0 | Dec:8608">↠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A1 | Dec:8609">↡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A2 | Dec:8610">↢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A3 | Dec:8611">↣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A4 | Dec:8612">↤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A5 | Dec:8613">↥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A6 | Dec:8614">↦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A7 | Dec:8615">↧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A8 | Dec:8616">↨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21A9 | Dec:8617">↩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21AA | Dec:8618">↪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21AB | Dec:8619">↫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21AC | Dec:8620">↬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21AD | Dec:8621">↭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21AE | Dec:8622">↮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21AF | Dec:8623">↯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B0 | Dec:8624">↰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B1 | Dec:8625">↱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B2 | Dec:8626">↲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B3 | Dec:8627">↳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B4 | Dec:8628">↴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B5 | Dec:8629">↵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B6 | Dec:8630">↶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B7 | Dec:8631">↷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B8 | Dec:8632">↸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21B9 | Dec:8633">↹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21BA | Dec:8634">↺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21BB | Dec:8635">↻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21BC | Dec:8636">↼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21BD | Dec:8637">↽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21BE | Dec:8638">↾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21BF | Dec:8639">↿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C0 | Dec:8640">⇀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C1 | Dec:8641">⇁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C2 | Dec:8642">⇂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C3 | Dec:8643">⇃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C4 | Dec:8644">⇄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C5 | Dec:8645">⇅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C6 | Dec:8646">⇆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C7 | Dec:8647">⇇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C8 | Dec:8648">⇈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21C9 | Dec:8649">⇉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21CA | Dec:8650">⇊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21CB | Dec:8651">⇋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21CC | Dec:8652">⇌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21CD | Dec:8653">⇍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21CE | Dec:8654">⇎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21CF | Dec:8655">⇏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D0 | Dec:8656">⇐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D1 | Dec:8657">⇑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D2 | Dec:8658">⇒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D3 | Dec:8659">⇓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D4 | Dec:8660">⇔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D5 | Dec:8661">⇕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D6 | Dec:8662">⇖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D7 | Dec:8663">⇗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D8 | Dec:8664">⇘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21D9 | Dec:8665">⇙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21DA | Dec:8666">⇚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21DB | Dec:8667">⇛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21DC | Dec:8668">⇜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21DD | Dec:8669">⇝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21DE | Dec:8670">⇞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21DF | Dec:8671">⇟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E0 | Dec:8672">⇠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E1 | Dec:8673">⇡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E2 | Dec:8674">⇢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E3 | Dec:8675">⇣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E4 | Dec:8676">⇤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E5 | Dec:8677">⇥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E6 | Dec:8678">⇦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E7 | Dec:8679">⇧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E8 | Dec:8680">⇨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21E9 | Dec:8681">⇩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21EA | Dec:8682">⇪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21EB | Dec:8683">⇫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21EC | Dec:8684">⇬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21ED | Dec:8685">⇭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21EE | Dec:8686">⇮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21EF | Dec:8687">⇯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F0 | Dec:8688">⇰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F1 | Dec:8689">⇱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F2 | Dec:8690">⇲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F3 | Dec:8691">⇳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F4 | Dec:8692">⇴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F5 | Dec:8693">⇵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F6 | Dec:8694">⇶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F7 | Dec:8695">⇷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F8 | Dec:8696">⇸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21F9 | Dec:8697">⇹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21FA | Dec:8698">⇺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21FB | Dec:8699">⇻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21FC | Dec:8700">⇼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21FD | Dec:8701">⇽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21FE | Dec:8702">⇾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+21FF | Dec:8703">⇿</p-text>

      <h4>Range: U+2200-22FF ("Mathematical Operators")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+2200 | Dec:8704">∀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2201 | Dec:8705">∁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2202 | Dec:8706">∂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2203 | Dec:8707">∃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2204 | Dec:8708">∄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2205 | Dec:8709">∅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2206 | Dec:8710">∆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2207 | Dec:8711">∇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2208 | Dec:8712">∈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2209 | Dec:8713">∉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+220A | Dec:8714">∊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+220B | Dec:8715">∋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+220C | Dec:8716">∌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+220D | Dec:8717">∍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+220E | Dec:8718">∎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+220F | Dec:8719">∏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2210 | Dec:8720">∐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2211 | Dec:8721">∑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2212 | Dec:8722">−</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2213 | Dec:8723">∓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2214 | Dec:8724">∔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2215 | Dec:8725">∕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2216 | Dec:8726">∖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2217 | Dec:8727">∗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2218 | Dec:8728">∘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2219 | Dec:8729">∙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+221A | Dec:8730">√</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+221B | Dec:8731">∛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+221C | Dec:8732">∜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+221D | Dec:8733">∝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+221E | Dec:8734">∞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+221F | Dec:8735">∟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2220 | Dec:8736">∠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2221 | Dec:8737">∡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2222 | Dec:8738">∢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2223 | Dec:8739">∣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2224 | Dec:8740">∤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2225 | Dec:8741">∥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2226 | Dec:8742">∦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2227 | Dec:8743">∧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2228 | Dec:8744">∨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2229 | Dec:8745">∩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+222A | Dec:8746">∪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+222B | Dec:8747">∫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+222C | Dec:8748">∬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+222D | Dec:8749">∭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+222E | Dec:8750">∮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+222F | Dec:8751">∯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2230 | Dec:8752">∰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2231 | Dec:8753">∱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2232 | Dec:8754">∲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2233 | Dec:8755">∳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2234 | Dec:8756">∴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2235 | Dec:8757">∵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2236 | Dec:8758">∶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2237 | Dec:8759">∷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2238 | Dec:8760">∸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2239 | Dec:8761">∹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+223A | Dec:8762">∺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+223B | Dec:8763">∻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+223C | Dec:8764">∼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+223D | Dec:8765">∽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+223E | Dec:8766">∾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+223F | Dec:8767">∿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2240 | Dec:8768">≀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2241 | Dec:8769">≁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2242 | Dec:8770">≂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2243 | Dec:8771">≃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2244 | Dec:8772">≄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2245 | Dec:8773">≅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2246 | Dec:8774">≆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2247 | Dec:8775">≇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2248 | Dec:8776">≈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2249 | Dec:8777">≉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+224A | Dec:8778">≊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+224B | Dec:8779">≋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+224C | Dec:8780">≌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+224D | Dec:8781">≍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+224E | Dec:8782">≎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+224F | Dec:8783">≏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2250 | Dec:8784">≐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2251 | Dec:8785">≑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2252 | Dec:8786">≒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2253 | Dec:8787">≓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2254 | Dec:8788">≔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2255 | Dec:8789">≕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2256 | Dec:8790">≖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2257 | Dec:8791">≗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2258 | Dec:8792">≘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2259 | Dec:8793">≙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+225A | Dec:8794">≚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+225B | Dec:8795">≛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+225C | Dec:8796">≜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+225D | Dec:8797">≝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+225E | Dec:8798">≞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+225F | Dec:8799">≟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2260 | Dec:8800">≠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2261 | Dec:8801">≡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2262 | Dec:8802">≢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2263 | Dec:8803">≣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2264 | Dec:8804">≤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2265 | Dec:8805">≥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2266 | Dec:8806">≦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2267 | Dec:8807">≧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2268 | Dec:8808">≨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2269 | Dec:8809">≩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+226A | Dec:8810">≪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+226B | Dec:8811">≫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+226C | Dec:8812">≬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+226D | Dec:8813">≭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+226E | Dec:8814">≮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+226F | Dec:8815">≯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2270 | Dec:8816">≰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2271 | Dec:8817">≱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2272 | Dec:8818">≲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2273 | Dec:8819">≳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2274 | Dec:8820">≴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2275 | Dec:8821">≵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2276 | Dec:8822">≶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2277 | Dec:8823">≷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2278 | Dec:8824">≸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2279 | Dec:8825">≹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+227A | Dec:8826">≺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+227B | Dec:8827">≻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+227C | Dec:8828">≼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+227D | Dec:8829">≽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+227E | Dec:8830">≾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+227F | Dec:8831">≿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2280 | Dec:8832">⊀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2281 | Dec:8833">⊁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2282 | Dec:8834">⊂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2283 | Dec:8835">⊃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2284 | Dec:8836">⊄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2285 | Dec:8837">⊅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2286 | Dec:8838">⊆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2287 | Dec:8839">⊇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2288 | Dec:8840">⊈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2289 | Dec:8841">⊉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+228A | Dec:8842">⊊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+228B | Dec:8843">⊋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+228C | Dec:8844">⊌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+228D | Dec:8845">⊍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+228E | Dec:8846">⊎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+228F | Dec:8847">⊏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2290 | Dec:8848">⊐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2291 | Dec:8849">⊑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2292 | Dec:8850">⊒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2293 | Dec:8851">⊓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2294 | Dec:8852">⊔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2295 | Dec:8853">⊕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2296 | Dec:8854">⊖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2297 | Dec:8855">⊗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2298 | Dec:8856">⊘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2299 | Dec:8857">⊙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+229A | Dec:8858">⊚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+229B | Dec:8859">⊛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+229C | Dec:8860">⊜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+229D | Dec:8861">⊝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+229E | Dec:8862">⊞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+229F | Dec:8863">⊟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A0 | Dec:8864">⊠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A1 | Dec:8865">⊡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A2 | Dec:8866">⊢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A3 | Dec:8867">⊣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A4 | Dec:8868">⊤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A5 | Dec:8869">⊥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A6 | Dec:8870">⊦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A7 | Dec:8871">⊧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A8 | Dec:8872">⊨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22A9 | Dec:8873">⊩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22AA | Dec:8874">⊪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22AB | Dec:8875">⊫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22AC | Dec:8876">⊬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22AD | Dec:8877">⊭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22AE | Dec:8878">⊮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22AF | Dec:8879">⊯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B0 | Dec:8880">⊰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B1 | Dec:8881">⊱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B2 | Dec:8882">⊲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B3 | Dec:8883">⊳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B4 | Dec:8884">⊴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B5 | Dec:8885">⊵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B6 | Dec:8886">⊶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B7 | Dec:8887">⊷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B8 | Dec:8888">⊸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22B9 | Dec:8889">⊹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22BA | Dec:8890">⊺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22BB | Dec:8891">⊻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22BC | Dec:8892">⊼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22BD | Dec:8893">⊽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22BE | Dec:8894">⊾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22BF | Dec:8895">⊿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C0 | Dec:8896">⋀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C1 | Dec:8897">⋁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C2 | Dec:8898">⋂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C3 | Dec:8899">⋃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C4 | Dec:8900">⋄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C5 | Dec:8901">⋅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C6 | Dec:8902">⋆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C7 | Dec:8903">⋇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C8 | Dec:8904">⋈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22C9 | Dec:8905">⋉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22CA | Dec:8906">⋊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22CB | Dec:8907">⋋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22CC | Dec:8908">⋌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22CD | Dec:8909">⋍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22CE | Dec:8910">⋎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22CF | Dec:8911">⋏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D0 | Dec:8912">⋐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D1 | Dec:8913">⋑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D2 | Dec:8914">⋒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D3 | Dec:8915">⋓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D4 | Dec:8916">⋔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D5 | Dec:8917">⋕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D6 | Dec:8918">⋖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D7 | Dec:8919">⋗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D8 | Dec:8920">⋘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22D9 | Dec:8921">⋙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22DA | Dec:8922">⋚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22DB | Dec:8923">⋛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22DC | Dec:8924">⋜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22DD | Dec:8925">⋝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22DE | Dec:8926">⋞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22DF | Dec:8927">⋟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E0 | Dec:8928">⋠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E1 | Dec:8929">⋡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E2 | Dec:8930">⋢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E3 | Dec:8931">⋣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E4 | Dec:8932">⋤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E5 | Dec:8933">⋥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E6 | Dec:8934">⋦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E7 | Dec:8935">⋧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E8 | Dec:8936">⋨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22E9 | Dec:8937">⋩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22EA | Dec:8938">⋪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22EB | Dec:8939">⋫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22EC | Dec:8940">⋬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22ED | Dec:8941">⋭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22EE | Dec:8942">⋮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22EF | Dec:8943">⋯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F0 | Dec:8944">⋰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F1 | Dec:8945">⋱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F2 | Dec:8946">⋲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F3 | Dec:8947">⋳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F4 | Dec:8948">⋴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F5 | Dec:8949">⋵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F6 | Dec:8950">⋶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F7 | Dec:8951">⋷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F8 | Dec:8952">⋸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22F9 | Dec:8953">⋹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22FA | Dec:8954">⋺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22FB | Dec:8955">⋻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22FC | Dec:8956">⋼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22FD | Dec:8957">⋽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22FE | Dec:8958">⋾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+22FF | Dec:8959">⋿</p-text>

      <h4>Range: U+25A0-25FF ("Geometric Shapes")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A0 | Dec:9632">■</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A1 | Dec:9633">□</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A2 | Dec:9634">▢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A3 | Dec:9635">▣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A4 | Dec:9636">▤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A5 | Dec:9637">▥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A6 | Dec:9638">▦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A7 | Dec:9639">▧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A8 | Dec:9640">▨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25A9 | Dec:9641">▩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25AA | Dec:9642">▪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25AB | Dec:9643">▫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25AC | Dec:9644">▬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25AD | Dec:9645">▭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25AE | Dec:9646">▮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25AF | Dec:9647">▯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B0 | Dec:9648">▰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B1 | Dec:9649">▱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B2 | Dec:9650">▲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B3 | Dec:9651">△</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B4 | Dec:9652">▴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B5 | Dec:9653">▵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B6 | Dec:9654">▶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B7 | Dec:9655">▷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B8 | Dec:9656">▸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25B9 | Dec:9657">▹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25BA | Dec:9658">►</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25BB | Dec:9659">▻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25BC | Dec:9660">▼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25BD | Dec:9661">▽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25BE | Dec:9662">▾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25BF | Dec:9663">▿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C0 | Dec:9664">◀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C1 | Dec:9665">◁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C2 | Dec:9666">◂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C3 | Dec:9667">◃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C4 | Dec:9668">◄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C5 | Dec:9669">◅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C6 | Dec:9670">◆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C7 | Dec:9671">◇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C8 | Dec:9672">◈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25C9 | Dec:9673">◉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25CA | Dec:9674">◊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25CB | Dec:9675">○</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25CC | Dec:9676">◌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25CD | Dec:9677">◍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25CE | Dec:9678">◎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25CF | Dec:9679">●</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D0 | Dec:9680">◐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D1 | Dec:9681">◑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D2 | Dec:9682">◒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D3 | Dec:9683">◓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D4 | Dec:9684">◔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D5 | Dec:9685">◕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D6 | Dec:9686">◖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D7 | Dec:9687">◗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D8 | Dec:9688">◘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25D9 | Dec:9689">◙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25DA | Dec:9690">◚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25DB | Dec:9691">◛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25DC | Dec:9692">◜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25DD | Dec:9693">◝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25DE | Dec:9694">◞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25DF | Dec:9695">◟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E0 | Dec:9696">◠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E1 | Dec:9697">◡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E2 | Dec:9698">◢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E3 | Dec:9699">◣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E4 | Dec:9700">◤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E5 | Dec:9701">◥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E6 | Dec:9702">◦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E7 | Dec:9703">◧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E8 | Dec:9704">◨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25E9 | Dec:9705">◩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25EA | Dec:9706">◪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25EB | Dec:9707">◫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25EC | Dec:9708">◬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25ED | Dec:9709">◭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25EE | Dec:9710">◮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25EF | Dec:9711">◯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F0 | Dec:9712">◰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F1 | Dec:9713">◱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F2 | Dec:9714">◲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F3 | Dec:9715">◳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F4 | Dec:9716">◴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F5 | Dec:9717">◵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F6 | Dec:9718">◶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F7 | Dec:9719">◷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F8 | Dec:9720">◸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25F9 | Dec:9721">◹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25FA | Dec:9722">◺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25FB | Dec:9723">◻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25FC | Dec:9724">◼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25FD | Dec:9725">◽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25FE | Dec:9726">◾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+25FF | Dec:9727">◿</p-text>

      <h4>Range: U+2600-26FF ("Miscellaneous Symbols")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+2600 | Dec:9728">☀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2601 | Dec:9729">☁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2602 | Dec:9730">☂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2603 | Dec:9731">☃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2604 | Dec:9732">☄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2605 | Dec:9733">★</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2606 | Dec:9734">☆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2607 | Dec:9735">☇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2608 | Dec:9736">☈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2609 | Dec:9737">☉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+260A | Dec:9738">☊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+260B | Dec:9739">☋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+260C | Dec:9740">☌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+260D | Dec:9741">☍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+260E | Dec:9742">☎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+260F | Dec:9743">☏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2610 | Dec:9744">☐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2611 | Dec:9745">☑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2612 | Dec:9746">☒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2613 | Dec:9747">☓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2614 | Dec:9748">☔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2615 | Dec:9749">☕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2616 | Dec:9750">☖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2617 | Dec:9751">☗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2618 | Dec:9752">☘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2619 | Dec:9753">☙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+261A | Dec:9754">☚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+261B | Dec:9755">☛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+261C | Dec:9756">☜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+261D | Dec:9757">☝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+261E | Dec:9758">☞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+261F | Dec:9759">☟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2620 | Dec:9760">☠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2621 | Dec:9761">☡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2622 | Dec:9762">☢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2623 | Dec:9763">☣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2624 | Dec:9764">☤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2625 | Dec:9765">☥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2626 | Dec:9766">☦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2627 | Dec:9767">☧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2628 | Dec:9768">☨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2629 | Dec:9769">☩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+262A | Dec:9770">☪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+262B | Dec:9771">☫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+262C | Dec:9772">☬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+262D | Dec:9773">☭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+262E | Dec:9774">☮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+262F | Dec:9775">☯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2630 | Dec:9776">☰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2631 | Dec:9777">☱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2632 | Dec:9778">☲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2633 | Dec:9779">☳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2634 | Dec:9780">☴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2635 | Dec:9781">☵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2636 | Dec:9782">☶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2637 | Dec:9783">☷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2638 | Dec:9784">☸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2639 | Dec:9785">☹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+263A | Dec:9786">☺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+263B | Dec:9787">☻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+263C | Dec:9788">☼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+263D | Dec:9789">☽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+263E | Dec:9790">☾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+263F | Dec:9791">☿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2640 | Dec:9792">♀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2641 | Dec:9793">♁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2642 | Dec:9794">♂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2643 | Dec:9795">♃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2644 | Dec:9796">♄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2645 | Dec:9797">♅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2646 | Dec:9798">♆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2647 | Dec:9799">♇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2648 | Dec:9800">♈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2649 | Dec:9801">♉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+264A | Dec:9802">♊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+264B | Dec:9803">♋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+264C | Dec:9804">♌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+264D | Dec:9805">♍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+264E | Dec:9806">♎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+264F | Dec:9807">♏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2650 | Dec:9808">♐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2651 | Dec:9809">♑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2652 | Dec:9810">♒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2653 | Dec:9811">♓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2654 | Dec:9812">♔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2655 | Dec:9813">♕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2656 | Dec:9814">♖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2657 | Dec:9815">♗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2658 | Dec:9816">♘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2659 | Dec:9817">♙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+265A | Dec:9818">♚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+265B | Dec:9819">♛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+265C | Dec:9820">♜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+265D | Dec:9821">♝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+265E | Dec:9822">♞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+265F | Dec:9823">♟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2660 | Dec:9824">♠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2661 | Dec:9825">♡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2662 | Dec:9826">♢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2663 | Dec:9827">♣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2664 | Dec:9828">♤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2665 | Dec:9829">♥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2666 | Dec:9830">♦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2667 | Dec:9831">♧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2668 | Dec:9832">♨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2669 | Dec:9833">♩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+266A | Dec:9834">♪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+266B | Dec:9835">♫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+266C | Dec:9836">♬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+266D | Dec:9837">♭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+266E | Dec:9838">♮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+266F | Dec:9839">♯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2670 | Dec:9840">♰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2671 | Dec:9841">♱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2672 | Dec:9842">♲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2673 | Dec:9843">♳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2674 | Dec:9844">♴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2675 | Dec:9845">♵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2676 | Dec:9846">♶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2677 | Dec:9847">♷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2678 | Dec:9848">♸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2679 | Dec:9849">♹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+267A | Dec:9850">♺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+267B | Dec:9851">♻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+267C | Dec:9852">♼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+267D | Dec:9853">♽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+267E | Dec:9854">♾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+267F | Dec:9855">♿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2680 | Dec:9856">⚀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2681 | Dec:9857">⚁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2682 | Dec:9858">⚂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2683 | Dec:9859">⚃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2684 | Dec:9860">⚄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2685 | Dec:9861">⚅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2686 | Dec:9862">⚆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2687 | Dec:9863">⚇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2688 | Dec:9864">⚈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2689 | Dec:9865">⚉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+268A | Dec:9866">⚊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+268B | Dec:9867">⚋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+268C | Dec:9868">⚌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+268D | Dec:9869">⚍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+268E | Dec:9870">⚎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+268F | Dec:9871">⚏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2690 | Dec:9872">⚐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2691 | Dec:9873">⚑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2692 | Dec:9874">⚒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2693 | Dec:9875">⚓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2694 | Dec:9876">⚔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2695 | Dec:9877">⚕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2696 | Dec:9878">⚖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2697 | Dec:9879">⚗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2698 | Dec:9880">⚘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+2699 | Dec:9881">⚙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+269A | Dec:9882">⚚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+269B | Dec:9883">⚛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+269C | Dec:9884">⚜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+269D | Dec:9885">⚝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+269E | Dec:9886">⚞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+269F | Dec:9887">⚟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A0 | Dec:9888">⚠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A1 | Dec:9889">⚡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A2 | Dec:9890">⚢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A3 | Dec:9891">⚣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A4 | Dec:9892">⚤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A5 | Dec:9893">⚥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A6 | Dec:9894">⚦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A7 | Dec:9895">⚧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A8 | Dec:9896">⚨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26A9 | Dec:9897">⚩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26AA | Dec:9898">⚪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26AB | Dec:9899">⚫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26AC | Dec:9900">⚬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26AD | Dec:9901">⚭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26AE | Dec:9902">⚮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26AF | Dec:9903">⚯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B0 | Dec:9904">⚰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B1 | Dec:9905">⚱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B2 | Dec:9906">⚲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B3 | Dec:9907">⚳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B4 | Dec:9908">⚴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B5 | Dec:9909">⚵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B6 | Dec:9910">⚶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B7 | Dec:9911">⚷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B8 | Dec:9912">⚸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26B9 | Dec:9913">⚹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26BA | Dec:9914">⚺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26BB | Dec:9915">⚻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26BC | Dec:9916">⚼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26BD | Dec:9917">⚽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26BE | Dec:9918">⚾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26BF | Dec:9919">⚿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C0 | Dec:9920">⛀</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C1 | Dec:9921">⛁</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C2 | Dec:9922">⛂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C3 | Dec:9923">⛃</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C4 | Dec:9924">⛄</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C5 | Dec:9925">⛅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C6 | Dec:9926">⛆</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C7 | Dec:9927">⛇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C8 | Dec:9928">⛈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26C9 | Dec:9929">⛉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26CA | Dec:9930">⛊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26CB | Dec:9931">⛋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26CC | Dec:9932">⛌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26CD | Dec:9933">⛍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26CE | Dec:9934">⛎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26CF | Dec:9935">⛏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D0 | Dec:9936">⛐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D1 | Dec:9937">⛑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D2 | Dec:9938">⛒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D3 | Dec:9939">⛓</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D4 | Dec:9940">⛔</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D5 | Dec:9941">⛕</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D6 | Dec:9942">⛖</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D7 | Dec:9943">⛗</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D8 | Dec:9944">⛘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26D9 | Dec:9945">⛙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26DA | Dec:9946">⛚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26DB | Dec:9947">⛛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26DC | Dec:9948">⛜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26DD | Dec:9949">⛝</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26DE | Dec:9950">⛞</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26DF | Dec:9951">⛟</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E0 | Dec:9952">⛠</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E1 | Dec:9953">⛡</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E2 | Dec:9954">⛢</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E3 | Dec:9955">⛣</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E4 | Dec:9956">⛤</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E5 | Dec:9957">⛥</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E6 | Dec:9958">⛦</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E7 | Dec:9959">⛧</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E8 | Dec:9960">⛨</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26E9 | Dec:9961">⛩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26EA | Dec:9962">⛪</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26EB | Dec:9963">⛫</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26EC | Dec:9964">⛬</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26ED | Dec:9965">⛭</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26EE | Dec:9966">⛮</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26EF | Dec:9967">⛯</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F0 | Dec:9968">⛰</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F1 | Dec:9969">⛱</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F2 | Dec:9970">⛲</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F3 | Dec:9971">⛳</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F4 | Dec:9972">⛴</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F5 | Dec:9973">⛵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F6 | Dec:9974">⛶</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F7 | Dec:9975">⛷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F8 | Dec:9976">⛸</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26F9 | Dec:9977">⛹</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26FA | Dec:9978">⛺</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26FB | Dec:9979">⛻</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26FC | Dec:9980">⛼</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26FD | Dec:9981">⛽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26FE | Dec:9982">⛾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+26FF | Dec:9983">⛿</p-text>

      <h4>Range: U+FB00-FB4F ("Alphabetic Presentation Forms")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB00 | Dec:64256">ﬀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB01 | Dec:64257">ﬁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB02 | Dec:64258">ﬂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB03 | Dec:64259">ﬃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB04 | Dec:64260">ﬄ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB05 | Dec:64261">ﬅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB06 | Dec:64262">ﬆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB07 | Dec:64263">﬇</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB08 | Dec:64264">﬈</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB09 | Dec:64265">﬉</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB0A | Dec:64266">﬊</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB0B | Dec:64267">﬋</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB0C | Dec:64268">﬌</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB0D | Dec:64269">﬍</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB0E | Dec:64270">﬎</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB0F | Dec:64271">﬏</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB10 | Dec:64272">﬐</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB11 | Dec:64273">﬑</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB12 | Dec:64274">﬒</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB13 | Dec:64275">ﬓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB14 | Dec:64276">ﬔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB15 | Dec:64277">ﬕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB16 | Dec:64278">ﬖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB17 | Dec:64279">ﬗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB18 | Dec:64280">﬘</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB19 | Dec:64281">﬙</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB1A | Dec:64282">﬚</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB1B | Dec:64283">﬛</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB1C | Dec:64284">﬜</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB1D | Dec:64285">יִ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB1E | Dec:64286">ﬞ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB1F | Dec:64287">ײַ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB20 | Dec:64288">ﬠ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB21 | Dec:64289">ﬡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB22 | Dec:64290">ﬢ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB23 | Dec:64291">ﬣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB24 | Dec:64292">ﬤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB25 | Dec:64293">ﬥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB26 | Dec:64294">ﬦ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB27 | Dec:64295">ﬧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB28 | Dec:64296">ﬨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB29 | Dec:64297">﬩</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB2A | Dec:64298">שׁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB2B | Dec:64299">שׂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB2C | Dec:64300">שּׁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB2D | Dec:64301">שּׂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB2E | Dec:64302">אַ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB2F | Dec:64303">אָ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB30 | Dec:64304">אּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB31 | Dec:64305">בּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB32 | Dec:64306">גּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB33 | Dec:64307">דּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB34 | Dec:64308">הּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB35 | Dec:64309">וּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB36 | Dec:64310">זּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB37 | Dec:64311">﬷</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB38 | Dec:64312">טּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB39 | Dec:64313">יּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB3A | Dec:64314">ךּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB3B | Dec:64315">כּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB3C | Dec:64316">לּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB3D | Dec:64317">﬽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB3E | Dec:64318">מּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB3F | Dec:64319">﬿</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB40 | Dec:64320">נּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB41 | Dec:64321">סּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB42 | Dec:64322">﭂</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB43 | Dec:64323">ףּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB44 | Dec:64324">פּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB45 | Dec:64325">﭅</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB46 | Dec:64326">צּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB47 | Dec:64327">קּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB48 | Dec:64328">רּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB49 | Dec:64329">שּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB4A | Dec:64330">תּ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB4B | Dec:64331">וֹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB4C | Dec:64332">בֿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB4D | Dec:64333">כֿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB4E | Dec:64334">פֿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FB4F | Dec:64335">ﭏ</p-text>

      <h4>Range: U+FE70-FEFF ("Arabic Presentation Forms-B")</h4>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE70 | Dec:65136">ﹰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE71 | Dec:65137">ﹱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE72 | Dec:65138">ﹲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE73 | Dec:65139">ﹳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE74 | Dec:65140">ﹴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE75 | Dec:65141">﹵</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE76 | Dec:65142">ﹶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE77 | Dec:65143">ﹷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE78 | Dec:65144">ﹸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE79 | Dec:65145">ﹹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE7A | Dec:65146">ﹺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE7B | Dec:65147">ﹻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE7C | Dec:65148">ﹼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE7D | Dec:65149">ﹽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE7E | Dec:65150">ﹾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE7F | Dec:65151">ﹿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE80 | Dec:65152">ﺀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE81 | Dec:65153">ﺁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE82 | Dec:65154">ﺂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE83 | Dec:65155">ﺃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE84 | Dec:65156">ﺄ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE85 | Dec:65157">ﺅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE86 | Dec:65158">ﺆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE87 | Dec:65159">ﺇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE88 | Dec:65160">ﺈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE89 | Dec:65161">ﺉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE8A | Dec:65162">ﺊ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE8B | Dec:65163">ﺋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE8C | Dec:65164">ﺌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE8D | Dec:65165">ﺍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE8E | Dec:65166">ﺎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE8F | Dec:65167">ﺏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE90 | Dec:65168">ﺐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE91 | Dec:65169">ﺑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE92 | Dec:65170">ﺒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE93 | Dec:65171">ﺓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE94 | Dec:65172">ﺔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE95 | Dec:65173">ﺕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE96 | Dec:65174">ﺖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE97 | Dec:65175">ﺗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE98 | Dec:65176">ﺘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE99 | Dec:65177">ﺙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE9A | Dec:65178">ﺚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE9B | Dec:65179">ﺛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE9C | Dec:65180">ﺜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE9D | Dec:65181">ﺝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE9E | Dec:65182">ﺞ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FE9F | Dec:65183">ﺟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA0 | Dec:65184">ﺠ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA1 | Dec:65185">ﺡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA2 | Dec:65186">ﺢ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA3 | Dec:65187">ﺣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA4 | Dec:65188">ﺤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA5 | Dec:65189">ﺥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA6 | Dec:65190">ﺦ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA7 | Dec:65191">ﺧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA8 | Dec:65192">ﺨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEA9 | Dec:65193">ﺩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEAA | Dec:65194">ﺪ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEAB | Dec:65195">ﺫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEAC | Dec:65196">ﺬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEAD | Dec:65197">ﺭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEAE | Dec:65198">ﺮ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEAF | Dec:65199">ﺯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB0 | Dec:65200">ﺰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB1 | Dec:65201">ﺱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB2 | Dec:65202">ﺲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB3 | Dec:65203">ﺳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB4 | Dec:65204">ﺴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB5 | Dec:65205">ﺵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB6 | Dec:65206">ﺶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB7 | Dec:65207">ﺷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB8 | Dec:65208">ﺸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEB9 | Dec:65209">ﺹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEBA | Dec:65210">ﺺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEBB | Dec:65211">ﺻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEBC | Dec:65212">ﺼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEBD | Dec:65213">ﺽ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEBE | Dec:65214">ﺾ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEBF | Dec:65215">ﺿ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC0 | Dec:65216">ﻀ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC1 | Dec:65217">ﻁ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC2 | Dec:65218">ﻂ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC3 | Dec:65219">ﻃ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC4 | Dec:65220">ﻄ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC5 | Dec:65221">ﻅ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC6 | Dec:65222">ﻆ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC7 | Dec:65223">ﻇ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC8 | Dec:65224">ﻈ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEC9 | Dec:65225">ﻉ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FECA | Dec:65226">ﻊ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FECB | Dec:65227">ﻋ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FECC | Dec:65228">ﻌ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FECD | Dec:65229">ﻍ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FECE | Dec:65230">ﻎ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FECF | Dec:65231">ﻏ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED0 | Dec:65232">ﻐ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED1 | Dec:65233">ﻑ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED2 | Dec:65234">ﻒ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED3 | Dec:65235">ﻓ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED4 | Dec:65236">ﻔ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED5 | Dec:65237">ﻕ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED6 | Dec:65238">ﻖ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED7 | Dec:65239">ﻗ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED8 | Dec:65240">ﻘ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FED9 | Dec:65241">ﻙ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEDA | Dec:65242">ﻚ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEDB | Dec:65243">ﻛ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEDC | Dec:65244">ﻜ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEDD | Dec:65245">ﻝ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEDE | Dec:65246">ﻞ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEDF | Dec:65247">ﻟ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE0 | Dec:65248">ﻠ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE1 | Dec:65249">ﻡ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE2 | Dec:65250">ﻢ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE3 | Dec:65251">ﻣ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE4 | Dec:65252">ﻤ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE5 | Dec:65253">ﻥ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE6 | Dec:65254">ﻦ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE7 | Dec:65255">ﻧ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE8 | Dec:65256">ﻨ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEE9 | Dec:65257">ﻩ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEEA | Dec:65258">ﻪ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEEB | Dec:65259">ﻫ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEEC | Dec:65260">ﻬ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEED | Dec:65261">ﻭ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEEE | Dec:65262">ﻮ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEEF | Dec:65263">ﻯ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF0 | Dec:65264">ﻰ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF1 | Dec:65265">ﻱ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF2 | Dec:65266">ﻲ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF3 | Dec:65267">ﻳ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF4 | Dec:65268">ﻴ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF5 | Dec:65269">ﻵ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF6 | Dec:65270">ﻶ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF7 | Dec:65271">ﻷ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF8 | Dec:65272">ﻸ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEF9 | Dec:65273">ﻹ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEFA | Dec:65274">ﻺ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEFB | Dec:65275">ﻻ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEFC | Dec:65276">ﻼ</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEFD | Dec:65277">﻽</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEFE | Dec:65278">﻾</p-text>
      <p-text [size]="'medium'" [align]="'center'" title="U+FEFF | Dec:65279">&#65279;</p-text>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyLatinComponent {}
