import { useEffect, useState } from 'react';
import SWContext from './SWContext';
import { PlanetsType, SWPlanetsType } from '../types';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planetsList, setPlanetsList] = useState<PlanetsType[]>([]);

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
      return setPlanetsList(dataSansResidents);
    };
    fetchPlanets();
  }, []);

  const value: SWPlanetsType = { planetsList };

  return (
    <SWContext.Provider value={ value }>
      <div>
        {children}
      </div>
    </SWContext.Provider>

  );
}

export default PlanetsProvider;
