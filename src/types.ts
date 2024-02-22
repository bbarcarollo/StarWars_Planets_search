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
  columns: string,
  comparison: string,
  value: number,
};

export type SWPlanetsType = {
  planetsName: PlanetsType[],
  filterPlanetsByName: (nameFilter: string) => void,
  filterByQuantity: FilterQuantityType,
  setFilterByQuantity: any,
  addFilterComparison: (filterQuantity: FilterQuantityType) => void,
};
