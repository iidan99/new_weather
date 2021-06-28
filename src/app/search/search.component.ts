import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil, debounceTime, filter, tap, map, switchMap } from 'rxjs/operators';
import { CityInfo } from '../interface/City_Interface';
import { Search } from '../actions/search';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  temp: Subscription;
  inputText: string;
  locationData$: Observable<CityInfo[]> = this.store.select('search');

  tempVal: CityInfo[];
  inputVal: BehaviorSubject<string> = new BehaviorSubject('');
  dispose$: Subject<void> = new Subject();
  weatherInfo: Subject<CityInfo> = new Subject<CityInfo>();


  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.temp = this.store
      .select('search')
      .subscribe((res) => (this.tempVal = res));

      this.inputVal
      .pipe(
        takeUntil(this.dispose$),
        debounceTime(300),
        filter(searchTerm => searchTerm.length >= 2),
        tap(searchTerm => this.store.dispatch(new Search(searchTerm))),
      ).subscribe();

    // this.weatherInfo.pipe(
    //   debounceTime(300),
    //   filter(searchTerm => searchTerm.Key.length >= 2),
    //   tap(searchTerm => this.store.dispatch(new CitySelect(searchTerm, this.tempVal)))
    // ).subscribe();
  }

  updateSubjectValue(val: string): void{
console.log(this.store.select('search').subscribe((data) => {return data
}))
    this.inputVal.next(val);
  }
}
