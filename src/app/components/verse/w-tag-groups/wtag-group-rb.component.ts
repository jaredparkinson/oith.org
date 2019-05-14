import { Component, OnInit, Input } from '@angular/core';
import { WTagGroupA, Verse } from 'src/app/shared/enums/wtags';
import { WTagService } from 'src/app/services/wtag.service';

@Component({
  selector: 'app-wtag-group-rb',
  template: '',
  styles: [''],
})
export class WTagGroupRBComponent implements OnInit {
  @Input() public wTagGroup: WTagGroupA;
  @Input() public verse: Verse;

  public constructor(public wTagService: WTagService) {}

  public ngOnInit(): void {
    throw 'Not implemented';
  }
}
