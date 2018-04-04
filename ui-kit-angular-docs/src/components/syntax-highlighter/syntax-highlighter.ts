import {
  AfterContentChecked, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges,
  ViewChild
} from "@angular/core";

import {
  trigger,
  style,
  animate,
  transition, query, animateChild
} from '@angular/animations';

import * as highlightJs from '../../../node_modules/highlight.js/lib/highlight.js';
import * as highlightJsXmlLang from '../../../node_modules/highlight.js/lib/languages/xml.js';
highlightJs.registerLanguage('xml', highlightJsXmlLang);

import {html_beautify} from '../../../node_modules/js-beautify/js/lib/beautify-html.js';

@Component({
  selector: 'pui-docs-syntax-highlighter',
  templateUrl: './syntax-highlighter.html',
  styleUrls: [
    './syntax-highlighter.scss'
  ],
  animations: [
    trigger('showHtmlAnimation', [
      transition(':enter', [
        style({height: 0, opacity: 0}),
        animate('350ms cubic-bezier(0.230, 1.000, 0.320, 1.000)',
          style({height: '*', opacity: 1}))
      ]),
      transition(':leave', [
        style({height: '*', opacity: 1}),
        animate('350ms cubic-bezier(0.230, 1.000, 0.320, 1.000)',
          style({height: 0, opacity: 0}))
      ])
    ])
  ]
})
export class SyntaxHighlighter implements OnInit, AfterContentChecked, OnChanges {
  @Input() code: string = null;
  @ViewChild('codeContainer') codeContainer: ElementRef;

  private codeChanged = false;
  public beautified = null;

  @HostBinding('@showHtmlAnimation') get showHtmlAnimation() {
    return true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.codeChanged = !!changes.code;
  }

  ngAfterContentChecked(): void {
    if(this.codeChanged) {
      this.codeChanged = false;

      this.beautified = html_beautify(this.code, {
        wrap_attributes: "force",
        brace_style: "end-expand"
      });

      setTimeout(()=> {
        highlightJs.highlightBlock(this.codeContainer.nativeElement);
      });
    }

  }
}
