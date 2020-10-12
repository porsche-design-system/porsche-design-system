# Banner

Banner are used to provide action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics. Whenever you want to provide brief, temporary notifications stick to the **Toast component** (work in progress) instead. They are noticeable but do not disrupt the user experience and do not require an action to be taken.

---

## Types

### Error

Use error Banners to inform users something critical has happened and requires immediate attention.

<p-banner state="error" width="fluid" class="p-banner-custom" style="margin-top: 40px; display: block;">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description.</span>
</p-banner>

### Warning

Use warning Banners when you want the user to take a specific action or to warn them that something is about to go wrong.

<p-banner state="warning" width="fluid" class="p-banner-custom" style="margin-top: 40px; display: block;">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description.</span>
</p-banner>

### Neutral

Use neutral Banners to make a general announcement.

<p-banner state="neutral" width="fluid" class="p-banner-custom" style="margin-top: 40px; display: block;">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description.</span>
</p-banner>



---

## Variants

### Basic

By default, a Banner will dismiss when the user clicks the “x” close button.

<p-banner state="neutral" width="fluid" class="p-banner-custom" style="margin-top: 40px; display: block;">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description.</span>
</p-banner>


### Persistent

Persistent Alerts are similar to the Feedback Banner but represent the highest level of importance.
These Banners are reserved for issues like compliance and system errors. As such, they are persistent until the issue is resolved.

<p-banner persistent="true" width="fluid" class="p-banner-custom" style="margin-top: 40px; display: block;">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description.</span>
</p-banner>
---

## Styling

### Text
The Banner text (always in copytext) gives the user an information about the priority related notification.
Try to keep the feedback message short and descriptive.

### Width

The banner is always as width as the content and therefore stretches over all grid columns. 

---

## Usage

### Placement

On desktop the Banners are displayed at the top of the screen. By default, a banner is placed 
in the top center of the application, within the grid of the viewport. On mobile, all Banners 
are displayed at the bottom of the screen. 

## Don'ts


### Position

The Banner component is positioned fixed above the page content by default.


![Banner position](./assets/feedback-banner-position-do.png)



![Banner position](./assets/feedback-banner-position.png)


<style lang="scss">
  .p-banner-custom {
    --p-banner-position-type: static;
  }
</style>