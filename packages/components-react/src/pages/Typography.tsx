import { PText as Text, PHeadline as Headline } from '@porsche-design-system/components-react';
import React from 'react';

export const TypographyPage = (): JSX.Element => {
  const style = `
    .playground:nth-child(-n+4) p-text {
      display: inline-block !important;
      vertical-align: top;
      margin: 4px;
      padding: 4px;
      background: #f1f1f1;
      width: 36px;
      height: 36px;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground" title="should show typography in basic latin charset">
        <Headline>Latin</Headline>
        <br />
        <Headline variant="headline-4">Range: U+0020-007F (Porsche Next "Basic Latin")</Headline>
        <Text size="medium" align="center" title="U++0020 | Dec: 32"></Text>
        <Text size="medium" align="center" title="U++0021 | Dec: 33">
          !
        </Text>
        <Text size="medium" align="center" title="U++0022 | Dec: 34">
          "
        </Text>
        <Text size="medium" align="center" title="U++0023 | Dec: 35">
          #
        </Text>
        <Text size="medium" align="center" title="U++0024 | Dec: 36">
          $
        </Text>
        <Text size="medium" align="center" title="U++0025 | Dec: 37">
          %
        </Text>
        <Text size="medium" align="center" title="U++0026 | Dec: 38">
          &amp;
        </Text>
        <Text size="medium" align="center" title="U++0027 | Dec: 39">
          '
        </Text>
        <Text size="medium" align="center" title="U++0028 | Dec: 40">
          (
        </Text>
        <Text size="medium" align="center" title="U++0029 | Dec: 41">
          )
        </Text>
        <Text size="medium" align="center" title="U++002A | Dec: 42">
          *
        </Text>
        <Text size="medium" align="center" title="U++002B | Dec: 43">
          +
        </Text>
        <Text size="medium" align="center" title="U++002C | Dec: 44">
          ,
        </Text>
        <Text size="medium" align="center" title="U++002D | Dec: 45">
          -
        </Text>
        <Text size="medium" align="center" title="U++002E | Dec: 46">
          .
        </Text>
        <Text size="medium" align="center" title="U++002F | Dec: 47">
          /
        </Text>
        <Text size="medium" align="center" title="U++0030 | Dec: 48">
          0
        </Text>
        <Text size="medium" align="center" title="U++0031 | Dec: 49">
          1
        </Text>
        <Text size="medium" align="center" title="U++0032 | Dec: 50">
          2
        </Text>
        <Text size="medium" align="center" title="U++0033 | Dec: 51">
          3
        </Text>
        <Text size="medium" align="center" title="U++0034 | Dec: 52">
          4
        </Text>
        <Text size="medium" align="center" title="U++0035 | Dec: 53">
          5
        </Text>
        <Text size="medium" align="center" title="U++0036 | Dec: 54">
          6
        </Text>
        <Text size="medium" align="center" title="U++0037 | Dec: 55">
          7
        </Text>
        <Text size="medium" align="center" title="U++0038 | Dec: 56">
          8
        </Text>
        <Text size="medium" align="center" title="U++0039 | Dec: 57">
          9
        </Text>
        <Text size="medium" align="center" title="U++003A | Dec: 58">
          :
        </Text>
        <Text size="medium" align="center" title="U++003B | Dec: 59">
          ;
        </Text>
        <Text size="medium" align="center" title="U++003C | Dec: 60">
          &lt;
        </Text>
        <Text size="medium" align="center" title="U++003D | Dec: 61">
          =
        </Text>
        <Text size="medium" align="center" title="U++003E | Dec: 62">
          &gt;
        </Text>
        <Text size="medium" align="center" title="U++003F | Dec: 63">
          ?
        </Text>
        <Text size="medium" align="center" title="U++0040 | Dec: 64">
          @
        </Text>
        <Text size="medium" align="center" title="U++0041 | Dec: 65">
          A
        </Text>
        <Text size="medium" align="center" title="U++0042 | Dec: 66">
          B
        </Text>
        <Text size="medium" align="center" title="U++0043 | Dec: 67">
          C
        </Text>
        <Text size="medium" align="center" title="U++0044 | Dec: 68">
          D
        </Text>
        <Text size="medium" align="center" title="U++0045 | Dec: 69">
          E
        </Text>
        <Text size="medium" align="center" title="U++0046 | Dec: 70">
          F
        </Text>
        <Text size="medium" align="center" title="U++0047 | Dec: 71">
          G
        </Text>
        <Text size="medium" align="center" title="U++0048 | Dec: 72">
          H
        </Text>
        <Text size="medium" align="center" title="U++0049 | Dec: 73">
          I
        </Text>
        <Text size="medium" align="center" title="U++004A | Dec: 74">
          J
        </Text>
        <Text size="medium" align="center" title="U++004B | Dec: 75">
          K
        </Text>
        <Text size="medium" align="center" title="U++004C | Dec: 76">
          L
        </Text>
        <Text size="medium" align="center" title="U++004D | Dec: 77">
          M
        </Text>
        <Text size="medium" align="center" title="U++004E | Dec: 78">
          N
        </Text>
        <Text size="medium" align="center" title="U++004F | Dec: 79">
          O
        </Text>
        <Text size="medium" align="center" title="U++0050 | Dec: 80">
          P
        </Text>
        <Text size="medium" align="center" title="U++0051 | Dec: 81">
          Q
        </Text>
        <Text size="medium" align="center" title="U++0052 | Dec: 82">
          R
        </Text>
        <Text size="medium" align="center" title="U++0053 | Dec: 83">
          S
        </Text>
        <Text size="medium" align="center" title="U++0054 | Dec: 84">
          T
        </Text>
        <Text size="medium" align="center" title="U++0055 | Dec: 85">
          U
        </Text>
        <Text size="medium" align="center" title="U++0056 | Dec: 86">
          V
        </Text>
        <Text size="medium" align="center" title="U++0057 | Dec: 87">
          W
        </Text>
        <Text size="medium" align="center" title="U++0058 | Dec: 88">
          X
        </Text>
        <Text size="medium" align="center" title="U++0059 | Dec: 89">
          Y
        </Text>
        <Text size="medium" align="center" title="U++005A | Dec: 90">
          Z
        </Text>
        <Text size="medium" align="center" title="U++005B | Dec: 91">
          [
        </Text>
        <Text size="medium" align="center" title="U++005C | Dec: 92">
          \
        </Text>
        <Text size="medium" align="center" title="U++005D | Dec: 93">
          ]
        </Text>
        <Text size="medium" align="center" title="U++005E | Dec: 94">
          ^
        </Text>
        <Text size="medium" align="center" title="U++005F | Dec: 95">
          _
        </Text>
        <Text size="medium" align="center" title="U++0060 | Dec: 96">
          `
        </Text>
        <Text size="medium" align="center" title="U++0061 | Dec: 97">
          a
        </Text>
        <Text size="medium" align="center" title="U++0062 | Dec: 98">
          b
        </Text>
        <Text size="medium" align="center" title="U++0063 | Dec: 99">
          c
        </Text>
        <Text size="medium" align="center" title="U++0064 | Dec: 100">
          d
        </Text>
        <Text size="medium" align="center" title="U++0065 | Dec: 101">
          e
        </Text>
        <Text size="medium" align="center" title="U++0066 | Dec: 102">
          f
        </Text>
        <Text size="medium" align="center" title="U++0067 | Dec: 103">
          g
        </Text>
        <Text size="medium" align="center" title="U++0068 | Dec: 104">
          h
        </Text>
        <Text size="medium" align="center" title="U++0069 | Dec: 105">
          i
        </Text>
        <Text size="medium" align="center" title="U++006A | Dec: 106">
          j
        </Text>
        <Text size="medium" align="center" title="U++006B | Dec: 107">
          k
        </Text>
        <Text size="medium" align="center" title="U++006C | Dec: 108">
          l
        </Text>
        <Text size="medium" align="center" title="U++006D | Dec: 109">
          m
        </Text>
        <Text size="medium" align="center" title="U++006E | Dec: 110">
          n
        </Text>
        <Text size="medium" align="center" title="U++006F | Dec: 111">
          o
        </Text>
        <Text size="medium" align="center" title="U++0070 | Dec: 112">
          p
        </Text>
        <Text size="medium" align="center" title="U++0071 | Dec: 113">
          q
        </Text>
        <Text size="medium" align="center" title="U++0072 | Dec: 114">
          r
        </Text>
        <Text size="medium" align="center" title="U++0073 | Dec: 115">
          s
        </Text>
        <Text size="medium" align="center" title="U++0074 | Dec: 116">
          t
        </Text>
        <Text size="medium" align="center" title="U++0075 | Dec: 117">
          u
        </Text>
        <Text size="medium" align="center" title="U++0076 | Dec: 118">
          v
        </Text>
        <Text size="medium" align="center" title="U++0077 | Dec: 119">
          w
        </Text>
        <Text size="medium" align="center" title="U++0078 | Dec: 120">
          x
        </Text>
        <Text size="medium" align="center" title="U++0079 | Dec: 121">
          y
        </Text>
        <Text size="medium" align="center" title="U++007A | Dec: 122">
          z
        </Text>
        <Text size="medium" align="center" title="U++007B | Dec: 123">
          &#123;
        </Text>
        <Text size="medium" align="center" title="U++007C | Dec: 124">
          |
        </Text>
        <Text size="medium" align="center" title="U++007D | Dec: 125">
          &#125;
        </Text>
        <Text size="medium" align="center" title="U++007E | Dec: 126">
          ~
        </Text>
        <Text size="medium" align="center" title="U++007F | Dec: 127">
          ␡
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+0080-00FF (Porsche Next "Latin-1 Supplement")</Headline>
        <Text size="medium" align="center" title="U+0080 | Dec: 128">
          
        </Text>
        <Text size="medium" align="center" title="U+0081 | Dec: 129">
          
        </Text>
        <Text size="medium" align="center" title="U+0082 | Dec: 130">
          
        </Text>
        <Text size="medium" align="center" title="U+0083 | Dec: 131">
          
        </Text>
        <Text size="medium" align="center" title="U+0084 | Dec: 132">
          
        </Text>
        <Text size="medium" align="center" title="U+0085 | Dec: 133">
          
        </Text>
        <Text size="medium" align="center" title="U+0086 | Dec: 134">
          
        </Text>
        <Text size="medium" align="center" title="U+0087 | Dec: 135">
          
        </Text>
        <Text size="medium" align="center" title="U+0088 | Dec: 136">
          
        </Text>
        <Text size="medium" align="center" title="U+0089 | Dec: 137">
          
        </Text>
        <Text size="medium" align="center" title="U+008A | Dec: 138">
          
        </Text>
        <Text size="medium" align="center" title="U+008B | Dec: 139">
          
        </Text>
        <Text size="medium" align="center" title="U+008C | Dec: 140">
          
        </Text>
        <Text size="medium" align="center" title="U+008D | Dec: 141">
          
        </Text>
        <Text size="medium" align="center" title="U+008E | Dec: 142">
          
        </Text>
        <Text size="medium" align="center" title="U+008F | Dec: 143">
          
        </Text>
        <Text size="medium" align="center" title="U+0090 | Dec: 144">
          
        </Text>
        <Text size="medium" align="center" title="U+0091 | Dec: 145">
          
        </Text>
        <Text size="medium" align="center" title="U+0092 | Dec: 146">
          
        </Text>
        <Text size="medium" align="center" title="U+0093 | Dec: 147">
          
        </Text>
        <Text size="medium" align="center" title="U+0094 | Dec: 148">
          
        </Text>
        <Text size="medium" align="center" title="U+0095 | Dec: 149">
          
        </Text>
        <Text size="medium" align="center" title="U+0096 | Dec: 150">
          
        </Text>
        <Text size="medium" align="center" title="U+0097 | Dec: 151">
          
        </Text>
        <Text size="medium" align="center" title="U+0098 | Dec: 152">
          
        </Text>
        <Text size="medium" align="center" title="U+0099 | Dec: 153">
          
        </Text>
        <Text size="medium" align="center" title="U+009A | Dec: 154">
          
        </Text>
        <Text size="medium" align="center" title="U+009B | Dec: 155">
          
        </Text>
        <Text size="medium" align="center" title="U+009C | Dec: 156">
          
        </Text>
        <Text size="medium" align="center" title="U+009D | Dec: 157">
          
        </Text>
        <Text size="medium" align="center" title="U+009E | Dec: 158">
          
        </Text>
        <Text size="medium" align="center" title="U+009F | Dec: 159">
          
        </Text>
        <Text size="medium" align="center" title="U+00A0 | Dec: 160">
          &nbsp;
        </Text>
        <Text size="medium" align="center" title="U+00A1 | Dec: 161">
          ¡
        </Text>
        <Text size="medium" align="center" title="U+00A2 | Dec: 162">
          ¢
        </Text>
        <Text size="medium" align="center" title="U+00A3 | Dec: 163">
          £
        </Text>
        <Text size="medium" align="center" title="U+00A4 | Dec: 164">
          ¤
        </Text>
        <Text size="medium" align="center" title="U+00A5 | Dec: 165">
          ¥
        </Text>
        <Text size="medium" align="center" title="U+00A6 | Dec: 166">
          ¦
        </Text>
        <Text size="medium" align="center" title="U+00A7 | Dec: 167">
          §
        </Text>
        <Text size="medium" align="center" title="U+00A8 | Dec: 168">
          ¨
        </Text>
        <Text size="medium" align="center" title="U+00A9 | Dec: 169">
          ©
        </Text>
        <Text size="medium" align="center" title="U+00AA | Dec: 170">
          ª
        </Text>
        <Text size="medium" align="center" title="U+00AB | Dec: 171">
          «
        </Text>
        <Text size="medium" align="center" title="U+00AC | Dec: 172">
          ¬
        </Text>
        <Text size="medium" align="center" title="U+00AD | Dec: 173">
          &shy;
        </Text>
        <Text size="medium" align="center" title="U+00AE | Dec: 174">
          ®
        </Text>
        <Text size="medium" align="center" title="U+00AF | Dec: 175">
          ¯
        </Text>
        <Text size="medium" align="center" title="U+00B0 | Dec: 176">
          °
        </Text>
        <Text size="medium" align="center" title="U+00B1 | Dec: 177">
          ±
        </Text>
        <Text size="medium" align="center" title="U+00B2 | Dec: 178">
          ²
        </Text>
        <Text size="medium" align="center" title="U+00B3 | Dec: 179">
          ³
        </Text>
        <Text size="medium" align="center" title="U+00B4 | Dec: 180">
          ´
        </Text>
        <Text size="medium" align="center" title="U+00B5 | Dec: 181">
          µ
        </Text>
        <Text size="medium" align="center" title="U+00B6 | Dec: 182">
          ¶
        </Text>
        <Text size="medium" align="center" title="U+00B7 | Dec: 183">
          ·
        </Text>
        <Text size="medium" align="center" title="U+00B8 | Dec: 184">
          ¸
        </Text>
        <Text size="medium" align="center" title="U+00B9 | Dec: 185">
          ¹
        </Text>
        <Text size="medium" align="center" title="U+00BA | Dec: 186">
          º
        </Text>
        <Text size="medium" align="center" title="U+00BB | Dec: 187">
          »
        </Text>
        <Text size="medium" align="center" title="U+00BC | Dec: 188">
          ¼
        </Text>
        <Text size="medium" align="center" title="U+00BD | Dec: 189">
          ½
        </Text>
        <Text size="medium" align="center" title="U+00BE | Dec: 190">
          ¾
        </Text>
        <Text size="medium" align="center" title="U+00BF | Dec: 191">
          ¿
        </Text>
        <Text size="medium" align="center" title="U+00C0 | Dec: 192">
          À
        </Text>
        <Text size="medium" align="center" title="U+00C1 | Dec: 193">
          Á
        </Text>
        <Text size="medium" align="center" title="U+00C2 | Dec: 194">
          Â
        </Text>
        <Text size="medium" align="center" title="U+00C3 | Dec: 195">
          Ã
        </Text>
        <Text size="medium" align="center" title="U+00C4 | Dec: 196">
          Ä
        </Text>
        <Text size="medium" align="center" title="U+00C5 | Dec: 197">
          Å
        </Text>
        <Text size="medium" align="center" title="U+00C6 | Dec: 198">
          Æ
        </Text>
        <Text size="medium" align="center" title="U+00C7 | Dec: 199">
          Ç
        </Text>
        <Text size="medium" align="center" title="U+00C8 | Dec: 200">
          È
        </Text>
        <Text size="medium" align="center" title="U+00C9 | Dec: 201">
          É
        </Text>
        <Text size="medium" align="center" title="U+00CA | Dec: 202">
          Ê
        </Text>
        <Text size="medium" align="center" title="U+00CB | Dec: 203">
          Ë
        </Text>
        <Text size="medium" align="center" title="U+00CC | Dec: 204">
          Ì
        </Text>
        <Text size="medium" align="center" title="U+00CD | Dec: 205">
          Í
        </Text>
        <Text size="medium" align="center" title="U+00CE | Dec: 206">
          Î
        </Text>
        <Text size="medium" align="center" title="U+00CF | Dec: 207">
          Ï
        </Text>
        <Text size="medium" align="center" title="U+00D0 | Dec: 208">
          Ð
        </Text>
        <Text size="medium" align="center" title="U+00D1 | Dec: 209">
          Ñ
        </Text>
        <Text size="medium" align="center" title="U+00D2 | Dec: 210">
          Ò
        </Text>
        <Text size="medium" align="center" title="U+00D3 | Dec: 211">
          Ó
        </Text>
        <Text size="medium" align="center" title="U+00D4 | Dec: 212">
          Ô
        </Text>
        <Text size="medium" align="center" title="U+00D5 | Dec: 213">
          Õ
        </Text>
        <Text size="medium" align="center" title="U+00D6 | Dec: 214">
          Ö
        </Text>
        <Text size="medium" align="center" title="U+00D7 | Dec: 215">
          ×
        </Text>
        <Text size="medium" align="center" title="U+00D8 | Dec: 216">
          Ø
        </Text>
        <Text size="medium" align="center" title="U+00D9 | Dec: 217">
          Ù
        </Text>
        <Text size="medium" align="center" title="U+00DA | Dec: 218">
          Ú
        </Text>
        <Text size="medium" align="center" title="U+00DB | Dec: 219">
          Û
        </Text>
        <Text size="medium" align="center" title="U+00DC | Dec: 220">
          Ü
        </Text>
        <Text size="medium" align="center" title="U+00DD | Dec: 221">
          Ý
        </Text>
        <Text size="medium" align="center" title="U+00DE | Dec: 222">
          Þ
        </Text>
        <Text size="medium" align="center" title="U+00DF | Dec: 223">
          ß
        </Text>
        <Text size="medium" align="center" title="U+00E0 | Dec: 224">
          à
        </Text>
        <Text size="medium" align="center" title="U+00E1 | Dec: 225">
          á
        </Text>
        <Text size="medium" align="center" title="U+00E2 | Dec: 226">
          â
        </Text>
        <Text size="medium" align="center" title="U+00E3 | Dec: 227">
          ã
        </Text>
        <Text size="medium" align="center" title="U+00E4 | Dec: 228">
          ä
        </Text>
        <Text size="medium" align="center" title="U+00E5 | Dec: 229">
          å
        </Text>
        <Text size="medium" align="center" title="U+00E6 | Dec: 230">
          æ
        </Text>
        <Text size="medium" align="center" title="U+00E7 | Dec: 231">
          ç
        </Text>
        <Text size="medium" align="center" title="U+00E8 | Dec: 232">
          è
        </Text>
        <Text size="medium" align="center" title="U+00E9 | Dec: 233">
          é
        </Text>
        <Text size="medium" align="center" title="U+00EA | Dec: 234">
          ê
        </Text>
        <Text size="medium" align="center" title="U+00EB | Dec: 235">
          ë
        </Text>
        <Text size="medium" align="center" title="U+00EC | Dec: 236">
          ì
        </Text>
        <Text size="medium" align="center" title="U+00ED | Dec: 237">
          í
        </Text>
        <Text size="medium" align="center" title="U+00EE | Dec: 238">
          î
        </Text>
        <Text size="medium" align="center" title="U+00EF | Dec: 239">
          ï
        </Text>
        <Text size="medium" align="center" title="U+00F0 | Dec: 240">
          ð
        </Text>
        <Text size="medium" align="center" title="U+00F1 | Dec: 241">
          ñ
        </Text>
        <Text size="medium" align="center" title="U+00F2 | Dec: 242">
          ò
        </Text>
        <Text size="medium" align="center" title="U+00F3 | Dec: 243">
          ó
        </Text>
        <Text size="medium" align="center" title="U+00F4 | Dec: 244">
          ô
        </Text>
        <Text size="medium" align="center" title="U+00F5 | Dec: 245">
          õ
        </Text>
        <Text size="medium" align="center" title="U+00F6 | Dec: 246">
          ö
        </Text>
        <Text size="medium" align="center" title="U+00F7 | Dec: 247">
          ÷
        </Text>
        <Text size="medium" align="center" title="U+00F8 | Dec: 248">
          ø
        </Text>
        <Text size="medium" align="center" title="U+00F9 | Dec: 249">
          ù
        </Text>
        <Text size="medium" align="center" title="U+00FA | Dec: 250">
          ú
        </Text>
        <Text size="medium" align="center" title="U+00FB | Dec: 251">
          û
        </Text>
        <Text size="medium" align="center" title="U+00FC | Dec: 252">
          ü
        </Text>
        <Text size="medium" align="center" title="U+00FD | Dec: 253">
          ý
        </Text>
        <Text size="medium" align="center" title="U+00FE | Dec: 254">
          þ
        </Text>
        <Text size="medium" align="center" title="U+00FF | Dec: 255">
          ÿ
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+0100-017F (Porsche Next "Latin Extended-A")</Headline>
        <Text size="medium" align="center" title="U+0100 | Dec: 256">
          Ā
        </Text>
        <Text size="medium" align="center" title="U+0101 | Dec: 257">
          ā
        </Text>
        <Text size="medium" align="center" title="U+0102 | Dec: 258">
          Ă
        </Text>
        <Text size="medium" align="center" title="U+0103 | Dec: 259">
          ă
        </Text>
        <Text size="medium" align="center" title="U+0104 | Dec: 260">
          Ą
        </Text>
        <Text size="medium" align="center" title="U+0105 | Dec: 261">
          ą
        </Text>
        <Text size="medium" align="center" title="U+0106 | Dec: 262">
          Ć
        </Text>
        <Text size="medium" align="center" title="U+0107 | Dec: 263">
          ć
        </Text>
        <Text size="medium" align="center" title="U+0108 | Dec: 264">
          Ĉ
        </Text>
        <Text size="medium" align="center" title="U+0109 | Dec: 265">
          ĉ
        </Text>
        <Text size="medium" align="center" title="U+010A | Dec: 266">
          Ċ
        </Text>
        <Text size="medium" align="center" title="U+010B | Dec: 267">
          ċ
        </Text>
        <Text size="medium" align="center" title="U+010C | Dec: 268">
          Č
        </Text>
        <Text size="medium" align="center" title="U+010D | Dec: 269">
          č
        </Text>
        <Text size="medium" align="center" title="U+010E | Dec: 270">
          Ď
        </Text>
        <Text size="medium" align="center" title="U+010F | Dec: 271">
          ď
        </Text>
        <Text size="medium" align="center" title="U+0110 | Dec: 272">
          Đ
        </Text>
        <Text size="medium" align="center" title="U+0111 | Dec: 273">
          đ
        </Text>
        <Text size="medium" align="center" title="U+0112 | Dec: 274">
          Ē
        </Text>
        <Text size="medium" align="center" title="U+0113 | Dec: 275">
          ē
        </Text>
        <Text size="medium" align="center" title="U+0114 | Dec: 276">
          Ĕ
        </Text>
        <Text size="medium" align="center" title="U+0115 | Dec: 277">
          ĕ
        </Text>
        <Text size="medium" align="center" title="U+0116 | Dec: 278">
          Ė
        </Text>
        <Text size="medium" align="center" title="U+0117 | Dec: 279">
          ė
        </Text>
        <Text size="medium" align="center" title="U+0118 | Dec: 280">
          Ę
        </Text>
        <Text size="medium" align="center" title="U+0119 | Dec: 281">
          ę
        </Text>
        <Text size="medium" align="center" title="U+011A | Dec: 282">
          Ě
        </Text>
        <Text size="medium" align="center" title="U+011B | Dec: 283">
          ě
        </Text>
        <Text size="medium" align="center" title="U+011C | Dec: 284">
          Ĝ
        </Text>
        <Text size="medium" align="center" title="U+011D | Dec: 285">
          ĝ
        </Text>
        <Text size="medium" align="center" title="U+011E | Dec: 286">
          Ğ
        </Text>
        <Text size="medium" align="center" title="U+011F | Dec: 287">
          ğ
        </Text>
        <Text size="medium" align="center" title="U+0120 | Dec: 288">
          Ġ
        </Text>
        <Text size="medium" align="center" title="U+0121 | Dec: 289">
          ġ
        </Text>
        <Text size="medium" align="center" title="U+0122 | Dec: 290">
          Ģ
        </Text>
        <Text size="medium" align="center" title="U+0123 | Dec: 291">
          ģ
        </Text>
        <Text size="medium" align="center" title="U+0124 | Dec: 292">
          Ĥ
        </Text>
        <Text size="medium" align="center" title="U+0125 | Dec: 293">
          ĥ
        </Text>
        <Text size="medium" align="center" title="U+0126 | Dec: 294">
          Ħ
        </Text>
        <Text size="medium" align="center" title="U+0127 | Dec: 295">
          ħ
        </Text>
        <Text size="medium" align="center" title="U+0128 | Dec: 296">
          Ĩ
        </Text>
        <Text size="medium" align="center" title="U+0129 | Dec: 297">
          ĩ
        </Text>
        <Text size="medium" align="center" title="U+012A | Dec: 298">
          Ī
        </Text>
        <Text size="medium" align="center" title="U+012B | Dec: 299">
          ī
        </Text>
        <Text size="medium" align="center" title="U+012C | Dec: 300">
          Ĭ
        </Text>
        <Text size="medium" align="center" title="U+012D | Dec: 301">
          ĭ
        </Text>
        <Text size="medium" align="center" title="U+012E | Dec: 302">
          Į
        </Text>
        <Text size="medium" align="center" title="U+012F | Dec: 303">
          į
        </Text>
        <Text size="medium" align="center" title="U+0130 | Dec: 304">
          İ
        </Text>
        <Text size="medium" align="center" title="U+0131 | Dec: 305">
          ı
        </Text>
        <Text size="medium" align="center" title="U+0132 | Dec: 306">
          Ĳ
        </Text>
        <Text size="medium" align="center" title="U+0133 | Dec: 307">
          ĳ
        </Text>
        <Text size="medium" align="center" title="U+0134 | Dec: 308">
          Ĵ
        </Text>
        <Text size="medium" align="center" title="U+0135 | Dec: 309">
          ĵ
        </Text>
        <Text size="medium" align="center" title="U+0136 | Dec: 310">
          Ķ
        </Text>
        <Text size="medium" align="center" title="U+0137 | Dec: 311">
          ķ
        </Text>
        <Text size="medium" align="center" title="U+0138 | Dec: 312">
          ĸ
        </Text>
        <Text size="medium" align="center" title="U+0139 | Dec: 313">
          Ĺ
        </Text>
        <Text size="medium" align="center" title="U+013A | Dec: 314">
          ĺ
        </Text>
        <Text size="medium" align="center" title="U+013B | Dec: 315">
          Ļ
        </Text>
        <Text size="medium" align="center" title="U+013C | Dec: 316">
          ļ
        </Text>
        <Text size="medium" align="center" title="U+013D | Dec: 317">
          Ľ
        </Text>
        <Text size="medium" align="center" title="U+013E | Dec: 318">
          ľ
        </Text>
        <Text size="medium" align="center" title="U+013F | Dec: 319">
          Ŀ
        </Text>
        <Text size="medium" align="center" title="U+0140 | Dec: 320">
          ŀ
        </Text>
        <Text size="medium" align="center" title="U+0141 | Dec: 321">
          Ł
        </Text>
        <Text size="medium" align="center" title="U+0142 | Dec: 322">
          ł
        </Text>
        <Text size="medium" align="center" title="U+0143 | Dec: 323">
          Ń
        </Text>
        <Text size="medium" align="center" title="U+0144 | Dec: 324">
          ń
        </Text>
        <Text size="medium" align="center" title="U+0145 | Dec: 325">
          Ņ
        </Text>
        <Text size="medium" align="center" title="U+0146 | Dec: 326">
          ņ
        </Text>
        <Text size="medium" align="center" title="U+0147 | Dec: 327">
          Ň
        </Text>
        <Text size="medium" align="center" title="U+0148 | Dec: 328">
          ň
        </Text>
        <Text size="medium" align="center" title="U+0149 | Dec: 329">
          ŉ
        </Text>
        <Text size="medium" align="center" title="U+014A | Dec: 330">
          Ŋ
        </Text>
        <Text size="medium" align="center" title="U+014B | Dec: 331">
          ŋ
        </Text>
        <Text size="medium" align="center" title="U+014C | Dec: 332">
          Ō
        </Text>
        <Text size="medium" align="center" title="U+014D | Dec: 333">
          ō
        </Text>
        <Text size="medium" align="center" title="U+014E | Dec: 334">
          Ŏ
        </Text>
        <Text size="medium" align="center" title="U+014F | Dec: 335">
          ŏ
        </Text>
        <Text size="medium" align="center" title="U+0150 | Dec: 336">
          Ő
        </Text>
        <Text size="medium" align="center" title="U+0151 | Dec: 337">
          ő
        </Text>
        <Text size="medium" align="center" title="U+0152 | Dec: 338">
          Œ
        </Text>
        <Text size="medium" align="center" title="U+0153 | Dec: 339">
          œ
        </Text>
        <Text size="medium" align="center" title="U+0154 | Dec: 340">
          Ŕ
        </Text>
        <Text size="medium" align="center" title="U+0155 | Dec: 341">
          ŕ
        </Text>
        <Text size="medium" align="center" title="U+0156 | Dec: 342">
          Ŗ
        </Text>
        <Text size="medium" align="center" title="U+0157 | Dec: 343">
          ŗ
        </Text>
        <Text size="medium" align="center" title="U+0158 | Dec: 344">
          Ř
        </Text>
        <Text size="medium" align="center" title="U+0159 | Dec: 345">
          ř
        </Text>
        <Text size="medium" align="center" title="U+015A | Dec: 346">
          Ś
        </Text>
        <Text size="medium" align="center" title="U+015B | Dec: 347">
          ś
        </Text>
        <Text size="medium" align="center" title="U+015C | Dec: 348">
          Ŝ
        </Text>
        <Text size="medium" align="center" title="U+015D | Dec: 349">
          ŝ
        </Text>
        <Text size="medium" align="center" title="U+015E | Dec: 350">
          Ş
        </Text>
        <Text size="medium" align="center" title="U+015F | Dec: 351">
          ş
        </Text>
        <Text size="medium" align="center" title="U+0160 | Dec: 352">
          Š
        </Text>
        <Text size="medium" align="center" title="U+0161 | Dec: 353">
          š
        </Text>
        <Text size="medium" align="center" title="U+0162 | Dec: 354">
          Ţ
        </Text>
        <Text size="medium" align="center" title="U+0163 | Dec: 355">
          ţ
        </Text>
        <Text size="medium" align="center" title="U+0164 | Dec: 356">
          Ť
        </Text>
        <Text size="medium" align="center" title="U+0165 | Dec: 357">
          ť
        </Text>
        <Text size="medium" align="center" title="U+0166 | Dec: 358">
          Ŧ
        </Text>
        <Text size="medium" align="center" title="U+0167 | Dec: 359">
          ŧ
        </Text>
        <Text size="medium" align="center" title="U+0168 | Dec: 360">
          Ũ
        </Text>
        <Text size="medium" align="center" title="U+0169 | Dec: 361">
          ũ
        </Text>
        <Text size="medium" align="center" title="U+016A | Dec: 362">
          Ū
        </Text>
        <Text size="medium" align="center" title="U+016B | Dec: 363">
          ū
        </Text>
        <Text size="medium" align="center" title="U+016C | Dec: 364">
          Ŭ
        </Text>
        <Text size="medium" align="center" title="U+016D | Dec: 365">
          ŭ
        </Text>
        <Text size="medium" align="center" title="U+016E | Dec: 366">
          Ů
        </Text>
        <Text size="medium" align="center" title="U+016F | Dec: 367">
          ů
        </Text>
        <Text size="medium" align="center" title="U+0170 | Dec: 368">
          Ű
        </Text>
        <Text size="medium" align="center" title="U+0171 | Dec: 369">
          ű
        </Text>
        <Text size="medium" align="center" title="U+0172 | Dec: 370">
          Ų
        </Text>
        <Text size="medium" align="center" title="U+0173 | Dec: 371">
          ų
        </Text>
        <Text size="medium" align="center" title="U+0174 | Dec: 372">
          Ŵ
        </Text>
        <Text size="medium" align="center" title="U+0175 | Dec: 373">
          ŵ
        </Text>
        <Text size="medium" align="center" title="U+0176 | Dec: 374">
          Ŷ
        </Text>
        <Text size="medium" align="center" title="U+0177 | Dec: 375">
          ŷ
        </Text>
        <Text size="medium" align="center" title="U+0178 | Dec: 376">
          Ÿ
        </Text>
        <Text size="medium" align="center" title="U+0179 | Dec: 377">
          Ź
        </Text>
        <Text size="medium" align="center" title="U+017A | Dec: 378">
          ź
        </Text>
        <Text size="medium" align="center" title="U+017B | Dec: 379">
          Ż
        </Text>
        <Text size="medium" align="center" title="U+017C | Dec: 380">
          ż
        </Text>
        <Text size="medium" align="center" title="U+017D | Dec: 381">
          Ž
        </Text>
        <Text size="medium" align="center" title="U+017E | Dec: 382">
          ž
        </Text>
        <Text size="medium" align="center" title="U+017F | Dec: 383">
          ſ
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+0180-024F (Porsche Next "Latin Extended-B")</Headline>
        <Text size="medium" align="center" title="U+0180 | Dec: 384">
          ƀ
        </Text>
        <Text size="medium" align="center" title="U+0181 | Dec: 385">
          Ɓ
        </Text>
        <Text size="medium" align="center" title="U+0182 | Dec: 386">
          Ƃ
        </Text>
        <Text size="medium" align="center" title="U+0183 | Dec: 387">
          ƃ
        </Text>
        <Text size="medium" align="center" title="U+0184 | Dec: 388">
          Ƅ
        </Text>
        <Text size="medium" align="center" title="U+0185 | Dec: 389">
          ƅ
        </Text>
        <Text size="medium" align="center" title="U+0186 | Dec: 390">
          Ɔ
        </Text>
        <Text size="medium" align="center" title="U+0187 | Dec: 391">
          Ƈ
        </Text>
        <Text size="medium" align="center" title="U+0188 | Dec: 392">
          ƈ
        </Text>
        <Text size="medium" align="center" title="U+0189 | Dec: 393">
          Ɖ
        </Text>
        <Text size="medium" align="center" title="U+018A | Dec: 394">
          Ɗ
        </Text>
        <Text size="medium" align="center" title="U+018B | Dec: 395">
          Ƌ
        </Text>
        <Text size="medium" align="center" title="U+018C | Dec: 396">
          ƌ
        </Text>
        <Text size="medium" align="center" title="U+018D | Dec: 397">
          ƍ
        </Text>
        <Text size="medium" align="center" title="U+018E | Dec: 398">
          Ǝ
        </Text>
        <Text size="medium" align="center" title="U+018F | Dec: 399">
          Ə
        </Text>
        <Text size="medium" align="center" title="U+0190 | Dec: 400">
          Ɛ
        </Text>
        <Text size="medium" align="center" title="U+0191 | Dec: 401">
          Ƒ
        </Text>
        <Text size="medium" align="center" title="U+0192 | Dec: 402">
          ƒ
        </Text>
        <Text size="medium" align="center" title="U+0193 | Dec: 403">
          Ɠ
        </Text>
        <Text size="medium" align="center" title="U+0194 | Dec: 404">
          Ɣ
        </Text>
        <Text size="medium" align="center" title="U+0195 | Dec: 405">
          ƕ
        </Text>
        <Text size="medium" align="center" title="U+0196 | Dec: 406">
          Ɩ
        </Text>
        <Text size="medium" align="center" title="U+0197 | Dec: 407">
          Ɨ
        </Text>
        <Text size="medium" align="center" title="U+0198 | Dec: 408">
          Ƙ
        </Text>
        <Text size="medium" align="center" title="U+0199 | Dec: 409">
          ƙ
        </Text>
        <Text size="medium" align="center" title="U+019A | Dec: 410">
          ƚ
        </Text>
        <Text size="medium" align="center" title="U+019B | Dec: 411">
          ƛ
        </Text>
        <Text size="medium" align="center" title="U+019C | Dec: 412">
          Ɯ
        </Text>
        <Text size="medium" align="center" title="U+019D | Dec: 413">
          Ɲ
        </Text>
        <Text size="medium" align="center" title="U+019E | Dec: 414">
          ƞ
        </Text>
        <Text size="medium" align="center" title="U+019F | Dec: 415">
          Ɵ
        </Text>
        <Text size="medium" align="center" title="U+01A0 | Dec: 416">
          Ơ
        </Text>
        <Text size="medium" align="center" title="U+01A1 | Dec: 417">
          ơ
        </Text>
        <Text size="medium" align="center" title="U+01A2 | Dec: 418">
          Ƣ
        </Text>
        <Text size="medium" align="center" title="U+01A3 | Dec: 419">
          ƣ
        </Text>
        <Text size="medium" align="center" title="U+01A4 | Dec: 420">
          Ƥ
        </Text>
        <Text size="medium" align="center" title="U+01A5 | Dec: 421">
          ƥ
        </Text>
        <Text size="medium" align="center" title="U+01A6 | Dec: 422">
          Ʀ
        </Text>
        <Text size="medium" align="center" title="U+01A7 | Dec: 423">
          Ƨ
        </Text>
        <Text size="medium" align="center" title="U+01A8 | Dec: 424">
          ƨ
        </Text>
        <Text size="medium" align="center" title="U+01A9 | Dec: 425">
          Ʃ
        </Text>
        <Text size="medium" align="center" title="U+01AA | Dec: 426">
          ƪ
        </Text>
        <Text size="medium" align="center" title="U+01AB | Dec: 427">
          ƫ
        </Text>
        <Text size="medium" align="center" title="U+01AC | Dec: 428">
          Ƭ
        </Text>
        <Text size="medium" align="center" title="U+01AD | Dec: 429">
          ƭ
        </Text>
        <Text size="medium" align="center" title="U+01AE | Dec: 430">
          Ʈ
        </Text>
        <Text size="medium" align="center" title="U+01AF | Dec: 431">
          Ư
        </Text>
        <Text size="medium" align="center" title="U+01B0 | Dec: 432">
          ư
        </Text>
        <Text size="medium" align="center" title="U+01B1 | Dec: 433">
          Ʊ
        </Text>
        <Text size="medium" align="center" title="U+01B2 | Dec: 434">
          Ʋ
        </Text>
        <Text size="medium" align="center" title="U+01B3 | Dec: 435">
          Ƴ
        </Text>
        <Text size="medium" align="center" title="U+01B4 | Dec: 436">
          ƴ
        </Text>
        <Text size="medium" align="center" title="U+01B5 | Dec: 437">
          Ƶ
        </Text>
        <Text size="medium" align="center" title="U+01B6 | Dec: 438">
          ƶ
        </Text>
        <Text size="medium" align="center" title="U+01B7 | Dec: 439">
          Ʒ
        </Text>
        <Text size="medium" align="center" title="U+01B8 | Dec: 440">
          Ƹ
        </Text>
        <Text size="medium" align="center" title="U+01B9 | Dec: 441">
          ƹ
        </Text>
        <Text size="medium" align="center" title="U+01BA | Dec: 442">
          ƺ
        </Text>
        <Text size="medium" align="center" title="U+01BB | Dec: 443">
          ƻ
        </Text>
        <Text size="medium" align="center" title="U+01BC | Dec: 444">
          Ƽ
        </Text>
        <Text size="medium" align="center" title="U+01BD | Dec: 445">
          ƽ
        </Text>
        <Text size="medium" align="center" title="U+01BE | Dec: 446">
          ƾ
        </Text>
        <Text size="medium" align="center" title="U+01BF | Dec: 447">
          ƿ
        </Text>
        <Text size="medium" align="center" title="U+01C0 | Dec: 448">
          ǀ
        </Text>
        <Text size="medium" align="center" title="U+01C1 | Dec: 449">
          ǁ
        </Text>
        <Text size="medium" align="center" title="U+01C2 | Dec: 450">
          ǂ
        </Text>
        <Text size="medium" align="center" title="U+01C3 | Dec: 451">
          ǃ
        </Text>
        <Text size="medium" align="center" title="U+01C4 | Dec: 452">
          Ǆ
        </Text>
        <Text size="medium" align="center" title="U+01C5 | Dec: 453">
          ǅ
        </Text>
        <Text size="medium" align="center" title="U+01C6 | Dec: 454">
          ǆ
        </Text>
        <Text size="medium" align="center" title="U+01C7 | Dec: 455">
          Ǉ
        </Text>
        <Text size="medium" align="center" title="U+01C8 | Dec: 456">
          ǈ
        </Text>
        <Text size="medium" align="center" title="U+01C9 | Dec: 457">
          ǉ
        </Text>
        <Text size="medium" align="center" title="U+01CA | Dec: 458">
          Ǌ
        </Text>
        <Text size="medium" align="center" title="U+01CB | Dec: 459">
          ǋ
        </Text>
        <Text size="medium" align="center" title="U+01CC | Dec: 460">
          ǌ
        </Text>
        <Text size="medium" align="center" title="U+01CD | Dec: 461">
          Ǎ
        </Text>
        <Text size="medium" align="center" title="U+01CE | Dec: 462">
          ǎ
        </Text>
        <Text size="medium" align="center" title="U+01CF | Dec: 463">
          Ǐ
        </Text>
        <Text size="medium" align="center" title="U+01D0 | Dec: 464">
          ǐ
        </Text>
        <Text size="medium" align="center" title="U+01D1 | Dec: 465">
          Ǒ
        </Text>
        <Text size="medium" align="center" title="U+01D2 | Dec: 466">
          ǒ
        </Text>
        <Text size="medium" align="center" title="U+01D3 | Dec: 467">
          Ǔ
        </Text>
        <Text size="medium" align="center" title="U+01D4 | Dec: 468">
          ǔ
        </Text>
        <Text size="medium" align="center" title="U+01D5 | Dec: 469">
          Ǖ
        </Text>
        <Text size="medium" align="center" title="U+01D6 | Dec: 470">
          ǖ
        </Text>
        <Text size="medium" align="center" title="U+01D7 | Dec: 471">
          Ǘ
        </Text>
        <Text size="medium" align="center" title="U+01D8 | Dec: 472">
          ǘ
        </Text>
        <Text size="medium" align="center" title="U+01D9 | Dec: 473">
          Ǚ
        </Text>
        <Text size="medium" align="center" title="U+01DA | Dec: 474">
          ǚ
        </Text>
        <Text size="medium" align="center" title="U+01DB | Dec: 475">
          Ǜ
        </Text>
        <Text size="medium" align="center" title="U+01DC | Dec: 476">
          ǜ
        </Text>
        <Text size="medium" align="center" title="U+01DD | Dec: 477">
          ǝ
        </Text>
        <Text size="medium" align="center" title="U+01DE | Dec: 478">
          Ǟ
        </Text>
        <Text size="medium" align="center" title="U+01DF | Dec: 479">
          ǟ
        </Text>
        <Text size="medium" align="center" title="U+01E0 | Dec: 480">
          Ǡ
        </Text>
        <Text size="medium" align="center" title="U+01E1 | Dec: 481">
          ǡ
        </Text>
        <Text size="medium" align="center" title="U+01E2 | Dec: 482">
          Ǣ
        </Text>
        <Text size="medium" align="center" title="U+01E3 | Dec: 483">
          ǣ
        </Text>
        <Text size="medium" align="center" title="U+01E4 | Dec: 484">
          Ǥ
        </Text>
        <Text size="medium" align="center" title="U+01E5 | Dec: 485">
          ǥ
        </Text>
        <Text size="medium" align="center" title="U+01E6 | Dec: 486">
          Ǧ
        </Text>
        <Text size="medium" align="center" title="U+01E7 | Dec: 487">
          ǧ
        </Text>
        <Text size="medium" align="center" title="U+01E8 | Dec: 488">
          Ǩ
        </Text>
        <Text size="medium" align="center" title="U+01E9 | Dec: 489">
          ǩ
        </Text>
        <Text size="medium" align="center" title="U+01EA | Dec: 490">
          Ǫ
        </Text>
        <Text size="medium" align="center" title="U+01EB | Dec: 491">
          ǫ
        </Text>
        <Text size="medium" align="center" title="U+01EC | Dec: 492">
          Ǭ
        </Text>
        <Text size="medium" align="center" title="U+01ED | Dec: 493">
          ǭ
        </Text>
        <Text size="medium" align="center" title="U+01EE | Dec: 494">
          Ǯ
        </Text>
        <Text size="medium" align="center" title="U+01EF | Dec: 495">
          ǯ
        </Text>
        <Text size="medium" align="center" title="U+01F0 | Dec: 496">
          ǰ
        </Text>
        <Text size="medium" align="center" title="U+01F1 | Dec: 497">
          Ǳ
        </Text>
        <Text size="medium" align="center" title="U+01F2 | Dec: 498">
          ǲ
        </Text>
        <Text size="medium" align="center" title="U+01F3 | Dec: 499">
          ǳ
        </Text>
        <Text size="medium" align="center" title="U+01F4 | Dec: 500">
          Ǵ
        </Text>
        <Text size="medium" align="center" title="U+01F5 | Dec: 501">
          ǵ
        </Text>
        <Text size="medium" align="center" title="U+01F6 | Dec: 502">
          Ƕ
        </Text>
        <Text size="medium" align="center" title="U+01F7 | Dec: 503">
          Ƿ
        </Text>
        <Text size="medium" align="center" title="U+01F8 | Dec: 504">
          Ǹ
        </Text>
        <Text size="medium" align="center" title="U+01F9 | Dec: 505">
          ǹ
        </Text>
        <Text size="medium" align="center" title="U+01FA | Dec: 506">
          Ǻ
        </Text>
        <Text size="medium" align="center" title="U+01FB | Dec: 507">
          ǻ
        </Text>
        <Text size="medium" align="center" title="U+01FC | Dec: 508">
          Ǽ
        </Text>
        <Text size="medium" align="center" title="U+01FD | Dec: 509">
          ǽ
        </Text>
        <Text size="medium" align="center" title="U+01FE | Dec: 510">
          Ǿ
        </Text>
        <Text size="medium" align="center" title="U+01FF | Dec: 511">
          ǿ
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+0250-02AF (Porsche Next "IPA Extensions")</Headline>
        <Text size="medium" align="center" title="U+0250 | Dec:592">
          ɐ
        </Text>
        <Text size="medium" align="center" title="U+0251 | Dec:593">
          ɑ
        </Text>
        <Text size="medium" align="center" title="U+0252 | Dec:594">
          ɒ
        </Text>
        <Text size="medium" align="center" title="U+0253 | Dec:595">
          ɓ
        </Text>
        <Text size="medium" align="center" title="U+0254 | Dec:596">
          ɔ
        </Text>
        <Text size="medium" align="center" title="U+0255 | Dec:597">
          ɕ
        </Text>
        <Text size="medium" align="center" title="U+0256 | Dec:598">
          ɖ
        </Text>
        <Text size="medium" align="center" title="U+0257 | Dec:599">
          ɗ
        </Text>
        <Text size="medium" align="center" title="U+0258 | Dec:600">
          ɘ
        </Text>
        <Text size="medium" align="center" title="U+0259 | Dec:601">
          ə
        </Text>
        <Text size="medium" align="center" title="U+025A | Dec:602">
          ɚ
        </Text>
        <Text size="medium" align="center" title="U+025B | Dec:603">
          ɛ
        </Text>
        <Text size="medium" align="center" title="U+025C | Dec:604">
          ɜ
        </Text>
        <Text size="medium" align="center" title="U+025D | Dec:605">
          ɝ
        </Text>
        <Text size="medium" align="center" title="U+025E | Dec:606">
          ɞ
        </Text>
        <Text size="medium" align="center" title="U+025F | Dec:607">
          ɟ
        </Text>
        <Text size="medium" align="center" title="U+0260 | Dec:608">
          ɠ
        </Text>
        <Text size="medium" align="center" title="U+0261 | Dec:609">
          ɡ
        </Text>
        <Text size="medium" align="center" title="U+0262 | Dec:610">
          ɢ
        </Text>
        <Text size="medium" align="center" title="U+0263 | Dec:611">
          ɣ
        </Text>
        <Text size="medium" align="center" title="U+0264 | Dec:612">
          ɤ
        </Text>
        <Text size="medium" align="center" title="U+0265 | Dec:613">
          ɥ
        </Text>
        <Text size="medium" align="center" title="U+0266 | Dec:614">
          ɦ
        </Text>
        <Text size="medium" align="center" title="U+0267 | Dec:615">
          ɧ
        </Text>
        <Text size="medium" align="center" title="U+0268 | Dec:616">
          ɨ
        </Text>
        <Text size="medium" align="center" title="U+0269 | Dec:617">
          ɩ
        </Text>
        <Text size="medium" align="center" title="U+026A | Dec:618">
          ɪ
        </Text>
        <Text size="medium" align="center" title="U+026B | Dec:619">
          ɫ
        </Text>
        <Text size="medium" align="center" title="U+026C | Dec:620">
          ɬ
        </Text>
        <Text size="medium" align="center" title="U+026D | Dec:621">
          ɭ
        </Text>
        <Text size="medium" align="center" title="U+026E | Dec:622">
          ɮ
        </Text>
        <Text size="medium" align="center" title="U+026F | Dec:623">
          ɯ
        </Text>
        <Text size="medium" align="center" title="U+0270 | Dec:624">
          ɰ
        </Text>
        <Text size="medium" align="center" title="U+0271 | Dec:625">
          ɱ
        </Text>
        <Text size="medium" align="center" title="U+0272 | Dec:626">
          ɲ
        </Text>
        <Text size="medium" align="center" title="U+0273 | Dec:627">
          ɳ
        </Text>
        <Text size="medium" align="center" title="U+0274 | Dec:628">
          ɴ
        </Text>
        <Text size="medium" align="center" title="U+0275 | Dec:629">
          ɵ
        </Text>
        <Text size="medium" align="center" title="U+0276 | Dec:630">
          ɶ
        </Text>
        <Text size="medium" align="center" title="U+0277 | Dec:631">
          ɷ
        </Text>
        <Text size="medium" align="center" title="U+0278 | Dec:632">
          ɸ
        </Text>
        <Text size="medium" align="center" title="U+0279 | Dec:633">
          ɹ
        </Text>
        <Text size="medium" align="center" title="U+027A | Dec:634">
          ɺ
        </Text>
        <Text size="medium" align="center" title="U+027B | Dec:635">
          ɻ
        </Text>
        <Text size="medium" align="center" title="U+027C | Dec:636">
          ɼ
        </Text>
        <Text size="medium" align="center" title="U+027D | Dec:637">
          ɽ
        </Text>
        <Text size="medium" align="center" title="U+027E | Dec:638">
          ɾ
        </Text>
        <Text size="medium" align="center" title="U+027F | Dec:639">
          ɿ
        </Text>
        <Text size="medium" align="center" title="U+0280 | Dec:640">
          ʀ
        </Text>
        <Text size="medium" align="center" title="U+0281 | Dec:641">
          ʁ
        </Text>
        <Text size="medium" align="center" title="U+0282 | Dec:642">
          ʂ
        </Text>
        <Text size="medium" align="center" title="U+0283 | Dec:643">
          ʃ
        </Text>
        <Text size="medium" align="center" title="U+0284 | Dec:644">
          ʄ
        </Text>
        <Text size="medium" align="center" title="U+0285 | Dec:645">
          ʅ
        </Text>
        <Text size="medium" align="center" title="U+0286 | Dec:646">
          ʆ
        </Text>
        <Text size="medium" align="center" title="U+0287 | Dec:647">
          ʇ
        </Text>
        <Text size="medium" align="center" title="U+0288 | Dec:648">
          ʈ
        </Text>
        <Text size="medium" align="center" title="U+0289 | Dec:649">
          ʉ
        </Text>
        <Text size="medium" align="center" title="U+028A | Dec:650">
          ʊ
        </Text>
        <Text size="medium" align="center" title="U+028B | Dec:651">
          ʋ
        </Text>
        <Text size="medium" align="center" title="U+028C | Dec:652">
          ʌ
        </Text>
        <Text size="medium" align="center" title="U+028D | Dec:653">
          ʍ
        </Text>
        <Text size="medium" align="center" title="U+028E | Dec:654">
          ʎ
        </Text>
        <Text size="medium" align="center" title="U+028F | Dec:655">
          ʏ
        </Text>
        <Text size="medium" align="center" title="U+0290 | Dec:656">
          ʐ
        </Text>
        <Text size="medium" align="center" title="U+0291 | Dec:657">
          ʑ
        </Text>
        <Text size="medium" align="center" title="U+0292 | Dec:658">
          ʒ
        </Text>
        <Text size="medium" align="center" title="U+0293 | Dec:659">
          ʓ
        </Text>
        <Text size="medium" align="center" title="U+0294 | Dec:660">
          ʔ
        </Text>
        <Text size="medium" align="center" title="U+0295 | Dec:661">
          ʕ
        </Text>
        <Text size="medium" align="center" title="U+0296 | Dec:662">
          ʖ
        </Text>
        <Text size="medium" align="center" title="U+0297 | Dec:663">
          ʗ
        </Text>
        <Text size="medium" align="center" title="U+0298 | Dec:664">
          ʘ
        </Text>
        <Text size="medium" align="center" title="U+0299 | Dec:665">
          ʙ
        </Text>
        <Text size="medium" align="center" title="U+029A | Dec:666">
          ʚ
        </Text>
        <Text size="medium" align="center" title="U+029B | Dec:667">
          ʛ
        </Text>
        <Text size="medium" align="center" title="U+029C | Dec:668">
          ʜ
        </Text>
        <Text size="medium" align="center" title="U+029D | Dec:669">
          ʝ
        </Text>
        <Text size="medium" align="center" title="U+029E | Dec:670">
          ʞ
        </Text>
        <Text size="medium" align="center" title="U+029F | Dec:671">
          ʟ
        </Text>
        <Text size="medium" align="center" title="U+02A0 | Dec:672">
          ʠ
        </Text>
        <Text size="medium" align="center" title="U+02A1 | Dec:673">
          ʡ
        </Text>
        <Text size="medium" align="center" title="U+02A2 | Dec:674">
          ʢ
        </Text>
        <Text size="medium" align="center" title="U+02A3 | Dec:675">
          ʣ
        </Text>
        <Text size="medium" align="center" title="U+02A4 | Dec:676">
          ʤ
        </Text>
        <Text size="medium" align="center" title="U+02A5 | Dec:677">
          ʥ
        </Text>
        <Text size="medium" align="center" title="U+02A6 | Dec:678">
          ʦ
        </Text>
        <Text size="medium" align="center" title="U+02A7 | Dec:679">
          ʧ
        </Text>
        <Text size="medium" align="center" title="U+02A8 | Dec:680">
          ʨ
        </Text>
        <Text size="medium" align="center" title="U+02A9 | Dec:681">
          ʩ
        </Text>
        <Text size="medium" align="center" title="U+02AA | Dec:682">
          ʪ
        </Text>
        <Text size="medium" align="center" title="U+02AB | Dec:683">
          ʫ
        </Text>
        <Text size="medium" align="center" title="U+02AC | Dec:684">
          ʬ
        </Text>
        <Text size="medium" align="center" title="U+02AD | Dec:685">
          ʭ
        </Text>
        <Text size="medium" align="center" title="U+02AE | Dec:686">
          ʮ
        </Text>
        <Text size="medium" align="center" title="U+02AF | Dec:687">
          ʯ
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+02B0-02FF (Porsche Next "Spacing Modifier Letters")</Headline>
        <Text size="medium" align="center" title="U+02B0 | Dec:688">
          ʰ
        </Text>
        <Text size="medium" align="center" title="U+02B1 | Dec:689">
          ʱ
        </Text>
        <Text size="medium" align="center" title="U+02B2 | Dec:690">
          ʲ
        </Text>
        <Text size="medium" align="center" title="U+02B3 | Dec:691">
          ʳ
        </Text>
        <Text size="medium" align="center" title="U+02B4 | Dec:692">
          ʴ
        </Text>
        <Text size="medium" align="center" title="U+02B5 | Dec:693">
          ʵ
        </Text>
        <Text size="medium" align="center" title="U+02B6 | Dec:694">
          ʶ
        </Text>
        <Text size="medium" align="center" title="U+02B7 | Dec:695">
          ʷ
        </Text>
        <Text size="medium" align="center" title="U+02B8 | Dec:696">
          ʸ
        </Text>
        <Text size="medium" align="center" title="U+02B9 | Dec:697">
          ʹ
        </Text>
        <Text size="medium" align="center" title="U+02BA | Dec:698">
          ʺ
        </Text>
        <Text size="medium" align="center" title="U+02BB | Dec:699">
          ʻ
        </Text>
        <Text size="medium" align="center" title="U+02BC | Dec:700">
          ʼ
        </Text>
        <Text size="medium" align="center" title="U+02BD | Dec:701">
          ʽ
        </Text>
        <Text size="medium" align="center" title="U+02BE | Dec:702">
          ʾ
        </Text>
        <Text size="medium" align="center" title="U+02BF | Dec:703">
          ʿ
        </Text>
        <Text size="medium" align="center" title="U+02C0 | Dec:704">
          ˀ
        </Text>
        <Text size="medium" align="center" title="U+02C1 | Dec:705">
          ˁ
        </Text>
        <Text size="medium" align="center" title="U+02C2 | Dec:706">
          ˂
        </Text>
        <Text size="medium" align="center" title="U+02C3 | Dec:707">
          ˃
        </Text>
        <Text size="medium" align="center" title="U+02C4 | Dec:708">
          ˄
        </Text>
        <Text size="medium" align="center" title="U+02C5 | Dec:709">
          ˅
        </Text>
        <Text size="medium" align="center" title="U+02C6 | Dec:710">
          ˆ
        </Text>
        <Text size="medium" align="center" title="U+02C7 | Dec:711">
          ˇ
        </Text>
        <Text size="medium" align="center" title="U+02C8 | Dec:712">
          ˈ
        </Text>
        <Text size="medium" align="center" title="U+02C9 | Dec:713">
          ˉ
        </Text>
        <Text size="medium" align="center" title="U+02CA | Dec:714">
          ˊ
        </Text>
        <Text size="medium" align="center" title="U+02CB | Dec:715">
          ˋ
        </Text>
        <Text size="medium" align="center" title="U+02CC | Dec:716">
          ˌ
        </Text>
        <Text size="medium" align="center" title="U+02CD | Dec:717">
          ˍ
        </Text>
        <Text size="medium" align="center" title="U+02CE | Dec:718">
          ˎ
        </Text>
        <Text size="medium" align="center" title="U+02CF | Dec:719">
          ˏ
        </Text>
        <Text size="medium" align="center" title="U+02D0 | Dec:720">
          ː
        </Text>
        <Text size="medium" align="center" title="U+02D1 | Dec:721">
          ˑ
        </Text>
        <Text size="medium" align="center" title="U+02D2 | Dec:722">
          ˒
        </Text>
        <Text size="medium" align="center" title="U+02D3 | Dec:723">
          ˓
        </Text>
        <Text size="medium" align="center" title="U+02D4 | Dec:724">
          ˔
        </Text>
        <Text size="medium" align="center" title="U+02D5 | Dec:725">
          ˕
        </Text>
        <Text size="medium" align="center" title="U+02D6 | Dec:726">
          ˖
        </Text>
        <Text size="medium" align="center" title="U+02D7 | Dec:727">
          ˗
        </Text>
        <Text size="medium" align="center" title="U+02D8 | Dec:728">
          ˘
        </Text>
        <Text size="medium" align="center" title="U+02D9 | Dec:729">
          ˙
        </Text>
        <Text size="medium" align="center" title="U+02DA | Dec:730">
          ˚
        </Text>
        <Text size="medium" align="center" title="U+02DB | Dec:731">
          ˛
        </Text>
        <Text size="medium" align="center" title="U+02DC | Dec:732">
          ˜
        </Text>
        <Text size="medium" align="center" title="U+02DD | Dec:733">
          ˝
        </Text>
        <Text size="medium" align="center" title="U+02DE | Dec:734">
          ˞
        </Text>
        <Text size="medium" align="center" title="U+02DF | Dec:735">
          ˟
        </Text>
        <Text size="medium" align="center" title="U+02E0 | Dec:736">
          ˠ
        </Text>
        <Text size="medium" align="center" title="U+02E1 | Dec:737">
          ˡ
        </Text>
        <Text size="medium" align="center" title="U+02E2 | Dec:738">
          ˢ
        </Text>
        <Text size="medium" align="center" title="U+02E3 | Dec:739">
          ˣ
        </Text>
        <Text size="medium" align="center" title="U+02E4 | Dec:740">
          ˤ
        </Text>
        <Text size="medium" align="center" title="U+02E5 | Dec:741">
          ˥
        </Text>
        <Text size="medium" align="center" title="U+02E6 | Dec:742">
          ˦
        </Text>
        <Text size="medium" align="center" title="U+02E7 | Dec:743">
          ˧
        </Text>
        <Text size="medium" align="center" title="U+02E8 | Dec:744">
          ˨
        </Text>
        <Text size="medium" align="center" title="U+02E9 | Dec:745">
          ˩
        </Text>
        <Text size="medium" align="center" title="U+02EA | Dec:746">
          ˪
        </Text>
        <Text size="medium" align="center" title="U+02EB | Dec:747">
          ˫
        </Text>
        <Text size="medium" align="center" title="U+02EC | Dec:748">
          ˬ
        </Text>
        <Text size="medium" align="center" title="U+02ED | Dec:749">
          ˭
        </Text>
        <Text size="medium" align="center" title="U+02EE | Dec:750">
          ˮ
        </Text>
        <Text size="medium" align="center" title="U+02EF | Dec:751">
          ˯
        </Text>
        <Text size="medium" align="center" title="U+02F0 | Dec:752">
          ˰
        </Text>
        <Text size="medium" align="center" title="U+02F1 | Dec:753">
          ˱
        </Text>
        <Text size="medium" align="center" title="U+02F2 | Dec:754">
          ˲
        </Text>
        <Text size="medium" align="center" title="U+02F3 | Dec:755">
          ˳
        </Text>
        <Text size="medium" align="center" title="U+02F4 | Dec:756">
          ˴
        </Text>
        <Text size="medium" align="center" title="U+02F5 | Dec:757">
          ˵
        </Text>
        <Text size="medium" align="center" title="U+02F6 | Dec:758">
          ˶
        </Text>
        <Text size="medium" align="center" title="U+02F7 | Dec:759">
          ˷
        </Text>
        <Text size="medium" align="center" title="U+02F8 | Dec:760">
          ˸
        </Text>
        <Text size="medium" align="center" title="U+02F9 | Dec:761">
          ˹
        </Text>
        <Text size="medium" align="center" title="U+02FA | Dec:762">
          ˺
        </Text>
        <Text size="medium" align="center" title="U+02FB | Dec:763">
          ˻
        </Text>
        <Text size="medium" align="center" title="U+02FC | Dec:764">
          ˼
        </Text>
        <Text size="medium" align="center" title="U+02FD | Dec:765">
          ˽
        </Text>
        <Text size="medium" align="center" title="U+02FE | Dec:766">
          ˾
        </Text>
        <Text size="medium" align="center" title="U+02FF | Dec:767">
          ˿
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+0300-036F (Porsche Next "Combining Diacritical Marks")</Headline>
        <Text size="medium" align="center" title="U+0300 | Dec:768">
          ̀
        </Text>
        <Text size="medium" align="center" title="U+0301 | Dec:769">
          ́
        </Text>
        <Text size="medium" align="center" title="U+0302 | Dec:770">
          ̂
        </Text>
        <Text size="medium" align="center" title="U+0303 | Dec:771">
          ̃
        </Text>
        <Text size="medium" align="center" title="U+0304 | Dec:772">
          ̄
        </Text>
        <Text size="medium" align="center" title="U+0305 | Dec:773">
          ̅
        </Text>
        <Text size="medium" align="center" title="U+0306 | Dec:774">
          ̆
        </Text>
        <Text size="medium" align="center" title="U+0307 | Dec:775">
          ̇
        </Text>
        <Text size="medium" align="center" title="U+0308 | Dec:776">
          ̈
        </Text>
        <Text size="medium" align="center" title="U+0309 | Dec:777">
          ̉
        </Text>
        <Text size="medium" align="center" title="U+030A | Dec:778">
          ̊
        </Text>
        <Text size="medium" align="center" title="U+030B | Dec:779">
          ̋
        </Text>
        <Text size="medium" align="center" title="U+030C | Dec:780">
          ̌
        </Text>
        <Text size="medium" align="center" title="U+030D | Dec:781">
          ̍
        </Text>
        <Text size="medium" align="center" title="U+030E | Dec:782">
          ̎
        </Text>
        <Text size="medium" align="center" title="U+030F | Dec:783">
          ̏
        </Text>
        <Text size="medium" align="center" title="U+0310 | Dec:784">
          ̐
        </Text>
        <Text size="medium" align="center" title="U+0311 | Dec:785">
          ̑
        </Text>
        <Text size="medium" align="center" title="U+0312 | Dec:786">
          ̒
        </Text>
        <Text size="medium" align="center" title="U+0313 | Dec:787">
          ̓
        </Text>
        <Text size="medium" align="center" title="U+0314 | Dec:788">
          ̔
        </Text>
        <Text size="medium" align="center" title="U+0315 | Dec:789">
          ̕
        </Text>
        <Text size="medium" align="center" title="U+0316 | Dec:790">
          ̖
        </Text>
        <Text size="medium" align="center" title="U+0317 | Dec:791">
          ̗
        </Text>
        <Text size="medium" align="center" title="U+0318 | Dec:792">
          ̘
        </Text>
        <Text size="medium" align="center" title="U+0319 | Dec:793">
          ̙
        </Text>
        <Text size="medium" align="center" title="U+031A | Dec:794">
          ̚
        </Text>
        <Text size="medium" align="center" title="U+031B | Dec:795">
          ̛
        </Text>
        <Text size="medium" align="center" title="U+031C | Dec:796">
          ̜
        </Text>
        <Text size="medium" align="center" title="U+031D | Dec:797">
          ̝
        </Text>
        <Text size="medium" align="center" title="U+031E | Dec:798">
          ̞
        </Text>
        <Text size="medium" align="center" title="U+031F | Dec:799">
          ̟
        </Text>
        <Text size="medium" align="center" title="U+0320 | Dec:800">
          ̠
        </Text>
        <Text size="medium" align="center" title="U+0321 | Dec:801">
          ̡
        </Text>
        <Text size="medium" align="center" title="U+0322 | Dec:802">
          ̢
        </Text>
        <Text size="medium" align="center" title="U+0323 | Dec:803">
          ̣
        </Text>
        <Text size="medium" align="center" title="U+0324 | Dec:804">
          ̤
        </Text>
        <Text size="medium" align="center" title="U+0325 | Dec:805">
          ̥
        </Text>
        <Text size="medium" align="center" title="U+0326 | Dec:806">
          ̦
        </Text>
        <Text size="medium" align="center" title="U+0327 | Dec:807">
          ̧
        </Text>
        <Text size="medium" align="center" title="U+0328 | Dec:808">
          ̨
        </Text>
        <Text size="medium" align="center" title="U+0329 | Dec:809">
          ̩
        </Text>
        <Text size="medium" align="center" title="U+032A | Dec:810">
          ̪
        </Text>
        <Text size="medium" align="center" title="U+032B | Dec:811">
          ̫
        </Text>
        <Text size="medium" align="center" title="U+032C | Dec:812">
          ̬
        </Text>
        <Text size="medium" align="center" title="U+032D | Dec:813">
          ̭
        </Text>
        <Text size="medium" align="center" title="U+032E | Dec:814">
          ̮
        </Text>
        <Text size="medium" align="center" title="U+032F | Dec:815">
          ̯
        </Text>
        <Text size="medium" align="center" title="U+0330 | Dec:816">
          ̰
        </Text>
        <Text size="medium" align="center" title="U+0331 | Dec:817">
          ̱
        </Text>
        <Text size="medium" align="center" title="U+0332 | Dec:818">
          ̲
        </Text>
        <Text size="medium" align="center" title="U+0333 | Dec:819">
          ̳
        </Text>
        <Text size="medium" align="center" title="U+0334 | Dec:820">
          ̴
        </Text>
        <Text size="medium" align="center" title="U+0335 | Dec:821">
          ̵
        </Text>
        <Text size="medium" align="center" title="U+0336 | Dec:822">
          ̶
        </Text>
        <Text size="medium" align="center" title="U+0337 | Dec:823">
          ̷
        </Text>
        <Text size="medium" align="center" title="U+0338 | Dec:824">
          ̸
        </Text>
        <Text size="medium" align="center" title="U+0339 | Dec:825">
          ̹
        </Text>
        <Text size="medium" align="center" title="U+033A | Dec:826">
          ̺
        </Text>
        <Text size="medium" align="center" title="U+033B | Dec:827">
          ̻
        </Text>
        <Text size="medium" align="center" title="U+033C | Dec:828">
          ̼
        </Text>
        <Text size="medium" align="center" title="U+033D | Dec:829">
          ̽
        </Text>
        <Text size="medium" align="center" title="U+033E | Dec:830">
          ̾
        </Text>
        <Text size="medium" align="center" title="U+033F | Dec:831">
          ̿
        </Text>
        <Text size="medium" align="center" title="U+0340 | Dec:832">
          ̀
        </Text>
        <Text size="medium" align="center" title="U+0341 | Dec:833">
          ́
        </Text>
        <Text size="medium" align="center" title="U+0342 | Dec:834">
          ͂
        </Text>
        <Text size="medium" align="center" title="U+0343 | Dec:835">
          ̓
        </Text>
        <Text size="medium" align="center" title="U+0344 | Dec:836">
          ̈́
        </Text>
        <Text size="medium" align="center" title="U+0345 | Dec:837">
          ͅ
        </Text>
        <Text size="medium" align="center" title="U+0346 | Dec:838">
          ͆
        </Text>
        <Text size="medium" align="center" title="U+0347 | Dec:839">
          ͇
        </Text>
        <Text size="medium" align="center" title="U+0348 | Dec:840">
          ͈
        </Text>
        <Text size="medium" align="center" title="U+0349 | Dec:841">
          ͉
        </Text>
        <Text size="medium" align="center" title="U+034A | Dec:842">
          ͊
        </Text>
        <Text size="medium" align="center" title="U+034B | Dec:843">
          ͋
        </Text>
        <Text size="medium" align="center" title="U+034C | Dec:844">
          ͌
        </Text>
        <Text size="medium" align="center" title="U+034D | Dec:845">
          ͍
        </Text>
        <Text size="medium" align="center" title="U+034E | Dec:846">
          ͎
        </Text>
        <Text size="medium" align="center" title="U+034F | Dec:847">
          ͏
        </Text>
        <Text size="medium" align="center" title="U+0350 | Dec:848">
          ͐
        </Text>
        <Text size="medium" align="center" title="U+0351 | Dec:849">
          ͑
        </Text>
        <Text size="medium" align="center" title="U+0352 | Dec:850">
          ͒
        </Text>
        <Text size="medium" align="center" title="U+0353 | Dec:851">
          ͓
        </Text>
        <Text size="medium" align="center" title="U+0354 | Dec:852">
          ͔
        </Text>
        <Text size="medium" align="center" title="U+0355 | Dec:853">
          ͕
        </Text>
        <Text size="medium" align="center" title="U+0356 | Dec:854">
          ͖
        </Text>
        <Text size="medium" align="center" title="U+0357 | Dec:855">
          ͗
        </Text>
        <Text size="medium" align="center" title="U+0358 | Dec:856">
          ͘
        </Text>
        <Text size="medium" align="center" title="U+0359 | Dec:857">
          ͙
        </Text>
        <Text size="medium" align="center" title="U+035A | Dec:858">
          ͚
        </Text>
        <Text size="medium" align="center" title="U+035B | Dec:859">
          ͛
        </Text>
        <Text size="medium" align="center" title="U+035C | Dec:860">
          ͜
        </Text>
        <Text size="medium" align="center" title="U+035D | Dec:861">
          ͝
        </Text>
        <Text size="medium" align="center" title="U+035E | Dec:862">
          ͞
        </Text>
        <Text size="medium" align="center" title="U+035F | Dec:863">
          ͟
        </Text>
        <Text size="medium" align="center" title="U+0360 | Dec:864">
          ͠
        </Text>
        <Text size="medium" align="center" title="U+0361 | Dec:865">
          ͡
        </Text>
        <Text size="medium" align="center" title="U+0362 | Dec:866">
          ͢
        </Text>
        <Text size="medium" align="center" title="U+0363 | Dec:867">
          ͣ
        </Text>
        <Text size="medium" align="center" title="U+0364 | Dec:868">
          ͤ
        </Text>
        <Text size="medium" align="center" title="U+0365 | Dec:869">
          ͥ
        </Text>
        <Text size="medium" align="center" title="U+0366 | Dec:870">
          ͦ
        </Text>
        <Text size="medium" align="center" title="U+0367 | Dec:871">
          ͧ
        </Text>
        <Text size="medium" align="center" title="U+0368 | Dec:872">
          ͨ
        </Text>
        <Text size="medium" align="center" title="U+0369 | Dec:873">
          ͩ
        </Text>
        <Text size="medium" align="center" title="U+036A | Dec:874">
          ͪ
        </Text>
        <Text size="medium" align="center" title="U+036B | Dec:875">
          ͫ
        </Text>
        <Text size="medium" align="center" title="U+036C | Dec:876">
          ͬ
        </Text>
        <Text size="medium" align="center" title="U+036D | Dec:877">
          ͭ
        </Text>
        <Text size="medium" align="center" title="U+036E | Dec:878">
          ͮ
        </Text>
        <Text size="medium" align="center" title="U+036F | Dec:879">
          ͯ
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+0E00-0E7F (Porsche Next "Thai")</Headline>
        <Text size="medium" align="center" title="U+0E00 | Dec:3584">
          ฀
        </Text>
        <Text size="medium" align="center" title="U+0E01 | Dec:3585">
          ก
        </Text>
        <Text size="medium" align="center" title="U+0E02 | Dec:3586">
          ข
        </Text>
        <Text size="medium" align="center" title="U+0E03 | Dec:3587">
          ฃ
        </Text>
        <Text size="medium" align="center" title="U+0E04 | Dec:3588">
          ค
        </Text>
        <Text size="medium" align="center" title="U+0E05 | Dec:3589">
          ฅ
        </Text>
        <Text size="medium" align="center" title="U+0E06 | Dec:3590">
          ฆ
        </Text>
        <Text size="medium" align="center" title="U+0E07 | Dec:3591">
          ง
        </Text>
        <Text size="medium" align="center" title="U+0E08 | Dec:3592">
          จ
        </Text>
        <Text size="medium" align="center" title="U+0E09 | Dec:3593">
          ฉ
        </Text>
        <Text size="medium" align="center" title="U+0E0A | Dec:3594">
          ช
        </Text>
        <Text size="medium" align="center" title="U+0E0B | Dec:3595">
          ซ
        </Text>
        <Text size="medium" align="center" title="U+0E0C | Dec:3596">
          ฌ
        </Text>
        <Text size="medium" align="center" title="U+0E0D | Dec:3597">
          ญ
        </Text>
        <Text size="medium" align="center" title="U+0E0E | Dec:3598">
          ฎ
        </Text>
        <Text size="medium" align="center" title="U+0E0F | Dec:3599">
          ฏ
        </Text>
        <Text size="medium" align="center" title="U+0E10 | Dec:3600">
          ฐ
        </Text>
        <Text size="medium" align="center" title="U+0E11 | Dec:3601">
          ฑ
        </Text>
        <Text size="medium" align="center" title="U+0E12 | Dec:3602">
          ฒ
        </Text>
        <Text size="medium" align="center" title="U+0E13 | Dec:3603">
          ณ
        </Text>
        <Text size="medium" align="center" title="U+0E14 | Dec:3604">
          ด
        </Text>
        <Text size="medium" align="center" title="U+0E15 | Dec:3605">
          ต
        </Text>
        <Text size="medium" align="center" title="U+0E16 | Dec:3606">
          ถ
        </Text>
        <Text size="medium" align="center" title="U+0E17 | Dec:3607">
          ท
        </Text>
        <Text size="medium" align="center" title="U+0E18 | Dec:3608">
          ธ
        </Text>
        <Text size="medium" align="center" title="U+0E19 | Dec:3609">
          น
        </Text>
        <Text size="medium" align="center" title="U+0E1A | Dec:3610">
          บ
        </Text>
        <Text size="medium" align="center" title="U+0E1B | Dec:3611">
          ป
        </Text>
        <Text size="medium" align="center" title="U+0E1C | Dec:3612">
          ผ
        </Text>
        <Text size="medium" align="center" title="U+0E1D | Dec:3613">
          ฝ
        </Text>
        <Text size="medium" align="center" title="U+0E1E | Dec:3614">
          พ
        </Text>
        <Text size="medium" align="center" title="U+0E1F | Dec:3615">
          ฟ
        </Text>
        <Text size="medium" align="center" title="U+0E20 | Dec:3616">
          ภ
        </Text>
        <Text size="medium" align="center" title="U+0E21 | Dec:3617">
          ม
        </Text>
        <Text size="medium" align="center" title="U+0E22 | Dec:3618">
          ย
        </Text>
        <Text size="medium" align="center" title="U+0E23 | Dec:3619">
          ร
        </Text>
        <Text size="medium" align="center" title="U+0E24 | Dec:3620">
          ฤ
        </Text>
        <Text size="medium" align="center" title="U+0E25 | Dec:3621">
          ล
        </Text>
        <Text size="medium" align="center" title="U+0E26 | Dec:3622">
          ฦ
        </Text>
        <Text size="medium" align="center" title="U+0E27 | Dec:3623">
          ว
        </Text>
        <Text size="medium" align="center" title="U+0E28 | Dec:3624">
          ศ
        </Text>
        <Text size="medium" align="center" title="U+0E29 | Dec:3625">
          ษ
        </Text>
        <Text size="medium" align="center" title="U+0E2A | Dec:3626">
          ส
        </Text>
        <Text size="medium" align="center" title="U+0E2B | Dec:3627">
          ห
        </Text>
        <Text size="medium" align="center" title="U+0E2C | Dec:3628">
          ฬ
        </Text>
        <Text size="medium" align="center" title="U+0E2D | Dec:3629">
          อ
        </Text>
        <Text size="medium" align="center" title="U+0E2E | Dec:3630">
          ฮ
        </Text>
        <Text size="medium" align="center" title="U+0E2F | Dec:3631">
          ฯ
        </Text>
        <Text size="medium" align="center" title="U+0E30 | Dec:3632">
          ะ
        </Text>
        <Text size="medium" align="center" title="U+0E31 | Dec:3633">
          ั
        </Text>
        <Text size="medium" align="center" title="U+0E32 | Dec:3634">
          า
        </Text>
        <Text size="medium" align="center" title="U+0E33 | Dec:3635">
          ำ
        </Text>
        <Text size="medium" align="center" title="U+0E34 | Dec:3636">
          ิ
        </Text>
        <Text size="medium" align="center" title="U+0E35 | Dec:3637">
          ี
        </Text>
        <Text size="medium" align="center" title="U+0E36 | Dec:3638">
          ึ
        </Text>
        <Text size="medium" align="center" title="U+0E37 | Dec:3639">
          ื
        </Text>
        <Text size="medium" align="center" title="U+0E38 | Dec:3640">
          ุ
        </Text>
        <Text size="medium" align="center" title="U+0E39 | Dec:3641">
          ู
        </Text>
        <Text size="medium" align="center" title="U+0E3A | Dec:3642">
          ฺ
        </Text>
        <Text size="medium" align="center" title="U+0E3B | Dec:3643">
          ฻
        </Text>
        <Text size="medium" align="center" title="U+0E3C | Dec:3644">
          ฼
        </Text>
        <Text size="medium" align="center" title="U+0E3D | Dec:3645">
          ฽
        </Text>
        <Text size="medium" align="center" title="U+0E3E | Dec:3646">
          ฾
        </Text>
        <Text size="medium" align="center" title="U+0E3F | Dec:3647">
          ฿
        </Text>
        <Text size="medium" align="center" title="U+0E40 | Dec:3648">
          เ
        </Text>
        <Text size="medium" align="center" title="U+0E41 | Dec:3649">
          แ
        </Text>
        <Text size="medium" align="center" title="U+0E42 | Dec:3650">
          โ
        </Text>
        <Text size="medium" align="center" title="U+0E43 | Dec:3651">
          ใ
        </Text>
        <Text size="medium" align="center" title="U+0E44 | Dec:3652">
          ไ
        </Text>
        <Text size="medium" align="center" title="U+0E45 | Dec:3653">
          ๅ
        </Text>
        <Text size="medium" align="center" title="U+0E46 | Dec:3654">
          ๆ
        </Text>
        <Text size="medium" align="center" title="U+0E47 | Dec:3655">
          ็
        </Text>
        <Text size="medium" align="center" title="U+0E48 | Dec:3656">
          ่
        </Text>
        <Text size="medium" align="center" title="U+0E49 | Dec:3657">
          ้
        </Text>
        <Text size="medium" align="center" title="U+0E4A | Dec:3658">
          ๊
        </Text>
        <Text size="medium" align="center" title="U+0E4B | Dec:3659">
          ๋
        </Text>
        <Text size="medium" align="center" title="U+0E4C | Dec:3660">
          ์
        </Text>
        <Text size="medium" align="center" title="U+0E4D | Dec:3661">
          ํ
        </Text>
        <Text size="medium" align="center" title="U+0E4E | Dec:3662">
          ๎
        </Text>
        <Text size="medium" align="center" title="U+0E4F | Dec:3663">
          ๏
        </Text>
        <Text size="medium" align="center" title="U+0E50 | Dec:3664">
          ๐
        </Text>
        <Text size="medium" align="center" title="U+0E51 | Dec:3665">
          ๑
        </Text>
        <Text size="medium" align="center" title="U+0E52 | Dec:3666">
          ๒
        </Text>
        <Text size="medium" align="center" title="U+0E53 | Dec:3667">
          ๓
        </Text>
        <Text size="medium" align="center" title="U+0E54 | Dec:3668">
          ๔
        </Text>
        <Text size="medium" align="center" title="U+0E55 | Dec:3669">
          ๕
        </Text>
        <Text size="medium" align="center" title="U+0E56 | Dec:3670">
          ๖
        </Text>
        <Text size="medium" align="center" title="U+0E57 | Dec:3671">
          ๗
        </Text>
        <Text size="medium" align="center" title="U+0E58 | Dec:3672">
          ๘
        </Text>
        <Text size="medium" align="center" title="U+0E59 | Dec:3673">
          ๙
        </Text>
        <Text size="medium" align="center" title="U+0E5A | Dec:3674">
          ๚
        </Text>
        <Text size="medium" align="center" title="U+0E5B | Dec:3675">
          ๛
        </Text>
        <Text size="medium" align="center" title="U+0E5C | Dec:3676">
          ๜
        </Text>
        <Text size="medium" align="center" title="U+0E5D | Dec:3677">
          ๝
        </Text>
        <Text size="medium" align="center" title="U+0E5E | Dec:3678">
          ๞
        </Text>
        <Text size="medium" align="center" title="U+0E5F | Dec:3679">
          ๟
        </Text>
        <Text size="medium" align="center" title="U+0E60 | Dec:3680">
          ๠
        </Text>
        <Text size="medium" align="center" title="U+0E61 | Dec:3681">
          ๡
        </Text>
        <Text size="medium" align="center" title="U+0E62 | Dec:3682">
          ๢
        </Text>
        <Text size="medium" align="center" title="U+0E63 | Dec:3683">
          ๣
        </Text>
        <Text size="medium" align="center" title="U+0E64 | Dec:3684">
          ๤
        </Text>
        <Text size="medium" align="center" title="U+0E65 | Dec:3685">
          ๥
        </Text>
        <Text size="medium" align="center" title="U+0E66 | Dec:3686">
          ๦
        </Text>
        <Text size="medium" align="center" title="U+0E67 | Dec:3687">
          ๧
        </Text>
        <Text size="medium" align="center" title="U+0E68 | Dec:3688">
          ๨
        </Text>
        <Text size="medium" align="center" title="U+0E69 | Dec:3689">
          ๩
        </Text>
        <Text size="medium" align="center" title="U+0E6A | Dec:3690">
          ๪
        </Text>
        <Text size="medium" align="center" title="U+0E6B | Dec:3691">
          ๫
        </Text>
        <Text size="medium" align="center" title="U+0E6C | Dec:3692">
          ๬
        </Text>
        <Text size="medium" align="center" title="U+0E6D | Dec:3693">
          ๭
        </Text>
        <Text size="medium" align="center" title="U+0E6E | Dec:3694">
          ๮
        </Text>
        <Text size="medium" align="center" title="U+0E6F | Dec:3695">
          ๯
        </Text>
        <Text size="medium" align="center" title="U+0E70 | Dec:3696">
          ๰
        </Text>
        <Text size="medium" align="center" title="U+0E71 | Dec:3697">
          ๱
        </Text>
        <Text size="medium" align="center" title="U+0E72 | Dec:3698">
          ๲
        </Text>
        <Text size="medium" align="center" title="U+0E73 | Dec:3699">
          ๳
        </Text>
        <Text size="medium" align="center" title="U+0E74 | Dec:3700">
          ๴
        </Text>
        <Text size="medium" align="center" title="U+0E75 | Dec:3701">
          ๵
        </Text>
        <Text size="medium" align="center" title="U+0E76 | Dec:3702">
          ๶
        </Text>
        <Text size="medium" align="center" title="U+0E77 | Dec:3703">
          ๷
        </Text>
        <Text size="medium" align="center" title="U+0E78 | Dec:3704">
          ๸
        </Text>
        <Text size="medium" align="center" title="U+0E79 | Dec:3705">
          ๹
        </Text>
        <Text size="medium" align="center" title="U+0E7A | Dec:3706">
          ๺
        </Text>
        <Text size="medium" align="center" title="U+0E7B | Dec:3707">
          ๻
        </Text>
        <Text size="medium" align="center" title="U+0E7C | Dec:3708">
          ๼
        </Text>
        <Text size="medium" align="center" title="U+0E7D | Dec:3709">
          ๽
        </Text>
        <Text size="medium" align="center" title="U+0E7E | Dec:3710">
          ๾
        </Text>
        <Text size="medium" align="center" title="U+0E7F | Dec:3711">
          ๿
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+1E00-1EFF (Porsche Next "Latin Extended Additional")</Headline>
        <Text size="medium" align="center" title="U+1E00 | Dec:7680">
          Ḁ
        </Text>
        <Text size="medium" align="center" title="U+1E01 | Dec:7681">
          ḁ
        </Text>
        <Text size="medium" align="center" title="U+1E02 | Dec:7682">
          Ḃ
        </Text>
        <Text size="medium" align="center" title="U+1E03 | Dec:7683">
          ḃ
        </Text>
        <Text size="medium" align="center" title="U+1E04 | Dec:7684">
          Ḅ
        </Text>
        <Text size="medium" align="center" title="U+1E05 | Dec:7685">
          ḅ
        </Text>
        <Text size="medium" align="center" title="U+1E06 | Dec:7686">
          Ḇ
        </Text>
        <Text size="medium" align="center" title="U+1E07 | Dec:7687">
          ḇ
        </Text>
        <Text size="medium" align="center" title="U+1E08 | Dec:7688">
          Ḉ
        </Text>
        <Text size="medium" align="center" title="U+1E09 | Dec:7689">
          ḉ
        </Text>
        <Text size="medium" align="center" title="U+1E0A | Dec:7690">
          Ḋ
        </Text>
        <Text size="medium" align="center" title="U+1E0B | Dec:7691">
          ḋ
        </Text>
        <Text size="medium" align="center" title="U+1E0C | Dec:7692">
          Ḍ
        </Text>
        <Text size="medium" align="center" title="U+1E0D | Dec:7693">
          ḍ
        </Text>
        <Text size="medium" align="center" title="U+1E0E | Dec:7694">
          Ḏ
        </Text>
        <Text size="medium" align="center" title="U+1E0F | Dec:7695">
          ḏ
        </Text>
        <Text size="medium" align="center" title="U+1E10 | Dec:7696">
          Ḑ
        </Text>
        <Text size="medium" align="center" title="U+1E11 | Dec:7697">
          ḑ
        </Text>
        <Text size="medium" align="center" title="U+1E12 | Dec:7698">
          Ḓ
        </Text>
        <Text size="medium" align="center" title="U+1E13 | Dec:7699">
          ḓ
        </Text>
        <Text size="medium" align="center" title="U+1E14 | Dec:7700">
          Ḕ
        </Text>
        <Text size="medium" align="center" title="U+1E15 | Dec:7701">
          ḕ
        </Text>
        <Text size="medium" align="center" title="U+1E16 | Dec:7702">
          Ḗ
        </Text>
        <Text size="medium" align="center" title="U+1E17 | Dec:7703">
          ḗ
        </Text>
        <Text size="medium" align="center" title="U+1E18 | Dec:7704">
          Ḙ
        </Text>
        <Text size="medium" align="center" title="U+1E19 | Dec:7705">
          ḙ
        </Text>
        <Text size="medium" align="center" title="U+1E1A | Dec:7706">
          Ḛ
        </Text>
        <Text size="medium" align="center" title="U+1E1B | Dec:7707">
          ḛ
        </Text>
        <Text size="medium" align="center" title="U+1E1C | Dec:7708">
          Ḝ
        </Text>
        <Text size="medium" align="center" title="U+1E1D | Dec:7709">
          ḝ
        </Text>
        <Text size="medium" align="center" title="U+1E1E | Dec:7710">
          Ḟ
        </Text>
        <Text size="medium" align="center" title="U+1E1F | Dec:7711">
          ḟ
        </Text>
        <Text size="medium" align="center" title="U+1E20 | Dec:7712">
          Ḡ
        </Text>
        <Text size="medium" align="center" title="U+1E21 | Dec:7713">
          ḡ
        </Text>
        <Text size="medium" align="center" title="U+1E22 | Dec:7714">
          Ḣ
        </Text>
        <Text size="medium" align="center" title="U+1E23 | Dec:7715">
          ḣ
        </Text>
        <Text size="medium" align="center" title="U+1E24 | Dec:7716">
          Ḥ
        </Text>
        <Text size="medium" align="center" title="U+1E25 | Dec:7717">
          ḥ
        </Text>
        <Text size="medium" align="center" title="U+1E26 | Dec:7718">
          Ḧ
        </Text>
        <Text size="medium" align="center" title="U+1E27 | Dec:7719">
          ḧ
        </Text>
        <Text size="medium" align="center" title="U+1E28 | Dec:7720">
          Ḩ
        </Text>
        <Text size="medium" align="center" title="U+1E29 | Dec:7721">
          ḩ
        </Text>
        <Text size="medium" align="center" title="U+1E2A | Dec:7722">
          Ḫ
        </Text>
        <Text size="medium" align="center" title="U+1E2B | Dec:7723">
          ḫ
        </Text>
        <Text size="medium" align="center" title="U+1E2C | Dec:7724">
          Ḭ
        </Text>
        <Text size="medium" align="center" title="U+1E2D | Dec:7725">
          ḭ
        </Text>
        <Text size="medium" align="center" title="U+1E2E | Dec:7726">
          Ḯ
        </Text>
        <Text size="medium" align="center" title="U+1E2F | Dec:7727">
          ḯ
        </Text>
        <Text size="medium" align="center" title="U+1E30 | Dec:7728">
          Ḱ
        </Text>
        <Text size="medium" align="center" title="U+1E31 | Dec:7729">
          ḱ
        </Text>
        <Text size="medium" align="center" title="U+1E32 | Dec:7730">
          Ḳ
        </Text>
        <Text size="medium" align="center" title="U+1E33 | Dec:7731">
          ḳ
        </Text>
        <Text size="medium" align="center" title="U+1E34 | Dec:7732">
          Ḵ
        </Text>
        <Text size="medium" align="center" title="U+1E35 | Dec:7733">
          ḵ
        </Text>
        <Text size="medium" align="center" title="U+1E36 | Dec:7734">
          Ḷ
        </Text>
        <Text size="medium" align="center" title="U+1E37 | Dec:7735">
          ḷ
        </Text>
        <Text size="medium" align="center" title="U+1E38 | Dec:7736">
          Ḹ
        </Text>
        <Text size="medium" align="center" title="U+1E39 | Dec:7737">
          ḹ
        </Text>
        <Text size="medium" align="center" title="U+1E3A | Dec:7738">
          Ḻ
        </Text>
        <Text size="medium" align="center" title="U+1E3B | Dec:7739">
          ḻ
        </Text>
        <Text size="medium" align="center" title="U+1E3C | Dec:7740">
          Ḽ
        </Text>
        <Text size="medium" align="center" title="U+1E3D | Dec:7741">
          ḽ
        </Text>
        <Text size="medium" align="center" title="U+1E3E | Dec:7742">
          Ḿ
        </Text>
        <Text size="medium" align="center" title="U+1E3F | Dec:7743">
          ḿ
        </Text>
        <Text size="medium" align="center" title="U+1E40 | Dec:7744">
          Ṁ
        </Text>
        <Text size="medium" align="center" title="U+1E41 | Dec:7745">
          ṁ
        </Text>
        <Text size="medium" align="center" title="U+1E42 | Dec:7746">
          Ṃ
        </Text>
        <Text size="medium" align="center" title="U+1E43 | Dec:7747">
          ṃ
        </Text>
        <Text size="medium" align="center" title="U+1E44 | Dec:7748">
          Ṅ
        </Text>
        <Text size="medium" align="center" title="U+1E45 | Dec:7749">
          ṅ
        </Text>
        <Text size="medium" align="center" title="U+1E46 | Dec:7750">
          Ṇ
        </Text>
        <Text size="medium" align="center" title="U+1E47 | Dec:7751">
          ṇ
        </Text>
        <Text size="medium" align="center" title="U+1E48 | Dec:7752">
          Ṉ
        </Text>
        <Text size="medium" align="center" title="U+1E49 | Dec:7753">
          ṉ
        </Text>
        <Text size="medium" align="center" title="U+1E4A | Dec:7754">
          Ṋ
        </Text>
        <Text size="medium" align="center" title="U+1E4B | Dec:7755">
          ṋ
        </Text>
        <Text size="medium" align="center" title="U+1E4C | Dec:7756">
          Ṍ
        </Text>
        <Text size="medium" align="center" title="U+1E4D | Dec:7757">
          ṍ
        </Text>
        <Text size="medium" align="center" title="U+1E4E | Dec:7758">
          Ṏ
        </Text>
        <Text size="medium" align="center" title="U+1E4F | Dec:7759">
          ṏ
        </Text>
        <Text size="medium" align="center" title="U+1E50 | Dec:7760">
          Ṑ
        </Text>
        <Text size="medium" align="center" title="U+1E51 | Dec:7761">
          ṑ
        </Text>
        <Text size="medium" align="center" title="U+1E52 | Dec:7762">
          Ṓ
        </Text>
        <Text size="medium" align="center" title="U+1E53 | Dec:7763">
          ṓ
        </Text>
        <Text size="medium" align="center" title="U+1E54 | Dec:7764">
          Ṕ
        </Text>
        <Text size="medium" align="center" title="U+1E55 | Dec:7765">
          ṕ
        </Text>
        <Text size="medium" align="center" title="U+1E56 | Dec:7766">
          Ṗ
        </Text>
        <Text size="medium" align="center" title="U+1E57 | Dec:7767">
          ṗ
        </Text>
        <Text size="medium" align="center" title="U+1E58 | Dec:7768">
          Ṙ
        </Text>
        <Text size="medium" align="center" title="U+1E59 | Dec:7769">
          ṙ
        </Text>
        <Text size="medium" align="center" title="U+1E5A | Dec:7770">
          Ṛ
        </Text>
        <Text size="medium" align="center" title="U+1E5B | Dec:7771">
          ṛ
        </Text>
        <Text size="medium" align="center" title="U+1E5C | Dec:7772">
          Ṝ
        </Text>
        <Text size="medium" align="center" title="U+1E5D | Dec:7773">
          ṝ
        </Text>
        <Text size="medium" align="center" title="U+1E5E | Dec:7774">
          Ṟ
        </Text>
        <Text size="medium" align="center" title="U+1E5F | Dec:7775">
          ṟ
        </Text>
        <Text size="medium" align="center" title="U+1E60 | Dec:7776">
          Ṡ
        </Text>
        <Text size="medium" align="center" title="U+1E61 | Dec:7777">
          ṡ
        </Text>
        <Text size="medium" align="center" title="U+1E62 | Dec:7778">
          Ṣ
        </Text>
        <Text size="medium" align="center" title="U+1E63 | Dec:7779">
          ṣ
        </Text>
        <Text size="medium" align="center" title="U+1E64 | Dec:7780">
          Ṥ
        </Text>
        <Text size="medium" align="center" title="U+1E65 | Dec:7781">
          ṥ
        </Text>
        <Text size="medium" align="center" title="U+1E66 | Dec:7782">
          Ṧ
        </Text>
        <Text size="medium" align="center" title="U+1E67 | Dec:7783">
          ṧ
        </Text>
        <Text size="medium" align="center" title="U+1E68 | Dec:7784">
          Ṩ
        </Text>
        <Text size="medium" align="center" title="U+1E69 | Dec:7785">
          ṩ
        </Text>
        <Text size="medium" align="center" title="U+1E6A | Dec:7786">
          Ṫ
        </Text>
        <Text size="medium" align="center" title="U+1E6B | Dec:7787">
          ṫ
        </Text>
        <Text size="medium" align="center" title="U+1E6C | Dec:7788">
          Ṭ
        </Text>
        <Text size="medium" align="center" title="U+1E6D | Dec:7789">
          ṭ
        </Text>
        <Text size="medium" align="center" title="U+1E6E | Dec:7790">
          Ṯ
        </Text>
        <Text size="medium" align="center" title="U+1E6F | Dec:7791">
          ṯ
        </Text>
        <Text size="medium" align="center" title="U+1E70 | Dec:7792">
          Ṱ
        </Text>
        <Text size="medium" align="center" title="U+1E71 | Dec:7793">
          ṱ
        </Text>
        <Text size="medium" align="center" title="U+1E72 | Dec:7794">
          Ṳ
        </Text>
        <Text size="medium" align="center" title="U+1E73 | Dec:7795">
          ṳ
        </Text>
        <Text size="medium" align="center" title="U+1E74 | Dec:7796">
          Ṵ
        </Text>
        <Text size="medium" align="center" title="U+1E75 | Dec:7797">
          ṵ
        </Text>
        <Text size="medium" align="center" title="U+1E76 | Dec:7798">
          Ṷ
        </Text>
        <Text size="medium" align="center" title="U+1E77 | Dec:7799">
          ṷ
        </Text>
        <Text size="medium" align="center" title="U+1E78 | Dec:7800">
          Ṹ
        </Text>
        <Text size="medium" align="center" title="U+1E79 | Dec:7801">
          ṹ
        </Text>
        <Text size="medium" align="center" title="U+1E7A | Dec:7802">
          Ṻ
        </Text>
        <Text size="medium" align="center" title="U+1E7B | Dec:7803">
          ṻ
        </Text>
        <Text size="medium" align="center" title="U+1E7C | Dec:7804">
          Ṽ
        </Text>
        <Text size="medium" align="center" title="U+1E7D | Dec:7805">
          ṽ
        </Text>
        <Text size="medium" align="center" title="U+1E7E | Dec:7806">
          Ṿ
        </Text>
        <Text size="medium" align="center" title="U+1E7F | Dec:7807">
          ṿ
        </Text>
        <Text size="medium" align="center" title="U+1E80 | Dec:7808">
          Ẁ
        </Text>
        <Text size="medium" align="center" title="U+1E81 | Dec:7809">
          ẁ
        </Text>
        <Text size="medium" align="center" title="U+1E82 | Dec:7810">
          Ẃ
        </Text>
        <Text size="medium" align="center" title="U+1E83 | Dec:7811">
          ẃ
        </Text>
        <Text size="medium" align="center" title="U+1E84 | Dec:7812">
          Ẅ
        </Text>
        <Text size="medium" align="center" title="U+1E85 | Dec:7813">
          ẅ
        </Text>
        <Text size="medium" align="center" title="U+1E86 | Dec:7814">
          Ẇ
        </Text>
        <Text size="medium" align="center" title="U+1E87 | Dec:7815">
          ẇ
        </Text>
        <Text size="medium" align="center" title="U+1E88 | Dec:7816">
          Ẉ
        </Text>
        <Text size="medium" align="center" title="U+1E89 | Dec:7817">
          ẉ
        </Text>
        <Text size="medium" align="center" title="U+1E8A | Dec:7818">
          Ẋ
        </Text>
        <Text size="medium" align="center" title="U+1E8B | Dec:7819">
          ẋ
        </Text>
        <Text size="medium" align="center" title="U+1E8C | Dec:7820">
          Ẍ
        </Text>
        <Text size="medium" align="center" title="U+1E8D | Dec:7821">
          ẍ
        </Text>
        <Text size="medium" align="center" title="U+1E8E | Dec:7822">
          Ẏ
        </Text>
        <Text size="medium" align="center" title="U+1E8F | Dec:7823">
          ẏ
        </Text>
        <Text size="medium" align="center" title="U+1E90 | Dec:7824">
          Ẑ
        </Text>
        <Text size="medium" align="center" title="U+1E91 | Dec:7825">
          ẑ
        </Text>
        <Text size="medium" align="center" title="U+1E92 | Dec:7826">
          Ẓ
        </Text>
        <Text size="medium" align="center" title="U+1E93 | Dec:7827">
          ẓ
        </Text>
        <Text size="medium" align="center" title="U+1E94 | Dec:7828">
          Ẕ
        </Text>
        <Text size="medium" align="center" title="U+1E95 | Dec:7829">
          ẕ
        </Text>
        <Text size="medium" align="center" title="U+1E96 | Dec:7830">
          ẖ
        </Text>
        <Text size="medium" align="center" title="U+1E97 | Dec:7831">
          ẗ
        </Text>
        <Text size="medium" align="center" title="U+1E98 | Dec:7832">
          ẘ
        </Text>
        <Text size="medium" align="center" title="U+1E99 | Dec:7833">
          ẙ
        </Text>
        <Text size="medium" align="center" title="U+1E9A | Dec:7834">
          ẚ
        </Text>
        <Text size="medium" align="center" title="U+1E9B | Dec:7835">
          ẛ
        </Text>
        <Text size="medium" align="center" title="U+1E9C | Dec:7836">
          ẜ
        </Text>
        <Text size="medium" align="center" title="U+1E9D | Dec:7837">
          ẝ
        </Text>
        <Text size="medium" align="center" title="U+1E9E | Dec:7838">
          ẞ
        </Text>
        <Text size="medium" align="center" title="U+1E9F | Dec:7839">
          ẟ
        </Text>
        <Text size="medium" align="center" title="U+1EA0 | Dec:7840">
          Ạ
        </Text>
        <Text size="medium" align="center" title="U+1EA1 | Dec:7841">
          ạ
        </Text>
        <Text size="medium" align="center" title="U+1EA2 | Dec:7842">
          Ả
        </Text>
        <Text size="medium" align="center" title="U+1EA3 | Dec:7843">
          ả
        </Text>
        <Text size="medium" align="center" title="U+1EA4 | Dec:7844">
          Ấ
        </Text>
        <Text size="medium" align="center" title="U+1EA5 | Dec:7845">
          ấ
        </Text>
        <Text size="medium" align="center" title="U+1EA6 | Dec:7846">
          Ầ
        </Text>
        <Text size="medium" align="center" title="U+1EA7 | Dec:7847">
          ầ
        </Text>
        <Text size="medium" align="center" title="U+1EA8 | Dec:7848">
          Ẩ
        </Text>
        <Text size="medium" align="center" title="U+1EA9 | Dec:7849">
          ẩ
        </Text>
        <Text size="medium" align="center" title="U+1EAA | Dec:7850">
          Ẫ
        </Text>
        <Text size="medium" align="center" title="U+1EAB | Dec:7851">
          ẫ
        </Text>
        <Text size="medium" align="center" title="U+1EAC | Dec:7852">
          Ậ
        </Text>
        <Text size="medium" align="center" title="U+1EAD | Dec:7853">
          ậ
        </Text>
        <Text size="medium" align="center" title="U+1EAE | Dec:7854">
          Ắ
        </Text>
        <Text size="medium" align="center" title="U+1EAF | Dec:7855">
          ắ
        </Text>
        <Text size="medium" align="center" title="U+1EB0 | Dec:7856">
          Ằ
        </Text>
        <Text size="medium" align="center" title="U+1EB1 | Dec:7857">
          ằ
        </Text>
        <Text size="medium" align="center" title="U+1EB2 | Dec:7858">
          Ẳ
        </Text>
        <Text size="medium" align="center" title="U+1EB3 | Dec:7859">
          ẳ
        </Text>
        <Text size="medium" align="center" title="U+1EB4 | Dec:7860">
          Ẵ
        </Text>
        <Text size="medium" align="center" title="U+1EB5 | Dec:7861">
          ẵ
        </Text>
        <Text size="medium" align="center" title="U+1EB6 | Dec:7862">
          Ặ
        </Text>
        <Text size="medium" align="center" title="U+1EB7 | Dec:7863">
          ặ
        </Text>
        <Text size="medium" align="center" title="U+1EB8 | Dec:7864">
          Ẹ
        </Text>
        <Text size="medium" align="center" title="U+1EB9 | Dec:7865">
          ẹ
        </Text>
        <Text size="medium" align="center" title="U+1EBA | Dec:7866">
          Ẻ
        </Text>
        <Text size="medium" align="center" title="U+1EBB | Dec:7867">
          ẻ
        </Text>
        <Text size="medium" align="center" title="U+1EBC | Dec:7868">
          Ẽ
        </Text>
        <Text size="medium" align="center" title="U+1EBD | Dec:7869">
          ẽ
        </Text>
        <Text size="medium" align="center" title="U+1EBE | Dec:7870">
          Ế
        </Text>
        <Text size="medium" align="center" title="U+1EBF | Dec:7871">
          ế
        </Text>
        <Text size="medium" align="center" title="U+1EC0 | Dec:7872">
          Ề
        </Text>
        <Text size="medium" align="center" title="U+1EC1 | Dec:7873">
          ề
        </Text>
        <Text size="medium" align="center" title="U+1EC2 | Dec:7874">
          Ể
        </Text>
        <Text size="medium" align="center" title="U+1EC3 | Dec:7875">
          ể
        </Text>
        <Text size="medium" align="center" title="U+1EC4 | Dec:7876">
          Ễ
        </Text>
        <Text size="medium" align="center" title="U+1EC5 | Dec:7877">
          ễ
        </Text>
        <Text size="medium" align="center" title="U+1EC6 | Dec:7878">
          Ệ
        </Text>
        <Text size="medium" align="center" title="U+1EC7 | Dec:7879">
          ệ
        </Text>
        <Text size="medium" align="center" title="U+1EC8 | Dec:7880">
          Ỉ
        </Text>
        <Text size="medium" align="center" title="U+1EC9 | Dec:7881">
          ỉ
        </Text>
        <Text size="medium" align="center" title="U+1ECA | Dec:7882">
          Ị
        </Text>
        <Text size="medium" align="center" title="U+1ECB | Dec:7883">
          ị
        </Text>
        <Text size="medium" align="center" title="U+1ECC | Dec:7884">
          Ọ
        </Text>
        <Text size="medium" align="center" title="U+1ECD | Dec:7885">
          ọ
        </Text>
        <Text size="medium" align="center" title="U+1ECE | Dec:7886">
          Ỏ
        </Text>
        <Text size="medium" align="center" title="U+1ECF | Dec:7887">
          ỏ
        </Text>
        <Text size="medium" align="center" title="U+1ED0 | Dec:7888">
          Ố
        </Text>
        <Text size="medium" align="center" title="U+1ED1 | Dec:7889">
          ố
        </Text>
        <Text size="medium" align="center" title="U+1ED2 | Dec:7890">
          Ồ
        </Text>
        <Text size="medium" align="center" title="U+1ED3 | Dec:7891">
          ồ
        </Text>
        <Text size="medium" align="center" title="U+1ED4 | Dec:7892">
          Ổ
        </Text>
        <Text size="medium" align="center" title="U+1ED5 | Dec:7893">
          ổ
        </Text>
        <Text size="medium" align="center" title="U+1ED6 | Dec:7894">
          Ỗ
        </Text>
        <Text size="medium" align="center" title="U+1ED7 | Dec:7895">
          ỗ
        </Text>
        <Text size="medium" align="center" title="U+1ED8 | Dec:7896">
          Ộ
        </Text>
        <Text size="medium" align="center" title="U+1ED9 | Dec:7897">
          ộ
        </Text>
        <Text size="medium" align="center" title="U+1EDA | Dec:7898">
          Ớ
        </Text>
        <Text size="medium" align="center" title="U+1EDB | Dec:7899">
          ớ
        </Text>
        <Text size="medium" align="center" title="U+1EDC | Dec:7900">
          Ờ
        </Text>
        <Text size="medium" align="center" title="U+1EDD | Dec:7901">
          ờ
        </Text>
        <Text size="medium" align="center" title="U+1EDE | Dec:7902">
          Ở
        </Text>
        <Text size="medium" align="center" title="U+1EDF | Dec:7903">
          ở
        </Text>
        <Text size="medium" align="center" title="U+1EE0 | Dec:7904">
          Ỡ
        </Text>
        <Text size="medium" align="center" title="U+1EE1 | Dec:7905">
          ỡ
        </Text>
        <Text size="medium" align="center" title="U+1EE2 | Dec:7906">
          Ợ
        </Text>
        <Text size="medium" align="center" title="U+1EE3 | Dec:7907">
          ợ
        </Text>
        <Text size="medium" align="center" title="U+1EE4 | Dec:7908">
          Ụ
        </Text>
        <Text size="medium" align="center" title="U+1EE5 | Dec:7909">
          ụ
        </Text>
        <Text size="medium" align="center" title="U+1EE6 | Dec:7910">
          Ủ
        </Text>
        <Text size="medium" align="center" title="U+1EE7 | Dec:7911">
          ủ
        </Text>
        <Text size="medium" align="center" title="U+1EE8 | Dec:7912">
          Ứ
        </Text>
        <Text size="medium" align="center" title="U+1EE9 | Dec:7913">
          ứ
        </Text>
        <Text size="medium" align="center" title="U+1EEA | Dec:7914">
          Ừ
        </Text>
        <Text size="medium" align="center" title="U+1EEB | Dec:7915">
          ừ
        </Text>
        <Text size="medium" align="center" title="U+1EEC | Dec:7916">
          Ử
        </Text>
        <Text size="medium" align="center" title="U+1EED | Dec:7917">
          ử
        </Text>
        <Text size="medium" align="center" title="U+1EEE | Dec:7918">
          Ữ
        </Text>
        <Text size="medium" align="center" title="U+1EEF | Dec:7919">
          ữ
        </Text>
        <Text size="medium" align="center" title="U+1EF0 | Dec:7920">
          Ự
        </Text>
        <Text size="medium" align="center" title="U+1EF1 | Dec:7921">
          ự
        </Text>
        <Text size="medium" align="center" title="U+1EF2 | Dec:7922">
          Ỳ
        </Text>
        <Text size="medium" align="center" title="U+1EF3 | Dec:7923">
          ỳ
        </Text>
        <Text size="medium" align="center" title="U+1EF4 | Dec:7924">
          Ỵ
        </Text>
        <Text size="medium" align="center" title="U+1EF5 | Dec:7925">
          ỵ
        </Text>
        <Text size="medium" align="center" title="U+1EF6 | Dec:7926">
          Ỷ
        </Text>
        <Text size="medium" align="center" title="U+1EF7 | Dec:7927">
          ỷ
        </Text>
        <Text size="medium" align="center" title="U+1EF8 | Dec:7928">
          Ỹ
        </Text>
        <Text size="medium" align="center" title="U+1EF9 | Dec:7929">
          ỹ
        </Text>
        <Text size="medium" align="center" title="U+1EFA | Dec:7930">
          Ỻ
        </Text>
        <Text size="medium" align="center" title="U+1EFB | Dec:7931">
          ỻ
        </Text>
        <Text size="medium" align="center" title="U+1EFC | Dec:7932">
          Ỽ
        </Text>
        <Text size="medium" align="center" title="U+1EFD | Dec:7933">
          ỽ
        </Text>
        <Text size="medium" align="center" title="U+1EFE | Dec:7934">
          Ỿ
        </Text>
        <Text size="medium" align="center" title="U+1EFF | Dec:7935">
          ỿ
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+2000-206F (Porsche Next "General Punctuation")</Headline>
        <Text size="medium" align="center" title="U+2000 | Dec:8192"></Text>
        <Text size="medium" align="center" title="U+2001 | Dec:8193"></Text>
        <Text size="medium" align="center" title="U+2002 | Dec:8194">
          &ensp;
        </Text>
        <Text size="medium" align="center" title="U+2003 | Dec:8195">
          &emsp;
        </Text>
        <Text size="medium" align="center" title="U+2004 | Dec:8196"></Text>
        <Text size="medium" align="center" title="U+2005 | Dec:8197"></Text>
        <Text size="medium" align="center" title="U+2006 | Dec:8198"></Text>
        <Text size="medium" align="center" title="U+2007 | Dec:8199"></Text>
        <Text size="medium" align="center" title="U+2008 | Dec:8200"></Text>
        <Text size="medium" align="center" title="U+2009 | Dec:8201">
          &thinsp;
        </Text>
        <Text size="medium" align="center" title="U+200A | Dec:8202">
          &#8202;
        </Text>
        <Text size="medium" align="center" title="U+200B | Dec:8203">
          &#8203;
        </Text>
        <Text size="medium" align="center" title="U+200C | Dec:8204">
          &zwnj;
        </Text>
        <Text size="medium" align="center" title="U+200D | Dec:8205">
          &zwj;
        </Text>
        <Text size="medium" align="center" title="U+200E | Dec:8206">
          &lrm;
        </Text>
        <Text size="medium" align="center" title="U+200F | Dec:8207">
          &rlm;
        </Text>
        <Text size="medium" align="center" title="U+2010 | Dec:8208">
          ‐
        </Text>
        <Text size="medium" align="center" title="U+2011 | Dec:8209">
          ‑
        </Text>
        <Text size="medium" align="center" title="U+2012 | Dec:8210">
          ‒
        </Text>
        <Text size="medium" align="center" title="U+2013 | Dec:8211">
          –
        </Text>
        <Text size="medium" align="center" title="U+2014 | Dec:8212">
          —
        </Text>
        <Text size="medium" align="center" title="U+2015 | Dec:8213">
          ―
        </Text>
        <Text size="medium" align="center" title="U+2016 | Dec:8214">
          ‖
        </Text>
        <Text size="medium" align="center" title="U+2017 | Dec:8215">
          ‗
        </Text>
        <Text size="medium" align="center" title="U+2018 | Dec:8216">
          ‘
        </Text>
        <Text size="medium" align="center" title="U+2019 | Dec:8217">
          ’
        </Text>
        <Text size="medium" align="center" title="U+201A | Dec:8218">
          ‚
        </Text>
        <Text size="medium" align="center" title="U+201B | Dec:8219">
          ‛
        </Text>
        <Text size="medium" align="center" title="U+201C | Dec:8220">
          “
        </Text>
        <Text size="medium" align="center" title="U+201D | Dec:8221">
          ”
        </Text>
        <Text size="medium" align="center" title="U+201E | Dec:8222">
          „
        </Text>
        <Text size="medium" align="center" title="U+201F | Dec:8223">
          ‟
        </Text>
        <Text size="medium" align="center" title="U+2020 | Dec:8224">
          †
        </Text>
        <Text size="medium" align="center" title="U+2021 | Dec:8225">
          ‡
        </Text>
        <Text size="medium" align="center" title="U+2022 | Dec:8226">
          •
        </Text>
        <Text size="medium" align="center" title="U+2023 | Dec:8227">
          ‣
        </Text>
        <Text size="medium" align="center" title="U+2024 | Dec:8228">
          ․
        </Text>
        <Text size="medium" align="center" title="U+2025 | Dec:8229">
          ‥
        </Text>
        <Text size="medium" align="center" title="U+2026 | Dec:8230">
          …
        </Text>
        <Text size="medium" align="center" title="U+2027 | Dec:8231">
          ‧
        </Text>
        <Text size="medium" align="center" title="U+2028 | Dec:8232"></Text>
        <Text size="medium" align="center" title="U+2029 | Dec:8233"></Text>
        <Text size="medium" align="center" title="U+202A | Dec:8234">
          &#8234;
        </Text>
        <Text size="medium" align="center" title="U+202B | Dec:8235">
          &#8235;
        </Text>
        <Text size="medium" align="center" title="U+202C | Dec:8236">
          &#8236;
        </Text>
        <Text size="medium" align="center" title="U+202D | Dec:8237">
          &#8237;
        </Text>
        <Text size="medium" align="center" title="U+202E | Dec:8238">
          &#8238;
        </Text>
        <Text size="medium" align="center" title="U+202F | Dec:8239"></Text>
        <Text size="medium" align="center" title="U+2030 | Dec:8240">
          ‰
        </Text>
        <Text size="medium" align="center" title="U+2031 | Dec:8241">
          ‱
        </Text>
        <Text size="medium" align="center" title="U+2032 | Dec:8242">
          ′
        </Text>
        <Text size="medium" align="center" title="U+2033 | Dec:8243">
          ″
        </Text>
        <Text size="medium" align="center" title="U+2034 | Dec:8244">
          ‴
        </Text>
        <Text size="medium" align="center" title="U+2035 | Dec:8245">
          ‵
        </Text>
        <Text size="medium" align="center" title="U+2036 | Dec:8246">
          ‶
        </Text>
        <Text size="medium" align="center" title="U+2037 | Dec:8247">
          ‷
        </Text>
        <Text size="medium" align="center" title="U+2038 | Dec:8248">
          ‸
        </Text>
        <Text size="medium" align="center" title="U+2039 | Dec:8249">
          ‹
        </Text>
        <Text size="medium" align="center" title="U+203A | Dec:8250">
          ›
        </Text>
        <Text size="medium" align="center" title="U+203B | Dec:8251">
          ※
        </Text>
        <Text size="medium" align="center" title="U+203C | Dec:8252">
          ‼
        </Text>
        <Text size="medium" align="center" title="U+203D | Dec:8253">
          ‽
        </Text>
        <Text size="medium" align="center" title="U+203E | Dec:8254">
          ‾
        </Text>
        <Text size="medium" align="center" title="U+203F | Dec:8255">
          ‿
        </Text>
        <Text size="medium" align="center" title="U+2040 | Dec:8256">
          ⁀
        </Text>
        <Text size="medium" align="center" title="U+2041 | Dec:8257">
          ⁁
        </Text>
        <Text size="medium" align="center" title="U+2042 | Dec:8258">
          ⁂
        </Text>
        <Text size="medium" align="center" title="U+2043 | Dec:8259">
          ⁃
        </Text>
        <Text size="medium" align="center" title="U+2044 | Dec:8260">
          ⁄
        </Text>
        <Text size="medium" align="center" title="U+2045 | Dec:8261">
          ⁅
        </Text>
        <Text size="medium" align="center" title="U+2046 | Dec:8262">
          ⁆
        </Text>
        <Text size="medium" align="center" title="U+2047 | Dec:8263">
          ⁇
        </Text>
        <Text size="medium" align="center" title="U+2048 | Dec:8264">
          ⁈
        </Text>
        <Text size="medium" align="center" title="U+2049 | Dec:8265">
          ⁉
        </Text>
        <Text size="medium" align="center" title="U+204A | Dec:8266">
          ⁊
        </Text>
        <Text size="medium" align="center" title="U+204B | Dec:8267">
          ⁋
        </Text>
        <Text size="medium" align="center" title="U+204C | Dec:8268">
          ⁌
        </Text>
        <Text size="medium" align="center" title="U+204D | Dec:8269">
          ⁍
        </Text>
        <Text size="medium" align="center" title="U+204E | Dec:8270">
          ⁎
        </Text>
        <Text size="medium" align="center" title="U+204F | Dec:8271">
          ⁏
        </Text>
        <Text size="medium" align="center" title="U+2050 | Dec:8272">
          ⁐
        </Text>
        <Text size="medium" align="center" title="U+2051 | Dec:8273">
          ⁑
        </Text>
        <Text size="medium" align="center" title="U+2052 | Dec:8274">
          ⁒
        </Text>
        <Text size="medium" align="center" title="U+2053 | Dec:8275">
          ⁓
        </Text>
        <Text size="medium" align="center" title="U+2054 | Dec:8276">
          ⁔
        </Text>
        <Text size="medium" align="center" title="U+2055 | Dec:8277">
          ⁕
        </Text>
        <Text size="medium" align="center" title="U+2056 | Dec:8278">
          ⁖
        </Text>
        <Text size="medium" align="center" title="U+2057 | Dec:8279">
          ⁗
        </Text>
        <Text size="medium" align="center" title="U+2058 | Dec:8280">
          ⁘
        </Text>
        <Text size="medium" align="center" title="U+2059 | Dec:8281">
          ⁙
        </Text>
        <Text size="medium" align="center" title="U+205A | Dec:8282">
          ⁚
        </Text>
        <Text size="medium" align="center" title="U+205B | Dec:8283">
          ⁛
        </Text>
        <Text size="medium" align="center" title="U+205C | Dec:8284">
          ⁜
        </Text>
        <Text size="medium" align="center" title="U+205D | Dec:8285">
          ⁝
        </Text>
        <Text size="medium" align="center" title="U+205E | Dec:8286">
          ⁞
        </Text>
        <Text size="medium" align="center" title="U+205F | Dec:8287"></Text>
        <Text size="medium" align="center" title="U+2060 | Dec:8288">
          ⁠
        </Text>
        <Text size="medium" align="center" title="U+2061 | Dec:8289">
          ⁡
        </Text>
        <Text size="medium" align="center" title="U+2062 | Dec:8290">
          ⁢
        </Text>
        <Text size="medium" align="center" title="U+2063 | Dec:8291">
          ⁣
        </Text>
        <Text size="medium" align="center" title="U+2064 | Dec:8292">
          ⁤
        </Text>
        <Text size="medium" align="center" title="U+2065 | Dec:8293">
          ⁥
        </Text>
        <Text size="medium" align="center" title="U+2066 | Dec:8294">
          ⁦
        </Text>
        <Text size="medium" align="center" title="U+2067 | Dec:8295">
          ⁧
        </Text>
        <Text size="medium" align="center" title="U+2068 | Dec:8296">
          ⁨
        </Text>
        <Text size="medium" align="center" title="U+2069 | Dec:8297">
          ⁩
        </Text>
        <Text size="medium" align="center" title="U+206A | Dec:8298">
          ⁪
        </Text>
        <Text size="medium" align="center" title="U+206B | Dec:8299">
          ⁫
        </Text>
        <Text size="medium" align="center" title="U+206C | Dec:8300">
          ⁬
        </Text>
        <Text size="medium" align="center" title="U+206D | Dec:8301">
          ⁭
        </Text>
        <Text size="medium" align="center" title="U+206E | Dec:8302">
          ⁮
        </Text>
        <Text size="medium" align="center" title="U+206F | Dec:8303">
          ⁯
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+2070-209F (Porsche Next "Superscripts and Subscripts")</Headline>
        <Text size="medium" align="center" title="U+2070 | Dec:8304">
          ⁰
        </Text>
        <Text size="medium" align="center" title="U+2071 | Dec:8305">
          ⁱ
        </Text>
        <Text size="medium" align="center" title="U+2072 | Dec:8306">
          ⁲
        </Text>
        <Text size="medium" align="center" title="U+2073 | Dec:8307">
          ⁳
        </Text>
        <Text size="medium" align="center" title="U+2074 | Dec:8308">
          ⁴
        </Text>
        <Text size="medium" align="center" title="U+2075 | Dec:8309">
          ⁵
        </Text>
        <Text size="medium" align="center" title="U+2076 | Dec:8310">
          ⁶
        </Text>
        <Text size="medium" align="center" title="U+2077 | Dec:8311">
          ⁷
        </Text>
        <Text size="medium" align="center" title="U+2078 | Dec:8312">
          ⁸
        </Text>
        <Text size="medium" align="center" title="U+2079 | Dec:8313">
          ⁹
        </Text>
        <Text size="medium" align="center" title="U+207A | Dec:8314">
          ⁺
        </Text>
        <Text size="medium" align="center" title="U+207B | Dec:8315">
          ⁻
        </Text>
        <Text size="medium" align="center" title="U+207C | Dec:8316">
          ⁼
        </Text>
        <Text size="medium" align="center" title="U+207D | Dec:8317">
          ⁽
        </Text>
        <Text size="medium" align="center" title="U+207E | Dec:8318">
          ⁾
        </Text>
        <Text size="medium" align="center" title="U+207F | Dec:8319">
          ⁿ
        </Text>
        <Text size="medium" align="center" title="U+2080 | Dec:8320">
          ₀
        </Text>
        <Text size="medium" align="center" title="U+2081 | Dec:8321">
          ₁
        </Text>
        <Text size="medium" align="center" title="U+2082 | Dec:8322">
          ₂
        </Text>
        <Text size="medium" align="center" title="U+2083 | Dec:8323">
          ₃
        </Text>
        <Text size="medium" align="center" title="U+2084 | Dec:8324">
          ₄
        </Text>
        <Text size="medium" align="center" title="U+2085 | Dec:8325">
          ₅
        </Text>
        <Text size="medium" align="center" title="U+2086 | Dec:8326">
          ₆
        </Text>
        <Text size="medium" align="center" title="U+2087 | Dec:8327">
          ₇
        </Text>
        <Text size="medium" align="center" title="U+2088 | Dec:8328">
          ₈
        </Text>
        <Text size="medium" align="center" title="U+2089 | Dec:8329">
          ₉
        </Text>
        <Text size="medium" align="center" title="U+208A | Dec:8330">
          ₊
        </Text>
        <Text size="medium" align="center" title="U+208B | Dec:8331">
          ₋
        </Text>
        <Text size="medium" align="center" title="U+208C | Dec:8332">
          ₌
        </Text>
        <Text size="medium" align="center" title="U+208D | Dec:8333">
          ₍
        </Text>
        <Text size="medium" align="center" title="U+208E | Dec:8334">
          ₎
        </Text>
        <Text size="medium" align="center" title="U+208F | Dec:8335">
          ₏
        </Text>
        <Text size="medium" align="center" title="U+2090 | Dec:8336">
          ₐ
        </Text>
        <Text size="medium" align="center" title="U+2091 | Dec:8337">
          ₑ
        </Text>
        <Text size="medium" align="center" title="U+2092 | Dec:8338">
          ₒ
        </Text>
        <Text size="medium" align="center" title="U+2093 | Dec:8339">
          ₓ
        </Text>
        <Text size="medium" align="center" title="U+2094 | Dec:8340">
          ₔ
        </Text>
        <Text size="medium" align="center" title="U+2095 | Dec:8341">
          ₕ
        </Text>
        <Text size="medium" align="center" title="U+2096 | Dec:8342">
          ₖ
        </Text>
        <Text size="medium" align="center" title="U+2097 | Dec:8343">
          ₗ
        </Text>
        <Text size="medium" align="center" title="U+2098 | Dec:8344">
          ₘ
        </Text>
        <Text size="medium" align="center" title="U+2099 | Dec:8345">
          ₙ
        </Text>
        <Text size="medium" align="center" title="U+209A | Dec:8346">
          ₚ
        </Text>
        <Text size="medium" align="center" title="U+209B | Dec:8347">
          ₛ
        </Text>
        <Text size="medium" align="center" title="U+209C | Dec:8348">
          ₜ
        </Text>
        <Text size="medium" align="center" title="U+209D | Dec:8349">
          ₝
        </Text>
        <Text size="medium" align="center" title="U+209E | Dec:8350">
          ₞
        </Text>
        <Text size="medium" align="center" title="U+209F | Dec:8351">
          ₟
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+20A0-20CF (Porsche Next "Currency Symbols")</Headline>
        <Text size="medium" align="center" title="U+20A0 | Dec:8352">
          ₠
        </Text>
        <Text size="medium" align="center" title="U+20A1 | Dec:8353">
          ₡
        </Text>
        <Text size="medium" align="center" title="U+20A2 | Dec:8354">
          ₢
        </Text>
        <Text size="medium" align="center" title="U+20A3 | Dec:8355">
          ₣
        </Text>
        <Text size="medium" align="center" title="U+20A4 | Dec:8356">
          ₤
        </Text>
        <Text size="medium" align="center" title="U+20A5 | Dec:8357">
          ₥
        </Text>
        <Text size="medium" align="center" title="U+20A6 | Dec:8358">
          ₦
        </Text>
        <Text size="medium" align="center" title="U+20A7 | Dec:8359">
          ₧
        </Text>
        <Text size="medium" align="center" title="U+20A8 | Dec:8360">
          ₨
        </Text>
        <Text size="medium" align="center" title="U+20A9 | Dec:8361">
          ₩
        </Text>
        <Text size="medium" align="center" title="U+20AA | Dec:8362">
          ₪
        </Text>
        <Text size="medium" align="center" title="U+20AB | Dec:8363">
          ₫
        </Text>
        <Text size="medium" align="center" title="U+20AC | Dec:8364">
          €
        </Text>
        <Text size="medium" align="center" title="U+20AD | Dec:8365">
          ₭
        </Text>
        <Text size="medium" align="center" title="U+20AE | Dec:8366">
          ₮
        </Text>
        <Text size="medium" align="center" title="U+20AF | Dec:8367">
          ₯
        </Text>
        <Text size="medium" align="center" title="U+20B0 | Dec:8368">
          ₰
        </Text>
        <Text size="medium" align="center" title="U+20B1 | Dec:8369">
          ₱
        </Text>
        <Text size="medium" align="center" title="U+20B2 | Dec:8370">
          ₲
        </Text>
        <Text size="medium" align="center" title="U+20B3 | Dec:8371">
          ₳
        </Text>
        <Text size="medium" align="center" title="U+20B4 | Dec:8372">
          ₴
        </Text>
        <Text size="medium" align="center" title="U+20B5 | Dec:8373">
          ₵
        </Text>
        <Text size="medium" align="center" title="U+20B6 | Dec:8374">
          ₶
        </Text>
        <Text size="medium" align="center" title="U+20B7 | Dec:8375">
          ₷
        </Text>
        <Text size="medium" align="center" title="U+20B8 | Dec:8376">
          ₸
        </Text>
        <Text size="medium" align="center" title="U+20B9 | Dec:8377">
          ₹
        </Text>
        <Text size="medium" align="center" title="U+20BA | Dec:8378">
          ₺
        </Text>
        <Text size="medium" align="center" title="U+20BB | Dec:8379">
          ₻
        </Text>
        <Text size="medium" align="center" title="U+20BC | Dec:8380">
          ₼
        </Text>
        <Text size="medium" align="center" title="U+20BD | Dec:8381">
          ₽
        </Text>
        <Text size="medium" align="center" title="U+20BE | Dec:8382">
          ₾
        </Text>
        <Text size="medium" align="center" title="U+20BF | Dec:8383">
          ₿
        </Text>
        <Text size="medium" align="center" title="U+20C0 | Dec:8384">
          ⃀
        </Text>
        <Text size="medium" align="center" title="U+20C1 | Dec:8385">
          ⃁
        </Text>
        <Text size="medium" align="center" title="U+20C2 | Dec:8386">
          ⃂
        </Text>
        <Text size="medium" align="center" title="U+20C3 | Dec:8387">
          ⃃
        </Text>
        <Text size="medium" align="center" title="U+20C4 | Dec:8388">
          ⃄
        </Text>
        <Text size="medium" align="center" title="U+20C5 | Dec:8389">
          ⃅
        </Text>
        <Text size="medium" align="center" title="U+20C6 | Dec:8390">
          ⃆
        </Text>
        <Text size="medium" align="center" title="U+20C7 | Dec:8391">
          ⃇
        </Text>
        <Text size="medium" align="center" title="U+20C8 | Dec:8392">
          ⃈
        </Text>
        <Text size="medium" align="center" title="U+20C9 | Dec:8393">
          ⃉
        </Text>
        <Text size="medium" align="center" title="U+20CA | Dec:8394">
          ⃊
        </Text>
        <Text size="medium" align="center" title="U+20CB | Dec:8395">
          ⃋
        </Text>
        <Text size="medium" align="center" title="U+20CC | Dec:8396">
          ⃌
        </Text>
        <Text size="medium" align="center" title="U+20CD | Dec:8397">
          ⃍
        </Text>
        <Text size="medium" align="center" title="U+20CE | Dec:8398">
          ⃎
        </Text>
        <Text size="medium" align="center" title="U+20CF | Dec:8399">
          ⃏
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+2100-214F (Porsche Next "Letterlike Symbols")</Headline>
        <Text size="medium" align="center" title="U+2100 | Dec:8448">
          ℀
        </Text>
        <Text size="medium" align="center" title="U+2101 | Dec:8449">
          ℁
        </Text>
        <Text size="medium" align="center" title="U+2102 | Dec:8450">
          ℂ
        </Text>
        <Text size="medium" align="center" title="U+2103 | Dec:8451">
          ℃
        </Text>
        <Text size="medium" align="center" title="U+2104 | Dec:8452">
          ℄
        </Text>
        <Text size="medium" align="center" title="U+2105 | Dec:8453">
          ℅
        </Text>
        <Text size="medium" align="center" title="U+2106 | Dec:8454">
          ℆
        </Text>
        <Text size="medium" align="center" title="U+2107 | Dec:8455">
          ℇ
        </Text>
        <Text size="medium" align="center" title="U+2108 | Dec:8456">
          ℈
        </Text>
        <Text size="medium" align="center" title="U+2109 | Dec:8457">
          ℉
        </Text>
        <Text size="medium" align="center" title="U+210A | Dec:8458">
          ℊ
        </Text>
        <Text size="medium" align="center" title="U+210B | Dec:8459">
          ℋ
        </Text>
        <Text size="medium" align="center" title="U+210C | Dec:8460">
          ℌ
        </Text>
        <Text size="medium" align="center" title="U+210D | Dec:8461">
          ℍ
        </Text>
        <Text size="medium" align="center" title="U+210E | Dec:8462">
          ℎ
        </Text>
        <Text size="medium" align="center" title="U+210F | Dec:8463">
          ℏ
        </Text>
        <Text size="medium" align="center" title="U+2110 | Dec:8464">
          ℐ
        </Text>
        <Text size="medium" align="center" title="U+2111 | Dec:8465">
          ℑ
        </Text>
        <Text size="medium" align="center" title="U+2112 | Dec:8466">
          ℒ
        </Text>
        <Text size="medium" align="center" title="U+2113 | Dec:8467">
          ℓ
        </Text>
        <Text size="medium" align="center" title="U+2114 | Dec:8468">
          ℔
        </Text>
        <Text size="medium" align="center" title="U+2115 | Dec:8469">
          ℕ
        </Text>
        <Text size="medium" align="center" title="U+2116 | Dec:8470">
          №
        </Text>
        <Text size="medium" align="center" title="U+2117 | Dec:8471">
          ℗
        </Text>
        <Text size="medium" align="center" title="U+2118 | Dec:8472">
          ℘
        </Text>
        <Text size="medium" align="center" title="U+2119 | Dec:8473">
          ℙ
        </Text>
        <Text size="medium" align="center" title="U+211A | Dec:8474">
          ℚ
        </Text>
        <Text size="medium" align="center" title="U+211B | Dec:8475">
          ℛ
        </Text>
        <Text size="medium" align="center" title="U+211C | Dec:8476">
          ℜ
        </Text>
        <Text size="medium" align="center" title="U+211D | Dec:8477">
          ℝ
        </Text>
        <Text size="medium" align="center" title="U+211E | Dec:8478">
          ℞
        </Text>
        <Text size="medium" align="center" title="U+211F | Dec:8479">
          ℟
        </Text>
        <Text size="medium" align="center" title="U+2120 | Dec:8480">
          ℠
        </Text>
        <Text size="medium" align="center" title="U+2121 | Dec:8481">
          ℡
        </Text>
        <Text size="medium" align="center" title="U+2122 | Dec:8482">
          ™
        </Text>
        <Text size="medium" align="center" title="U+2123 | Dec:8483">
          ℣
        </Text>
        <Text size="medium" align="center" title="U+2124 | Dec:8484">
          ℤ
        </Text>
        <Text size="medium" align="center" title="U+2125 | Dec:8485">
          ℥
        </Text>
        <Text size="medium" align="center" title="U+2126 | Dec:8486">
          Ω
        </Text>
        <Text size="medium" align="center" title="U+2127 | Dec:8487">
          ℧
        </Text>
        <Text size="medium" align="center" title="U+2128 | Dec:8488">
          ℨ
        </Text>
        <Text size="medium" align="center" title="U+2129 | Dec:8489">
          ℩
        </Text>
        <Text size="medium" align="center" title="U+212A | Dec:8490">
          K
        </Text>
        <Text size="medium" align="center" title="U+212B | Dec:8491">
          Å
        </Text>
        <Text size="medium" align="center" title="U+212C | Dec:8492">
          ℬ
        </Text>
        <Text size="medium" align="center" title="U+212D | Dec:8493">
          ℭ
        </Text>
        <Text size="medium" align="center" title="U+212E | Dec:8494">
          ℮
        </Text>
        <Text size="medium" align="center" title="U+212F | Dec:8495">
          ℯ
        </Text>
        <Text size="medium" align="center" title="U+2130 | Dec:8496">
          ℰ
        </Text>
        <Text size="medium" align="center" title="U+2131 | Dec:8497">
          ℱ
        </Text>
        <Text size="medium" align="center" title="U+2132 | Dec:8498">
          Ⅎ
        </Text>
        <Text size="medium" align="center" title="U+2133 | Dec:8499">
          ℳ
        </Text>
        <Text size="medium" align="center" title="U+2134 | Dec:8500">
          ℴ
        </Text>
        <Text size="medium" align="center" title="U+2135 | Dec:8501">
          ℵ
        </Text>
        <Text size="medium" align="center" title="U+2136 | Dec:8502">
          ℶ
        </Text>
        <Text size="medium" align="center" title="U+2137 | Dec:8503">
          ℷ
        </Text>
        <Text size="medium" align="center" title="U+2138 | Dec:8504">
          ℸ
        </Text>
        <Text size="medium" align="center" title="U+2139 | Dec:8505">
          ℹ
        </Text>
        <Text size="medium" align="center" title="U+213A | Dec:8506">
          ℺
        </Text>
        <Text size="medium" align="center" title="U+213B | Dec:8507">
          ℻
        </Text>
        <Text size="medium" align="center" title="U+213C | Dec:8508">
          ℼ
        </Text>
        <Text size="medium" align="center" title="U+213D | Dec:8509">
          ℽ
        </Text>
        <Text size="medium" align="center" title="U+213E | Dec:8510">
          ℾ
        </Text>
        <Text size="medium" align="center" title="U+213F | Dec:8511">
          ℿ
        </Text>
        <Text size="medium" align="center" title="U+2140 | Dec:8512">
          ⅀
        </Text>
        <Text size="medium" align="center" title="U+2141 | Dec:8513">
          ⅁
        </Text>
        <Text size="medium" align="center" title="U+2142 | Dec:8514">
          ⅂
        </Text>
        <Text size="medium" align="center" title="U+2143 | Dec:8515">
          ⅃
        </Text>
        <Text size="medium" align="center" title="U+2144 | Dec:8516">
          ⅄
        </Text>
        <Text size="medium" align="center" title="U+2145 | Dec:8517">
          ⅅ
        </Text>
        <Text size="medium" align="center" title="U+2146 | Dec:8518">
          ⅆ
        </Text>
        <Text size="medium" align="center" title="U+2147 | Dec:8519">
          ⅇ
        </Text>
        <Text size="medium" align="center" title="U+2148 | Dec:8520">
          ⅈ
        </Text>
        <Text size="medium" align="center" title="U+2149 | Dec:8521">
          ⅉ
        </Text>
        <Text size="medium" align="center" title="U+214A | Dec:8522">
          ⅊
        </Text>
        <Text size="medium" align="center" title="U+214B | Dec:8523">
          ⅋
        </Text>
        <Text size="medium" align="center" title="U+214C | Dec:8524">
          ⅌
        </Text>
        <Text size="medium" align="center" title="U+214D | Dec:8525">
          ⅍
        </Text>
        <Text size="medium" align="center" title="U+214E | Dec:8526">
          ⅎ
        </Text>
        <Text size="medium" align="center" title="U+214F | Dec:8527">
          ⅏
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+2150-218F (Porsche Next "Number Forms")</Headline>
        <Text size="medium" align="center" title="U+2150 | Dec:8528">
          ⅐
        </Text>
        <Text size="medium" align="center" title="U+2151 | Dec:8529">
          ⅑
        </Text>
        <Text size="medium" align="center" title="U+2152 | Dec:8530">
          ⅒
        </Text>
        <Text size="medium" align="center" title="U+2153 | Dec:8531">
          ⅓
        </Text>
        <Text size="medium" align="center" title="U+2154 | Dec:8532">
          ⅔
        </Text>
        <Text size="medium" align="center" title="U+2155 | Dec:8533">
          ⅕
        </Text>
        <Text size="medium" align="center" title="U+2156 | Dec:8534">
          ⅖
        </Text>
        <Text size="medium" align="center" title="U+2157 | Dec:8535">
          ⅗
        </Text>
        <Text size="medium" align="center" title="U+2158 | Dec:8536">
          ⅘
        </Text>
        <Text size="medium" align="center" title="U+2159 | Dec:8537">
          ⅙
        </Text>
        <Text size="medium" align="center" title="U+215A | Dec:8538">
          ⅚
        </Text>
        <Text size="medium" align="center" title="U+215B | Dec:8539">
          ⅛
        </Text>
        <Text size="medium" align="center" title="U+215C | Dec:8540">
          ⅜
        </Text>
        <Text size="medium" align="center" title="U+215D | Dec:8541">
          ⅝
        </Text>
        <Text size="medium" align="center" title="U+215E | Dec:8542">
          ⅞
        </Text>
        <Text size="medium" align="center" title="U+215F | Dec:8543">
          ⅟
        </Text>
        <Text size="medium" align="center" title="U+2160 | Dec:8544">
          Ⅰ
        </Text>
        <Text size="medium" align="center" title="U+2161 | Dec:8545">
          Ⅱ
        </Text>
        <Text size="medium" align="center" title="U+2162 | Dec:8546">
          Ⅲ
        </Text>
        <Text size="medium" align="center" title="U+2163 | Dec:8547">
          Ⅳ
        </Text>
        <Text size="medium" align="center" title="U+2164 | Dec:8548">
          Ⅴ
        </Text>
        <Text size="medium" align="center" title="U+2165 | Dec:8549">
          Ⅵ
        </Text>
        <Text size="medium" align="center" title="U+2166 | Dec:8550">
          Ⅶ
        </Text>
        <Text size="medium" align="center" title="U+2167 | Dec:8551">
          Ⅷ
        </Text>
        <Text size="medium" align="center" title="U+2168 | Dec:8552">
          Ⅸ
        </Text>
        <Text size="medium" align="center" title="U+2169 | Dec:8553">
          Ⅹ
        </Text>
        <Text size="medium" align="center" title="U+216A | Dec:8554">
          Ⅺ
        </Text>
        <Text size="medium" align="center" title="U+216B | Dec:8555">
          Ⅻ
        </Text>
        <Text size="medium" align="center" title="U+216C | Dec:8556">
          Ⅼ
        </Text>
        <Text size="medium" align="center" title="U+216D | Dec:8557">
          Ⅽ
        </Text>
        <Text size="medium" align="center" title="U+216E | Dec:8558">
          Ⅾ
        </Text>
        <Text size="medium" align="center" title="U+216F | Dec:8559">
          Ⅿ
        </Text>
        <Text size="medium" align="center" title="U+2170 | Dec:8560">
          ⅰ
        </Text>
        <Text size="medium" align="center" title="U+2171 | Dec:8561">
          ⅱ
        </Text>
        <Text size="medium" align="center" title="U+2172 | Dec:8562">
          ⅲ
        </Text>
        <Text size="medium" align="center" title="U+2173 | Dec:8563">
          ⅳ
        </Text>
        <Text size="medium" align="center" title="U+2174 | Dec:8564">
          ⅴ
        </Text>
        <Text size="medium" align="center" title="U+2175 | Dec:8565">
          ⅵ
        </Text>
        <Text size="medium" align="center" title="U+2176 | Dec:8566">
          ⅶ
        </Text>
        <Text size="medium" align="center" title="U+2177 | Dec:8567">
          ⅷ
        </Text>
        <Text size="medium" align="center" title="U+2178 | Dec:8568">
          ⅸ
        </Text>
        <Text size="medium" align="center" title="U+2179 | Dec:8569">
          ⅹ
        </Text>
        <Text size="medium" align="center" title="U+217A | Dec:8570">
          ⅺ
        </Text>
        <Text size="medium" align="center" title="U+217B | Dec:8571">
          ⅻ
        </Text>
        <Text size="medium" align="center" title="U+217C | Dec:8572">
          ⅼ
        </Text>
        <Text size="medium" align="center" title="U+217D | Dec:8573">
          ⅽ
        </Text>
        <Text size="medium" align="center" title="U+217E | Dec:8574">
          ⅾ
        </Text>
        <Text size="medium" align="center" title="U+217F | Dec:8575">
          ⅿ
        </Text>
        <Text size="medium" align="center" title="U+2180 | Dec:8576">
          ↀ
        </Text>
        <Text size="medium" align="center" title="U+2181 | Dec:8577">
          ↁ
        </Text>
        <Text size="medium" align="center" title="U+2182 | Dec:8578">
          ↂ
        </Text>
        <Text size="medium" align="center" title="U+2183 | Dec:8579">
          Ↄ
        </Text>
        <Text size="medium" align="center" title="U+2184 | Dec:8580">
          ↄ
        </Text>
        <Text size="medium" align="center" title="U+2185 | Dec:8581">
          ↅ
        </Text>
        <Text size="medium" align="center" title="U+2186 | Dec:8582">
          ↆ
        </Text>
        <Text size="medium" align="center" title="U+2187 | Dec:8583">
          ↇ
        </Text>
        <Text size="medium" align="center" title="U+2188 | Dec:8584">
          ↈ
        </Text>
        <Text size="medium" align="center" title="U+2189 | Dec:8585">
          ↉
        </Text>
        <Text size="medium" align="center" title="U+218A | Dec:8586">
          ↊
        </Text>
        <Text size="medium" align="center" title="U+218B | Dec:8587">
          ↋
        </Text>
        <Text size="medium" align="center" title="U+218C | Dec:8588">
          ↌
        </Text>
        <Text size="medium" align="center" title="U+218D | Dec:8589">
          ↍
        </Text>
        <Text size="medium" align="center" title="U+218E | Dec:8590">
          ↎
        </Text>
        <Text size="medium" align="center" title="U+218F | Dec:8591">
          ↏
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+2190-21FF (Porsche Next "Arrows")</Headline>
        <Text size="medium" align="center" title="U+2190 | Dec:8592">
          ←
        </Text>
        <Text size="medium" align="center" title="U+2191 | Dec:8593">
          ↑
        </Text>
        <Text size="medium" align="center" title="U+2192 | Dec:8594">
          →
        </Text>
        <Text size="medium" align="center" title="U+2193 | Dec:8595">
          ↓
        </Text>
        <Text size="medium" align="center" title="U+2194 | Dec:8596">
          ↔
        </Text>
        <Text size="medium" align="center" title="U+2195 | Dec:8597">
          ↕
        </Text>
        <Text size="medium" align="center" title="U+2196 | Dec:8598">
          ↖
        </Text>
        <Text size="medium" align="center" title="U+2197 | Dec:8599">
          ↗
        </Text>
        <Text size="medium" align="center" title="U+2198 | Dec:8600">
          ↘
        </Text>
        <Text size="medium" align="center" title="U+2199 | Dec:8601">
          ↙
        </Text>
        <Text size="medium" align="center" title="U+219A | Dec:8602">
          ↚
        </Text>
        <Text size="medium" align="center" title="U+219B | Dec:8603">
          ↛
        </Text>
        <Text size="medium" align="center" title="U+219C | Dec:8604">
          ↜
        </Text>
        <Text size="medium" align="center" title="U+219D | Dec:8605">
          ↝
        </Text>
        <Text size="medium" align="center" title="U+219E | Dec:8606">
          ↞
        </Text>
        <Text size="medium" align="center" title="U+219F | Dec:8607">
          ↟
        </Text>
        <Text size="medium" align="center" title="U+21A0 | Dec:8608">
          ↠
        </Text>
        <Text size="medium" align="center" title="U+21A1 | Dec:8609">
          ↡
        </Text>
        <Text size="medium" align="center" title="U+21A2 | Dec:8610">
          ↢
        </Text>
        <Text size="medium" align="center" title="U+21A3 | Dec:8611">
          ↣
        </Text>
        <Text size="medium" align="center" title="U+21A4 | Dec:8612">
          ↤
        </Text>
        <Text size="medium" align="center" title="U+21A5 | Dec:8613">
          ↥
        </Text>
        <Text size="medium" align="center" title="U+21A6 | Dec:8614">
          ↦
        </Text>
        <Text size="medium" align="center" title="U+21A7 | Dec:8615">
          ↧
        </Text>
        <Text size="medium" align="center" title="U+21A8 | Dec:8616">
          ↨
        </Text>
        <Text size="medium" align="center" title="U+21A9 | Dec:8617">
          ↩
        </Text>
        <Text size="medium" align="center" title="U+21AA | Dec:8618">
          ↪
        </Text>
        <Text size="medium" align="center" title="U+21AB | Dec:8619">
          ↫
        </Text>
        <Text size="medium" align="center" title="U+21AC | Dec:8620">
          ↬
        </Text>
        <Text size="medium" align="center" title="U+21AD | Dec:8621">
          ↭
        </Text>
        <Text size="medium" align="center" title="U+21AE | Dec:8622">
          ↮
        </Text>
        <Text size="medium" align="center" title="U+21AF | Dec:8623">
          ↯
        </Text>
        <Text size="medium" align="center" title="U+21B0 | Dec:8624">
          ↰
        </Text>
        <Text size="medium" align="center" title="U+21B1 | Dec:8625">
          ↱
        </Text>
        <Text size="medium" align="center" title="U+21B2 | Dec:8626">
          ↲
        </Text>
        <Text size="medium" align="center" title="U+21B3 | Dec:8627">
          ↳
        </Text>
        <Text size="medium" align="center" title="U+21B4 | Dec:8628">
          ↴
        </Text>
        <Text size="medium" align="center" title="U+21B5 | Dec:8629">
          ↵
        </Text>
        <Text size="medium" align="center" title="U+21B6 | Dec:8630">
          ↶
        </Text>
        <Text size="medium" align="center" title="U+21B7 | Dec:8631">
          ↷
        </Text>
        <Text size="medium" align="center" title="U+21B8 | Dec:8632">
          ↸
        </Text>
        <Text size="medium" align="center" title="U+21B9 | Dec:8633">
          ↹
        </Text>
        <Text size="medium" align="center" title="U+21BA | Dec:8634">
          ↺
        </Text>
        <Text size="medium" align="center" title="U+21BB | Dec:8635">
          ↻
        </Text>
        <Text size="medium" align="center" title="U+21BC | Dec:8636">
          ↼
        </Text>
        <Text size="medium" align="center" title="U+21BD | Dec:8637">
          ↽
        </Text>
        <Text size="medium" align="center" title="U+21BE | Dec:8638">
          ↾
        </Text>
        <Text size="medium" align="center" title="U+21BF | Dec:8639">
          ↿
        </Text>
        <Text size="medium" align="center" title="U+21C0 | Dec:8640">
          ⇀
        </Text>
        <Text size="medium" align="center" title="U+21C1 | Dec:8641">
          ⇁
        </Text>
        <Text size="medium" align="center" title="U+21C2 | Dec:8642">
          ⇂
        </Text>
        <Text size="medium" align="center" title="U+21C3 | Dec:8643">
          ⇃
        </Text>
        <Text size="medium" align="center" title="U+21C4 | Dec:8644">
          ⇄
        </Text>
        <Text size="medium" align="center" title="U+21C5 | Dec:8645">
          ⇅
        </Text>
        <Text size="medium" align="center" title="U+21C6 | Dec:8646">
          ⇆
        </Text>
        <Text size="medium" align="center" title="U+21C7 | Dec:8647">
          ⇇
        </Text>
        <Text size="medium" align="center" title="U+21C8 | Dec:8648">
          ⇈
        </Text>
        <Text size="medium" align="center" title="U+21C9 | Dec:8649">
          ⇉
        </Text>
        <Text size="medium" align="center" title="U+21CA | Dec:8650">
          ⇊
        </Text>
        <Text size="medium" align="center" title="U+21CB | Dec:8651">
          ⇋
        </Text>
        <Text size="medium" align="center" title="U+21CC | Dec:8652">
          ⇌
        </Text>
        <Text size="medium" align="center" title="U+21CD | Dec:8653">
          ⇍
        </Text>
        <Text size="medium" align="center" title="U+21CE | Dec:8654">
          ⇎
        </Text>
        <Text size="medium" align="center" title="U+21CF | Dec:8655">
          ⇏
        </Text>
        <Text size="medium" align="center" title="U+21D0 | Dec:8656">
          ⇐
        </Text>
        <Text size="medium" align="center" title="U+21D1 | Dec:8657">
          ⇑
        </Text>
        <Text size="medium" align="center" title="U+21D2 | Dec:8658">
          ⇒
        </Text>
        <Text size="medium" align="center" title="U+21D3 | Dec:8659">
          ⇓
        </Text>
        <Text size="medium" align="center" title="U+21D4 | Dec:8660">
          ⇔
        </Text>
        <Text size="medium" align="center" title="U+21D5 | Dec:8661">
          ⇕
        </Text>
        <Text size="medium" align="center" title="U+21D6 | Dec:8662">
          ⇖
        </Text>
        <Text size="medium" align="center" title="U+21D7 | Dec:8663">
          ⇗
        </Text>
        <Text size="medium" align="center" title="U+21D8 | Dec:8664">
          ⇘
        </Text>
        <Text size="medium" align="center" title="U+21D9 | Dec:8665">
          ⇙
        </Text>
        <Text size="medium" align="center" title="U+21DA | Dec:8666">
          ⇚
        </Text>
        <Text size="medium" align="center" title="U+21DB | Dec:8667">
          ⇛
        </Text>
        <Text size="medium" align="center" title="U+21DC | Dec:8668">
          ⇜
        </Text>
        <Text size="medium" align="center" title="U+21DD | Dec:8669">
          ⇝
        </Text>
        <Text size="medium" align="center" title="U+21DE | Dec:8670">
          ⇞
        </Text>
        <Text size="medium" align="center" title="U+21DF | Dec:8671">
          ⇟
        </Text>
        <Text size="medium" align="center" title="U+21E0 | Dec:8672">
          ⇠
        </Text>
        <Text size="medium" align="center" title="U+21E1 | Dec:8673">
          ⇡
        </Text>
        <Text size="medium" align="center" title="U+21E2 | Dec:8674">
          ⇢
        </Text>
        <Text size="medium" align="center" title="U+21E3 | Dec:8675">
          ⇣
        </Text>
        <Text size="medium" align="center" title="U+21E4 | Dec:8676">
          ⇤
        </Text>
        <Text size="medium" align="center" title="U+21E5 | Dec:8677">
          ⇥
        </Text>
        <Text size="medium" align="center" title="U+21E6 | Dec:8678">
          ⇦
        </Text>
        <Text size="medium" align="center" title="U+21E7 | Dec:8679">
          ⇧
        </Text>
        <Text size="medium" align="center" title="U+21E8 | Dec:8680">
          ⇨
        </Text>
        <Text size="medium" align="center" title="U+21E9 | Dec:8681">
          ⇩
        </Text>
        <Text size="medium" align="center" title="U+21EA | Dec:8682">
          ⇪
        </Text>
        <Text size="medium" align="center" title="U+21EB | Dec:8683">
          ⇫
        </Text>
        <Text size="medium" align="center" title="U+21EC | Dec:8684">
          ⇬
        </Text>
        <Text size="medium" align="center" title="U+21ED | Dec:8685">
          ⇭
        </Text>
        <Text size="medium" align="center" title="U+21EE | Dec:8686">
          ⇮
        </Text>
        <Text size="medium" align="center" title="U+21EF | Dec:8687">
          ⇯
        </Text>
        <Text size="medium" align="center" title="U+21F0 | Dec:8688">
          ⇰
        </Text>
        <Text size="medium" align="center" title="U+21F1 | Dec:8689">
          ⇱
        </Text>
        <Text size="medium" align="center" title="U+21F2 | Dec:8690">
          ⇲
        </Text>
        <Text size="medium" align="center" title="U+21F3 | Dec:8691">
          ⇳
        </Text>
        <Text size="medium" align="center" title="U+21F4 | Dec:8692">
          ⇴
        </Text>
        <Text size="medium" align="center" title="U+21F5 | Dec:8693">
          ⇵
        </Text>
        <Text size="medium" align="center" title="U+21F6 | Dec:8694">
          ⇶
        </Text>
        <Text size="medium" align="center" title="U+21F7 | Dec:8695">
          ⇷
        </Text>
        <Text size="medium" align="center" title="U+21F8 | Dec:8696">
          ⇸
        </Text>
        <Text size="medium" align="center" title="U+21F9 | Dec:8697">
          ⇹
        </Text>
        <Text size="medium" align="center" title="U+21FA | Dec:8698">
          ⇺
        </Text>
        <Text size="medium" align="center" title="U+21FB | Dec:8699">
          ⇻
        </Text>
        <Text size="medium" align="center" title="U+21FC | Dec:8700">
          ⇼
        </Text>
        <Text size="medium" align="center" title="U+21FD | Dec:8701">
          ⇽
        </Text>
        <Text size="medium" align="center" title="U+21FE | Dec:8702">
          ⇾
        </Text>
        <Text size="medium" align="center" title="U+21FF | Dec:8703">
          ⇿
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+2200-22FF (Porsche Next "Mathematical Operators")</Headline>
        <Text size="medium" align="center" title="U+2200 | Dec:8704">
          ∀
        </Text>
        <Text size="medium" align="center" title="U+2201 | Dec:8705">
          ∁
        </Text>
        <Text size="medium" align="center" title="U+2202 | Dec:8706">
          ∂
        </Text>
        <Text size="medium" align="center" title="U+2203 | Dec:8707">
          ∃
        </Text>
        <Text size="medium" align="center" title="U+2204 | Dec:8708">
          ∄
        </Text>
        <Text size="medium" align="center" title="U+2205 | Dec:8709">
          ∅
        </Text>
        <Text size="medium" align="center" title="U+2206 | Dec:8710">
          ∆
        </Text>
        <Text size="medium" align="center" title="U+2207 | Dec:8711">
          ∇
        </Text>
        <Text size="medium" align="center" title="U+2208 | Dec:8712">
          ∈
        </Text>
        <Text size="medium" align="center" title="U+2209 | Dec:8713">
          ∉
        </Text>
        <Text size="medium" align="center" title="U+220A | Dec:8714">
          ∊
        </Text>
        <Text size="medium" align="center" title="U+220B | Dec:8715">
          ∋
        </Text>
        <Text size="medium" align="center" title="U+220C | Dec:8716">
          ∌
        </Text>
        <Text size="medium" align="center" title="U+220D | Dec:8717">
          ∍
        </Text>
        <Text size="medium" align="center" title="U+220E | Dec:8718">
          ∎
        </Text>
        <Text size="medium" align="center" title="U+220F | Dec:8719">
          ∏
        </Text>
        <Text size="medium" align="center" title="U+2210 | Dec:8720">
          ∐
        </Text>
        <Text size="medium" align="center" title="U+2211 | Dec:8721">
          ∑
        </Text>
        <Text size="medium" align="center" title="U+2212 | Dec:8722">
          −
        </Text>
        <Text size="medium" align="center" title="U+2213 | Dec:8723">
          ∓
        </Text>
        <Text size="medium" align="center" title="U+2214 | Dec:8724">
          ∔
        </Text>
        <Text size="medium" align="center" title="U+2215 | Dec:8725">
          ∕
        </Text>
        <Text size="medium" align="center" title="U+2216 | Dec:8726">
          ∖
        </Text>
        <Text size="medium" align="center" title="U+2217 | Dec:8727">
          ∗
        </Text>
        <Text size="medium" align="center" title="U+2218 | Dec:8728">
          ∘
        </Text>
        <Text size="medium" align="center" title="U+2219 | Dec:8729">
          ∙
        </Text>
        <Text size="medium" align="center" title="U+221A | Dec:8730">
          √
        </Text>
        <Text size="medium" align="center" title="U+221B | Dec:8731">
          ∛
        </Text>
        <Text size="medium" align="center" title="U+221C | Dec:8732">
          ∜
        </Text>
        <Text size="medium" align="center" title="U+221D | Dec:8733">
          ∝
        </Text>
        <Text size="medium" align="center" title="U+221E | Dec:8734">
          ∞
        </Text>
        <Text size="medium" align="center" title="U+221F | Dec:8735">
          ∟
        </Text>
        <Text size="medium" align="center" title="U+2220 | Dec:8736">
          ∠
        </Text>
        <Text size="medium" align="center" title="U+2221 | Dec:8737">
          ∡
        </Text>
        <Text size="medium" align="center" title="U+2222 | Dec:8738">
          ∢
        </Text>
        <Text size="medium" align="center" title="U+2223 | Dec:8739">
          ∣
        </Text>
        <Text size="medium" align="center" title="U+2224 | Dec:8740">
          ∤
        </Text>
        <Text size="medium" align="center" title="U+2225 | Dec:8741">
          ∥
        </Text>
        <Text size="medium" align="center" title="U+2226 | Dec:8742">
          ∦
        </Text>
        <Text size="medium" align="center" title="U+2227 | Dec:8743">
          ∧
        </Text>
        <Text size="medium" align="center" title="U+2228 | Dec:8744">
          ∨
        </Text>
        <Text size="medium" align="center" title="U+2229 | Dec:8745">
          ∩
        </Text>
        <Text size="medium" align="center" title="U+222A | Dec:8746">
          ∪
        </Text>
        <Text size="medium" align="center" title="U+222B | Dec:8747">
          ∫
        </Text>
        <Text size="medium" align="center" title="U+222C | Dec:8748">
          ∬
        </Text>
        <Text size="medium" align="center" title="U+222D | Dec:8749">
          ∭
        </Text>
        <Text size="medium" align="center" title="U+222E | Dec:8750">
          ∮
        </Text>
        <Text size="medium" align="center" title="U+222F | Dec:8751">
          ∯
        </Text>
        <Text size="medium" align="center" title="U+2230 | Dec:8752">
          ∰
        </Text>
        <Text size="medium" align="center" title="U+2231 | Dec:8753">
          ∱
        </Text>
        <Text size="medium" align="center" title="U+2232 | Dec:8754">
          ∲
        </Text>
        <Text size="medium" align="center" title="U+2233 | Dec:8755">
          ∳
        </Text>
        <Text size="medium" align="center" title="U+2234 | Dec:8756">
          ∴
        </Text>
        <Text size="medium" align="center" title="U+2235 | Dec:8757">
          ∵
        </Text>
        <Text size="medium" align="center" title="U+2236 | Dec:8758">
          ∶
        </Text>
        <Text size="medium" align="center" title="U+2237 | Dec:8759">
          ∷
        </Text>
        <Text size="medium" align="center" title="U+2238 | Dec:8760">
          ∸
        </Text>
        <Text size="medium" align="center" title="U+2239 | Dec:8761">
          ∹
        </Text>
        <Text size="medium" align="center" title="U+223A | Dec:8762">
          ∺
        </Text>
        <Text size="medium" align="center" title="U+223B | Dec:8763">
          ∻
        </Text>
        <Text size="medium" align="center" title="U+223C | Dec:8764">
          ∼
        </Text>
        <Text size="medium" align="center" title="U+223D | Dec:8765">
          ∽
        </Text>
        <Text size="medium" align="center" title="U+223E | Dec:8766">
          ∾
        </Text>
        <Text size="medium" align="center" title="U+223F | Dec:8767">
          ∿
        </Text>
        <Text size="medium" align="center" title="U+2240 | Dec:8768">
          ≀
        </Text>
        <Text size="medium" align="center" title="U+2241 | Dec:8769">
          ≁
        </Text>
        <Text size="medium" align="center" title="U+2242 | Dec:8770">
          ≂
        </Text>
        <Text size="medium" align="center" title="U+2243 | Dec:8771">
          ≃
        </Text>
        <Text size="medium" align="center" title="U+2244 | Dec:8772">
          ≄
        </Text>
        <Text size="medium" align="center" title="U+2245 | Dec:8773">
          ≅
        </Text>
        <Text size="medium" align="center" title="U+2246 | Dec:8774">
          ≆
        </Text>
        <Text size="medium" align="center" title="U+2247 | Dec:8775">
          ≇
        </Text>
        <Text size="medium" align="center" title="U+2248 | Dec:8776">
          ≈
        </Text>
        <Text size="medium" align="center" title="U+2249 | Dec:8777">
          ≉
        </Text>
        <Text size="medium" align="center" title="U+224A | Dec:8778">
          ≊
        </Text>
        <Text size="medium" align="center" title="U+224B | Dec:8779">
          ≋
        </Text>
        <Text size="medium" align="center" title="U+224C | Dec:8780">
          ≌
        </Text>
        <Text size="medium" align="center" title="U+224D | Dec:8781">
          ≍
        </Text>
        <Text size="medium" align="center" title="U+224E | Dec:8782">
          ≎
        </Text>
        <Text size="medium" align="center" title="U+224F | Dec:8783">
          ≏
        </Text>
        <Text size="medium" align="center" title="U+2250 | Dec:8784">
          ≐
        </Text>
        <Text size="medium" align="center" title="U+2251 | Dec:8785">
          ≑
        </Text>
        <Text size="medium" align="center" title="U+2252 | Dec:8786">
          ≒
        </Text>
        <Text size="medium" align="center" title="U+2253 | Dec:8787">
          ≓
        </Text>
        <Text size="medium" align="center" title="U+2254 | Dec:8788">
          ≔
        </Text>
        <Text size="medium" align="center" title="U+2255 | Dec:8789">
          ≕
        </Text>
        <Text size="medium" align="center" title="U+2256 | Dec:8790">
          ≖
        </Text>
        <Text size="medium" align="center" title="U+2257 | Dec:8791">
          ≗
        </Text>
        <Text size="medium" align="center" title="U+2258 | Dec:8792">
          ≘
        </Text>
        <Text size="medium" align="center" title="U+2259 | Dec:8793">
          ≙
        </Text>
        <Text size="medium" align="center" title="U+225A | Dec:8794">
          ≚
        </Text>
        <Text size="medium" align="center" title="U+225B | Dec:8795">
          ≛
        </Text>
        <Text size="medium" align="center" title="U+225C | Dec:8796">
          ≜
        </Text>
        <Text size="medium" align="center" title="U+225D | Dec:8797">
          ≝
        </Text>
        <Text size="medium" align="center" title="U+225E | Dec:8798">
          ≞
        </Text>
        <Text size="medium" align="center" title="U+225F | Dec:8799">
          ≟
        </Text>
        <Text size="medium" align="center" title="U+2260 | Dec:8800">
          ≠
        </Text>
        <Text size="medium" align="center" title="U+2261 | Dec:8801">
          ≡
        </Text>
        <Text size="medium" align="center" title="U+2262 | Dec:8802">
          ≢
        </Text>
        <Text size="medium" align="center" title="U+2263 | Dec:8803">
          ≣
        </Text>
        <Text size="medium" align="center" title="U+2264 | Dec:8804">
          ≤
        </Text>
        <Text size="medium" align="center" title="U+2265 | Dec:8805">
          ≥
        </Text>
        <Text size="medium" align="center" title="U+2266 | Dec:8806">
          ≦
        </Text>
        <Text size="medium" align="center" title="U+2267 | Dec:8807">
          ≧
        </Text>
        <Text size="medium" align="center" title="U+2268 | Dec:8808">
          ≨
        </Text>
        <Text size="medium" align="center" title="U+2269 | Dec:8809">
          ≩
        </Text>
        <Text size="medium" align="center" title="U+226A | Dec:8810">
          ≪
        </Text>
        <Text size="medium" align="center" title="U+226B | Dec:8811">
          ≫
        </Text>
        <Text size="medium" align="center" title="U+226C | Dec:8812">
          ≬
        </Text>
        <Text size="medium" align="center" title="U+226D | Dec:8813">
          ≭
        </Text>
        <Text size="medium" align="center" title="U+226E | Dec:8814">
          ≮
        </Text>
        <Text size="medium" align="center" title="U+226F | Dec:8815">
          ≯
        </Text>
        <Text size="medium" align="center" title="U+2270 | Dec:8816">
          ≰
        </Text>
        <Text size="medium" align="center" title="U+2271 | Dec:8817">
          ≱
        </Text>
        <Text size="medium" align="center" title="U+2272 | Dec:8818">
          ≲
        </Text>
        <Text size="medium" align="center" title="U+2273 | Dec:8819">
          ≳
        </Text>
        <Text size="medium" align="center" title="U+2274 | Dec:8820">
          ≴
        </Text>
        <Text size="medium" align="center" title="U+2275 | Dec:8821">
          ≵
        </Text>
        <Text size="medium" align="center" title="U+2276 | Dec:8822">
          ≶
        </Text>
        <Text size="medium" align="center" title="U+2277 | Dec:8823">
          ≷
        </Text>
        <Text size="medium" align="center" title="U+2278 | Dec:8824">
          ≸
        </Text>
        <Text size="medium" align="center" title="U+2279 | Dec:8825">
          ≹
        </Text>
        <Text size="medium" align="center" title="U+227A | Dec:8826">
          ≺
        </Text>
        <Text size="medium" align="center" title="U+227B | Dec:8827">
          ≻
        </Text>
        <Text size="medium" align="center" title="U+227C | Dec:8828">
          ≼
        </Text>
        <Text size="medium" align="center" title="U+227D | Dec:8829">
          ≽
        </Text>
        <Text size="medium" align="center" title="U+227E | Dec:8830">
          ≾
        </Text>
        <Text size="medium" align="center" title="U+227F | Dec:8831">
          ≿
        </Text>
        <Text size="medium" align="center" title="U+2280 | Dec:8832">
          ⊀
        </Text>
        <Text size="medium" align="center" title="U+2281 | Dec:8833">
          ⊁
        </Text>
        <Text size="medium" align="center" title="U+2282 | Dec:8834">
          ⊂
        </Text>
        <Text size="medium" align="center" title="U+2283 | Dec:8835">
          ⊃
        </Text>
        <Text size="medium" align="center" title="U+2284 | Dec:8836">
          ⊄
        </Text>
        <Text size="medium" align="center" title="U+2285 | Dec:8837">
          ⊅
        </Text>
        <Text size="medium" align="center" title="U+2286 | Dec:8838">
          ⊆
        </Text>
        <Text size="medium" align="center" title="U+2287 | Dec:8839">
          ⊇
        </Text>
        <Text size="medium" align="center" title="U+2288 | Dec:8840">
          ⊈
        </Text>
        <Text size="medium" align="center" title="U+2289 | Dec:8841">
          ⊉
        </Text>
        <Text size="medium" align="center" title="U+228A | Dec:8842">
          ⊊
        </Text>
        <Text size="medium" align="center" title="U+228B | Dec:8843">
          ⊋
        </Text>
        <Text size="medium" align="center" title="U+228C | Dec:8844">
          ⊌
        </Text>
        <Text size="medium" align="center" title="U+228D | Dec:8845">
          ⊍
        </Text>
        <Text size="medium" align="center" title="U+228E | Dec:8846">
          ⊎
        </Text>
        <Text size="medium" align="center" title="U+228F | Dec:8847">
          ⊏
        </Text>
        <Text size="medium" align="center" title="U+2290 | Dec:8848">
          ⊐
        </Text>
        <Text size="medium" align="center" title="U+2291 | Dec:8849">
          ⊑
        </Text>
        <Text size="medium" align="center" title="U+2292 | Dec:8850">
          ⊒
        </Text>
        <Text size="medium" align="center" title="U+2293 | Dec:8851">
          ⊓
        </Text>
        <Text size="medium" align="center" title="U+2294 | Dec:8852">
          ⊔
        </Text>
        <Text size="medium" align="center" title="U+2295 | Dec:8853">
          ⊕
        </Text>
        <Text size="medium" align="center" title="U+2296 | Dec:8854">
          ⊖
        </Text>
        <Text size="medium" align="center" title="U+2297 | Dec:8855">
          ⊗
        </Text>
        <Text size="medium" align="center" title="U+2298 | Dec:8856">
          ⊘
        </Text>
        <Text size="medium" align="center" title="U+2299 | Dec:8857">
          ⊙
        </Text>
        <Text size="medium" align="center" title="U+229A | Dec:8858">
          ⊚
        </Text>
        <Text size="medium" align="center" title="U+229B | Dec:8859">
          ⊛
        </Text>
        <Text size="medium" align="center" title="U+229C | Dec:8860">
          ⊜
        </Text>
        <Text size="medium" align="center" title="U+229D | Dec:8861">
          ⊝
        </Text>
        <Text size="medium" align="center" title="U+229E | Dec:8862">
          ⊞
        </Text>
        <Text size="medium" align="center" title="U+229F | Dec:8863">
          ⊟
        </Text>
        <Text size="medium" align="center" title="U+22A0 | Dec:8864">
          ⊠
        </Text>
        <Text size="medium" align="center" title="U+22A1 | Dec:8865">
          ⊡
        </Text>
        <Text size="medium" align="center" title="U+22A2 | Dec:8866">
          ⊢
        </Text>
        <Text size="medium" align="center" title="U+22A3 | Dec:8867">
          ⊣
        </Text>
        <Text size="medium" align="center" title="U+22A4 | Dec:8868">
          ⊤
        </Text>
        <Text size="medium" align="center" title="U+22A5 | Dec:8869">
          ⊥
        </Text>
        <Text size="medium" align="center" title="U+22A6 | Dec:8870">
          ⊦
        </Text>
        <Text size="medium" align="center" title="U+22A7 | Dec:8871">
          ⊧
        </Text>
        <Text size="medium" align="center" title="U+22A8 | Dec:8872">
          ⊨
        </Text>
        <Text size="medium" align="center" title="U+22A9 | Dec:8873">
          ⊩
        </Text>
        <Text size="medium" align="center" title="U+22AA | Dec:8874">
          ⊪
        </Text>
        <Text size="medium" align="center" title="U+22AB | Dec:8875">
          ⊫
        </Text>
        <Text size="medium" align="center" title="U+22AC | Dec:8876">
          ⊬
        </Text>
        <Text size="medium" align="center" title="U+22AD | Dec:8877">
          ⊭
        </Text>
        <Text size="medium" align="center" title="U+22AE | Dec:8878">
          ⊮
        </Text>
        <Text size="medium" align="center" title="U+22AF | Dec:8879">
          ⊯
        </Text>
        <Text size="medium" align="center" title="U+22B0 | Dec:8880">
          ⊰
        </Text>
        <Text size="medium" align="center" title="U+22B1 | Dec:8881">
          ⊱
        </Text>
        <Text size="medium" align="center" title="U+22B2 | Dec:8882">
          ⊲
        </Text>
        <Text size="medium" align="center" title="U+22B3 | Dec:8883">
          ⊳
        </Text>
        <Text size="medium" align="center" title="U+22B4 | Dec:8884">
          ⊴
        </Text>
        <Text size="medium" align="center" title="U+22B5 | Dec:8885">
          ⊵
        </Text>
        <Text size="medium" align="center" title="U+22B6 | Dec:8886">
          ⊶
        </Text>
        <Text size="medium" align="center" title="U+22B7 | Dec:8887">
          ⊷
        </Text>
        <Text size="medium" align="center" title="U+22B8 | Dec:8888">
          ⊸
        </Text>
        <Text size="medium" align="center" title="U+22B9 | Dec:8889">
          ⊹
        </Text>
        <Text size="medium" align="center" title="U+22BA | Dec:8890">
          ⊺
        </Text>
        <Text size="medium" align="center" title="U+22BB | Dec:8891">
          ⊻
        </Text>
        <Text size="medium" align="center" title="U+22BC | Dec:8892">
          ⊼
        </Text>
        <Text size="medium" align="center" title="U+22BD | Dec:8893">
          ⊽
        </Text>
        <Text size="medium" align="center" title="U+22BE | Dec:8894">
          ⊾
        </Text>
        <Text size="medium" align="center" title="U+22BF | Dec:8895">
          ⊿
        </Text>
        <Text size="medium" align="center" title="U+22C0 | Dec:8896">
          ⋀
        </Text>
        <Text size="medium" align="center" title="U+22C1 | Dec:8897">
          ⋁
        </Text>
        <Text size="medium" align="center" title="U+22C2 | Dec:8898">
          ⋂
        </Text>
        <Text size="medium" align="center" title="U+22C3 | Dec:8899">
          ⋃
        </Text>
        <Text size="medium" align="center" title="U+22C4 | Dec:8900">
          ⋄
        </Text>
        <Text size="medium" align="center" title="U+22C5 | Dec:8901">
          ⋅
        </Text>
        <Text size="medium" align="center" title="U+22C6 | Dec:8902">
          ⋆
        </Text>
        <Text size="medium" align="center" title="U+22C7 | Dec:8903">
          ⋇
        </Text>
        <Text size="medium" align="center" title="U+22C8 | Dec:8904">
          ⋈
        </Text>
        <Text size="medium" align="center" title="U+22C9 | Dec:8905">
          ⋉
        </Text>
        <Text size="medium" align="center" title="U+22CA | Dec:8906">
          ⋊
        </Text>
        <Text size="medium" align="center" title="U+22CB | Dec:8907">
          ⋋
        </Text>
        <Text size="medium" align="center" title="U+22CC | Dec:8908">
          ⋌
        </Text>
        <Text size="medium" align="center" title="U+22CD | Dec:8909">
          ⋍
        </Text>
        <Text size="medium" align="center" title="U+22CE | Dec:8910">
          ⋎
        </Text>
        <Text size="medium" align="center" title="U+22CF | Dec:8911">
          ⋏
        </Text>
        <Text size="medium" align="center" title="U+22D0 | Dec:8912">
          ⋐
        </Text>
        <Text size="medium" align="center" title="U+22D1 | Dec:8913">
          ⋑
        </Text>
        <Text size="medium" align="center" title="U+22D2 | Dec:8914">
          ⋒
        </Text>
        <Text size="medium" align="center" title="U+22D3 | Dec:8915">
          ⋓
        </Text>
        <Text size="medium" align="center" title="U+22D4 | Dec:8916">
          ⋔
        </Text>
        <Text size="medium" align="center" title="U+22D5 | Dec:8917">
          ⋕
        </Text>
        <Text size="medium" align="center" title="U+22D6 | Dec:8918">
          ⋖
        </Text>
        <Text size="medium" align="center" title="U+22D7 | Dec:8919">
          ⋗
        </Text>
        <Text size="medium" align="center" title="U+22D8 | Dec:8920">
          ⋘
        </Text>
        <Text size="medium" align="center" title="U+22D9 | Dec:8921">
          ⋙
        </Text>
        <Text size="medium" align="center" title="U+22DA | Dec:8922">
          ⋚
        </Text>
        <Text size="medium" align="center" title="U+22DB | Dec:8923">
          ⋛
        </Text>
        <Text size="medium" align="center" title="U+22DC | Dec:8924">
          ⋜
        </Text>
        <Text size="medium" align="center" title="U+22DD | Dec:8925">
          ⋝
        </Text>
        <Text size="medium" align="center" title="U+22DE | Dec:8926">
          ⋞
        </Text>
        <Text size="medium" align="center" title="U+22DF | Dec:8927">
          ⋟
        </Text>
        <Text size="medium" align="center" title="U+22E0 | Dec:8928">
          ⋠
        </Text>
        <Text size="medium" align="center" title="U+22E1 | Dec:8929">
          ⋡
        </Text>
        <Text size="medium" align="center" title="U+22E2 | Dec:8930">
          ⋢
        </Text>
        <Text size="medium" align="center" title="U+22E3 | Dec:8931">
          ⋣
        </Text>
        <Text size="medium" align="center" title="U+22E4 | Dec:8932">
          ⋤
        </Text>
        <Text size="medium" align="center" title="U+22E5 | Dec:8933">
          ⋥
        </Text>
        <Text size="medium" align="center" title="U+22E6 | Dec:8934">
          ⋦
        </Text>
        <Text size="medium" align="center" title="U+22E7 | Dec:8935">
          ⋧
        </Text>
        <Text size="medium" align="center" title="U+22E8 | Dec:8936">
          ⋨
        </Text>
        <Text size="medium" align="center" title="U+22E9 | Dec:8937">
          ⋩
        </Text>
        <Text size="medium" align="center" title="U+22EA | Dec:8938">
          ⋪
        </Text>
        <Text size="medium" align="center" title="U+22EB | Dec:8939">
          ⋫
        </Text>
        <Text size="medium" align="center" title="U+22EC | Dec:8940">
          ⋬
        </Text>
        <Text size="medium" align="center" title="U+22ED | Dec:8941">
          ⋭
        </Text>
        <Text size="medium" align="center" title="U+22EE | Dec:8942">
          ⋮
        </Text>
        <Text size="medium" align="center" title="U+22EF | Dec:8943">
          ⋯
        </Text>
        <Text size="medium" align="center" title="U+22F0 | Dec:8944">
          ⋰
        </Text>
        <Text size="medium" align="center" title="U+22F1 | Dec:8945">
          ⋱
        </Text>
        <Text size="medium" align="center" title="U+22F2 | Dec:8946">
          ⋲
        </Text>
        <Text size="medium" align="center" title="U+22F3 | Dec:8947">
          ⋳
        </Text>
        <Text size="medium" align="center" title="U+22F4 | Dec:8948">
          ⋴
        </Text>
        <Text size="medium" align="center" title="U+22F5 | Dec:8949">
          ⋵
        </Text>
        <Text size="medium" align="center" title="U+22F6 | Dec:8950">
          ⋶
        </Text>
        <Text size="medium" align="center" title="U+22F7 | Dec:8951">
          ⋷
        </Text>
        <Text size="medium" align="center" title="U+22F8 | Dec:8952">
          ⋸
        </Text>
        <Text size="medium" align="center" title="U+22F9 | Dec:8953">
          ⋹
        </Text>
        <Text size="medium" align="center" title="U+22FA | Dec:8954">
          ⋺
        </Text>
        <Text size="medium" align="center" title="U+22FB | Dec:8955">
          ⋻
        </Text>
        <Text size="medium" align="center" title="U+22FC | Dec:8956">
          ⋼
        </Text>
        <Text size="medium" align="center" title="U+22FD | Dec:8957">
          ⋽
        </Text>
        <Text size="medium" align="center" title="U+22FE | Dec:8958">
          ⋾
        </Text>
        <Text size="medium" align="center" title="U+22FF | Dec:8959">
          ⋿
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+25A0-25FF (Porsche Next "Geometric Shapes")</Headline>
        <Text size="medium" align="center" title="U+25A0 | Dec:9632">
          ■
        </Text>
        <Text size="medium" align="center" title="U+25A1 | Dec:9633">
          □
        </Text>
        <Text size="medium" align="center" title="U+25A2 | Dec:9634">
          ▢
        </Text>
        <Text size="medium" align="center" title="U+25A3 | Dec:9635">
          ▣
        </Text>
        <Text size="medium" align="center" title="U+25A4 | Dec:9636">
          ▤
        </Text>
        <Text size="medium" align="center" title="U+25A5 | Dec:9637">
          ▥
        </Text>
        <Text size="medium" align="center" title="U+25A6 | Dec:9638">
          ▦
        </Text>
        <Text size="medium" align="center" title="U+25A7 | Dec:9639">
          ▧
        </Text>
        <Text size="medium" align="center" title="U+25A8 | Dec:9640">
          ▨
        </Text>
        <Text size="medium" align="center" title="U+25A9 | Dec:9641">
          ▩
        </Text>
        <Text size="medium" align="center" title="U+25AA | Dec:9642">
          ▪
        </Text>
        <Text size="medium" align="center" title="U+25AB | Dec:9643">
          ▫
        </Text>
        <Text size="medium" align="center" title="U+25AC | Dec:9644">
          ▬
        </Text>
        <Text size="medium" align="center" title="U+25AD | Dec:9645">
          ▭
        </Text>
        <Text size="medium" align="center" title="U+25AE | Dec:9646">
          ▮
        </Text>
        <Text size="medium" align="center" title="U+25AF | Dec:9647">
          ▯
        </Text>
        <Text size="medium" align="center" title="U+25B0 | Dec:9648">
          ▰
        </Text>
        <Text size="medium" align="center" title="U+25B1 | Dec:9649">
          ▱
        </Text>
        <Text size="medium" align="center" title="U+25B2 | Dec:9650">
          ▲
        </Text>
        <Text size="medium" align="center" title="U+25B3 | Dec:9651">
          △
        </Text>
        <Text size="medium" align="center" title="U+25B4 | Dec:9652">
          ▴
        </Text>
        <Text size="medium" align="center" title="U+25B5 | Dec:9653">
          ▵
        </Text>
        <Text size="medium" align="center" title="U+25B6 | Dec:9654">
          ▶
        </Text>
        <Text size="medium" align="center" title="U+25B7 | Dec:9655">
          ▷
        </Text>
        <Text size="medium" align="center" title="U+25B8 | Dec:9656">
          ▸
        </Text>
        <Text size="medium" align="center" title="U+25B9 | Dec:9657">
          ▹
        </Text>
        <Text size="medium" align="center" title="U+25BA | Dec:9658">
          ►
        </Text>
        <Text size="medium" align="center" title="U+25BB | Dec:9659">
          ▻
        </Text>
        <Text size="medium" align="center" title="U+25BC | Dec:9660">
          ▼
        </Text>
        <Text size="medium" align="center" title="U+25BD | Dec:9661">
          ▽
        </Text>
        <Text size="medium" align="center" title="U+25BE | Dec:9662">
          ▾
        </Text>
        <Text size="medium" align="center" title="U+25BF | Dec:9663">
          ▿
        </Text>
        <Text size="medium" align="center" title="U+25C0 | Dec:9664">
          ◀
        </Text>
        <Text size="medium" align="center" title="U+25C1 | Dec:9665">
          ◁
        </Text>
        <Text size="medium" align="center" title="U+25C2 | Dec:9666">
          ◂
        </Text>
        <Text size="medium" align="center" title="U+25C3 | Dec:9667">
          ◃
        </Text>
        <Text size="medium" align="center" title="U+25C4 | Dec:9668">
          ◄
        </Text>
        <Text size="medium" align="center" title="U+25C5 | Dec:9669">
          ◅
        </Text>
        <Text size="medium" align="center" title="U+25C6 | Dec:9670">
          ◆
        </Text>
        <Text size="medium" align="center" title="U+25C7 | Dec:9671">
          ◇
        </Text>
        <Text size="medium" align="center" title="U+25C8 | Dec:9672">
          ◈
        </Text>
        <Text size="medium" align="center" title="U+25C9 | Dec:9673">
          ◉
        </Text>
        <Text size="medium" align="center" title="U+25CA | Dec:9674">
          ◊
        </Text>
        <Text size="medium" align="center" title="U+25CB | Dec:9675">
          ○
        </Text>
        <Text size="medium" align="center" title="U+25CC | Dec:9676">
          ◌
        </Text>
        <Text size="medium" align="center" title="U+25CD | Dec:9677">
          ◍
        </Text>
        <Text size="medium" align="center" title="U+25CE | Dec:9678">
          ◎
        </Text>
        <Text size="medium" align="center" title="U+25CF | Dec:9679">
          ●
        </Text>
        <Text size="medium" align="center" title="U+25D0 | Dec:9680">
          ◐
        </Text>
        <Text size="medium" align="center" title="U+25D1 | Dec:9681">
          ◑
        </Text>
        <Text size="medium" align="center" title="U+25D2 | Dec:9682">
          ◒
        </Text>
        <Text size="medium" align="center" title="U+25D3 | Dec:9683">
          ◓
        </Text>
        <Text size="medium" align="center" title="U+25D4 | Dec:9684">
          ◔
        </Text>
        <Text size="medium" align="center" title="U+25D5 | Dec:9685">
          ◕
        </Text>
        <Text size="medium" align="center" title="U+25D6 | Dec:9686">
          ◖
        </Text>
        <Text size="medium" align="center" title="U+25D7 | Dec:9687">
          ◗
        </Text>
        <Text size="medium" align="center" title="U+25D8 | Dec:9688">
          ◘
        </Text>
        <Text size="medium" align="center" title="U+25D9 | Dec:9689">
          ◙
        </Text>
        <Text size="medium" align="center" title="U+25DA | Dec:9690">
          ◚
        </Text>
        <Text size="medium" align="center" title="U+25DB | Dec:9691">
          ◛
        </Text>
        <Text size="medium" align="center" title="U+25DC | Dec:9692">
          ◜
        </Text>
        <Text size="medium" align="center" title="U+25DD | Dec:9693">
          ◝
        </Text>
        <Text size="medium" align="center" title="U+25DE | Dec:9694">
          ◞
        </Text>
        <Text size="medium" align="center" title="U+25DF | Dec:9695">
          ◟
        </Text>
        <Text size="medium" align="center" title="U+25E0 | Dec:9696">
          ◠
        </Text>
        <Text size="medium" align="center" title="U+25E1 | Dec:9697">
          ◡
        </Text>
        <Text size="medium" align="center" title="U+25E2 | Dec:9698">
          ◢
        </Text>
        <Text size="medium" align="center" title="U+25E3 | Dec:9699">
          ◣
        </Text>
        <Text size="medium" align="center" title="U+25E4 | Dec:9700">
          ◤
        </Text>
        <Text size="medium" align="center" title="U+25E5 | Dec:9701">
          ◥
        </Text>
        <Text size="medium" align="center" title="U+25E6 | Dec:9702">
          ◦
        </Text>
        <Text size="medium" align="center" title="U+25E7 | Dec:9703">
          ◧
        </Text>
        <Text size="medium" align="center" title="U+25E8 | Dec:9704">
          ◨
        </Text>
        <Text size="medium" align="center" title="U+25E9 | Dec:9705">
          ◩
        </Text>
        <Text size="medium" align="center" title="U+25EA | Dec:9706">
          ◪
        </Text>
        <Text size="medium" align="center" title="U+25EB | Dec:9707">
          ◫
        </Text>
        <Text size="medium" align="center" title="U+25EC | Dec:9708">
          ◬
        </Text>
        <Text size="medium" align="center" title="U+25ED | Dec:9709">
          ◭
        </Text>
        <Text size="medium" align="center" title="U+25EE | Dec:9710">
          ◮
        </Text>
        <Text size="medium" align="center" title="U+25EF | Dec:9711">
          ◯
        </Text>
        <Text size="medium" align="center" title="U+25F0 | Dec:9712">
          ◰
        </Text>
        <Text size="medium" align="center" title="U+25F1 | Dec:9713">
          ◱
        </Text>
        <Text size="medium" align="center" title="U+25F2 | Dec:9714">
          ◲
        </Text>
        <Text size="medium" align="center" title="U+25F3 | Dec:9715">
          ◳
        </Text>
        <Text size="medium" align="center" title="U+25F4 | Dec:9716">
          ◴
        </Text>
        <Text size="medium" align="center" title="U+25F5 | Dec:9717">
          ◵
        </Text>
        <Text size="medium" align="center" title="U+25F6 | Dec:9718">
          ◶
        </Text>
        <Text size="medium" align="center" title="U+25F7 | Dec:9719">
          ◷
        </Text>
        <Text size="medium" align="center" title="U+25F8 | Dec:9720">
          ◸
        </Text>
        <Text size="medium" align="center" title="U+25F9 | Dec:9721">
          ◹
        </Text>
        <Text size="medium" align="center" title="U+25FA | Dec:9722">
          ◺
        </Text>
        <Text size="medium" align="center" title="U+25FB | Dec:9723">
          ◻
        </Text>
        <Text size="medium" align="center" title="U+25FC | Dec:9724">
          ◼
        </Text>
        <Text size="medium" align="center" title="U+25FD | Dec:9725">
          ◽
        </Text>
        <Text size="medium" align="center" title="U+25FE | Dec:9726">
          ◾
        </Text>
        <Text size="medium" align="center" title="U+25FF | Dec:9727">
          ◿
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+2600-26FF (Porsche Next "Miscellaneous Symbols")</Headline>
        <Text size="medium" align="center" title="U+2600 | Dec:9728">
          ☀
        </Text>
        <Text size="medium" align="center" title="U+2601 | Dec:9729">
          ☁
        </Text>
        <Text size="medium" align="center" title="U+2602 | Dec:9730">
          ☂
        </Text>
        <Text size="medium" align="center" title="U+2603 | Dec:9731">
          ☃
        </Text>
        <Text size="medium" align="center" title="U+2604 | Dec:9732">
          ☄
        </Text>
        <Text size="medium" align="center" title="U+2605 | Dec:9733">
          ★
        </Text>
        <Text size="medium" align="center" title="U+2606 | Dec:9734">
          ☆
        </Text>
        <Text size="medium" align="center" title="U+2607 | Dec:9735">
          ☇
        </Text>
        <Text size="medium" align="center" title="U+2608 | Dec:9736">
          ☈
        </Text>
        <Text size="medium" align="center" title="U+2609 | Dec:9737">
          ☉
        </Text>
        <Text size="medium" align="center" title="U+260A | Dec:9738">
          ☊
        </Text>
        <Text size="medium" align="center" title="U+260B | Dec:9739">
          ☋
        </Text>
        <Text size="medium" align="center" title="U+260C | Dec:9740">
          ☌
        </Text>
        <Text size="medium" align="center" title="U+260D | Dec:9741">
          ☍
        </Text>
        <Text size="medium" align="center" title="U+260E | Dec:9742">
          ☎
        </Text>
        <Text size="medium" align="center" title="U+260F | Dec:9743">
          ☏
        </Text>
        <Text size="medium" align="center" title="U+2610 | Dec:9744">
          ☐
        </Text>
        <Text size="medium" align="center" title="U+2611 | Dec:9745">
          ☑
        </Text>
        <Text size="medium" align="center" title="U+2612 | Dec:9746">
          ☒
        </Text>
        <Text size="medium" align="center" title="U+2613 | Dec:9747">
          ☓
        </Text>
        <Text size="medium" align="center" title="U+2614 | Dec:9748">
          ☔
        </Text>
        <Text size="medium" align="center" title="U+2615 | Dec:9749">
          ☕
        </Text>
        <Text size="medium" align="center" title="U+2616 | Dec:9750">
          ☖
        </Text>
        <Text size="medium" align="center" title="U+2617 | Dec:9751">
          ☗
        </Text>
        <Text size="medium" align="center" title="U+2618 | Dec:9752">
          ☘
        </Text>
        <Text size="medium" align="center" title="U+2619 | Dec:9753">
          ☙
        </Text>
        <Text size="medium" align="center" title="U+261A | Dec:9754">
          ☚
        </Text>
        <Text size="medium" align="center" title="U+261B | Dec:9755">
          ☛
        </Text>
        <Text size="medium" align="center" title="U+261C | Dec:9756">
          ☜
        </Text>
        <Text size="medium" align="center" title="U+261D | Dec:9757">
          ☝
        </Text>
        <Text size="medium" align="center" title="U+261E | Dec:9758">
          ☞
        </Text>
        <Text size="medium" align="center" title="U+261F | Dec:9759">
          ☟
        </Text>
        <Text size="medium" align="center" title="U+2620 | Dec:9760">
          ☠
        </Text>
        <Text size="medium" align="center" title="U+2621 | Dec:9761">
          ☡
        </Text>
        <Text size="medium" align="center" title="U+2622 | Dec:9762">
          ☢
        </Text>
        <Text size="medium" align="center" title="U+2623 | Dec:9763">
          ☣
        </Text>
        <Text size="medium" align="center" title="U+2624 | Dec:9764">
          ☤
        </Text>
        <Text size="medium" align="center" title="U+2625 | Dec:9765">
          ☥
        </Text>
        <Text size="medium" align="center" title="U+2626 | Dec:9766">
          ☦
        </Text>
        <Text size="medium" align="center" title="U+2627 | Dec:9767">
          ☧
        </Text>
        <Text size="medium" align="center" title="U+2628 | Dec:9768">
          ☨
        </Text>
        <Text size="medium" align="center" title="U+2629 | Dec:9769">
          ☩
        </Text>
        <Text size="medium" align="center" title="U+262A | Dec:9770">
          ☪
        </Text>
        <Text size="medium" align="center" title="U+262B | Dec:9771">
          ☫
        </Text>
        <Text size="medium" align="center" title="U+262C | Dec:9772">
          ☬
        </Text>
        <Text size="medium" align="center" title="U+262D | Dec:9773">
          ☭
        </Text>
        <Text size="medium" align="center" title="U+262E | Dec:9774">
          ☮
        </Text>
        <Text size="medium" align="center" title="U+262F | Dec:9775">
          ☯
        </Text>
        <Text size="medium" align="center" title="U+2630 | Dec:9776">
          ☰
        </Text>
        <Text size="medium" align="center" title="U+2631 | Dec:9777">
          ☱
        </Text>
        <Text size="medium" align="center" title="U+2632 | Dec:9778">
          ☲
        </Text>
        <Text size="medium" align="center" title="U+2633 | Dec:9779">
          ☳
        </Text>
        <Text size="medium" align="center" title="U+2634 | Dec:9780">
          ☴
        </Text>
        <Text size="medium" align="center" title="U+2635 | Dec:9781">
          ☵
        </Text>
        <Text size="medium" align="center" title="U+2636 | Dec:9782">
          ☶
        </Text>
        <Text size="medium" align="center" title="U+2637 | Dec:9783">
          ☷
        </Text>
        <Text size="medium" align="center" title="U+2638 | Dec:9784">
          ☸
        </Text>
        <Text size="medium" align="center" title="U+2639 | Dec:9785">
          ☹
        </Text>
        <Text size="medium" align="center" title="U+263A | Dec:9786">
          ☺
        </Text>
        <Text size="medium" align="center" title="U+263B | Dec:9787">
          ☻
        </Text>
        <Text size="medium" align="center" title="U+263C | Dec:9788">
          ☼
        </Text>
        <Text size="medium" align="center" title="U+263D | Dec:9789">
          ☽
        </Text>
        <Text size="medium" align="center" title="U+263E | Dec:9790">
          ☾
        </Text>
        <Text size="medium" align="center" title="U+263F | Dec:9791">
          ☿
        </Text>
        <Text size="medium" align="center" title="U+2640 | Dec:9792">
          ♀
        </Text>
        <Text size="medium" align="center" title="U+2641 | Dec:9793">
          ♁
        </Text>
        <Text size="medium" align="center" title="U+2642 | Dec:9794">
          ♂
        </Text>
        <Text size="medium" align="center" title="U+2643 | Dec:9795">
          ♃
        </Text>
        <Text size="medium" align="center" title="U+2644 | Dec:9796">
          ♄
        </Text>
        <Text size="medium" align="center" title="U+2645 | Dec:9797">
          ♅
        </Text>
        <Text size="medium" align="center" title="U+2646 | Dec:9798">
          ♆
        </Text>
        <Text size="medium" align="center" title="U+2647 | Dec:9799">
          ♇
        </Text>
        <Text size="medium" align="center" title="U+2648 | Dec:9800">
          ♈
        </Text>
        <Text size="medium" align="center" title="U+2649 | Dec:9801">
          ♉
        </Text>
        <Text size="medium" align="center" title="U+264A | Dec:9802">
          ♊
        </Text>
        <Text size="medium" align="center" title="U+264B | Dec:9803">
          ♋
        </Text>
        <Text size="medium" align="center" title="U+264C | Dec:9804">
          ♌
        </Text>
        <Text size="medium" align="center" title="U+264D | Dec:9805">
          ♍
        </Text>
        <Text size="medium" align="center" title="U+264E | Dec:9806">
          ♎
        </Text>
        <Text size="medium" align="center" title="U+264F | Dec:9807">
          ♏
        </Text>
        <Text size="medium" align="center" title="U+2650 | Dec:9808">
          ♐
        </Text>
        <Text size="medium" align="center" title="U+2651 | Dec:9809">
          ♑
        </Text>
        <Text size="medium" align="center" title="U+2652 | Dec:9810">
          ♒
        </Text>
        <Text size="medium" align="center" title="U+2653 | Dec:9811">
          ♓
        </Text>
        <Text size="medium" align="center" title="U+2654 | Dec:9812">
          ♔
        </Text>
        <Text size="medium" align="center" title="U+2655 | Dec:9813">
          ♕
        </Text>
        <Text size="medium" align="center" title="U+2656 | Dec:9814">
          ♖
        </Text>
        <Text size="medium" align="center" title="U+2657 | Dec:9815">
          ♗
        </Text>
        <Text size="medium" align="center" title="U+2658 | Dec:9816">
          ♘
        </Text>
        <Text size="medium" align="center" title="U+2659 | Dec:9817">
          ♙
        </Text>
        <Text size="medium" align="center" title="U+265A | Dec:9818">
          ♚
        </Text>
        <Text size="medium" align="center" title="U+265B | Dec:9819">
          ♛
        </Text>
        <Text size="medium" align="center" title="U+265C | Dec:9820">
          ♜
        </Text>
        <Text size="medium" align="center" title="U+265D | Dec:9821">
          ♝
        </Text>
        <Text size="medium" align="center" title="U+265E | Dec:9822">
          ♞
        </Text>
        <Text size="medium" align="center" title="U+265F | Dec:9823">
          ♟
        </Text>
        <Text size="medium" align="center" title="U+2660 | Dec:9824">
          ♠
        </Text>
        <Text size="medium" align="center" title="U+2661 | Dec:9825">
          ♡
        </Text>
        <Text size="medium" align="center" title="U+2662 | Dec:9826">
          ♢
        </Text>
        <Text size="medium" align="center" title="U+2663 | Dec:9827">
          ♣
        </Text>
        <Text size="medium" align="center" title="U+2664 | Dec:9828">
          ♤
        </Text>
        <Text size="medium" align="center" title="U+2665 | Dec:9829">
          ♥
        </Text>
        <Text size="medium" align="center" title="U+2666 | Dec:9830">
          ♦
        </Text>
        <Text size="medium" align="center" title="U+2667 | Dec:9831">
          ♧
        </Text>
        <Text size="medium" align="center" title="U+2668 | Dec:9832">
          ♨
        </Text>
        <Text size="medium" align="center" title="U+2669 | Dec:9833">
          ♩
        </Text>
        <Text size="medium" align="center" title="U+266A | Dec:9834">
          ♪
        </Text>
        <Text size="medium" align="center" title="U+266B | Dec:9835">
          ♫
        </Text>
        <Text size="medium" align="center" title="U+266C | Dec:9836">
          ♬
        </Text>
        <Text size="medium" align="center" title="U+266D | Dec:9837">
          ♭
        </Text>
        <Text size="medium" align="center" title="U+266E | Dec:9838">
          ♮
        </Text>
        <Text size="medium" align="center" title="U+266F | Dec:9839">
          ♯
        </Text>
        <Text size="medium" align="center" title="U+2670 | Dec:9840">
          ♰
        </Text>
        <Text size="medium" align="center" title="U+2671 | Dec:9841">
          ♱
        </Text>
        <Text size="medium" align="center" title="U+2672 | Dec:9842">
          ♲
        </Text>
        <Text size="medium" align="center" title="U+2673 | Dec:9843">
          ♳
        </Text>
        <Text size="medium" align="center" title="U+2674 | Dec:9844">
          ♴
        </Text>
        <Text size="medium" align="center" title="U+2675 | Dec:9845">
          ♵
        </Text>
        <Text size="medium" align="center" title="U+2676 | Dec:9846">
          ♶
        </Text>
        <Text size="medium" align="center" title="U+2677 | Dec:9847">
          ♷
        </Text>
        <Text size="medium" align="center" title="U+2678 | Dec:9848">
          ♸
        </Text>
        <Text size="medium" align="center" title="U+2679 | Dec:9849">
          ♹
        </Text>
        <Text size="medium" align="center" title="U+267A | Dec:9850">
          ♺
        </Text>
        <Text size="medium" align="center" title="U+267B | Dec:9851">
          ♻
        </Text>
        <Text size="medium" align="center" title="U+267C | Dec:9852">
          ♼
        </Text>
        <Text size="medium" align="center" title="U+267D | Dec:9853">
          ♽
        </Text>
        <Text size="medium" align="center" title="U+267E | Dec:9854">
          ♾
        </Text>
        <Text size="medium" align="center" title="U+267F | Dec:9855">
          ♿
        </Text>
        <Text size="medium" align="center" title="U+2680 | Dec:9856">
          ⚀
        </Text>
        <Text size="medium" align="center" title="U+2681 | Dec:9857">
          ⚁
        </Text>
        <Text size="medium" align="center" title="U+2682 | Dec:9858">
          ⚂
        </Text>
        <Text size="medium" align="center" title="U+2683 | Dec:9859">
          ⚃
        </Text>
        <Text size="medium" align="center" title="U+2684 | Dec:9860">
          ⚄
        </Text>
        <Text size="medium" align="center" title="U+2685 | Dec:9861">
          ⚅
        </Text>
        <Text size="medium" align="center" title="U+2686 | Dec:9862">
          ⚆
        </Text>
        <Text size="medium" align="center" title="U+2687 | Dec:9863">
          ⚇
        </Text>
        <Text size="medium" align="center" title="U+2688 | Dec:9864">
          ⚈
        </Text>
        <Text size="medium" align="center" title="U+2689 | Dec:9865">
          ⚉
        </Text>
        <Text size="medium" align="center" title="U+268A | Dec:9866">
          ⚊
        </Text>
        <Text size="medium" align="center" title="U+268B | Dec:9867">
          ⚋
        </Text>
        <Text size="medium" align="center" title="U+268C | Dec:9868">
          ⚌
        </Text>
        <Text size="medium" align="center" title="U+268D | Dec:9869">
          ⚍
        </Text>
        <Text size="medium" align="center" title="U+268E | Dec:9870">
          ⚎
        </Text>
        <Text size="medium" align="center" title="U+268F | Dec:9871">
          ⚏
        </Text>
        <Text size="medium" align="center" title="U+2690 | Dec:9872">
          ⚐
        </Text>
        <Text size="medium" align="center" title="U+2691 | Dec:9873">
          ⚑
        </Text>
        <Text size="medium" align="center" title="U+2692 | Dec:9874">
          ⚒
        </Text>
        <Text size="medium" align="center" title="U+2693 | Dec:9875">
          ⚓
        </Text>
        <Text size="medium" align="center" title="U+2694 | Dec:9876">
          ⚔
        </Text>
        <Text size="medium" align="center" title="U+2695 | Dec:9877">
          ⚕
        </Text>
        <Text size="medium" align="center" title="U+2696 | Dec:9878">
          ⚖
        </Text>
        <Text size="medium" align="center" title="U+2697 | Dec:9879">
          ⚗
        </Text>
        <Text size="medium" align="center" title="U+2698 | Dec:9880">
          ⚘
        </Text>
        <Text size="medium" align="center" title="U+2699 | Dec:9881">
          ⚙
        </Text>
        <Text size="medium" align="center" title="U+269A | Dec:9882">
          ⚚
        </Text>
        <Text size="medium" align="center" title="U+269B | Dec:9883">
          ⚛
        </Text>
        <Text size="medium" align="center" title="U+269C | Dec:9884">
          ⚜
        </Text>
        <Text size="medium" align="center" title="U+269D | Dec:9885">
          ⚝
        </Text>
        <Text size="medium" align="center" title="U+269E | Dec:9886">
          ⚞
        </Text>
        <Text size="medium" align="center" title="U+269F | Dec:9887">
          ⚟
        </Text>
        <Text size="medium" align="center" title="U+26A0 | Dec:9888">
          ⚠
        </Text>
        <Text size="medium" align="center" title="U+26A1 | Dec:9889">
          ⚡
        </Text>
        <Text size="medium" align="center" title="U+26A2 | Dec:9890">
          ⚢
        </Text>
        <Text size="medium" align="center" title="U+26A3 | Dec:9891">
          ⚣
        </Text>
        <Text size="medium" align="center" title="U+26A4 | Dec:9892">
          ⚤
        </Text>
        <Text size="medium" align="center" title="U+26A5 | Dec:9893">
          ⚥
        </Text>
        <Text size="medium" align="center" title="U+26A6 | Dec:9894">
          ⚦
        </Text>
        <Text size="medium" align="center" title="U+26A7 | Dec:9895">
          ⚧
        </Text>
        <Text size="medium" align="center" title="U+26A8 | Dec:9896">
          ⚨
        </Text>
        <Text size="medium" align="center" title="U+26A9 | Dec:9897">
          ⚩
        </Text>
        <Text size="medium" align="center" title="U+26AA | Dec:9898">
          ⚪
        </Text>
        <Text size="medium" align="center" title="U+26AB | Dec:9899">
          ⚫
        </Text>
        <Text size="medium" align="center" title="U+26AC | Dec:9900">
          ⚬
        </Text>
        <Text size="medium" align="center" title="U+26AD | Dec:9901">
          ⚭
        </Text>
        <Text size="medium" align="center" title="U+26AE | Dec:9902">
          ⚮
        </Text>
        <Text size="medium" align="center" title="U+26AF | Dec:9903">
          ⚯
        </Text>
        <Text size="medium" align="center" title="U+26B0 | Dec:9904">
          ⚰
        </Text>
        <Text size="medium" align="center" title="U+26B1 | Dec:9905">
          ⚱
        </Text>
        <Text size="medium" align="center" title="U+26B2 | Dec:9906">
          ⚲
        </Text>
        <Text size="medium" align="center" title="U+26B3 | Dec:9907">
          ⚳
        </Text>
        <Text size="medium" align="center" title="U+26B4 | Dec:9908">
          ⚴
        </Text>
        <Text size="medium" align="center" title="U+26B5 | Dec:9909">
          ⚵
        </Text>
        <Text size="medium" align="center" title="U+26B6 | Dec:9910">
          ⚶
        </Text>
        <Text size="medium" align="center" title="U+26B7 | Dec:9911">
          ⚷
        </Text>
        <Text size="medium" align="center" title="U+26B8 | Dec:9912">
          ⚸
        </Text>
        <Text size="medium" align="center" title="U+26B9 | Dec:9913">
          ⚹
        </Text>
        <Text size="medium" align="center" title="U+26BA | Dec:9914">
          ⚺
        </Text>
        <Text size="medium" align="center" title="U+26BB | Dec:9915">
          ⚻
        </Text>
        <Text size="medium" align="center" title="U+26BC | Dec:9916">
          ⚼
        </Text>
        <Text size="medium" align="center" title="U+26BD | Dec:9917">
          ⚽
        </Text>
        <Text size="medium" align="center" title="U+26BE | Dec:9918">
          ⚾
        </Text>
        <Text size="medium" align="center" title="U+26BF | Dec:9919">
          ⚿
        </Text>
        <Text size="medium" align="center" title="U+26C0 | Dec:9920">
          ⛀
        </Text>
        <Text size="medium" align="center" title="U+26C1 | Dec:9921">
          ⛁
        </Text>
        <Text size="medium" align="center" title="U+26C2 | Dec:9922">
          ⛂
        </Text>
        <Text size="medium" align="center" title="U+26C3 | Dec:9923">
          ⛃
        </Text>
        <Text size="medium" align="center" title="U+26C4 | Dec:9924">
          ⛄
        </Text>
        <Text size="medium" align="center" title="U+26C5 | Dec:9925">
          ⛅
        </Text>
        <Text size="medium" align="center" title="U+26C6 | Dec:9926">
          ⛆
        </Text>
        <Text size="medium" align="center" title="U+26C7 | Dec:9927">
          ⛇
        </Text>
        <Text size="medium" align="center" title="U+26C8 | Dec:9928">
          ⛈
        </Text>
        <Text size="medium" align="center" title="U+26C9 | Dec:9929">
          ⛉
        </Text>
        <Text size="medium" align="center" title="U+26CA | Dec:9930">
          ⛊
        </Text>
        <Text size="medium" align="center" title="U+26CB | Dec:9931">
          ⛋
        </Text>
        <Text size="medium" align="center" title="U+26CC | Dec:9932">
          ⛌
        </Text>
        <Text size="medium" align="center" title="U+26CD | Dec:9933">
          ⛍
        </Text>
        <Text size="medium" align="center" title="U+26CE | Dec:9934">
          ⛎
        </Text>
        <Text size="medium" align="center" title="U+26CF | Dec:9935">
          ⛏
        </Text>
        <Text size="medium" align="center" title="U+26D0 | Dec:9936">
          ⛐
        </Text>
        <Text size="medium" align="center" title="U+26D1 | Dec:9937">
          ⛑
        </Text>
        <Text size="medium" align="center" title="U+26D2 | Dec:9938">
          ⛒
        </Text>
        <Text size="medium" align="center" title="U+26D3 | Dec:9939">
          ⛓
        </Text>
        <Text size="medium" align="center" title="U+26D4 | Dec:9940">
          ⛔
        </Text>
        <Text size="medium" align="center" title="U+26D5 | Dec:9941">
          ⛕
        </Text>
        <Text size="medium" align="center" title="U+26D6 | Dec:9942">
          ⛖
        </Text>
        <Text size="medium" align="center" title="U+26D7 | Dec:9943">
          ⛗
        </Text>
        <Text size="medium" align="center" title="U+26D8 | Dec:9944">
          ⛘
        </Text>
        <Text size="medium" align="center" title="U+26D9 | Dec:9945">
          ⛙
        </Text>
        <Text size="medium" align="center" title="U+26DA | Dec:9946">
          ⛚
        </Text>
        <Text size="medium" align="center" title="U+26DB | Dec:9947">
          ⛛
        </Text>
        <Text size="medium" align="center" title="U+26DC | Dec:9948">
          ⛜
        </Text>
        <Text size="medium" align="center" title="U+26DD | Dec:9949">
          ⛝
        </Text>
        <Text size="medium" align="center" title="U+26DE | Dec:9950">
          ⛞
        </Text>
        <Text size="medium" align="center" title="U+26DF | Dec:9951">
          ⛟
        </Text>
        <Text size="medium" align="center" title="U+26E0 | Dec:9952">
          ⛠
        </Text>
        <Text size="medium" align="center" title="U+26E1 | Dec:9953">
          ⛡
        </Text>
        <Text size="medium" align="center" title="U+26E2 | Dec:9954">
          ⛢
        </Text>
        <Text size="medium" align="center" title="U+26E3 | Dec:9955">
          ⛣
        </Text>
        <Text size="medium" align="center" title="U+26E4 | Dec:9956">
          ⛤
        </Text>
        <Text size="medium" align="center" title="U+26E5 | Dec:9957">
          ⛥
        </Text>
        <Text size="medium" align="center" title="U+26E6 | Dec:9958">
          ⛦
        </Text>
        <Text size="medium" align="center" title="U+26E7 | Dec:9959">
          ⛧
        </Text>
        <Text size="medium" align="center" title="U+26E8 | Dec:9960">
          ⛨
        </Text>
        <Text size="medium" align="center" title="U+26E9 | Dec:9961">
          ⛩
        </Text>
        <Text size="medium" align="center" title="U+26EA | Dec:9962">
          ⛪
        </Text>
        <Text size="medium" align="center" title="U+26EB | Dec:9963">
          ⛫
        </Text>
        <Text size="medium" align="center" title="U+26EC | Dec:9964">
          ⛬
        </Text>
        <Text size="medium" align="center" title="U+26ED | Dec:9965">
          ⛭
        </Text>
        <Text size="medium" align="center" title="U+26EE | Dec:9966">
          ⛮
        </Text>
        <Text size="medium" align="center" title="U+26EF | Dec:9967">
          ⛯
        </Text>
        <Text size="medium" align="center" title="U+26F0 | Dec:9968">
          ⛰
        </Text>
        <Text size="medium" align="center" title="U+26F1 | Dec:9969">
          ⛱
        </Text>
        <Text size="medium" align="center" title="U+26F2 | Dec:9970">
          ⛲
        </Text>
        <Text size="medium" align="center" title="U+26F3 | Dec:9971">
          ⛳
        </Text>
        <Text size="medium" align="center" title="U+26F4 | Dec:9972">
          ⛴
        </Text>
        <Text size="medium" align="center" title="U+26F5 | Dec:9973">
          ⛵
        </Text>
        <Text size="medium" align="center" title="U+26F6 | Dec:9974">
          ⛶
        </Text>
        <Text size="medium" align="center" title="U+26F7 | Dec:9975">
          ⛷
        </Text>
        <Text size="medium" align="center" title="U+26F8 | Dec:9976">
          ⛸
        </Text>
        <Text size="medium" align="center" title="U+26F9 | Dec:9977">
          ⛹
        </Text>
        <Text size="medium" align="center" title="U+26FA | Dec:9978">
          ⛺
        </Text>
        <Text size="medium" align="center" title="U+26FB | Dec:9979">
          ⛻
        </Text>
        <Text size="medium" align="center" title="U+26FC | Dec:9980">
          ⛼
        </Text>
        <Text size="medium" align="center" title="U+26FD | Dec:9981">
          ⛽
        </Text>
        <Text size="medium" align="center" title="U+26FE | Dec:9982">
          ⛾
        </Text>
        <Text size="medium" align="center" title="U+26FF | Dec:9983">
          ⛿
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+FB00-FB4F (Porsche Next "Alphabetic Presentation Forms")</Headline>
        <Text size="medium" align="center" title="U+FB00 | Dec:64256">
          ﬀ
        </Text>
        <Text size="medium" align="center" title="U+FB01 | Dec:64257">
          ﬁ
        </Text>
        <Text size="medium" align="center" title="U+FB02 | Dec:64258">
          ﬂ
        </Text>
        <Text size="medium" align="center" title="U+FB03 | Dec:64259">
          ﬃ
        </Text>
        <Text size="medium" align="center" title="U+FB04 | Dec:64260">
          ﬄ
        </Text>
        <Text size="medium" align="center" title="U+FB05 | Dec:64261">
          ﬅ
        </Text>
        <Text size="medium" align="center" title="U+FB06 | Dec:64262">
          ﬆ
        </Text>
        <Text size="medium" align="center" title="U+FB07 | Dec:64263">
          ﬇
        </Text>
        <Text size="medium" align="center" title="U+FB08 | Dec:64264">
          ﬈
        </Text>
        <Text size="medium" align="center" title="U+FB09 | Dec:64265">
          ﬉
        </Text>
        <Text size="medium" align="center" title="U+FB0A | Dec:64266">
          ﬊
        </Text>
        <Text size="medium" align="center" title="U+FB0B | Dec:64267">
          ﬋
        </Text>
        <Text size="medium" align="center" title="U+FB0C | Dec:64268">
          ﬌
        </Text>
        <Text size="medium" align="center" title="U+FB0D | Dec:64269">
          ﬍
        </Text>
        <Text size="medium" align="center" title="U+FB0E | Dec:64270">
          ﬎
        </Text>
        <Text size="medium" align="center" title="U+FB0F | Dec:64271">
          ﬏
        </Text>
        <Text size="medium" align="center" title="U+FB10 | Dec:64272">
          ﬐
        </Text>
        <Text size="medium" align="center" title="U+FB11 | Dec:64273">
          ﬑
        </Text>
        <Text size="medium" align="center" title="U+FB12 | Dec:64274">
          ﬒
        </Text>
        <Text size="medium" align="center" title="U+FB13 | Dec:64275">
          ﬓ
        </Text>
        <Text size="medium" align="center" title="U+FB14 | Dec:64276">
          ﬔ
        </Text>
        <Text size="medium" align="center" title="U+FB15 | Dec:64277">
          ﬕ
        </Text>
        <Text size="medium" align="center" title="U+FB16 | Dec:64278">
          ﬖ
        </Text>
        <Text size="medium" align="center" title="U+FB17 | Dec:64279">
          ﬗ
        </Text>
        <Text size="medium" align="center" title="U+FB18 | Dec:64280">
          ﬘
        </Text>
        <Text size="medium" align="center" title="U+FB19 | Dec:64281">
          ﬙
        </Text>
        <Text size="medium" align="center" title="U+FB1A | Dec:64282">
          ﬚
        </Text>
        <Text size="medium" align="center" title="U+FB1B | Dec:64283">
          ﬛
        </Text>
        <Text size="medium" align="center" title="U+FB1C | Dec:64284">
          ﬜
        </Text>
        <Text size="medium" align="center" title="U+FB1D | Dec:64285">
          יִ
        </Text>
        <Text size="medium" align="center" title="U+FB1E | Dec:64286">
          ﬞ
        </Text>
        <Text size="medium" align="center" title="U+FB1F | Dec:64287">
          ײַ
        </Text>
        <Text size="medium" align="center" title="U+FB20 | Dec:64288">
          ﬠ
        </Text>
        <Text size="medium" align="center" title="U+FB21 | Dec:64289">
          ﬡ
        </Text>
        <Text size="medium" align="center" title="U+FB22 | Dec:64290">
          ﬢ
        </Text>
        <Text size="medium" align="center" title="U+FB23 | Dec:64291">
          ﬣ
        </Text>
        <Text size="medium" align="center" title="U+FB24 | Dec:64292">
          ﬤ
        </Text>
        <Text size="medium" align="center" title="U+FB25 | Dec:64293">
          ﬥ
        </Text>
        <Text size="medium" align="center" title="U+FB26 | Dec:64294">
          ﬦ
        </Text>
        <Text size="medium" align="center" title="U+FB27 | Dec:64295">
          ﬧ
        </Text>
        <Text size="medium" align="center" title="U+FB28 | Dec:64296">
          ﬨ
        </Text>
        <Text size="medium" align="center" title="U+FB29 | Dec:64297">
          ﬩
        </Text>
        <Text size="medium" align="center" title="U+FB2A | Dec:64298">
          שׁ
        </Text>
        <Text size="medium" align="center" title="U+FB2B | Dec:64299">
          שׂ
        </Text>
        <Text size="medium" align="center" title="U+FB2C | Dec:64300">
          שּׁ
        </Text>
        <Text size="medium" align="center" title="U+FB2D | Dec:64301">
          שּׂ
        </Text>
        <Text size="medium" align="center" title="U+FB2E | Dec:64302">
          אַ
        </Text>
        <Text size="medium" align="center" title="U+FB2F | Dec:64303">
          אָ
        </Text>
        <Text size="medium" align="center" title="U+FB30 | Dec:64304">
          אּ
        </Text>
        <Text size="medium" align="center" title="U+FB31 | Dec:64305">
          בּ
        </Text>
        <Text size="medium" align="center" title="U+FB32 | Dec:64306">
          גּ
        </Text>
        <Text size="medium" align="center" title="U+FB33 | Dec:64307">
          דּ
        </Text>
        <Text size="medium" align="center" title="U+FB34 | Dec:64308">
          הּ
        </Text>
        <Text size="medium" align="center" title="U+FB35 | Dec:64309">
          וּ
        </Text>
        <Text size="medium" align="center" title="U+FB36 | Dec:64310">
          זּ
        </Text>
        <Text size="medium" align="center" title="U+FB37 | Dec:64311">
          ﬷
        </Text>
        <Text size="medium" align="center" title="U+FB38 | Dec:64312">
          טּ
        </Text>
        <Text size="medium" align="center" title="U+FB39 | Dec:64313">
          יּ
        </Text>
        <Text size="medium" align="center" title="U+FB3A | Dec:64314">
          ךּ
        </Text>
        <Text size="medium" align="center" title="U+FB3B | Dec:64315">
          כּ
        </Text>
        <Text size="medium" align="center" title="U+FB3C | Dec:64316">
          לּ
        </Text>
        <Text size="medium" align="center" title="U+FB3D | Dec:64317">
          ﬽
        </Text>
        <Text size="medium" align="center" title="U+FB3E | Dec:64318">
          מּ
        </Text>
        <Text size="medium" align="center" title="U+FB3F | Dec:64319">
          ﬿
        </Text>
        <Text size="medium" align="center" title="U+FB40 | Dec:64320">
          נּ
        </Text>
        <Text size="medium" align="center" title="U+FB41 | Dec:64321">
          סּ
        </Text>
        <Text size="medium" align="center" title="U+FB42 | Dec:64322">
          ﭂
        </Text>
        <Text size="medium" align="center" title="U+FB43 | Dec:64323">
          ףּ
        </Text>
        <Text size="medium" align="center" title="U+FB44 | Dec:64324">
          פּ
        </Text>
        <Text size="medium" align="center" title="U+FB45 | Dec:64325">
          ﭅
        </Text>
        <Text size="medium" align="center" title="U+FB46 | Dec:64326">
          צּ
        </Text>
        <Text size="medium" align="center" title="U+FB47 | Dec:64327">
          קּ
        </Text>
        <Text size="medium" align="center" title="U+FB48 | Dec:64328">
          רּ
        </Text>
        <Text size="medium" align="center" title="U+FB49 | Dec:64329">
          שּ
        </Text>
        <Text size="medium" align="center" title="U+FB4A | Dec:64330">
          תּ
        </Text>
        <Text size="medium" align="center" title="U+FB4B | Dec:64331">
          וֹ
        </Text>
        <Text size="medium" align="center" title="U+FB4C | Dec:64332">
          בֿ
        </Text>
        <Text size="medium" align="center" title="U+FB4D | Dec:64333">
          כֿ
        </Text>
        <Text size="medium" align="center" title="U+FB4E | Dec:64334">
          פֿ
        </Text>
        <Text size="medium" align="center" title="U+FB4F | Dec:64335">
          ﭏ
        </Text>
        <br />
        <br />
        <Headline variant="headline-4">Range: U+FE70-FEFF (Porsche Next "Arabic Presentation Forms-B")</Headline>
        <Text size="medium" align="center" title="U+FE70 | Dec:65136">
          ﹰ
        </Text>
        <Text size="medium" align="center" title="U+FE71 | Dec:65137">
          ﹱ
        </Text>
        <Text size="medium" align="center" title="U+FE72 | Dec:65138">
          ﹲ
        </Text>
        <Text size="medium" align="center" title="U+FE73 | Dec:65139">
          ﹳ
        </Text>
        <Text size="medium" align="center" title="U+FE74 | Dec:65140">
          ﹴ
        </Text>
        <Text size="medium" align="center" title="U+FE75 | Dec:65141">
          ﹵
        </Text>
        <Text size="medium" align="center" title="U+FE76 | Dec:65142">
          ﹶ
        </Text>
        <Text size="medium" align="center" title="U+FE77 | Dec:65143">
          ﹷ
        </Text>
        <Text size="medium" align="center" title="U+FE78 | Dec:65144">
          ﹸ
        </Text>
        <Text size="medium" align="center" title="U+FE79 | Dec:65145">
          ﹹ
        </Text>
        <Text size="medium" align="center" title="U+FE7A | Dec:65146">
          ﹺ
        </Text>
        <Text size="medium" align="center" title="U+FE7B | Dec:65147">
          ﹻ
        </Text>
        <Text size="medium" align="center" title="U+FE7C | Dec:65148">
          ﹼ
        </Text>
        <Text size="medium" align="center" title="U+FE7D | Dec:65149">
          ﹽ
        </Text>
        <Text size="medium" align="center" title="U+FE7E | Dec:65150">
          ﹾ
        </Text>
        <Text size="medium" align="center" title="U+FE7F | Dec:65151">
          ﹿ
        </Text>
        <Text size="medium" align="center" title="U+FE80 | Dec:65152">
          ﺀ
        </Text>
        <Text size="medium" align="center" title="U+FE81 | Dec:65153">
          ﺁ
        </Text>
        <Text size="medium" align="center" title="U+FE82 | Dec:65154">
          ﺂ
        </Text>
        <Text size="medium" align="center" title="U+FE83 | Dec:65155">
          ﺃ
        </Text>
        <Text size="medium" align="center" title="U+FE84 | Dec:65156">
          ﺄ
        </Text>
        <Text size="medium" align="center" title="U+FE85 | Dec:65157">
          ﺅ
        </Text>
        <Text size="medium" align="center" title="U+FE86 | Dec:65158">
          ﺆ
        </Text>
        <Text size="medium" align="center" title="U+FE87 | Dec:65159">
          ﺇ
        </Text>
        <Text size="medium" align="center" title="U+FE88 | Dec:65160">
          ﺈ
        </Text>
        <Text size="medium" align="center" title="U+FE89 | Dec:65161">
          ﺉ
        </Text>
        <Text size="medium" align="center" title="U+FE8A | Dec:65162">
          ﺊ
        </Text>
        <Text size="medium" align="center" title="U+FE8B | Dec:65163">
          ﺋ
        </Text>
        <Text size="medium" align="center" title="U+FE8C | Dec:65164">
          ﺌ
        </Text>
        <Text size="medium" align="center" title="U+FE8D | Dec:65165">
          ﺍ
        </Text>
        <Text size="medium" align="center" title="U+FE8E | Dec:65166">
          ﺎ
        </Text>
        <Text size="medium" align="center" title="U+FE8F | Dec:65167">
          ﺏ
        </Text>
        <Text size="medium" align="center" title="U+FE90 | Dec:65168">
          ﺐ
        </Text>
        <Text size="medium" align="center" title="U+FE91 | Dec:65169">
          ﺑ
        </Text>
        <Text size="medium" align="center" title="U+FE92 | Dec:65170">
          ﺒ
        </Text>
        <Text size="medium" align="center" title="U+FE93 | Dec:65171">
          ﺓ
        </Text>
        <Text size="medium" align="center" title="U+FE94 | Dec:65172">
          ﺔ
        </Text>
        <Text size="medium" align="center" title="U+FE95 | Dec:65173">
          ﺕ
        </Text>
        <Text size="medium" align="center" title="U+FE96 | Dec:65174">
          ﺖ
        </Text>
        <Text size="medium" align="center" title="U+FE97 | Dec:65175">
          ﺗ
        </Text>
        <Text size="medium" align="center" title="U+FE98 | Dec:65176">
          ﺘ
        </Text>
        <Text size="medium" align="center" title="U+FE99 | Dec:65177">
          ﺙ
        </Text>
        <Text size="medium" align="center" title="U+FE9A | Dec:65178">
          ﺚ
        </Text>
        <Text size="medium" align="center" title="U+FE9B | Dec:65179">
          ﺛ
        </Text>
        <Text size="medium" align="center" title="U+FE9C | Dec:65180">
          ﺜ
        </Text>
        <Text size="medium" align="center" title="U+FE9D | Dec:65181">
          ﺝ
        </Text>
        <Text size="medium" align="center" title="U+FE9E | Dec:65182">
          ﺞ
        </Text>
        <Text size="medium" align="center" title="U+FE9F | Dec:65183">
          ﺟ
        </Text>
        <Text size="medium" align="center" title="U+FEA0 | Dec:65184">
          ﺠ
        </Text>
        <Text size="medium" align="center" title="U+FEA1 | Dec:65185">
          ﺡ
        </Text>
        <Text size="medium" align="center" title="U+FEA2 | Dec:65186">
          ﺢ
        </Text>
        <Text size="medium" align="center" title="U+FEA3 | Dec:65187">
          ﺣ
        </Text>
        <Text size="medium" align="center" title="U+FEA4 | Dec:65188">
          ﺤ
        </Text>
        <Text size="medium" align="center" title="U+FEA5 | Dec:65189">
          ﺥ
        </Text>
        <Text size="medium" align="center" title="U+FEA6 | Dec:65190">
          ﺦ
        </Text>
        <Text size="medium" align="center" title="U+FEA7 | Dec:65191">
          ﺧ
        </Text>
        <Text size="medium" align="center" title="U+FEA8 | Dec:65192">
          ﺨ
        </Text>
        <Text size="medium" align="center" title="U+FEA9 | Dec:65193">
          ﺩ
        </Text>
        <Text size="medium" align="center" title="U+FEAA | Dec:65194">
          ﺪ
        </Text>
        <Text size="medium" align="center" title="U+FEAB | Dec:65195">
          ﺫ
        </Text>
        <Text size="medium" align="center" title="U+FEAC | Dec:65196">
          ﺬ
        </Text>
        <Text size="medium" align="center" title="U+FEAD | Dec:65197">
          ﺭ
        </Text>
        <Text size="medium" align="center" title="U+FEAE | Dec:65198">
          ﺮ
        </Text>
        <Text size="medium" align="center" title="U+FEAF | Dec:65199">
          ﺯ
        </Text>
        <Text size="medium" align="center" title="U+FEB0 | Dec:65200">
          ﺰ
        </Text>
        <Text size="medium" align="center" title="U+FEB1 | Dec:65201">
          ﺱ
        </Text>
        <Text size="medium" align="center" title="U+FEB2 | Dec:65202">
          ﺲ
        </Text>
        <Text size="medium" align="center" title="U+FEB3 | Dec:65203">
          ﺳ
        </Text>
        <Text size="medium" align="center" title="U+FEB4 | Dec:65204">
          ﺴ
        </Text>
        <Text size="medium" align="center" title="U+FEB5 | Dec:65205">
          ﺵ
        </Text>
        <Text size="medium" align="center" title="U+FEB6 | Dec:65206">
          ﺶ
        </Text>
        <Text size="medium" align="center" title="U+FEB7 | Dec:65207">
          ﺷ
        </Text>
        <Text size="medium" align="center" title="U+FEB8 | Dec:65208">
          ﺸ
        </Text>
        <Text size="medium" align="center" title="U+FEB9 | Dec:65209">
          ﺹ
        </Text>
        <Text size="medium" align="center" title="U+FEBA | Dec:65210">
          ﺺ
        </Text>
        <Text size="medium" align="center" title="U+FEBB | Dec:65211">
          ﺻ
        </Text>
        <Text size="medium" align="center" title="U+FEBC | Dec:65212">
          ﺼ
        </Text>
        <Text size="medium" align="center" title="U+FEBD | Dec:65213">
          ﺽ
        </Text>
        <Text size="medium" align="center" title="U+FEBE | Dec:65214">
          ﺾ
        </Text>
        <Text size="medium" align="center" title="U+FEBF | Dec:65215">
          ﺿ
        </Text>
        <Text size="medium" align="center" title="U+FEC0 | Dec:65216">
          ﻀ
        </Text>
        <Text size="medium" align="center" title="U+FEC1 | Dec:65217">
          ﻁ
        </Text>
        <Text size="medium" align="center" title="U+FEC2 | Dec:65218">
          ﻂ
        </Text>
        <Text size="medium" align="center" title="U+FEC3 | Dec:65219">
          ﻃ
        </Text>
        <Text size="medium" align="center" title="U+FEC4 | Dec:65220">
          ﻄ
        </Text>
        <Text size="medium" align="center" title="U+FEC5 | Dec:65221">
          ﻅ
        </Text>
        <Text size="medium" align="center" title="U+FEC6 | Dec:65222">
          ﻆ
        </Text>
        <Text size="medium" align="center" title="U+FEC7 | Dec:65223">
          ﻇ
        </Text>
        <Text size="medium" align="center" title="U+FEC8 | Dec:65224">
          ﻈ
        </Text>
        <Text size="medium" align="center" title="U+FEC9 | Dec:65225">
          ﻉ
        </Text>
        <Text size="medium" align="center" title="U+FECA | Dec:65226">
          ﻊ
        </Text>
        <Text size="medium" align="center" title="U+FECB | Dec:65227">
          ﻋ
        </Text>
        <Text size="medium" align="center" title="U+FECC | Dec:65228">
          ﻌ
        </Text>
        <Text size="medium" align="center" title="U+FECD | Dec:65229">
          ﻍ
        </Text>
        <Text size="medium" align="center" title="U+FECE | Dec:65230">
          ﻎ
        </Text>
        <Text size="medium" align="center" title="U+FECF | Dec:65231">
          ﻏ
        </Text>
        <Text size="medium" align="center" title="U+FED0 | Dec:65232">
          ﻐ
        </Text>
        <Text size="medium" align="center" title="U+FED1 | Dec:65233">
          ﻑ
        </Text>
        <Text size="medium" align="center" title="U+FED2 | Dec:65234">
          ﻒ
        </Text>
        <Text size="medium" align="center" title="U+FED3 | Dec:65235">
          ﻓ
        </Text>
        <Text size="medium" align="center" title="U+FED4 | Dec:65236">
          ﻔ
        </Text>
        <Text size="medium" align="center" title="U+FED5 | Dec:65237">
          ﻕ
        </Text>
        <Text size="medium" align="center" title="U+FED6 | Dec:65238">
          ﻖ
        </Text>
        <Text size="medium" align="center" title="U+FED7 | Dec:65239">
          ﻗ
        </Text>
        <Text size="medium" align="center" title="U+FED8 | Dec:65240">
          ﻘ
        </Text>
        <Text size="medium" align="center" title="U+FED9 | Dec:65241">
          ﻙ
        </Text>
        <Text size="medium" align="center" title="U+FEDA | Dec:65242">
          ﻚ
        </Text>
        <Text size="medium" align="center" title="U+FEDB | Dec:65243">
          ﻛ
        </Text>
        <Text size="medium" align="center" title="U+FEDC | Dec:65244">
          ﻜ
        </Text>
        <Text size="medium" align="center" title="U+FEDD | Dec:65245">
          ﻝ
        </Text>
        <Text size="medium" align="center" title="U+FEDE | Dec:65246">
          ﻞ
        </Text>
        <Text size="medium" align="center" title="U+FEDF | Dec:65247">
          ﻟ
        </Text>
        <Text size="medium" align="center" title="U+FEE0 | Dec:65248">
          ﻠ
        </Text>
        <Text size="medium" align="center" title="U+FEE1 | Dec:65249">
          ﻡ
        </Text>
        <Text size="medium" align="center" title="U+FEE2 | Dec:65250">
          ﻢ
        </Text>
        <Text size="medium" align="center" title="U+FEE3 | Dec:65251">
          ﻣ
        </Text>
        <Text size="medium" align="center" title="U+FEE4 | Dec:65252">
          ﻤ
        </Text>
        <Text size="medium" align="center" title="U+FEE5 | Dec:65253">
          ﻥ
        </Text>
        <Text size="medium" align="center" title="U+FEE6 | Dec:65254">
          ﻦ
        </Text>
        <Text size="medium" align="center" title="U+FEE7 | Dec:65255">
          ﻧ
        </Text>
        <Text size="medium" align="center" title="U+FEE8 | Dec:65256">
          ﻨ
        </Text>
        <Text size="medium" align="center" title="U+FEE9 | Dec:65257">
          ﻩ
        </Text>
        <Text size="medium" align="center" title="U+FEEA | Dec:65258">
          ﻪ
        </Text>
        <Text size="medium" align="center" title="U+FEEB | Dec:65259">
          ﻫ
        </Text>
        <Text size="medium" align="center" title="U+FEEC | Dec:65260">
          ﻬ
        </Text>
        <Text size="medium" align="center" title="U+FEED | Dec:65261">
          ﻭ
        </Text>
        <Text size="medium" align="center" title="U+FEEE | Dec:65262">
          ﻮ
        </Text>
        <Text size="medium" align="center" title="U+FEEF | Dec:65263">
          ﻯ
        </Text>
        <Text size="medium" align="center" title="U+FEF0 | Dec:65264">
          ﻰ
        </Text>
        <Text size="medium" align="center" title="U+FEF1 | Dec:65265">
          ﻱ
        </Text>
        <Text size="medium" align="center" title="U+FEF2 | Dec:65266">
          ﻲ
        </Text>
        <Text size="medium" align="center" title="U+FEF3 | Dec:65267">
          ﻳ
        </Text>
        <Text size="medium" align="center" title="U+FEF4 | Dec:65268">
          ﻴ
        </Text>
        <Text size="medium" align="center" title="U+FEF5 | Dec:65269">
          ﻵ
        </Text>
        <Text size="medium" align="center" title="U+FEF6 | Dec:65270">
          ﻶ
        </Text>
        <Text size="medium" align="center" title="U+FEF7 | Dec:65271">
          ﻷ
        </Text>
        <Text size="medium" align="center" title="U+FEF8 | Dec:65272">
          ﻸ
        </Text>
        <Text size="medium" align="center" title="U+FEF9 | Dec:65273">
          ﻹ
        </Text>
        <Text size="medium" align="center" title="U+FEFA | Dec:65274">
          ﻺ
        </Text>
        <Text size="medium" align="center" title="U+FEFB | Dec:65275">
          ﻻ
        </Text>
        <Text size="medium" align="center" title="U+FEFC | Dec:65276">
          ﻼ
        </Text>
        <Text size="medium" align="center" title="U+FEFD | Dec:65277">
          ﻽
        </Text>
        <Text size="medium" align="center" title="U+FEFE | Dec:65278">
          ﻾
        </Text>
        <Text size="medium" align="center" title="U+FEFF | Dec:65279">
          &#65279;
        </Text>
      </div>

      <div className="playground" title="should show typography in greek and coptic charset">
        <Headline>Greek and Coptic</Headline>
        <br />
        <Headline variant="headline-4">Range: U+0370-03FF (Porsche Next)</Headline>
        <Text size="medium" align="center" title="U+0370 | Dec:880">
          Ͱ
        </Text>
        <Text size="medium" align="center" title="U+0371 | Dec:881">
          ͱ
        </Text>
        <Text size="medium" align="center" title="U+0372 | Dec:882">
          Ͳ
        </Text>
        <Text size="medium" align="center" title="U+0373 | Dec:883">
          ͳ
        </Text>
        <Text size="medium" align="center" title="U+0374 | Dec:884">
          ʹ
        </Text>
        <Text size="medium" align="center" title="U+0375 | Dec:885">
          ͵
        </Text>
        <Text size="medium" align="center" title="U+0376 | Dec:886">
          Ͷ
        </Text>
        <Text size="medium" align="center" title="U+0377 | Dec:887">
          ͷ
        </Text>
        <Text size="medium" align="center" title="U+0378 | Dec:888">
          &#888;
        </Text>
        <Text size="medium" align="center" title="U+0379 | Dec:889">
          &#889;
        </Text>
        <Text size="medium" align="center" title="U+037A | Dec:890">
          ͺ
        </Text>
        <Text size="medium" align="center" title="U+037B | Dec:891">
          ͻ
        </Text>
        <Text size="medium" align="center" title="U+037C | Dec:892">
          ͼ
        </Text>
        <Text size="medium" align="center" title="U+037D | Dec:893">
          ͽ
        </Text>
        <Text size="medium" align="center" title="U+037E | Dec:894">
          ;
        </Text>
        <Text size="medium" align="center" title="U+037F | Dec:895">
          Ϳ
        </Text>
        <Text size="medium" align="center" title="U+0380 | Dec:896">
          &#896;
        </Text>
        <Text size="medium" align="center" title="U+0381 | Dec:897">
          &#897;
        </Text>
        <Text size="medium" align="center" title="U+0382 | Dec:898">
          &#898;
        </Text>
        <Text size="medium" align="center" title="U+0383 | Dec:899">
          &#899;
        </Text>
        <Text size="medium" align="center" title="U+0384 | Dec:900">
          ΄
        </Text>
        <Text size="medium" align="center" title="U+0385 | Dec:901">
          ΅
        </Text>
        <Text size="medium" align="center" title="U+0386 | Dec:902">
          Ά
        </Text>
        <Text size="medium" align="center" title="U+0387 | Dec:903">
          ·
        </Text>
        <Text size="medium" align="center" title="U+0388 | Dec:904">
          Έ
        </Text>
        <Text size="medium" align="center" title="U+0389 | Dec:905">
          Ή
        </Text>
        <Text size="medium" align="center" title="U+038A | Dec:906">
          Ί
        </Text>
        <Text size="medium" align="center" title="U+038B | Dec:907">
          ΋
        </Text>
        <Text size="medium" align="center" title="U+038C | Dec:908">
          Ό
        </Text>
        <Text size="medium" align="center" title="U+038D | Dec:909">
          ΍
        </Text>
        <Text size="medium" align="center" title="U+038E | Dec:910">
          Ύ
        </Text>
        <Text size="medium" align="center" title="U+038F | Dec:911">
          Ώ
        </Text>
        <Text size="medium" align="center" title="U+0390 | Dec:912">
          ΐ
        </Text>
        <Text size="medium" align="center" title="U+0391 | Dec:913">
          Α
        </Text>
        <Text size="medium" align="center" title="U+0392 | Dec:914">
          Β
        </Text>
        <Text size="medium" align="center" title="U+0393 | Dec:915">
          Γ
        </Text>
        <Text size="medium" align="center" title="U+0394 | Dec:916">
          Δ
        </Text>
        <Text size="medium" align="center" title="U+0395 | Dec:917">
          Ε
        </Text>
        <Text size="medium" align="center" title="U+0396 | Dec:918">
          Ζ
        </Text>
        <Text size="medium" align="center" title="U+0397 | Dec:919">
          Η
        </Text>
        <Text size="medium" align="center" title="U+0398 | Dec:920">
          Θ
        </Text>
        <Text size="medium" align="center" title="U+0399 | Dec:921">
          Ι
        </Text>
        <Text size="medium" align="center" title="U+039A | Dec:922">
          Κ
        </Text>
        <Text size="medium" align="center" title="U+039B | Dec:923">
          Λ
        </Text>
        <Text size="medium" align="center" title="U+039C | Dec:924">
          Μ
        </Text>
        <Text size="medium" align="center" title="U+039D | Dec:925">
          Ν
        </Text>
        <Text size="medium" align="center" title="U+039E | Dec:926">
          Ξ
        </Text>
        <Text size="medium" align="center" title="U+039F | Dec:927">
          Ο
        </Text>
        <Text size="medium" align="center" title="U+03A0 | Dec:928">
          Π
        </Text>
        <Text size="medium" align="center" title="U+03A1 | Dec:929">
          Ρ
        </Text>
        <Text size="medium" align="center" title="U+03A2 | Dec:930">
          ΢
        </Text>
        <Text size="medium" align="center" title="U+03A3 | Dec:931">
          Σ
        </Text>
        <Text size="medium" align="center" title="U+03A4 | Dec:932">
          Τ
        </Text>
        <Text size="medium" align="center" title="U+03A5 | Dec:933">
          Υ
        </Text>
        <Text size="medium" align="center" title="U+03A6 | Dec:934">
          Φ
        </Text>
        <Text size="medium" align="center" title="U+03A7 | Dec:935">
          Χ
        </Text>
        <Text size="medium" align="center" title="U+03A8 | Dec:936">
          Ψ
        </Text>
        <Text size="medium" align="center" title="U+03A9 | Dec:937">
          Ω
        </Text>
        <Text size="medium" align="center" title="U+03AA | Dec:938">
          Ϊ
        </Text>
        <Text size="medium" align="center" title="U+03AB | Dec:939">
          Ϋ
        </Text>
        <Text size="medium" align="center" title="U+03AC | Dec:940">
          ά
        </Text>
        <Text size="medium" align="center" title="U+03AD | Dec:941">
          έ
        </Text>
        <Text size="medium" align="center" title="U+03AE | Dec:942">
          ή
        </Text>
        <Text size="medium" align="center" title="U+03AF | Dec:943">
          ί
        </Text>
        <Text size="medium" align="center" title="U+03B0 | Dec:944">
          ΰ
        </Text>
        <Text size="medium" align="center" title="U+03B1 | Dec:945">
          α
        </Text>
        <Text size="medium" align="center" title="U+03B2 | Dec:946">
          β
        </Text>
        <Text size="medium" align="center" title="U+03B3 | Dec:947">
          γ
        </Text>
        <Text size="medium" align="center" title="U+03B4 | Dec:948">
          δ
        </Text>
        <Text size="medium" align="center" title="U+03B5 | Dec:949">
          ε
        </Text>
        <Text size="medium" align="center" title="U+03B6 | Dec:950">
          ζ
        </Text>
        <Text size="medium" align="center" title="U+03B7 | Dec:951">
          η
        </Text>
        <Text size="medium" align="center" title="U+03B8 | Dec:952">
          θ
        </Text>
        <Text size="medium" align="center" title="U+03B9 | Dec:953">
          ι
        </Text>
        <Text size="medium" align="center" title="U+03BA | Dec:954">
          κ
        </Text>
        <Text size="medium" align="center" title="U+03BB | Dec:955">
          λ
        </Text>
        <Text size="medium" align="center" title="U+03BC | Dec:956">
          μ
        </Text>
        <Text size="medium" align="center" title="U+03BD | Dec:957">
          ν
        </Text>
        <Text size="medium" align="center" title="U+03BE | Dec:958">
          ξ
        </Text>
        <Text size="medium" align="center" title="U+03BF | Dec:959">
          ο
        </Text>
        <Text size="medium" align="center" title="U+03C0 | Dec:960">
          π
        </Text>
        <Text size="medium" align="center" title="U+03C1 | Dec:961">
          ρ
        </Text>
        <Text size="medium" align="center" title="U+03C2 | Dec:962">
          ς
        </Text>
        <Text size="medium" align="center" title="U+03C3 | Dec:963">
          σ
        </Text>
        <Text size="medium" align="center" title="U+03C4 | Dec:964">
          τ
        </Text>
        <Text size="medium" align="center" title="U+03C5 | Dec:965">
          υ
        </Text>
        <Text size="medium" align="center" title="U+03C6 | Dec:966">
          φ
        </Text>
        <Text size="medium" align="center" title="U+03C7 | Dec:967">
          χ
        </Text>
        <Text size="medium" align="center" title="U+03C8 | Dec:968">
          ψ
        </Text>
        <Text size="medium" align="center" title="U+03C9 | Dec:969">
          ω
        </Text>
        <Text size="medium" align="center" title="U+03CA | Dec:970">
          ϊ
        </Text>
        <Text size="medium" align="center" title="U+03CB | Dec:971">
          ϋ
        </Text>
        <Text size="medium" align="center" title="U+03CC | Dec:972">
          ό
        </Text>
        <Text size="medium" align="center" title="U+03CD | Dec:973">
          ύ
        </Text>
        <Text size="medium" align="center" title="U+03CE | Dec:974">
          ώ
        </Text>
        <Text size="medium" align="center" title="U+03CF | Dec:975">
          Ϗ
        </Text>
        <Text size="medium" align="center" title="U+03D0 | Dec:976">
          ϐ
        </Text>
        <Text size="medium" align="center" title="U+03D1 | Dec:977">
          ϑ
        </Text>
        <Text size="medium" align="center" title="U+03D2 | Dec:978">
          ϒ
        </Text>
        <Text size="medium" align="center" title="U+03D3 | Dec:979">
          ϓ
        </Text>
        <Text size="medium" align="center" title="U+03D4 | Dec:980">
          ϔ
        </Text>
        <Text size="medium" align="center" title="U+03D5 | Dec:981">
          ϕ
        </Text>
        <Text size="medium" align="center" title="U+03D6 | Dec:982">
          ϖ
        </Text>
        <Text size="medium" align="center" title="U+03D7 | Dec:983">
          ϗ
        </Text>
        <Text size="medium" align="center" title="U+03D8 | Dec:984">
          Ϙ
        </Text>
        <Text size="medium" align="center" title="U+03D9 | Dec:985">
          ϙ
        </Text>
        <Text size="medium" align="center" title="U+03DA | Dec:986">
          Ϛ
        </Text>
        <Text size="medium" align="center" title="U+03DB | Dec:987">
          ϛ
        </Text>
        <Text size="medium" align="center" title="U+03DC | Dec:988">
          Ϝ
        </Text>
        <Text size="medium" align="center" title="U+03DD | Dec:989">
          ϝ
        </Text>
        <Text size="medium" align="center" title="U+03DE | Dec:990">
          Ϟ
        </Text>
        <Text size="medium" align="center" title="U+03DF | Dec:991">
          ϟ
        </Text>
        <Text size="medium" align="center" title="U+03E0 | Dec:992">
          Ϡ
        </Text>
        <Text size="medium" align="center" title="U+03E1 | Dec:993">
          ϡ
        </Text>
        <Text size="medium" align="center" title="U+03E2 | Dec:994">
          Ϣ
        </Text>
        <Text size="medium" align="center" title="U+03E3 | Dec:995">
          ϣ
        </Text>
        <Text size="medium" align="center" title="U+03E4 | Dec:996">
          Ϥ
        </Text>
        <Text size="medium" align="center" title="U+03E5 | Dec:997">
          ϥ
        </Text>
        <Text size="medium" align="center" title="U+03E6 | Dec:998">
          Ϧ
        </Text>
        <Text size="medium" align="center" title="U+03E7 | Dec:999">
          ϧ
        </Text>
        <Text size="medium" align="center" title="U+03E8 | Dec:1000">
          Ϩ
        </Text>
        <Text size="medium" align="center" title="U+03E9 | Dec:1001">
          ϩ
        </Text>
        <Text size="medium" align="center" title="U+03EA | Dec:1002">
          Ϫ
        </Text>
        <Text size="medium" align="center" title="U+03EB | Dec:1003">
          ϫ
        </Text>
        <Text size="medium" align="center" title="U+03EC | Dec:1004">
          Ϭ
        </Text>
        <Text size="medium" align="center" title="U+03ED | Dec:1005">
          ϭ
        </Text>
        <Text size="medium" align="center" title="U+03EE | Dec:1006">
          Ϯ
        </Text>
        <Text size="medium" align="center" title="U+03EF | Dec:1007">
          ϯ
        </Text>
        <Text size="medium" align="center" title="U+03F0 | Dec:1008">
          ϰ
        </Text>
        <Text size="medium" align="center" title="U+03F1 | Dec:1009">
          ϱ
        </Text>
        <Text size="medium" align="center" title="U+03F2 | Dec:1010">
          ϲ
        </Text>
        <Text size="medium" align="center" title="U+03F3 | Dec:1011">
          ϳ
        </Text>
        <Text size="medium" align="center" title="U+03F4 | Dec:1012">
          ϴ
        </Text>
        <Text size="medium" align="center" title="U+03F5 | Dec:1013">
          ϵ
        </Text>
        <Text size="medium" align="center" title="U+03F6 | Dec:1014">
          ϶
        </Text>
        <Text size="medium" align="center" title="U+03F7 | Dec:1015">
          Ϸ
        </Text>
        <Text size="medium" align="center" title="U+03F8 | Dec:1016">
          ϸ
        </Text>
        <Text size="medium" align="center" title="U+03F9 | Dec:1017">
          Ϲ
        </Text>
        <Text size="medium" align="center" title="U+03FA | Dec:1018">
          Ϻ
        </Text>
        <Text size="medium" align="center" title="U+03FB | Dec:1019">
          ϻ
        </Text>
        <Text size="medium" align="center" title="U+03FC | Dec:1020">
          ϼ
        </Text>
        <Text size="medium" align="center" title="U+03FD | Dec:1021">
          Ͻ
        </Text>
        <Text size="medium" align="center" title="U+03FE | Dec:1022">
          Ͼ
        </Text>
        <Text size="medium" align="center" title="U+03FF | Dec:1023">
          Ͽ
        </Text>
      </div>

      <div className="playground" title="should show typography in cyril charset">
        <Headline>Cyril</Headline>
        <br />
        <Headline variant="headline-4">Range: U+0400-04FF (Porsche Next)</Headline>
        <Text size="medium" align="center" title="U+0400 | Dec:1024">
          Ѐ
        </Text>
        <Text size="medium" align="center" title="U+0401 | Dec:1025">
          Ё
        </Text>
        <Text size="medium" align="center" title="U+0402 | Dec:1026">
          Ђ
        </Text>
        <Text size="medium" align="center" title="U+0403 | Dec:1027">
          Ѓ
        </Text>
        <Text size="medium" align="center" title="U+0404 | Dec:1028">
          Є
        </Text>
        <Text size="medium" align="center" title="U+0405 | Dec:1029">
          Ѕ
        </Text>
        <Text size="medium" align="center" title="U+0406 | Dec:1030">
          І
        </Text>
        <Text size="medium" align="center" title="U+0407 | Dec:1031">
          Ї
        </Text>
        <Text size="medium" align="center" title="U+0408 | Dec:1032">
          Ј
        </Text>
        <Text size="medium" align="center" title="U+0409 | Dec:1033">
          Љ
        </Text>
        <Text size="medium" align="center" title="U+040A | Dec:1034">
          Њ
        </Text>
        <Text size="medium" align="center" title="U+040B | Dec:1035">
          Ћ
        </Text>
        <Text size="medium" align="center" title="U+040C | Dec:1036">
          Ќ
        </Text>
        <Text size="medium" align="center" title="U+040D | Dec:1037">
          Ѝ
        </Text>
        <Text size="medium" align="center" title="U+040E | Dec:1038">
          Ў
        </Text>
        <Text size="medium" align="center" title="U+040F | Dec:1039">
          Џ
        </Text>
        <Text size="medium" align="center" title="U+0410 | Dec:1040">
          А
        </Text>
        <Text size="medium" align="center" title="U+0411 | Dec:1041">
          Б
        </Text>
        <Text size="medium" align="center" title="U+0412 | Dec:1042">
          В
        </Text>
        <Text size="medium" align="center" title="U+0413 | Dec:1043">
          Г
        </Text>
        <Text size="medium" align="center" title="U+0414 | Dec:1044">
          Д
        </Text>
        <Text size="medium" align="center" title="U+0415 | Dec:1045">
          Е
        </Text>
        <Text size="medium" align="center" title="U+0416 | Dec:1046">
          Ж
        </Text>
        <Text size="medium" align="center" title="U+0417 | Dec:1047">
          З
        </Text>
        <Text size="medium" align="center" title="U+0418 | Dec:1048">
          И
        </Text>
        <Text size="medium" align="center" title="U+0419 | Dec:1049">
          Й
        </Text>
        <Text size="medium" align="center" title="U+041A | Dec:1050">
          К
        </Text>
        <Text size="medium" align="center" title="U+041B | Dec:1051">
          Л
        </Text>
        <Text size="medium" align="center" title="U+041C | Dec:1052">
          М
        </Text>
        <Text size="medium" align="center" title="U+041D | Dec:1053">
          Н
        </Text>
        <Text size="medium" align="center" title="U+041E | Dec:1054">
          О
        </Text>
        <Text size="medium" align="center" title="U+041F | Dec:1055">
          П
        </Text>
        <Text size="medium" align="center" title="U+0420 | Dec:1056">
          Р
        </Text>
        <Text size="medium" align="center" title="U+0421 | Dec:1057">
          С
        </Text>
        <Text size="medium" align="center" title="U+0422 | Dec:1058">
          Т
        </Text>
        <Text size="medium" align="center" title="U+0423 | Dec:1059">
          У
        </Text>
        <Text size="medium" align="center" title="U+0424 | Dec:1060">
          Ф
        </Text>
        <Text size="medium" align="center" title="U+0425 | Dec:1061">
          Х
        </Text>
        <Text size="medium" align="center" title="U+0426 | Dec:1062">
          Ц
        </Text>
        <Text size="medium" align="center" title="U+0427 | Dec:1063">
          Ч
        </Text>
        <Text size="medium" align="center" title="U+0428 | Dec:1064">
          Ш
        </Text>
        <Text size="medium" align="center" title="U+0429 | Dec:1065">
          Щ
        </Text>
        <Text size="medium" align="center" title="U+042A | Dec:1066">
          Ъ
        </Text>
        <Text size="medium" align="center" title="U+042B | Dec:1067">
          Ы
        </Text>
        <Text size="medium" align="center" title="U+042C | Dec:1068">
          Ь
        </Text>
        <Text size="medium" align="center" title="U+042D | Dec:1069">
          Э
        </Text>
        <Text size="medium" align="center" title="U+042E | Dec:1070">
          Ю
        </Text>
        <Text size="medium" align="center" title="U+042F | Dec:1071">
          Я
        </Text>
        <Text size="medium" align="center" title="U+0430 | Dec:1072">
          а
        </Text>
        <Text size="medium" align="center" title="U+0431 | Dec:1073">
          б
        </Text>
        <Text size="medium" align="center" title="U+0432 | Dec:1074">
          в
        </Text>
        <Text size="medium" align="center" title="U+0433 | Dec:1075">
          г
        </Text>
        <Text size="medium" align="center" title="U+0434 | Dec:1076">
          д
        </Text>
        <Text size="medium" align="center" title="U+0435 | Dec:1077">
          е
        </Text>
        <Text size="medium" align="center" title="U+0436 | Dec:1078">
          ж
        </Text>
        <Text size="medium" align="center" title="U+0437 | Dec:1079">
          з
        </Text>
        <Text size="medium" align="center" title="U+0438 | Dec:1080">
          и
        </Text>
        <Text size="medium" align="center" title="U+0439 | Dec:1081">
          й
        </Text>
        <Text size="medium" align="center" title="U+043A | Dec:1082">
          к
        </Text>
        <Text size="medium" align="center" title="U+043B | Dec:1083">
          л
        </Text>
        <Text size="medium" align="center" title="U+043C | Dec:1084">
          м
        </Text>
        <Text size="medium" align="center" title="U+043D | Dec:1085">
          н
        </Text>
        <Text size="medium" align="center" title="U+043E | Dec:1086">
          о
        </Text>
        <Text size="medium" align="center" title="U+043F | Dec:1087">
          п
        </Text>
        <Text size="medium" align="center" title="U+0440 | Dec:1088">
          р
        </Text>
        <Text size="medium" align="center" title="U+0441 | Dec:1089">
          с
        </Text>
        <Text size="medium" align="center" title="U+0442 | Dec:1090">
          т
        </Text>
        <Text size="medium" align="center" title="U+0443 | Dec:1091">
          у
        </Text>
        <Text size="medium" align="center" title="U+0444 | Dec:1092">
          ф
        </Text>
        <Text size="medium" align="center" title="U+0445 | Dec:1093">
          х
        </Text>
        <Text size="medium" align="center" title="U+0446 | Dec:1094">
          ц
        </Text>
        <Text size="medium" align="center" title="U+0447 | Dec:1095">
          ч
        </Text>
        <Text size="medium" align="center" title="U+0448 | Dec:1096">
          ш
        </Text>
        <Text size="medium" align="center" title="U+0449 | Dec:1097">
          щ
        </Text>
        <Text size="medium" align="center" title="U+044A | Dec:1098">
          ъ
        </Text>
        <Text size="medium" align="center" title="U+044B | Dec:1099">
          ы
        </Text>
        <Text size="medium" align="center" title="U+044C | Dec:1100">
          ь
        </Text>
        <Text size="medium" align="center" title="U+044D | Dec:1101">
          э
        </Text>
        <Text size="medium" align="center" title="U+044E | Dec:1102">
          ю
        </Text>
        <Text size="medium" align="center" title="U+044F | Dec:1103">
          я
        </Text>
        <Text size="medium" align="center" title="U+0450 | Dec:1104">
          ѐ
        </Text>
        <Text size="medium" align="center" title="U+0451 | Dec:1105">
          ё
        </Text>
        <Text size="medium" align="center" title="U+0452 | Dec:1106">
          ђ
        </Text>
        <Text size="medium" align="center" title="U+0453 | Dec:1107">
          ѓ
        </Text>
        <Text size="medium" align="center" title="U+0454 | Dec:1108">
          є
        </Text>
        <Text size="medium" align="center" title="U+0455 | Dec:1109">
          ѕ
        </Text>
        <Text size="medium" align="center" title="U+0456 | Dec:1110">
          і
        </Text>
        <Text size="medium" align="center" title="U+0457 | Dec:1111">
          ї
        </Text>
        <Text size="medium" align="center" title="U+0458 | Dec:1112">
          ј
        </Text>
        <Text size="medium" align="center" title="U+0459 | Dec:1113">
          љ
        </Text>
        <Text size="medium" align="center" title="U+045A | Dec:1114">
          њ
        </Text>
        <Text size="medium" align="center" title="U+045B | Dec:1115">
          ћ
        </Text>
        <Text size="medium" align="center" title="U+045C | Dec:1116">
          ќ
        </Text>
        <Text size="medium" align="center" title="U+045D | Dec:1117">
          ѝ
        </Text>
        <Text size="medium" align="center" title="U+045E | Dec:1118">
          ў
        </Text>
        <Text size="medium" align="center" title="U+045F | Dec:1119">
          џ
        </Text>
        <Text size="medium" align="center" title="U+0460 | Dec:1120">
          Ѡ
        </Text>
        <Text size="medium" align="center" title="U+0461 | Dec:1121">
          ѡ
        </Text>
        <Text size="medium" align="center" title="U+0462 | Dec:1122">
          Ѣ
        </Text>
        <Text size="medium" align="center" title="U+0463 | Dec:1123">
          ѣ
        </Text>
        <Text size="medium" align="center" title="U+0464 | Dec:1124">
          Ѥ
        </Text>
        <Text size="medium" align="center" title="U+0465 | Dec:1125">
          ѥ
        </Text>
        <Text size="medium" align="center" title="U+0466 | Dec:1126">
          Ѧ
        </Text>
        <Text size="medium" align="center" title="U+0467 | Dec:1127">
          ѧ
        </Text>
        <Text size="medium" align="center" title="U+0468 | Dec:1128">
          Ѩ
        </Text>
        <Text size="medium" align="center" title="U+0469 | Dec:1129">
          ѩ
        </Text>
        <Text size="medium" align="center" title="U+046A | Dec:1130">
          Ѫ
        </Text>
        <Text size="medium" align="center" title="U+046B | Dec:1131">
          ѫ
        </Text>
        <Text size="medium" align="center" title="U+046C | Dec:1132">
          Ѭ
        </Text>
        <Text size="medium" align="center" title="U+046D | Dec:1133">
          ѭ
        </Text>
        <Text size="medium" align="center" title="U+046E | Dec:1134">
          Ѯ
        </Text>
        <Text size="medium" align="center" title="U+046F | Dec:1135">
          ѯ
        </Text>
        <Text size="medium" align="center" title="U+0470 | Dec:1136">
          Ѱ
        </Text>
        <Text size="medium" align="center" title="U+0471 | Dec:1137">
          ѱ
        </Text>
        <Text size="medium" align="center" title="U+0472 | Dec:1138">
          Ѳ
        </Text>
        <Text size="medium" align="center" title="U+0473 | Dec:1139">
          ѳ
        </Text>
        <Text size="medium" align="center" title="U+0474 | Dec:1140">
          Ѵ
        </Text>
        <Text size="medium" align="center" title="U+0475 | Dec:1141">
          ѵ
        </Text>
        <Text size="medium" align="center" title="U+0476 | Dec:1142">
          Ѷ
        </Text>
        <Text size="medium" align="center" title="U+0477 | Dec:1143">
          ѷ
        </Text>
        <Text size="medium" align="center" title="U+0478 | Dec:1144">
          Ѹ
        </Text>
        <Text size="medium" align="center" title="U+0479 | Dec:1145">
          ѹ
        </Text>
        <Text size="medium" align="center" title="U+047A | Dec:1146">
          Ѻ
        </Text>
        <Text size="medium" align="center" title="U+047B | Dec:1147">
          ѻ
        </Text>
        <Text size="medium" align="center" title="U+047C | Dec:1148">
          Ѽ
        </Text>
        <Text size="medium" align="center" title="U+047D | Dec:1149">
          ѽ
        </Text>
        <Text size="medium" align="center" title="U+047E | Dec:1150">
          Ѿ
        </Text>
        <Text size="medium" align="center" title="U+047F | Dec:1151">
          ѿ
        </Text>
        <Text size="medium" align="center" title="U+0480 | Dec:1152">
          Ҁ
        </Text>
        <Text size="medium" align="center" title="U+0481 | Dec:1153">
          ҁ
        </Text>
        <Text size="medium" align="center" title="U+0482 | Dec:1154">
          ҂
        </Text>
        <Text size="medium" align="center" title="U+0483 | Dec:1155">
          ҃
        </Text>
        <Text size="medium" align="center" title="U+0484 | Dec:1156">
          ҄
        </Text>
        <Text size="medium" align="center" title="U+0485 | Dec:1157">
          ҅
        </Text>
        <Text size="medium" align="center" title="U+0486 | Dec:1158">
          ҆
        </Text>
        <Text size="medium" align="center" title="U+0487 | Dec:1159">
          ҇
        </Text>
        <Text size="medium" align="center" title="U+0488 | Dec:1160">
          ҈
        </Text>
        <Text size="medium" align="center" title="U+0489 | Dec:1161">
          ҉
        </Text>
        <Text size="medium" align="center" title="U+048A | Dec:1162">
          Ҋ
        </Text>
        <Text size="medium" align="center" title="U+048B | Dec:1163">
          ҋ
        </Text>
        <Text size="medium" align="center" title="U+048C | Dec:1164">
          Ҍ
        </Text>
        <Text size="medium" align="center" title="U+048D | Dec:1165">
          ҍ
        </Text>
        <Text size="medium" align="center" title="U+048E | Dec:1166">
          Ҏ
        </Text>
        <Text size="medium" align="center" title="U+048F | Dec:1167">
          ҏ
        </Text>
        <Text size="medium" align="center" title="U+0490 | Dec:1168">
          Ґ
        </Text>
        <Text size="medium" align="center" title="U+0491 | Dec:1169">
          ґ
        </Text>
        <Text size="medium" align="center" title="U+0492 | Dec:1170">
          Ғ
        </Text>
        <Text size="medium" align="center" title="U+0493 | Dec:1171">
          ғ
        </Text>
        <Text size="medium" align="center" title="U+0494 | Dec:1172">
          Ҕ
        </Text>
        <Text size="medium" align="center" title="U+0495 | Dec:1173">
          ҕ
        </Text>
        <Text size="medium" align="center" title="U+0496 | Dec:1174">
          Җ
        </Text>
        <Text size="medium" align="center" title="U+0497 | Dec:1175">
          җ
        </Text>
        <Text size="medium" align="center" title="U+0498 | Dec:1176">
          Ҙ
        </Text>
        <Text size="medium" align="center" title="U+0499 | Dec:1177">
          ҙ
        </Text>
        <Text size="medium" align="center" title="U+049A | Dec:1178">
          Қ
        </Text>
        <Text size="medium" align="center" title="U+049B | Dec:1179">
          қ
        </Text>
        <Text size="medium" align="center" title="U+049C | Dec:1180">
          Ҝ
        </Text>
        <Text size="medium" align="center" title="U+049D | Dec:1181">
          ҝ
        </Text>
        <Text size="medium" align="center" title="U+049E | Dec:1182">
          Ҟ
        </Text>
        <Text size="medium" align="center" title="U+049F | Dec:1183">
          ҟ
        </Text>
        <Text size="medium" align="center" title="U+04A0 | Dec:1184">
          Ҡ
        </Text>
        <Text size="medium" align="center" title="U+04A1 | Dec:1185">
          ҡ
        </Text>
        <Text size="medium" align="center" title="U+04A2 | Dec:1186">
          Ң
        </Text>
        <Text size="medium" align="center" title="U+04A3 | Dec:1187">
          ң
        </Text>
        <Text size="medium" align="center" title="U+04A4 | Dec:1188">
          Ҥ
        </Text>
        <Text size="medium" align="center" title="U+04A5 | Dec:1189">
          ҥ
        </Text>
        <Text size="medium" align="center" title="U+04A6 | Dec:1190">
          Ҧ
        </Text>
        <Text size="medium" align="center" title="U+04A7 | Dec:1191">
          ҧ
        </Text>
        <Text size="medium" align="center" title="U+04A8 | Dec:1192">
          Ҩ
        </Text>
        <Text size="medium" align="center" title="U+04A9 | Dec:1193">
          ҩ
        </Text>
        <Text size="medium" align="center" title="U+04AA | Dec:1194">
          Ҫ
        </Text>
        <Text size="medium" align="center" title="U+04AB | Dec:1195">
          ҫ
        </Text>
        <Text size="medium" align="center" title="U+04AC | Dec:1196">
          Ҭ
        </Text>
        <Text size="medium" align="center" title="U+04AD | Dec:1197">
          ҭ
        </Text>
        <Text size="medium" align="center" title="U+04AE | Dec:1198">
          Ү
        </Text>
        <Text size="medium" align="center" title="U+04AF | Dec:1199">
          ү
        </Text>
        <Text size="medium" align="center" title="U+04B0 | Dec:1200">
          Ұ
        </Text>
        <Text size="medium" align="center" title="U+04B1 | Dec:1201">
          ұ
        </Text>
        <Text size="medium" align="center" title="U+04B2 | Dec:1202">
          Ҳ
        </Text>
        <Text size="medium" align="center" title="U+04B3 | Dec:1203">
          ҳ
        </Text>
        <Text size="medium" align="center" title="U+04B4 | Dec:1204">
          Ҵ
        </Text>
        <Text size="medium" align="center" title="U+04B5 | Dec:1205">
          ҵ
        </Text>
        <Text size="medium" align="center" title="U+04B6 | Dec:1206">
          Ҷ
        </Text>
        <Text size="medium" align="center" title="U+04B7 | Dec:1207">
          ҷ
        </Text>
        <Text size="medium" align="center" title="U+04B8 | Dec:1208">
          Ҹ
        </Text>
        <Text size="medium" align="center" title="U+04B9 | Dec:1209">
          ҹ
        </Text>
        <Text size="medium" align="center" title="U+04BA | Dec:1210">
          Һ
        </Text>
        <Text size="medium" align="center" title="U+04BB | Dec:1211">
          һ
        </Text>
        <Text size="medium" align="center" title="U+04BC | Dec:1212">
          Ҽ
        </Text>
        <Text size="medium" align="center" title="U+04BD | Dec:1213">
          ҽ
        </Text>
        <Text size="medium" align="center" title="U+04BE | Dec:1214">
          Ҿ
        </Text>
        <Text size="medium" align="center" title="U+04BF | Dec:1215">
          ҿ
        </Text>
        <Text size="medium" align="center" title="U+04C0 | Dec:1216">
          Ӏ
        </Text>
        <Text size="medium" align="center" title="U+04C1 | Dec:1217">
          Ӂ
        </Text>
        <Text size="medium" align="center" title="U+04C2 | Dec:1218">
          ӂ
        </Text>
        <Text size="medium" align="center" title="U+04C3 | Dec:1219">
          Ӄ
        </Text>
        <Text size="medium" align="center" title="U+04C4 | Dec:1220">
          ӄ
        </Text>
        <Text size="medium" align="center" title="U+04C5 | Dec:1221">
          Ӆ
        </Text>
        <Text size="medium" align="center" title="U+04C6 | Dec:1222">
          ӆ
        </Text>
        <Text size="medium" align="center" title="U+04C7 | Dec:1223">
          Ӈ
        </Text>
        <Text size="medium" align="center" title="U+04C8 | Dec:1224">
          ӈ
        </Text>
        <Text size="medium" align="center" title="U+04C9 | Dec:1225">
          Ӊ
        </Text>
        <Text size="medium" align="center" title="U+04CA | Dec:1226">
          ӊ
        </Text>
        <Text size="medium" align="center" title="U+04CB | Dec:1227">
          Ӌ
        </Text>
        <Text size="medium" align="center" title="U+04CC | Dec:1228">
          ӌ
        </Text>
        <Text size="medium" align="center" title="U+04CD | Dec:1229">
          Ӎ
        </Text>
        <Text size="medium" align="center" title="U+04CE | Dec:1230">
          ӎ
        </Text>
        <Text size="medium" align="center" title="U+04CF | Dec:1231">
          ӏ
        </Text>
        <Text size="medium" align="center" title="U+04D0 | Dec:1232">
          Ӑ
        </Text>
        <Text size="medium" align="center" title="U+04D1 | Dec:1233">
          ӑ
        </Text>
        <Text size="medium" align="center" title="U+04D2 | Dec:1234">
          Ӓ
        </Text>
        <Text size="medium" align="center" title="U+04D3 | Dec:1235">
          ӓ
        </Text>
        <Text size="medium" align="center" title="U+04D4 | Dec:1236">
          Ӕ
        </Text>
        <Text size="medium" align="center" title="U+04D5 | Dec:1237">
          ӕ
        </Text>
        <Text size="medium" align="center" title="U+04D6 | Dec:1238">
          Ӗ
        </Text>
        <Text size="medium" align="center" title="U+04D7 | Dec:1239">
          ӗ
        </Text>
        <Text size="medium" align="center" title="U+04D8 | Dec:1240">
          Ә
        </Text>
        <Text size="medium" align="center" title="U+04D9 | Dec:1241">
          ә
        </Text>
        <Text size="medium" align="center" title="U+04DA | Dec:1242">
          Ӛ
        </Text>
        <Text size="medium" align="center" title="U+04DB | Dec:1243">
          ӛ
        </Text>
        <Text size="medium" align="center" title="U+04DC | Dec:1244">
          Ӝ
        </Text>
        <Text size="medium" align="center" title="U+04DD | Dec:1245">
          ӝ
        </Text>
        <Text size="medium" align="center" title="U+04DE | Dec:1246">
          Ӟ
        </Text>
        <Text size="medium" align="center" title="U+04DF | Dec:1247">
          ӟ
        </Text>
        <Text size="medium" align="center" title="U+04E0 | Dec:1248">
          Ӡ
        </Text>
        <Text size="medium" align="center" title="U+04E1 | Dec:1249">
          ӡ
        </Text>
        <Text size="medium" align="center" title="U+04E2 | Dec:1250">
          Ӣ
        </Text>
        <Text size="medium" align="center" title="U+04E3 | Dec:1251">
          ӣ
        </Text>
        <Text size="medium" align="center" title="U+04E4 | Dec:1252">
          Ӥ
        </Text>
        <Text size="medium" align="center" title="U+04E5 | Dec:1253">
          ӥ
        </Text>
        <Text size="medium" align="center" title="U+04E6 | Dec:1254">
          Ӧ
        </Text>
        <Text size="medium" align="center" title="U+04E7 | Dec:1255">
          ӧ
        </Text>
        <Text size="medium" align="center" title="U+04E8 | Dec:1256">
          Ө
        </Text>
        <Text size="medium" align="center" title="U+04E9 | Dec:1257">
          ө
        </Text>
        <Text size="medium" align="center" title="U+04EA | Dec:1258">
          Ӫ
        </Text>
        <Text size="medium" align="center" title="U+04EB | Dec:1259">
          ӫ
        </Text>
        <Text size="medium" align="center" title="U+04EC | Dec:1260">
          Ӭ
        </Text>
        <Text size="medium" align="center" title="U+04ED | Dec:1261">
          ӭ
        </Text>
        <Text size="medium" align="center" title="U+04EE | Dec:1262">
          Ӯ
        </Text>
        <Text size="medium" align="center" title="U+04EF | Dec:1263">
          ӯ
        </Text>
        <Text size="medium" align="center" title="U+04F0 | Dec:1264">
          Ӱ
        </Text>
        <Text size="medium" align="center" title="U+04F1 | Dec:1265">
          ӱ
        </Text>
        <Text size="medium" align="center" title="U+04F2 | Dec:1266">
          Ӳ
        </Text>
        <Text size="medium" align="center" title="U+04F3 | Dec:1267">
          ӳ
        </Text>
        <Text size="medium" align="center" title="U+04F4 | Dec:1268">
          Ӵ
        </Text>
        <Text size="medium" align="center" title="U+04F5 | Dec:1269">
          ӵ
        </Text>
        <Text size="medium" align="center" title="U+04F6 | Dec:1270">
          Ӷ
        </Text>
        <Text size="medium" align="center" title="U+04F7 | Dec:1271">
          ӷ
        </Text>
        <Text size="medium" align="center" title="U+04F8 | Dec:1272">
          Ӹ
        </Text>
        <Text size="medium" align="center" title="U+04F9 | Dec:1273">
          ӹ
        </Text>
        <Text size="medium" align="center" title="U+04FA | Dec:1274">
          Ӻ
        </Text>
        <Text size="medium" align="center" title="U+04FB | Dec:1275">
          ӻ
        </Text>
        <Text size="medium" align="center" title="U+04FC | Dec:1276">
          Ӽ
        </Text>
        <Text size="medium" align="center" title="U+04FD | Dec:1277">
          ӽ
        </Text>
        <Text size="medium" align="center" title="U+04FE | Dec:1278">
          Ӿ
        </Text>
        <Text size="medium" align="center" title="U+04FF | Dec:1279">
          ӿ
        </Text>
      </div>

      <div className="playground" title="should show typography in supported font-weights for latin charset">
        <Text weight="thin">The quick brown fox jumps over the lazy dog</Text>
        <Text weight="regular">The quick brown fox jumps over the lazy dog</Text>
        <Headline variant="headline-5">The quick brown fox jumps over the lazy dog</Headline>
        <Text weight="bold">The quick brown fox jumps over the lazy dog</Text>
      </div>

      <div className="playground" title="should show typography in supported font-weights for greek and coptic charset">
        <Text weight="thin">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</Text>
        <Text weight="regular">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</Text>
        <Headline variant="headline-5">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</Headline>
        <Text weight="bold">Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</Text>
      </div>

      <div className="playground" title="should show typography in supported font-weights for cyril charset">
        <Text weight="thin">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</Text>
        <Text weight="regular">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</Text>
        <Headline variant="headline-5">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</Headline>
        <Text weight="bold">Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</Text>
      </div>
    </>
  );
};
