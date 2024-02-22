import { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

function FilterName() {
  const { filterPlanetsByName } = useContext(SWContext);
  const [nameFilter, setNameFilter] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setNameFilter(e.target.value);
    filterPlanetsByName(e.target.value);
  };

  return (
    <div>
      <input
        value={ nameFilter }
        type="text"
        data-testid="name-filter"
        placeholder="Search a planet"
        onChange={ handleChange }
      />
    </div>
  );
}

export default FilterName;
