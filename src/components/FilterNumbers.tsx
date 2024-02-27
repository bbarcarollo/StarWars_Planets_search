import { useContext } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import SWContext from '../context/SWContext';
import './filterNumbers.css';

const comparison = [
  'maior que', 'menor que', 'igual a',
];

const sortColumn = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
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
    orderPlanets,
    sortFilter,
    setSortFilter,
  } = useContext(SWContext);

  const handleSubmit = () => {
    addFilterComparison(filterByQuantity.column);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilterByQuantity({ ...filterByQuantity, value: (e.target.value) });
  };

  const { order: { column } } = sortFilter;

  return (
    <form>
      <div className="filters">

        <label htmlFor="column">Ordenar</label>
        <select
          className="column"
          id="column"
          name="column"
          value={ filterByQuantity.column }
          data-testid="column-filter"
          onChange={ ({ target }) => setFilterByQuantity(
            { ...filterByQuantity, column: target.value },
          ) }
          required
        >
          {columns.map((col) => (
            <option
              key={ col }
              value={ col }
            >
              {col}
            </option>))}
        </select>

        <label htmlFor="comparison">Operator</label>
        <select
          className="operator"
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          value={ filterByQuantity.comparison }
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

        <label htmlFor="column2">Ordenar</label>
        <select
          className="operator"
          id="column2"
          name="column2"
          data-testid="column-sort"
          value={ column }
          onChange={ ({ target }) => setSortFilter({
            ...sortFilter, order: { ...sortFilter.order, column: target.value },
          }) }
        >
          {sortColumn.map((col) => (
            <option
              key={ col }
              value={ col }
            >
              {col}
            </option>))}
        </select>

        <label>
          <input
            name="radio"
            defaultChecked
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ ({ target }) => setSortFilter({
              ...sortFilter, order: { ...sortFilter.order, sort: target.value },
            }) }
          />
          Ascendente
        </label>

        <label>
          <input
            name="radio"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ ({ target }) => setSortFilter({
              ...sortFilter, order: { ...sortFilter.order, sort: target.value },
            }) }
          />
          Descendente
        </label>

        <button
          className="filter-btn"
          data-testid="column-sort-button"
          type="button"
          onClick={ orderPlanets }

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
              data-testid="removeFilter"
              type="button"
              onClick={ () => removeFilter(filter.column) }
            >
              <FaTrashCan />
            </button>
          </div>
        ))}
      </section>

    </form>
  );
}

export default FilterNumbers;
