import {Component, OnInit} from "@angular/core";

const StyleWrapperSelector = 'pui-docs-style-wrapper';

@Component({
    selector: StyleWrapperSelector,
    templateUrl: './style-wrapper.html',
    styleUrls: ['./style-wrapper.scss']
})
class StyleWrapper implements OnInit {
    ngOnInit(): void {
    }
}

export { StyleWrapperSelector, StyleWrapper }