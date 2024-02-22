import { useContext } from 'react';
import SWContext from '../context/SWContext';

const comparison = [
  'maior que', 'menor que', 'igual a',
];

function FilterNumbers() {
  const {
    filterByQuantity,
    addFilterComparison,
    setFilterByQuantity,
    columns,
  } = useContext(SWContext);

  const handleSubmit = () => {
    addFilterComparison(filterByQuantity.column);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilterByQuantity({ ...filterByQuantity, value: (e.target.value) });
  };

  return (
    <form>
      <label htmlFor="column">Ordenar</label>
      <select
        id="column"
        name="column"
        value={ filterByQuantity.column }
        onChange={ ({ target }) => setFilterByQuantity(
          { ...filterByQuantity, column: target.value },
        ) }
        data-testid="column-filter"
        required
      >
        {columns.map((column) => (
          <option
            key={ column }
            value={ column }
          >
            {column}
          </option>))}
      </select>

      <label htmlFor="comparison">Operator</label>
      <select
        name="comparison"
        id="comparison"
        data-testid="comparison-filter"
        onChange={ ({ target }) => setFilterByQuantity(
          { ...filterByQuantity, comparison: target.value },
        ) }
        required
      >
        {comparison.map((compare) => (
          <option
            key={ compare }
            value={ compare }
          >
            {compare}
          </option>))}
      </select>

      <input
        type="number"
        name="value"
        value={ filterByQuantity.value }
        onChange={ handleChange }
        data-testid="value-filter"
        required
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ (e) => {
          e.preventDefault();
          handleSubmit();
        } }
      >
        Filter
      </button>

      {/* <div>
        <label htmlFor="column">Ordenar</label>
        <select id="column" name="column" data-testid="column-sort" required>
          {columns.map((column) => (
            <option
              key={ column }
              value={ column }
            >
              {column}
            </option>))}
        </select>

        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
        />
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
        />
        <button data-testid="column-sort-button" type="submit">Ordenar</button>
      </div> */}
    </form>
  );
}

export default FilterNumbers;
