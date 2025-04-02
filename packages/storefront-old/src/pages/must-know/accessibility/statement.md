# Accessibility

<TableOfContents></TableOfContents>

## Definition

### An accessibility statement has two basic functions:

**Firstly**, an accessibility statement is a powerful declaration of commitment. People visiting the website,
particularly those with disabilities, will appreciate the open acknowledgement that accessibility is a key driver for
the website.

**Secondly**, it can present further information about the target level of web accessibility for the website and the
methods used to achieve those targets. It also can enable the website owner to acknowledge any areas of the website
where accessibility targets have not been met and outline the proposed plan for resolving any such problem.

**A word of caution however:** An accessibility statement that makes rash or false claims will only damage the
reputation of the website, not enhance it and it does not prevent the site owner from getting sued if the website lacks
accessibility support.

## Where to put an accessibility statement

**Accessibility statements should be easy to find** and should be linked from each page. Placing it in the **footer
area** is a proven way. Use consistent link names for your accessibility statement to help users recognize them.

## Example template

**There are no strict specifications** on how to write an accessibility statement, but it should announce the intent and
commitment to accessibility. The following example can be seen as a blueprint and **should be adapted to your specific
needs**.

This template is based on the guidelines on
[How to develop an Accessibility Statement](https://w3.org/WAI/planning/statements) provided by **W3C**.

<Playground :markup="statement" class="p-accessibility-statement"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  
  get statement() {
    return `
<p-heading size="large"><h1>Accessibility Statement</h1></p-heading>
  <p-text>
    We are committed to ensuring digital accessibility for people with disabilities.<br>
    We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
  </p-text>
  <p-heading size="medium"><h2>Measures to support accessibility [optional - choose from list]</h2></p-heading>
  <p-text>
    We take the following measures to ensure accessibility of this Website:
  </p-text>
  <p-text-list>
    <p-text-list-item>Include accessibility as part of our mission statement.</p-text-list-item>
    <p-text-list-item>Integrate accessibility into our procurement practices.</p-text-list-item>
    <p-text-list-item>Appoint an accessibility officer and/or ombudsperson.</p-text-list-item>
    <p-text-list-item>Provide continual accessibility training for our staff.</p-text-list-item>
    <p-text-list-item>Include people with disabilities in our design personas.</p-text-list-item>
    <p-text-list-item>Include automatic and manual testing strategies.</p-text-list-item>
  </p-text-list>
  <p-heading size="medium"><h2>Conformance status</h2></p-heading>
  <p-text>
    The <a href="https://w3.org/WAI/standards-guidelines/wcag">Web Content Accessibility Guidelines (WCAG)</a> defines requirements for designers and developers to improve accessibility for people with disabilities.
  </p-text>
  <p-text>
Porsche is committed to making its websites usable by all people by meeting or exceeding the requirements of the Web Content Accessibility Guidelines 2.1 Level AA (the Guidelines). 
We continually assess and work to ensure that our Web presence is in conformance with the Guidelines.
  </p-text>
  <p-text>
    Please be aware that our efforts are ongoing as our current website provider implements the relevant improvements to meet the Guidelines over time.
  </p-text>
  <p-heading size="medium"><h2>Feedback</h2></p-heading>
  <p-text>
    If you experience any difficulty in accessing any part of this website, please feel free to contact us. Please be sure to specify the Web page and describe the issue in detail and we will make reasonable efforts to make that page accessible. We welcome feedback on how we can improve as well.
  </p-text>
  <p-text-list>
    <p-text-list-item>E-mail: <a>[e-mail address]</a></p-text-list-item>
    <p-text-list-item>
      Postal address: <br>
      Dr. Ing. h.c. F. Porsche AG<br>
      Porscheplatz 1<br>
      D-70435 Stuttgart
    </p-text-list-item>
  </p-text-list>
`
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

.p-accessibility-statement {
  p-text,
  p-text-list {
    margin-top: $pds-spacing-static-medium;
  }

  p-text + p-heading[size="large"] {
    margin-top: $pds-spacing-static-x-large;
  }

  p-text + p-heading[size="medium"],
  p-text-list + p-heading[size="medium"],
  p-text + p-heading[size="small"],
  p-text-list + p-heading[size="small"] {
    margin-top: $pds-spacing-static-large;
  }
}
</style>
