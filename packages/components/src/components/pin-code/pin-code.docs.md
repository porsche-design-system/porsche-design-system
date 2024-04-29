# Pin Code

Since different keyboard types behave differently when typing, pasting or using the keyboard auto-suggest feature, we
have to use a combination of event listeners in order to cover every scenario.

When using an Input Method Editor (IME), like some chinese or japanese keyboards use, the `keydown` event can't be
prevented and doesn't include the information which key was pressed. The only reliable event fired which can be
prevented and includes the data is the `beforeinput` event. We use this event in order to prevent invalid inputs like
non digit or multiple inputs. If a valid input is entered the default input behavior will update the input. In order to
update our internal value we use the `input` event which will be triggered afterward.

When using the keyboard auto-suggest feature the `input` event will handle the different cases. For iOS Safari a
separate input event is sent sequentially for each digit. For iOS Chrome and Android a single input event including all
digits is sent. All digits will be input into the first input and the component will update the internal value which
leads to a rerender and distribution of the value to each input. This only works when the pin-code input is empty before
clicking on the suggestion since we currently prevent typing into an input which already has a value to prevent multiple
inputs.

In order to make the `Backspace` and `Delete` key press work we use the `keydown` listener. In those cases the event
prevention works for all keyboard types, and we can update the inputs and focus accordingly.

The differences in behavior make the whole keyboard handling very difficult and unreliable. Below you can see an
overview of the differences in behavior for standard digit input via keyboard press.

|                     | Default keyboard (macOS Chrome)                                                        | IME keyboard (Android)                                                                       | Default keyboard (Android)                                                                  | IME keyboard (iOS)                                                                           | Default keyboard (iOS)                                                                 |
| ------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| keydown             | ✅                                                                                     | ✅                                                                                           | ✅                                                                                          | ✅                                                                                           | ✅                                                                                     |
| keydown key         | '1'                                                                                    | 'Unidentified'                                                                               | '1'                                                                                         | '1'                                                                                          | '1'                                                                                    |
| keydown code        | 'Digit1'                                                                               | ''                                                                                           | ''                                                                                          | 'Digit1'                                                                                     | 'Digit1'                                                                               |
| keydown keyCode     | 49                                                                                     | 229                                                                                          | 49                                                                                          | 229                                                                                          | 49                                                                                     |
| keydown prevent     | ✅ (No number is typed when only this event is prevented)                              | ❌ (Number still typed when only this is prevented, Other keys like backspace are prevented) | ✅ (No number is typed when only this event is prevented) No beforeinput/input events fired | ❌ (Number still typed when only this is prevented, Other keys like backspace are prevented) | ✅ (No number is typed when only this event is prevented)                              |
| beforeinput         | ✅                                                                                     | ✅                                                                                           | ✅                                                                                          | ✅                                                                                           | ✅                                                                                     |
| beforeinput data    | '1'                                                                                    | '1'                                                                                          | '1'                                                                                         | '1'                                                                                          | '1'                                                                                    |
| beforeinput prevent | ✅ (No number is typed when only this event is prevented) No input event fired anymore | ✅ (No number is typed when only this event is prevented) No input event fired anymore       | ✅ (No number is typed when only this event is prevented) No input event fired anymore      | ✅ (No number is typed when only this event is prevented) No input event fired anymore       | ✅ (No number is typed when only this event is prevented) No input event fired anymore |
| input               | ✅                                                                                     | ✅                                                                                           | ✅                                                                                          | ✅                                                                                           | ✅                                                                                     |
| input data          | '1'                                                                                    | '1'                                                                                          | '1'                                                                                         | '1'                                                                                          | '1'                                                                                    |
| input prevent       | ❌ (Number and other keys still typed when only this is prevented)                     | ❌ (Number and other keys still typed when only this is prevented)                           | ❌ (Number and other keys still typed when only this is prevented)                          | ❌ (Number and other keys still typed when only this is prevented)                           | ❌ (Number and other keys still typed when only this is prevented)                     |

## Keyboard auto-suggest behavior

### iOS Safari

One input event is sent for each digit. `data: '1', data: '2'...`

### iOS Chrome / Android

One single input event is sent including all digits `data: '1234'`.
