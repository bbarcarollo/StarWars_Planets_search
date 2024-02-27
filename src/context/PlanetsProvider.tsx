import { useEffect, useState } from 'react';
import SWContext from './SWContext';
import { FilterQuantityType,
  PlanetsType, SWPlanetsType, SortFilterType } from '../types';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planetsList, setPlanetsList] = useState<PlanetsType[]>([]);
  const [planetsName, setPlanetsName] = useState<PlanetsType[]>([]);
  const [filterByQuantity, setFilterByQuantity] = useState<FilterQuantityType>({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [columns, setColumns] = useState<FilterQuantityType['column'][]>([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [appliedFilters, setAppliedFilters] = useState<FilterQuantityType[]>([]);
  const [sortFilter, setSortFilter] = useState<SortFilterType>({
    order: { column: 'population', sort: 'ASC' },
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const API = 'https://swapi.dev/api/planets';
      const response = await fetch(API);
      const data = await response.json();
      const dataSansResidents = data.results.map((planet: any) => {
        // const { residents, ...planetSansResidents } = planet;
        // return planetSansResidents;
        delete planet.residents;
        return planet;
      });
      setPlanetsList(dataSansResidents);
      setPlanetsName(dataSansResidents);
    };
    fetchPlanets();
  }, []);

  const filterPlanetsByName = (searchValue: string) => {
    if (searchValue === '') {
      setPlanetsName(planetsList);
      return;
    }
    const newPlanetName = planetsList
      .filter((planet) => planet.name
        .includes(searchValue.toLowerCase()));
    setPlanetsName(newPlanetName);
  };

  const comparingValues = () => {
    const { comparison, value, column } = filterByQuantity;

    switch (comparison) {
      case 'maior que':
        return planetsName
          .filter((planet) => (
            Number(planet[column]) > value));
      case 'menor que':
        return planetsName
          .filter((planet) => (
            Number(planet[column]) < value));
      default:
        return planetsName
          .filter((planet) => (
            Number(planet[column]) === Number(value)));
    }
  };

  const addFilterComparison = (filterQuantity: string) => {
    const filter = comparingValues();
    const newcolumns = columns.filter((coluna) => coluna !== filterQuantity);
    setPlanetsName(filter);
    setColumns(newcolumns);
    setFilterByQuantity({ ...filterByQuantity, column: columns[0] });
    setAppliedFilters([...appliedFilters, filterByQuantity]);
  };

  const defaultNoFilters = () => {
    setAppliedFilters([]);
    setColumns(columns);
    setPlanetsName(planetsList);
  };

  const filterInAction = (selectedFilters: FilterQuantityType[]) => {
    const filteredPlanets = planetsList.filter((planet) => (
      selectedFilters.every(({ column, comparison, value }) => {
        switch (comparison) {
          case 'maior que':
            return Number(planet[column]) > Number(value);
          case 'menor que':
            return Number(planet[column]) < Number(value);
          default:
            return Number(planet[column]) === Number(value);
        }
      })
    ));
    return filteredPlanets;
  };

  const removeFilter = (usedFilter: any) => {
    const selectedFilters = appliedFilters.filter(({ column }) => column !== usedFilter);
    setAppliedFilters(selectedFilters);
    setColumns([...columns, usedFilter]);
    setPlanetsName(filterInAction(selectedFilters));
  };

  const orderPlanets = () => {
    const { order: { column, sort } } = sortFilter;
    const planetsNotKnown = planetsName.filter((planet) => planet[column] === 'unknown');

    const sortPlanets = planetsName.filter(
      (planet) => planet[column] !== 'unknown',
    ).sort((a, b) => {
      if (a[column] === 'unknown') return -1;
      if (b[column] === 'unknown') return -1;
      const sortedPlanetsAsc = Number(a[column]) - Number(b[column]);
      const sortedPlanetsDesc = Number(b[column]) - Number(a[column]);
      return sort === 'ASC' ? sortedPlanetsAsc : sortedPlanetsDesc;
    });
    setPlanetsName([...sortPlanets, ...planetsNotKnown]);
  };

  const value: SWPlanetsType = {
    planetsName,
    filterPlanetsByName,
    filterByQuantity,
    setFilterByQuantity,
    columns,
    defaultNoFilters,
    addFilterComparison,
    appliedFilters,
    setSortFilter,
    sortFilter,
    orderPlanets,
    removeFilter,
  };

  return (
    <SWContext.Provider value={ value }>
      <div>
        {children}
      </div>
    </SWContext.Provider>

  );
}

export default PlanetsProvider;
