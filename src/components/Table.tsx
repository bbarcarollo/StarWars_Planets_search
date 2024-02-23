import { useContext } from 'react';
import SWContext from '../context/SWContext';
import { PlanetsType } from '../types';
import FilterName from './FilterName';
import FilterNumbers from './FilterNumbers';
import './table.css';

function Table() {
  const { planetsName } = useContext(SWContext);

  const tableBody = planetsName.map((planet: PlanetsType) => (
    <tr key={ planet.name }>
      <td className="tableStyle" data-testid="planet-name">{planet.name}</td>
      <td className="tableStyle">{planet.rotation_period}</td>
      <td className="tableStyle">{planet.orbital_period}</td>
      <td className="tableStyle">{planet.diameter}</td>
      <td className="tableStyle">{planet.climate}</td>
      <td className="tableStyle">{planet.gravity}</td>
      <td className="tableStyle">{planet.terrain}</td>
      <td className="tableStyle">{planet.surface_water}</td>
      <td className="tableStyle">{planet.population}</td>
      <td className="tableStyle">{planet.films}</td>
      <td className="tableStyle">{planet.created}</td>
      <td className="tableStyle">{planet.edited}</td>
      <td className="tableStyle ">{planet.url}</td>
    </tr>
  ));

  return (
    <section>
      <FilterName />
      <FilterNumbers />
      <table className="tableStyle">
        <thead className="tableStyle">
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody className="tableStyle">
          {tableBody}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
