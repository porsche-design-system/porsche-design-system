# Accessibility Statement

## Definition
**An accessibility statement has two basic functions:**  
**Firstly**, it presents clear information about the target level of web accessibility for the website and the methods used to achieve those targets. It also enables the website owner to acknowledge any areas of the website where accessibility targets have not been met and to outline the proposed plan for resolving any such problem.  
**Secondly**, an accessibility statement is a powerful declaration of commitment. People visiting the website, particularly those with disabilities, will appreciate the open acknowledgement that accessibility is a key driver for the website. 

**A word of caution however:**
An accessibility statement that makes rash or false claims will only damage the reputation of the website, not enhance it and it does not prevent the site owner from getting sued if the website lacks support for accessibility.

## Where to put an accessibility statement
Accessibility statements should be easy to find. Linking them from several places, such as from the footer, help menu, as an invisible anchor in the header of each homepage, and other prominent areas helps users to find them. 
Use consistent link names for your accessibility statements to help users recognize them. This includes link names across the content of your website and mobile applications, and across groups of related websites and mobile applications. 

For example, use the same link name on all web pages to refer to an accessibility statement for that website, and use that same link name to refer to the accessibility statement of the mobile application version of the website.


## Example template
There are several possibilities how to write an accessibility statement which depends on the particular use case of your site. 
The following example can be seen as a blueprint which might be adapted to your specific needs.

This template is based on the guidelines on [How to develop an Accessibility Statament](https://www.w3.org/WAI/planning/statements/) provided by **W3C**.

<Playground :markup="statement" class="p-accessibility-statement"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    
    get statement() {
      return `
<p-headline variant="headline-3">Accessibility Statement for [Website Name]</p-headline>
  <p-text>
    <strong>Porsche AG</strong> is committed to ensuring digital accessibility for people with disabilities.<br>
    We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
  </p-text>
  <p-headline variant="headline-4" tag="h2">Measures to support accessibility</p-headline>
  <p-text>
    <strong>Porsche AG</strong> takes the following measures to ensure accessibility of [Website Name]:
  </p-text>
  <p-text-list>
    <p-text-list-item>Include accessibility as part of our mission statement.</p-text-list-item>
    <p-text-list-item>Integrate accessibility into our procurement practices.</p-text-list-item>
    <p-text-list-item>Appoint an accessibility officer and/or ombudsperson.</p-text-list-item>
    <p-text-list-item>Provide continual accessibility training for our staff.</p-text-list-item>
    <p-text-list-item>Include people with disabilities in our design personas.</p-text-list-item>
  </p-text-list>
  <p-headline variant="headline-4" tag="h2">Conformance status</p-headline>
  <p-text>
    The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/">Web Content Accessibility Guidelines (WCAG)</a> defines requirements for designers and developers to improve accessibility for people with disabilities.<br>
    It defines three levels of conformance: Level A, Level AA, and Level AAA.
  </p-text>
  <p-text>
    [Website Name] is partially conformant with <strong>WCAG 2.1 level AA</strong>.<br>
    <strong>Partially conformant</strong> means that some parts of the content do not fully conform to the accessibility standard.
  </p-text>
  <p-headline variant="headline-5" tag="h3">Additional accessibility considerations</p-headline>
  <p-text>Although our goal is WCAG 2.1 Level AA conformance, we have also applied some Level AAA Success Criteria:</p-text>
  <p-text-list>
    <p-text-list-item>Images of text are only used for decorative purposes.</p-text-list-item>
    <p-text-list-item>Re-authentication after a session expires does not cause loss of data.</p-text-list-item>
    <p-text-list-item>Some videos have sign language interpretation.</p-text-list-item>
  </p-text-list>
  <p-headline variant="headline-4" tag="h2">Feedback</p-headline>
  <p-text>
    We welcome your feedback on the accessibility of [Website Name].
    Please let us know if you encounter accessibility barriers on [Website Name]:
  </p-text>
  <p-text-list>
    <p-text-list-item>Phone: +12 34 567 89 00</p-text-list-item>
    <p-text-list-item>E-mail: <a href="mailto:accessibility@porsche.com">accessibility@porsche.com</a></p-text-list-item>
    <p-text-list-item>
      Postal address: <br>
      Dr. Ing. h.c. F. Porsche AG<br>
      Porscheplatz 1<br>
      D-70435 Stuttgart
    </p-text-list-item>
  </p-text-list>
  <p-text>
    We try to respond to feedback within 5 business days.
  </p-text>
  <p-headline variant="headline-4" tag="h2">Technical specifications</p-headline>
  <p-text>
    Accessibility of [Website Name] relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
  </p-text>
  <p-text-list>
    <p-text-list-item>HTML</p-text-list-item>
    <p-text-list-item>WAI-ARIA</p-text-list-item>
    <p-text-list-item>CSS</p-text-list-item>
    <p-text-list-item>JavaScript</p-text-list-item>
  </p-text-list>
  <p-text>These technologies are relied upon for conformance with the accessibility standards used.</p-text>
  <p-headline variant="headline-4" tag="h2">Limitations and alternatives</p-headline>
  <p-text>
    Despite our best efforts to ensure accessibility of [Website Name], there may be some limitations. Below is a description of known limitations, and potential solutions. Please contact us if you observe an issue not listed below.
  </p-text>
  <p-text>
    Known limitations for [Website Name]:
  </p-text>
  <p-text-list list-type="ordered">
    <p-text-list-item><strong>Comments from users</strong>: uploaded images may not have text alternatives because we cannot ensure the quality of contributions. We monitor user comments and typically repair issues within 10 business days. Please use the 'report issue' button if you encounter an issue.</p-text-list-item>
    <p-text-list-item><strong>Archived documents</strong>: might not work with current assistive technologies because they use outdated technologies that do not support accessibility. We convert documents to new formats upon request within 3 business days. Please contact documents@example.org for support.</p-text-list-item>
  </p-text-list>
  <p-headline variant="headline-4" tag="h2">Assessment approach</p-headline>
  <p-text>
    <strong>Porsche AG</strong> assessed the accessibility of [Website Name] by the following approaches:
  </p-text>
  <p-text-list>
    <p-text-list-item>External evaluation</p-text-list-item>
  </p-text-list>
  <p-headline variant="headline-4" tag="h2">Evaluation report</p-headline>
  <p-text>
    An evaluation report for [Website Name] is available at:
    <a href="https://www.w3.org/WAI/demos/bad/after/reports/report">https://www.w3.org/WAI/demos/bad/after/reports/report</a>.
  </p-text>
  <p-headline variant="headline-4" tag="h2">Evaluation statement</p-headline>
  <p-text>
    An evaluation statement for [Website Name] is available at:
    <a href="https://www.w3.org/WAI/demos/bad/after/reports/statement">https://www.w3.org/WAI/demos/bad/after/reports/statement</a>.
  </p-text>
  <p-headline variant="headline-4" tag="h2">Formal approval of this accessibility statement</p-headline>
  <p-text>This Accessibility Statement is approved by:</p-text>
  <p-text>
    <strong>[Website Name]<br></strong>
    Communication Department<br>
    Director of Communication
  </p-text>
  <p-headline variant="headline-4" tag="h2">Formal complaints</p-headline>
  <p-text>We aim to respond to accessibility feedback within 5 business days, and to propose a solution within 10 business days. You are entitled to escalate a complaint to the national authority, should you be dissatisfied with our response to you.</p-text>
`
    }
  }
</script>

<style lang="scss">
  @import "~@porsche-design-system/utilities/scss";

.p-accessibility-statement {
  p-text,
  p-text-list {
    margin-top: $p-spacing-16;
  }

  p-text + p-headline[tag="h2"],
  p-text-list + p-headline[tag="h2"] {
    margin-top: $p-spacing-48;
  }

  p-text + p-headline[tag="h3"],
  p-text-list + p-headline[tag="h3"] {
    margin-top: $p-spacing-32;
  }
}
</style>