# Banner

Banner are used to provide action-based feedback messages or to convey informational and/or critical account-related notification.
Whenever you want to provide short, non-disruptive feedback or confirmation messages that communicate information to the user directly after taking an action,
stick to the [Toast](#/components/toast) component instead.

---

## Types

### Error

Use error Banners to inform users something critical has happened and requires immediate attention.

!!! Code Beispiel !!!


### Warning

Use warning Banners when you want the user to take a specific action or to warn them that something is about to go wrong.

!!! Code Beispiel !!!


### Neutral

Use neutral Banners to make a general announcement.

!!! Code Beispiel !!!


### Cookie

Use the cookie banner to inform about the usecase of cookies, e.g. users can 
gain access to more information (cookie policy or cookie settings) about.

!!! Code Beispiel !!!



---

## Variants

### Basic

By default, a Banner will dismiss when the user clicks the “x” close button.

!!! Code Beispiel !!!

### Action

A action Banner can have up to one button. This should be kept concise and only used when there’s an actionable item related to the Banner text.

!!! Code Beispiel !!!

### System

System Alerts are similar to the Feedback Banner but represent the highest level of importance.
These Banners are reserved for issues like compliance and system errors. As such, they are persistent until the issue is resolved.

!!! Code Beispiel !!!


### Inline

Inline Banners are a variant of the Banner notification, providing immediate feedback as marketing or pure information somewhere inline on the page.

!!! Code Beispiel !!!


---

## Styling

### Text
The Banner text (always in copytext) gives the user an information about the priority related notification. 
Try to keep the feedback message short and descriptive.

### Width
The banner is always as width as the content and therefore stretches over all grid columns. 

---

## Usage

### Priority queue

!!! TBD !!!

### Placement

Banners are displayed at the top of the screen. By default, a banner is placed 
in the top center of the application, within the grid of the viewport. !!! TBD !!!

## Don'ts

### Don’t place mobile toasts over navigation

On mobile viewports, be mindful of important navigation bars at 
the bottom of the screen by placing toasts vertically above these components.

!!! Image !!!

### Don’t display more than one action

Actionable Banners should only have one button.

!!! Image !!!

### Don't include a redundant action

Actionable Banners should not have a button with a redundant action. 
For example, “dismiss” would be redundant. Use the basic instead.

!!! Image !!!

### Multiple Banners

Do not display multiple Banners at the same time. When Banners are consecutively 
or simultaneously triggered, their display and behavior should follow a priority queue. !!! TBD !!!

!!! Image !!!

---

## Related Components
* [Toast](#/components/toast)
* [Modal](#/components/modal)

