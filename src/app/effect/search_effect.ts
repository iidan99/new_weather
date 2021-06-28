
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SearchService } from '../service/search.service';
import { SEARCH, Search, SearchSuccess, SearchFail } from '../actions/search';
import { CityInfo} from '../interface/City_Interface';

@Injectable()

export class SearchEffects {
    search$ = createEffect(() =>
        this.actions$.pipe(
            ofType<Search>(SEARCH),
            mergeMap(({ type, payload }) => this.searchService.getLocation(payload).pipe(
                map(res => new SearchSuccess(res)),
                catchError((e) => of(new SearchFail(e)))
                ))
        )
    );
    constructor(
        private actions$: Actions,
        private searchService: SearchService
    ) { }

}
