export type PlanetsType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string,
};

export type FilterQuantityType = {
  column: 'population'
  | 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water',
  comparison: string,
  value: number,
};

export type SortFilterType = {
  order: {
    column: 'population'
    | 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water',
    sort: 'ASC' | 'DESC',
  }
};

export type SWPlanetsType = {
  planetsName: PlanetsType[],
  filterPlanetsByName: (nameFilter: string) => void,
  filterByQuantity: FilterQuantityType,
  setFilterByQuantity: any,
  appliedFilters: FilterQuantityType[],
  defaultNoFilters: any,
  removeFilter: any,
  columns: FilterQuantityType['column'][],
  orderPlanets: () => void,
  setSortFilter: any,
  sortFilter: SortFilterType,
  addFilterComparison: (filterQuantity: string) => void,
};
