# Decision Tree

The decision tree can guide you when to use which notification component. First, walk through the four cases and pick the one that represents your case the best. From there, a few simple questions will lead you to the recommended component for your notification.

---

## Select your case:


  - [Provide additional information for a task, a status or their current action](#provide-additional-information-for-a-task-a-status-ortheir-current-action)
  - [Confirm a task was completed as expected](#confirm-a-task-was-completed-as-expected)
  - [Inform/confirm that the user is taking actions or an event occurs that is not desirable or might have effects](#confirm-a-task-was-completed-as-expected)
  - [Inform of an error or critical failure](#confirm-a-task-was-completed-as-expected)


<a href="components/notifications/decision-tree#target">target</a>

---

## Provide additional information for a task, a status or their current action.

Status: Neutral

#### Example use Cases:
* Ask for User data
* Request feedback
* Validation code was send to phone
* Mail was send to inbox

 ![The five basic elements of Porsche forms](../../../assets/notification-neutral.png)

 Related Components;

* [Modal (Dialog)](components/modal) 
* [Banner](components/notifications/banner) 
* [Inline Notification](components/notifications/inline-notification)

---

## Confirm a task was completed as expected.

Status: Success

#### Example use Cases:
* From submit was successful
* Selection made is approved
* Changes are saved/made/applied successfully
* An Upload was successful
* A request was submitted successfully
  
 ![The five basic elements of Porsche forms](../../../assets/notification-success.png)

 Related Components;

* [Inline Validation](components/text-field)
* Toast - Coming soon 
* [Inline Notification](components/notifications/inline-notification)


---

## Inform/confirm that the user is taking actions or an event occurs that is not desirable or might have effects.

Status: Warning

#### Example use Cases:
* The user’s login session is about to expire
* Planned system maintenance is coming soon
* About to leave the system
* About to delete a vehicle or user data
  
 ![The five basic elements of Porsche forms](../../../assets/notification-warning.png)

 Related Components;

* [Banner](components/notifications/banner) 
* [Inline Notification](components/notifications/inline-notification)
* [Modal (Dialog)](components/modal) 


---


<h2 id="target">target</h2>

## Inform/confirm that the user is taking actions or an event occurs that is not desirable or might have effects.

Status: Error

#### Example use Cases:
* Internet connection lost
* Form submit error (mandatory fields missing)
* Wrong input format
* Credentials can't be found
* Feedback Page (Success / Error)
* There is a problem uploading a file
  
 ![The five basic elements of Porsche forms](../../../assets/notification-error.png)

 Related Components;

* [Inline Validation](components/text-field)
* [Banner](components/notifications/banner) 
* [Inline Notification](components/notifications/inline-notification)
* [Modal (Dialog)](components/modal) 


