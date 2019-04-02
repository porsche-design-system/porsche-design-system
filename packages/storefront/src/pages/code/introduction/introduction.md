# Introduction - start coding

Porsche UI Kit provides a collection of pre-built (React) components to developers for building clean and qualitative front-ends that innately come with the latest design definitions. Applications that use another frontend framework or none can include the (S)CSS styles and use the compiled HTML.

All releases of the Porsche UI Kit are available as versioned NPM packages. To use specific contents you have to integrate the NPM package as dependency in your application.

## Handling deprecated versions of Poirsche Ui Kit (0.x)
If you are still running on older versions of Porsche UI Kit (0.x Core or 0.x React) we highly recommend to update to the lates Porsche UI Kit release where it's possible. If you have to stuck on 0.x components because they do not exist in the new version, you can include both libraries in parallel.  

If using both libraries in parallel, be aware to only use **one** component of the same type, e.g. do not use `button` component of 0.x and 1.x in parallel which could cause design inconsistencies and performance issues.
