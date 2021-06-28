import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityInfo } from '../interface/City_Interface';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _searchResult: BehaviorSubject<CityInfo[]> = new BehaviorSubject<CityInfo[]>([]);
  public searchResult: Observable<CityInfo[]> = this._searchResult.asObservable();
  url = '/locations/v1/cities/autocomplete?apikey=';


  constructor(public http: HttpClient) { }


  getLocation(location: string): Observable<CityInfo[]> {
    return this.http.get<CityInfo[]>('../assets/data.json').pipe(
      map((response) => response.map(result => ({
          LocalizedName: result.LocalizedName,
          Key: result.Key,
          Country: result.Country,
          Favorite: result.Favorite
         })
        )),
        tap(item => this._searchResult.next(item))
        );
    // return this.http.get<CityInfo[]>(`${environment.baseURL}${this.url}${environment.tokenId}&q=${location}`).pipe(
    //  map((response) => response.map(result => ({
    //      LocalizedName: result.LocalizedName,
    //      Key: result.Key,
    //      Country: result.Country,
    //      Favorite: result.Favorite
    //     })
    //    )),
    //    tap(item => this._searchResult.next(item))
    //    );
   }
}
