# Notifications

Notifications are an important method of communicating with users and providing feedback. 

Their main aim should be to help users perform a task and not necessarily interfere or get in the way of users while using your product. Ensure your **notifications are relevant, timely, and informative.** 

**Keep in Mind:**
Highly frequented or disruptive Notifications can have a **negative impact** on the user's experience. 

---

## When to use

In order to find the right notification type for your use case, we have defined some decision-making rules for you:

<p-link href="components/notifications/decision-tree" variant="primary">Go to the Decision Tree</p-link>

---

## Types/Behavior

|  Components  | Placement             | Follow-up Action           | Hide      | Criticality  | States        
| ----------- | -------------------- | -------------------------- |------------------- | ----- | ----- |
| **Form elements (Inline Validation)**   | Below form element         | Yes            | Resolved      | Low       | Success, Error      
| **Toast**              | Bottom, Left          | No            | Automatically (6s)  | Low/Medium | Neutral, Success
| **Inline Notification**      | Before/After Content  | Yes           | Resolved/Dismiss    | Medium     | Neutral, Success, Warning, Error
| **Banner**              | Top, Center           | Yes           | Resolved/Dismiss | Medium/High  | Neutral, Warning, Error
| **Modal**              | Center                | Yes           | Resolved/Dismiss | High   | Neutral, Warning, Error



## References
* Duncan P. Brumby, Christian P. Janssen, and Gloria Mark, [How Do Interruptions Affect Productivity?](https://link.springer.com/chapter/10.1007/978-1-4842-4221-6_9)
 (Rethinking Productivity in Software Engineering, 2019)
* Kim Flaherty, [Indicators, Validations, and Notifications](https://www.nngroup.com/articles/indicators-validations-notifications/)s (Nielsen Norman Group, 2015)
* Aurora Harley, [Visibility of System Status](https://www.nngroup.com/articles/visibility-system-status/)
 (Nielsen Norman Group, 2018)
* Jakob Nielsen, [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) (Nielsen Norman Group, 1994)
* [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
