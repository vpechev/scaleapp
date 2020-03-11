import { Component, AfterViewInit } from '@angular/core';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'scaleapp';

  shortcuts: ShortcutInput[] = [];

  ngAfterViewInit(): void {  
    this.shortcuts.push(  
      { key: "ctrl + 1", label: "Area dropdown", description: "ctrl + 1 opens area dropdown menu", command: null },
      { key: "ctrl + 2", label: "Category dropdown", description: "ctrl + 2 opens category dropdown menu", command: null },
      { key: "ctrl + 3", label: "Complexity dropdown", description: "ctrl + 3 opens complexity dropdown menu", command: null },
      { key: "ctrl + 4", label: "Search input", description: "ctrl + 4 focus search input", command: null },
      { key: "ctrl + 5", label: "Search button", description: "ctrl + 5 perform search", command: null },
      { key: "ctrl + ~", label: "Reset button", description: "ctrl + ~ reset search criteria", command: null }
    );  
  }
}
