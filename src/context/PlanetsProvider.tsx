import { useEffect, useState } from 'react';
import SWContext from './SWContext';
import { PlanetsType, SWPlanetsType } from '../types';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planetsList, setPlanetsList] = useState<PlanetsType[]>([]);
  const [planetsName, setPlanetsName] = useState<PlanetsType[]>([]);
  const [filterByQuantity, setFilterByQuantity] = useState({
    columns: 'population',
    comparison: 'maior que',
    value: 0,
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
    const { comparison, value, columns } = filterByQuantity;
    console.log(comparison, value);

    switch (comparison) {
      case 'maior que':
        return planetsName
          .filter((planet: any) => (
            Number(planet[columns]) > value));
      case 'menor que':
        return planetsName
          .filter((planet: any) => (
            Number(planet[columns]) < value));
      default:
        return planetsName
          .filter((planet: any) => (
            Number(planet[columns]) === Number(value)));
    }
  };

  const addFilterComparison = () => {
    const filter = comparingValues();
    setPlanetsName(filter);
  };

  const value: SWPlanetsType = {
    planetsName,
    filterPlanetsByName,
    filterByQuantity,
    setFilterByQuantity,
    addFilterComparison };

  return (
    <SWContext.Provider value={ value }>
      <div>
        {children}
      </div>
    </SWContext.Provider>

  );
}

export default PlanetsProvider;
