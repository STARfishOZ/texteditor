import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  public text = 'A year ago I was in the audience at a gathering of designers in San Francisco. \n' +
    'There were four designers on stage, and two of them worked for me. I was there to support them. \n' +
    'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. \n' +
    'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, \n' +
    'that modern design problems were very complex. And we ought to need a license to solve them.';

  public constructor() {
  }

  public ngOnInit() {
  }
}
