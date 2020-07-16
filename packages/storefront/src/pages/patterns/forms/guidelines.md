# Forms

The digital world cannot be imagined without forms. **Whenever we need information from the user that is to be processed by the application or when we want to enable the user to configure options**, forms are best to be used.

**Well-designed forms are a crucial part of a good UX** and also a flagship for the brand experience in general: Users perceive well-designed forms as evidence for helpfulness, professionality, technical expertise and simply enjoy working with it. However, designing forms well is always a question of the perfect combination of structure, sequence, form elements, labels, help and feedback. If this fits perfectly together (and makes users happy), chances are high to increase conversions.

**Common cases for form use are for example:**

* Account login or registration process
* Contact forms
* Checkout process
* Setting configuration
* Surveys

**Download patterns as Sketch file**  

In order to make designing forms as easy as possible we provide you with a Sketch file containing **templates for the most common form types for both desktop and mobile**, easily adaptable to your requirements:

<p-link-pure href="https://designsystem.porsche.com/sketch/porsche-design-system-form-templates.sketch" icon="download" download>Download Sketch form templates</p-link-pure>

---

## Form DNA

A typical form in Porsche web applications is made up of five basic elements:

1. **The general structure**  
  … is defined by how the form is being layed out within the specific page, involving column layout, logical sections as well as proper spacings helping the user to capture the form at first sight.  
  
2. **Form fields**  
  … provide all input options the user needs to fill out the form, whether it's commonly used free-form text input (Text Fields, Text Areas) or specific data inputs (such as Checkboxes, Radio Buttons, Select). They can have different states and variants that are described in the specific component guidelines.  
  
3. **Labels**  
  … accompany the form fields, helping the user to understand the type of input that is required. They should always be short and descriptive (optimal: 1-3 words), stating the required input. Always start labels capitalized. In all Porsche Design System components, labels are placed top-aligned to support scannability and speed up form completion.  
  
4. **Good feedback**  
  … is crucial to give the user both a feeling of success when completing the form fields correctly as well as providing valuable support in case of wrong entry.  
  
5. **Call-to-actions**  
  … are needed to initiate further processing, for example submitting, sending or cancelling a form input. Most forms come with two call-to-actions. The successive (and therefore most important) button should be emphasized. As red is a very sensitive color in forms (due to error notifications) we highly recommend to go for a [Secondary Button](#/components/button) in grey, accompanied by a Tertiary Button for the cancelling / least important option. Button labels have an effect on the conversion rate and should always be short and descriptive, informing the user about what to expect. Something like "submit" is not clear enough. Good examples are "Get a free demo", "Create account" or "Subscribe now".  

  
 ![The five basic elements of Porsche forms](../../../assets/patterns-forms-dna.png)

---

## User-centric form design

Follow these basic tips to design forms for Porsche web applications that make users happy:

### Go for relevance

**Only ask for information that is really needed from the user.**  
  Not only will the user be more likely to fill out the form, but you also preserve the user from the cognitive load (especially on mobile devices). The shorter the form, the better the completion time – and the better the conversion rate.  

**Start with fields that are easy to fill in.**  
  Keep the hurdle for the user low to fill out the complete form by providing easy-to-fill-out fields first. Good example: Start with name and e-mail before asking for the credit card number.  

**Pre-fill or auto-detect as much as possible.**  
  We already know some information about the user, like name, country or e-mail address, for example? Perfect! Pre-fill the form with this information in order to make it easier for the user to fill in the form.

### Your form should be intuitive

**Keep the form in a logical, intuitive order.**  
For example first name prior to the last name. Don't forget to take international formatting into account, as the order of form fields is often market-dependent.  

**Auto-focus the first field (or the needed one) by default.**  
This allows users to step in quickly and tab through the form elements in a logical way. The form elements provided in the Porsche Design System are already equipped with an on-board focus state.  
  
**Provide the correct input type.**  
In the best case, the correct input format (for example e-mail address, URL, phone number) should be technically preset to make the input easier for the user.  

**Avoid placeholder text.**  
Placeholder text tends to be disadvantageous in several respects: Once the form field is in focus or filled in, the placeholder is gone or overwritten and it's hard for the user to remember what the placeholder was all about – in the worst case, the user is forced to delete the input text to re-reveal the placeholder. Also, placeholders make it hard for the user to quickly scan the form and see what fields have already been filled out. When you want to give the user some information about the input format, go for information text outside the form field instead ([Nielsen Norman Group, 2014](https://www.nngroup.com/articles/form-design-placeholders/)).  

**Explain all options for action to the user.**  
The user should always be aware of all possibilities. Therefore, form fields that are not touch- or clickable (yet) should be clearly distinguishable from active form fields. Go for disabled form states when needed which you will find in the Porsche Design System form components.

### Support scannability

You should make it easy as possible for the user to perceive a form quickly:

**Avoid visual hurdles.**   
The more fluid a form is perceived, the better the conversion rate. "From our research studies, we've learned that even the slightest moment of hesitation when completing a form can significantly hurt the form’s response rate (that is, the number of people who complete the form)." ([Nielsen Norman Group, 2013](https://www.nngroup.com/articles/form-design-white-space/)).  

**Work with spacings.**  
Cluster the form in logical, coherent parts (see "Form layout" below).  

**Split long processes.**  
Go for multi-step forms in case of a long process (see below) in order to prevent cognitive overload – forms should always be kept manageable for the user**.**
Always provide a progress bar (% or the number of steps) to give the user a hint on what’s already finished.

### Provide help

**… only when help is truly required!**  
Otherwise, the user might feel overwhelmed or, in the worst case, patronized. 
 
**Always provide status information.**  
Give the user a hint on the progress state, success or error states or the completion of a form. 
 
**Provide extra information, when needed.**  
Sometimes it's helpful for the user to get further information, for example on the input format or on why the information is needed. It depends on the length and quality of the information on how it should be displayed:

* **Short and/or very important information** that's essential for the completion of the form should be displayed directly outside the form field, so that users are not forced to make further clicks. At Porsche, we always place description text on top of the form fields (as the bottom space is reserved for validation messages) in Copytext x-small in order to distinguish it from label text. You'll find detailed information on the correct placement of the description text in the specific form component guidelines.  
    
  ![Information displayed outside the form field](../../../assets/patterns-forms-helptext-open.png)  

* **Longer and/or less important information** (even more so if it's optional to read) should be hidden in an "information" icon that is placed directly (spacing 4 px) after the field label and reveals an explanation in a tooltip on hover (desktop) or on click (tablet/mobile). As soon as the user continues filling out the form, the tooltip should disappear. This way, we keep the form short and prevent the user from extra scrolling. But be aware to use tooltips sparingly.  
    
  ![Information displayed in tooltip](../../../assets/patterns-forms-helptext-tooltip.png)

### Handle with care: Sensitive and personal data

Many users are afraid of spam or hackers and especially do not like to enter their personal data in forms. In order to prevent users from cancelling their form input:  
  

**Ask for as little information as possible.**  
Users shouldn't get the feeling that they are being asked for irrelevant or unnecessary information or even that information is only collected for the purpose of data collection.  

**Give deeper information on a specific input.**  
Sometimes it's helpful to give some more information on the "why" of a required input, in order to remove any doubt from the user, even more, when it comes to very specific data the user is not used to fill in or when the further processing of information is not clear enough. In this case, a tooltip with an "information" icon (right behind the input label) is the best way to go.

  ![Tooltip information on personal data input](../../../assets/patterns-forms-personal-data.png)
  
**Respect GDPR and other legal regulations.**  
The user should be asked to enter only information that is absolutely necessary.

### Mandatory and optional fields

Due to the form design mantra "Less is more" optional fields should be avoided whenever possible ([Nielsen Norman Group, 2016](https://www.nngroup.com/articles/web-form-design/)). So the majority of form fields should always be mandatory. 
Due to this fact, we can avoid visual and cognitive overload by **marking only the optional fields which are in the minority.** We recommend adding an "… (optional)" to the respective form label.   
  

Further benefits:

* This also gives the user a more positive feeling, as people are more likely to share optional information from a psychological perspective.
* Users are not supposed to read a global explanation ("All fields marked with *…").
* The asterisk (*) is freely available for other purposes, for example footnotes.
* Generally, the form looks cleaner and we avoid distraction.
  
  
![Mobile form with optional form field](../../../assets/patterns-forms-optional-fields.png)

---

## Form layout

### The anatomy of a form

1. **Headline and subline**  
   A clear title gives the user some information on what to expect when filling out the form.  
   
2. **Sections including form elements**  
   The longer a form, the more crucial it is to split it into content-related sub-areas in order to increase scannability.  
   Thus form fields that require similar information should be grouped together to create a logical order. This can be set as a coding property "fieldset". 
   Each fieldset should be initiated by a title (we recommend h4 of the respective viewport) that gives the user short information on what data is required in this section.
   
3. **Call-to-actions**  
   Call-to-actions are needed to submit or cancel the form input and should always be placed left-aligned.
   

### Single-column layout

Even though today's displays offer a lot of space: **Good forms are always single-column!** This is even more important when it comes to mobile view or longer forms, especially multi-step forms. A research study revealed that single-column forms could be completed 15.4 sec faster than a comparable multi-column form and at a 95% confidence level ([CXL Institute, 2018](https://cxl.com/research-study/form-field-usability/)).  

This is why:

- Single-column forms make it easier for the user to scan a form fluently and with less distraction.
- The common reading direction is zigzag ("Z"). This makes it harder to perceive a multi-column form.

### Form layout spacings

According to the ["law of proximity" in Gestalt psychology](https://lawsofux.com/law-of-proximity) objects that are near or proximate to each other tend to be grouped together. So in order to make it easy for the user to scan the form you should cluster the form in logical, coherent parts by working with spacings. We differ the following spacings (according to the **Porsche Design System spacing system**): 
Depending on the viewport you're designing for you should stick to slightly different spacings for your form:

| Viewport | Range | Total max. width of the form | Min. form top / bottom spacing (A) | Section spacing (B) |  Min. vertical/horizontal form field spacing (C) |
| -------- | -------- | -------- | -------- | -------- | -------- |
| **XS** | 320-759 px | 12 grid columns | 48/64 px | 40 px | 16 px |
| **S** | 760-999 px | 10 grid columns | 48/64 px | 40 px | 16 px |
| **M** | 1000-1299 px | 8 grid columns | 64/80 px | 48 px | 16 px |
| **L** | 1300-1759 px  | 6 grid columns | 64/80 px | 48 px | 16 px |
| **XL** | 1760 px or larger | 6 grid columns | 64/80 px | 48 px | 16 px |

As for the smallest grouped element within a form – label and form field – we recommend using 4 px spacing. This is also predefined in the Porsche Design System form elements.
  
![Form layout with spacings](../../../assets/patterns-forms-anatomy-mobile-spacings.png)


### Form field widths 

It's commonly recommended to set the form field width to the estimated length of the required input. As we design for international markets at Porsche it's often quite hard to predict the estimated length depending on the language. Also, this might lead to a quite unbalanced and "fluttering" look and feel of the form in general. 
Thus, we recommend to go the "golden middle way" in order to cover both the reflection of the intended content length, but also visual pleasure:

**Form fields should be set to full form width (100 %) by default** to keep the fluttering effect low.
However, we recommend to break out of that rule and **go for estimated form field lengths in the following cases** (even if this doesn't mean 100 % in total for that row) as this supports the user's perception:

- When setting form elements in a row (one or more) that _aren't_ Text Fields, for example Selects or Radio Button Groups.
- When setting multiple form fields in a row (only when it makes sense, e.g. in case of ZIP code and city input).
- In case of very short forms (up to 3 fields).

### Form Grid

When setting field widths to the estimated length you should stick to the following standard values to support a common overall look and feel for Porsche forms.
The % values always refer to the full maximum width of the form (see table above):  
  
**25 % / 33.33 % / 50 % / 66.66 % / 75 % / 100 %**


![Form field widths](../../../assets/patterns-forms-field-widths.png)


---

# Form validation

Good forms provide **valuable support** – both **for success**, when the user completes form fields correctly, and **for error cases**, when the user makes a wrong entry. However, there's a direct correlation between *how* and *when* users are presented with form validation errors and the pace and effort with which they are able to resolve them ([Baymard, 2016](https://baymard.com/blog/inline-form-validation)).  

As we know different cases in which we should provide validation feedback, we provide different types of feedback to be used for designing Porsche forms:

### Live inline validation

**In the best case, you should always give direct feedback** on the correctness of the user's input whilst filling out the form, whether it's about existence or formatting of the data (think of unique user names, ZIP codes or credit card numbers) or having filled out all mandatory fields. This way, we enable users to correct errors quickly and easily and prevent them from being frustrated when one or more errors pop up after already having submitted the form.  

Technically, the feedback should be displayed when the input is already done, **directly after leaving the form field**, as this speeds up progressing time and lowers error rates (as we all know how frustrating and time-consuming it is to get a hint that the "@" is still missing when you only started typing in your e-mail address).

**Position and styling**  
Inline validation feedback should always be displayed in the direct context of the action, ideally **below the respective form field** (you can find this as a preset property in the Porsche Design System form components).

**Feedback for error and success**  
We should give the user not only feedback on errors but also on successful input as positive reinforcement is a motivation for the user ([Userlutions, 2019](https://userlutions.com/blog/usability-insights/inline-validation)).

![Form layouts with error and success notification](../../../assets/patterns-forms-feedback-error-success.png)


**Permanent view**  
The validation should be displayed permanently so that the user can scan the page again for possible errors at any time until finally submitting the form.

### Error on submit

Even though live inline validation should be your first choice from a UX perspective, sometimes it’s unavoidable to give feedback only after the submission of a form. In this case, we should provide…  

- … an **error summary** at the beginning of the form (ideally the user should jump automatically to the summary after submitting). Within the error summary, all errors should be listed and linked so that the user can easily jump to the selected field errors.
- … **inline error notifications** that are placed below the respective form fields enable the user to perceive errors quickly, also whilst scrolling. In order to avoid double maintenance (and also reading effort for the user), the specific error text should in the best case be written in a style that can also be used 1:1 in the error summary.

![Form layouts with error summary and inline error notifications](../../../assets/patterns-forms-error-on-submit.png)


### Tonality and content

Sure, nobody likes error messages! But as they're sometimes inevitable, we should focus on how we talk to our users. Error messages should never be scaring or intrusive, as this might (in the worst case) lead the user to cancel the form. Error messages rather should give the user security and make it easy to correct the error, so that the delay caused by the error appears as short as possible. So, designing custom error messages is key for a good UX and to increase conversions ([90 Percent of Everything, 2009](https://www.90percentofeverything.com/2009/02/16/karl-sabino-on-the-roi-of-well-designed-error-messages/)).

**How we write error messages in Porsche web applications:**

|               | <p-text color="notification-success">DO</p-text> 👍  | <p-text color="notification-error">DON'T</p-text> 👎 |
|---------------|------------------------------------------------------|------------------------------------------------------|
| We always state **why** the user's input was not correct and – very important! – we **always** **provide opportunities** on how the user can quickly and easily correct the error. | <p-text color="notification-success">"The credit card number seems to be incomplete. Please check it again."</p-text> | <p-text color="notification-error">"Invalid input."</p-text> |
| Error messages should be **short, specific and descriptive**. | <p-text color="notification-success">"The e-mail needs an 'at' symbol."</p-text> | <p-text color="notification-error">"The e-mail is invalid."</p-text> |
| We always **address users directly** and at eye level – just like if we talked to them in real life. | <p-text color="notification-success">"Please check your input."</p-text>| <p-text color="notification-error">"Invalid input."</p-text> |
| We **use our voice dynamically** – depending to the current situation we speak for example rather descriptive, clearly or motivating. Whenever the user needs help, **we speak empathetic and encouraging**. | <p-text color="notification-success">"What would you like to tell us?"</p-text> | <p-text color="notification-error">"Please enter your message."</p-text> |
| We use **active voice** in case of instructions. | <p-text color="notification-success">"Enter your name."</p-text> | <p-text color="notification-error">"First name must be entered."</p-text> |
| We **avoid using negative words** like "invalid", "forbidden", "error" or "problem". We should never make the user feel bad or guilty. | <p-text color="notification-success">"The credit card expiration date must be in the future."</p-text> | <p-text color="notification-error">"The credit card is invalid."</p-text> |
| We should **always provide positive submission notifications**, showing the user that the process is completely and correctly finished and providing them information for next steps. This good feeling directly relates to a good brand experience. | <p-text color="notification-success">"You have successfully completed your registration. We now wish you a pleasant visit to the Porsche website."</p-text>| <p-text color="notification-error">"You have successfully completed your registration. Now you can make orders in the Porsche Shop, manage your personal data and much more. We wish you a lot of fun. We also recommend the following services: …"</p-text> |

---

## Designing forms for mobile

In favor of a better conversion rate, it's highly recommended to put an extra eye on the mobile version – not only for your website in general but especially for the forms provided on your website. Instead of copy-and-paste-ing the desktop view (as this might lead to problems with readability and perception), optimize your forms on smaller viewports for a mobile-friendly experience and focus especially on the following aspects:

### Provide state information

Set the visual focus to the current form field to give orientation and enable the user to perceive information quickly. Also, you should always give the user information about the **current progress status** by providing a progress bar (% or "step 1 of 3"). This is not only relevant for longer or multi-step forms in general, but especially on mobile viewports, where the user has no clear overview of the length of the complete form. 

### Use native components

Users are familiar with device-specific UI patterns (for example the iOS date picker). So the first choice for a good mobile UX should be to go for native elements instead of individual UI patterns.

![iPhone screen with native date picker](../../../assets/patterns-forms-native-date-picker.png)

### Provide correct input types

Whenever possible, the required input type should be technically preset, so that users are provided automatically with the correct UI controls. This helps fill out the form much faster.

### Automate actions (when possible)

Make it easy for users by providing autocorrect (meaning the form automatically corrects e.g. spelling errors) and autocomplete (specific fields are automatically completed such as filling in the user's ZIP code based on the location).

### Use input contraints

When it makes sense you should set input constraints to your Text Fields and Textareas to limit the input length, as some users tend to over-explain and therefore spend much time filling out the form, which might lead to frustrating and bad ratings in the end.

---

## Accessibility

Always stick to the defined [Accessibility criteria](#/accessibility/introduction) (WCAG level AA) when designing web applications for Porsche. For form design you should consider in particular the following aspects:

* Forms should **provide 100% keyboard navigation**, which means: Users should be able to jump through the whole form using the tab key.
* Always **provide focus states** to show the user both the starting and when proceeding the current position. The Porsche Design System form components are provided with a focus state on board.
* **Never use color as a single indicator for a type of use or state**. In form layout, this means that for error or success notifications and for highlighting incorrect form fields it's highly recommended to work with further formatting, e.g. a larger border width. This is also already predefined in the Porsche Design System form components.
* **Provide a sufficient click/touch area** for each component. [Apple’s Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/) suggest providing a tappable area of 44 x 44 px for all controls. As this "safe zone" might result in large spacings between components (just think of a stacked checkbox list) or overlapping of the tappable areas, we'd recommend defining the tappable area component-based, as the size of the tappable area is also a matter of the general height *and* width of a component. You'll find detailed information in the respective component guidelines.

---

## Privacy and EU data protection guidelines

We also have the responsibility to sign the consent form (Declaration of consent) in accordance with the EU data protection basic regulation (DSGVO) by using design guidelines and implement measures in such a way that consent is given by the user voluntarily. Studies show that especially when the user does not feel that they have control over their data or that the disclosure would have (or may cause) negative consequences they won’t share their data. Therefore, not only the benefits of data disclosure should be transparent to the user (for example the sending of an advertising brochure), but also the exclusion of possible risks (for example, that data will not be passed on to third parties for undefined purposes) and give a feeling of control.

In principle, it is helpful for a successful implementation of the maxims to be oriented towards the function of the purpose statement: The purpose must allow users to understand the consequences of data sharing and handling for them. A successful implementation of the maxims therefore enables the users to effectively control the consequences indicated by the purposes.
In the section **Handle with care: Sensitive and personal data** we already mentioned some guidelines about handling personal data. In this section we will give you a little more insights about all of the Privacy Principles. 


**The Privacy UX Design Guidelines Principles are:**

1. **Limitation**
   A dialogue may only collect the data required for the specified purpose. Which and how much personal data may be collected therefore depends on how concrete (or how general) the purposes were expressed. If, for example, a data processor needs to know whether the user is already of age in order to release a service, this only requires the user to indicate the age of majority, but not the specific age.

2. **Selection and control**
    The users must always be able to give (or refuse) their consent for each individual purpose. In doing so, they must actively decide to save data for a clearly defined purposes (so-called opt-in). The users must therefore take active steps to give their declaration of consent, for example by clicking a checkbox or toggling an online form. On the other hand, a ticked box does not require any active action by the users and does not provide a valid declaration of consent in the general view. If the data collection is to be based on the user's declaration of consent (and not another legal basis), the user must therefore expressly have agreed to this before the data may be collected. Because users evaluate the sensitivity of their data differently, they should always be given as much choice as possible (for example, how to contact the users).

3. **Explanation**
    Can the user understand why which data is collected? Textual and/or graphic explanatory guides can be used for this purpose. In addition, added value should also be presented visually whenever possible. Putting things into context (explained in the next section) is another important strategy to make the collection of data "meaningful" for the user. At the very best, the user can also be informed about the extent to which the disadvantages feared by him with the data disclosure are already excluded, reduced or at least controlled by the data processor (i.e. the Porsche AG) due to the protective measures provided. Measures are, for example, the pseudonymisation of personal data, their encryption as well as technical-organizational access controls.

4. **Contextualisation of the consent**
    Consent should preferably be obtained "just in time", i.e. at the time when it is necessary (but no later than at the time of collection of the data or at the time when data is processed for a different purpose than previously indicated). The justification for collecting and obtaining consent, both in terms of time, space and logic, should be sent directly and without interruption to be tied to each other.

5. **Controllability**
    Dialogs should be controllable in order to make the flow of processes transparent for the user (for example, when entering data). There should be no dependencies and couplings between providing data or the booking of services. Instead, it should be possible to agree to each processing purpose individually. Users should be able to manipulate, terminate and resume processes at any time, even retroactively. An attractive controllability is especially important for mobile devices. For this purpose, the user must be provided with sufficient information for orientation and navigation. This also refers to accurate, friendly, and complete feedback in case of unexpected behavior or errors.

6. **Support**
    Filling in fields or forms should always be supported as much as possible. This includes responsive design, error tolerances, auto-completion, search function (for example for dropdowns), logical (alphabetical) sorting, the use of common formats for for example date entries. Relationships can also exist across fields.

7. **Minimalism and continuity**
    Dialogues and processes should have a clear overall structure and clearly distinguish individual topics or contents to separate them from each other. Visual and informational overload must be avoided. This prevents the user from being overwhelmed and gives a feeling of familiarity and security.

8. **Appreciation**
    The consideration of correct salutations, titles and names, if necessary, is an element that creates trust and closeness. Individuality should be respected (for example no pressure to choose 'man' or 'woman' in a form field for gender selection).  This also includes the possibility for the user to specify titles (for example Prof. Dr.).

9. **User testing**
    These principles describe possible implementations of the consent form, which should enable the user to effectively control the consequences or risks associated with the disclosure of data. In order to ensure a successful implementation, this must be contextualised (i.e. tested empirically with users using the respective touchpoint). This does not only mean technical functional tests.  Rather, it must be checked whether the concrete implementation of the principles really leads to the users' understanding of the consequences and risks of data disclosure and feel that they can be effectively controlled.


## Related components

* [Text Field](#/components/text-field)
* [Textarea](#/components/textarea)
* [Checkbox](#/components/checkbox)
* [Radio Button](#/components/radio-button)
* [Select](#/components/select)