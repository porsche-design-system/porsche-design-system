<template>
  <div class="main-footer">
    <div class="country-language-chooser">
      <p-headline theme="dark" variant="headline-4">Andere(s) Land/Region wählen:</p-headline>
      <p-select-wrapper theme="dark" label="Land">
        <select name="country">
          <option value="" hidden="hidden"></option>
          <option>Deutschland</option>
          <option>Frankrech</option>
          <option>Italien</option>
          <option>Spanien</option>
          <option>USA</option>
          <option>China</option>
        </select>
      </p-select-wrapper>
      <p-select-wrapper theme="dark" label="Sprache">
        <select name="language" disabled="disabled">
          <option value="" hidden="hidden"></option>
        </select>
      </p-select-wrapper>
    </div>
    <div class="imprint">
      <p-text theme="dark" size="x-small" color="neutral-contrast-medium">
        © 2022 Dr. Ing. h.c. F. <nobr>Porsche</nobr> AG.<br />
        <a href="#">Impressum und Rechtliche Hinweise</a>,&nbsp;<a href="#">Hinweise zum Datenschutz</a>,&nbsp;<a
          href="#"
          >Cookie Policy</a
        >,&nbsp;<a href="#">Verbrauchsinformationen</a>,&nbsp;<a href="#">Hinweisgebersystem</a>,&nbsp;<a href="#"
          >Open Source Software Notice</a
        >.
      </p-text>
      <p-text theme="dark" size="x-small" color="neutral-contrast-medium">
        * Die angegebenen Verbrauchs- und Emissionswerte wurden nach den gesetzlich vorgeschriebenen Messverfahren
        ermittelt. Seit dem 1. September 2018 ersetzt das weltweit harmonisierte Prüfverfahren für Personenwagen und
        leichte Nutzfahrzeuge (Worldwide Harmonized Light Vehicles Test Procedure, WLTP) den neuen europäischen
        Fahrzyklus (NEFZ). Wegen der realistischeren Prüfbedingungen sind die nach WLTP ermittelten Werte zum
        Kraftstoff-/Stromverbrauch und zu den CO₂-Emissionen in vielen Fällen höher als die nach NEFZ ermittelten.<br /><br />Aktuell
        sind unabhängig vom angewendeten Typisierungsverfahren noch die NEFZ-Werte verpflichtend zu kommunizieren.
        Werden zusätzlich WLTP-Werte angegeben, erfolgt dies freiwillig. Alle von <nobr>Porsche</nobr> angebotenen
        Neufahrzeuge sind nach WLTP typgenehmigt, weshalb die angegebenen NEFZ-Werte von den WLTP-Werten abgeleitet
        wurden. Soweit die Werte als Spannen angegeben werden, beziehen sie sich nicht auf ein einzelnes, individuelles
        Fahrzeug und sind nicht Bestandteil des Angebots. Sie dienen allein Vergleichszwecken zwischen den verschiedenen
        Fahrzeugtypen. Zusatzausstattungen und Zubehör (Anbauteile, Reifenformat usw.) können relevante
        Fahrzeugparameter wie z. B. Gewicht, Rollwiderstand und Aerodynamik verändern und neben Witterungs- und
        Verkehrsbedingungen sowie dem individuellen Fahrverhalten den Kraftstoff-/Stromverbrauch, die CO₂-Emissionen,
        die Reichweite und die Fahrleistungswerte eines Fahrzeugs beeinflussen.<br /><br />Weitere Informationen zu den
        Unterschieden zwischen WLTP und NEFZ finden Sie unter <a href="#">www.porsche.com/wltp</a>.<br /><br />Weitere
        Informationen zum offiziellen Kraftstoffverbrauch und den offiziellen spezifischen CO₂-Emissionen neuer
        Personenkraftwagen können dem "<a href="#"
          >Leitfaden über den Kraftstoffverbrauch, die CO₂-Emissionen und den Stromverbrauch neuer Personenkraftwagen</a
        >" entnommen werden, der an allen Verkaufsstellen und bei
        <a href="#">DAT</a>
        unentgeltlich erhältlich ist.<br /><br />** Wichtige Hinweise zu den vollelektrischen
        <nobr>Porsche</nobr> Modellen finden Sie <a href="#">hier</a>.<br /><br />*** Ein Angebot der
        <nobr>Porsche</nobr> Financial Services GmbH &amp; Co. KG., <nobr>Porsche</nobr>straße 1, 74321
        Bietigheim-Bissingen für einen Kilometerleasingvertrag. Gültig bei einem Vertragsabschluss bis 30.09.2022 und
        Fahrzeugübernahme bis 31.12.2022. Flex Leasing Option bei 36 Monaten Laufzeit: Das <nobr>Porsche</nobr> Flex
        Leasing berechtigt den Leasingnehmer, den Leasingvertrag monatlich, erstmals zum Ende des 18. Monats der
        Vertragslaufzeit, zu beenden, sofern ein neuer Leasingvertrag mit der <nobr>Porsche</nobr> Financial Services
        GmbH &amp; Co. KG über einem <nobr>Porsche</nobr> Neuwagen abgeschlossen wird. Nur in teilnehmenden
        <nobr>Porsche</nobr> Zentren.
      </p-text>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class PorscheFooter extends Vue {}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-footer {
    @include pds-grid;
    grid-row-gap: $pds-grid-gutter;
    padding: $pds-spacing-x-large 0;
    margin-top: $pds-spacing-xx-large;
    background: $pds-theme-dark-background-base;

    @include pds-media-query-min('s') {
      padding: $pds-spacing-xx-large 0;
    }
  }

  .country-language-chooser {
    grid-column: content-start / content-end;
    display: grid;
    gap: $pds-spacing-medium;

    @include pds-media-query-min('s') {
      grid-column: 4 / -4;
      grid-template-columns: 1fr 1fr;

      & > :nth-child(1) {
        grid-column: 1 / 3;
        grid-row: 1;
      }

      & > :nth-child(2) {
        grid-column: 1 / 2;
        grid-row: 2;
      }

      & > :nth-child(3) {
        grid-column: 2 / 3;
        grid-row: 2;
      }
    }
  }

  .imprint {
    grid-column: content-start / content-end;
    display: grid;
    gap: $pds-spacing-medium;

    @include pds-media-query-min('s') {
      grid-column: 4 / -4;
    }
  }
</style>
