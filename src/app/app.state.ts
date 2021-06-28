import { CityInfo } from './interface/City_Interface';
import { searchReducer } from './reducers/search.reducer';

export interface AppState{
  readonly search: CityInfo[];
}

export const rootReducer = {
  search: searchReducer,
};
