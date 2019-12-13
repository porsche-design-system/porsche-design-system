(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c56b23f"],{"17c29":function(e,t,i){e.exports=i.p+"img/grid-alignment.56eec7e1.png"},3423:function(e,t,i){e.exports=i.p+"img/grid-viewports.c45ca1ff.png"},3887:function(e,t,i){e.exports=i.p+"img/grid-maxwidth.c1ccffb9.png"},"7c2e":function(e,t,i){e.exports=i.p+"img/grid-endtoend.4d56bde4.png"},"8ad4":function(e,t,i){e.exports=i.p+"img/grid-components.c9b33881.png"},a297:function(e,t,i){e.exports=i.p+"img/grid-behaviour.b8c7fb41.png"},f93d:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vmark"},[o("h1",[e._v("Grid")]),o("p",[e._v("The grid is a fixed component in the digital Porsche layout. It provides a visual system consisting of a defined number of columns. It allows a responsive layout and therefore a homogeneous and balanced content placement across all Porsche web experiences and screen sizes.")]),o("h2",[e._v("Grid architecture")]),o("ul",[o("li",[e._v("The Porsche Design System grid uses "),o("strong",[e._v("12 columns")]),e._v(", offering a high layout flexibility by being dividable by 2, 3, 4 or 6. To enable a flexible adaption of content to any screen size, its width is based on percentages (resulting from total screen width minus gutter and margin width). For layouting on mobile screens (widths < 759px), it is recommended to use a 6-column-grid to avoid too much small-scaling or even „cluttering“.")]),o("li",[o("strong",[e._v("The grid gutter")]),e._v(" separates the columns horizontally by in-between-spacings. The gutter is defined with fixed pixel sizes and breakpoints to balance size ratios between elements on the respective screen size.")]),o("li",[o("strong",[e._v("The grid margins")]),e._v(" define the outer spacings between the content area and the left and right screen sides. Grid margins are defined using percentages, going from 7% to 10% for screen widths larger than 1760px.")])]),o("p",[o("img",{attrs:{src:i("8ad4"),alt:"Porsche Design System grid architecture"}})]),o("h3",[e._v("Overview")]),o("table",[o("thead",[o("tr",[o("th",[e._v("Viewport")]),o("th",[e._v("Range")]),o("th",[e._v("Columns")]),o("th",[e._v("Gutter")]),o("th",[e._v("Margin")])])]),o("tbody",[o("tr",[o("td",[o("strong",[e._v("XS")])]),o("td",[e._v("320-759 px")]),o("td",[e._v("12 columns (Design only: 6 columns)")]),o("td",[e._v("16 px")]),o("td",[e._v("7%")])]),o("tr",[o("td",[o("strong",[e._v("S")])]),o("td",[e._v("760-999 px")]),o("td",[e._v("12 columns")]),o("td",[e._v("24 px")]),o("td",[e._v("7%")])]),o("tr",[o("td",[o("strong",[e._v("M")])]),o("td",[e._v("1000-1299 px")]),o("td",[e._v("12 columns")]),o("td",[e._v("36 px")]),o("td",[e._v("7%")])]),o("tr",[o("td",[o("strong",[e._v("L")])]),o("td",[e._v("1300-1759 px")]),o("td",[e._v("12 columns")]),o("td",[e._v("36 px")]),o("td",[e._v("7%")])]),o("tr",[o("td",[o("strong",[e._v("XL")])]),o("td",[e._v("1760 px or larger")]),o("td",[e._v("12 columns")]),o("td",[e._v("36 px")]),o("td",[e._v("10%")])])])]),o("p",[o("img",{attrs:{src:i("3423"),alt:"Porsche Design System grid architecture"}})]),o("h2",[e._v("Grid breakpoints")]),o("p",[e._v("Breakpoints are predefined points at which the content is changed to ensure an optimised layout on all screen sizes. Within the layouts for Porsche web experiences, we use the following main breakpoints, derived from statistical data on browser size usage:")]),o("ul",[o("li",[e._v("760px")]),o("li",[e._v("1000px")]),o("li",[e._v("1300px")]),o("li",[e._v("1760px")])]),o("h3",[e._v("Breakpoint usage")]),o("p",[e._v("It is highly recommended to stick to the defined breakpoints, especially for general elements like headers or footers.")]),o("p",[e._v('As for other components or modules, not every individual breakpoint has to be used. And also vice versa: if more breakpoints are needed for a specific component, you are free to add more. Please ensure that every additional breakpoint has a minimum gap of 100px to the existing main breakpoints (in order to avoid "breakpoint overload").')]),o("h3",[e._v("Optimising for defined viewport sizes")]),o("p",[e._v("Based on statistical use of specific devices, all Porsche web layouts should be optimised for the following viewport sizes:")]),o("ul",[o("li",[e._v("320 / 375px")]),o("li",[e._v("768px")]),o("li",[e._v("1024px")]),o("li",[e._v("1366px")]),o("li",[e._v("1920px")])]),o("p",[e._v("The main breakpoints (see above) are deliberately chosen with some distance from the optimised device sizes due to a higher fault tolerance.")]),o("h3",[e._v("Layout template")]),o("p",[e._v("To make layouting from scratch as easy as possible, the optimized viewport sizes are provided by "),o("a",{attrs:{href:"http://designsystem.porsche.com/latest/porsche-ui-kit-layout-template.sketch"}},[e._v("Sketch artboard templates")]),e._v(". They come with final layout settings (including the responsive grid) that can be turned visible via: View → Canvas → Show Layout.")]),o("h3",[e._v("Viewport range")]),o("p",[e._v("To provide consistency throughout all Porsche web experiences, all layouts should be optimised for a viewport range from "),o("strong",[e._v("320px")]),e._v(" to a maximum of "),o("strong",[e._v("1920px")]),e._v(". For viewport sizes from 1920px onwards a growing white space outside the left and right edge should be used.")]),o("p",[o("img",{attrs:{src:i("3887"),alt:"Porsche Design System grid architecture"}})]),o("h2",[e._v("Tips for responsive layouting")]),o("h3",[e._v("Use the grid purposefully")]),o("p",[e._v('All content elements that should behave responsively should be placed horizontally within the grid, always starting in a column. The spacing between content elements is therefore defined by the grid gutter. In most cases, this should refer to modules or content boxes, while smaller spaces on a more or less "micro-level" (both vertical and horizontal) should be defined by using the '),o("a",{attrs:{href:"#/web/components/layout/spacing"}},[e._v("Spacing")]),e._v(" component.")]),o("p",[o("img",{attrs:{src:i("17c29"),alt:"Porsche Design System grid alignment"}})]),o("h3",[e._v("Use the given possibilites wisely")]),o("p",[e._v("When it comes to designing a component or module responsively, there are several screws that can be turned to adapt to different screen sizes, such as changing:")]),o("ul",[o("li",[e._v("the component’s grid column width and, therefore, its wrapping behaviour. Example: A 3-column text on desktop, each column using 4 grid columns, can be stacked on mobile using 12 grid columns.")]),o("li",[e._v("text sizes – commonly using smaller text on mobile, larger text on bigger screens.")]),o("li",[e._v("the general layout of the component by using different patterns on mobile and desktop. Example: Turning a multi-column teaser module on desktop into an accordion on mobile.")])]),o("p",[e._v("When designing responsive layouts, always aim to find the solution that works best for the specific case, keeping the user and the specific use context in mind.")]),o("p",[o("img",{attrs:{src:i("a297"),alt:"Porsche Design System grid behaviour"}})]),o("h3",[e._v("Don’t be afraid to think outside of the box")]),o("p",[e._v("It is possible to place elements end-to-end, spanning from left to the right edge of the screen. An example would be a full-width image that generates a more emotional and concise side entry. However, this should be a well-contemplated exception.")]),o("p",[e._v("Also, for image groups, it is possible to break out of the grid in order to create a stronger visual coherence. The outer edges (left and right) of the image group should always be placed within the grid, whereas the edges between the single images can be placed exactly in the middle of the gutter.")]),o("p",[o("img",{attrs:{src:i("7c2e"),alt:"End-to-end placement"}})])])}],n=i("2877"),r={},a=Object(n["a"])(r,o,s,!1,null,null,null);t["default"]=a.exports}}]);
//# sourceMappingURL=chunk-4c56b23f.dfeeff5a.js.map