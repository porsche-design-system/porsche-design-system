import { PText } from '@porsche-design-system/components-react';
import type { TextAlign, TextSize } from '@porsche-design-system/components-react';

export const TypographyPorscheNextCyrilPage = (): JSX.Element => {
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

      <div className="playground" title="should show typography in cyril charset">
        <h2>Porsche Next Cyril</h2>
        <h4>Range: U+0400-04FF</h4>
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
    </>
  );
};
