import { useContext } from 'react';
import SWContext from '../context/SWContext';
import './filterNumbers.css';

const comparison = [
  'maior que', 'menor que', 'igual a',
];
function FilterNumbers() {
  const {
    filterByQuantity,
    addFilterComparison,
    setFilterByQuantity,
    columns,
    appliedFilters,
    defaultNoFilters,
    removeFilter,
  } = useContext(SWContext);

  const handleSubmit = () => {
    addFilterComparison(filterByQuantity.column);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilterByQuantity({ ...filterByQuantity, value: (e.target.value) });
  };

  return (
    <form>
      <div className="filters">
        <label htmlFor="column">Ordenar</label>
        <select
          className="column"
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
          className="operator"
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
          className="entered-value"
          type="number"
          name="value"
          value={ filterByQuantity.value }
          onChange={ handleChange }
          data-testid="value-filter"
          required
        />

        <button
          className="filter-btn"
          data-testid="button-filter"
          type="button"
          onClick={ (e) => {
            e.preventDefault();
            handleSubmit();
          } }
        >
          Filter
        </button>

        <label htmlFor="column">Ordenar</label>
        <select
          className="operator"
          id="column"
          name="column"
          data-testid="column-sort"
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

        <label>
          <input
            name="radio"
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
          />
          Ascendente
        </label>

        <label>
          <input
            name="radio"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
          />
          Descendente
        </label>

        <button
          className="filter-btn"
          data-testid="column-sort-button"
          type="button"
        >
          Ordenar
        </button>

        <button
          className="filter-btn"
          data-testid="button-remove-filters"
          onClick={ defaultNoFilters }
        >
          Remover Filtros
        </button>
      </div>

      <section>
        {appliedFilters.map((filter, index) => (
          <div className="remove1Filter" key={ index } data-testid="filter">
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button
              className="btnRemove"
              aria-label="Remover filtro"
              type="button"
              onClick={ () => removeFilter(filter.column) }
            >
              x
            </button>
          </div>
        ))}
      </section>

    </form>
  );
}

export default FilterNumbers;
