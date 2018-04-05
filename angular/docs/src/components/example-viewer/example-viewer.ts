import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";

const ExampleViewerSelector = 'pui-docs-example-viewer';

@Component({
  selector: ExampleViewerSelector,
  templateUrl: './example-viewer.html',
  styleUrls: ['./example-viewer.scss']
})
class ExampleViewer implements OnInit {
  @Input() content: string = null;
  htmlVisible = false;

  ngOnInit(): void {
  }

  toggleHtml() {
      this.htmlVisible = !this.htmlVisible;
  }
}

export { ExampleViewerSelector, ExampleViewer }