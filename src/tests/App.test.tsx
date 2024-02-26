import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import { swPlanets } from './mockSwPlanets';
import { vi } from 'vitest';


describe('Testa App e funcionalidades', () => {
  // beforeEach(() => {
  //   // vi.fn(() => Promise.resolve({status: 200, ok: true, json: () => Promise.resolve(swPlanets)}))
  //   vi.spyOn(global, 'fetch').mockResolvedValueOnce(({
  //     status: 200, 
  //     ok: true, 
  //     json: () => Promise.resolve(swPlanets),
  //   }) as Response);
  // });
  
  test('Verifica se todos os itens iniciais renderizam corretamente', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);

    expect(screen.getByRole('heading', {  name: /projeto star wars \- trybe/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search a planet/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(0);
    expect(screen.getByRole('combobox', {  name: /operator/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {  name: /filter/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {  name: /ordenar/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {  name: /remover filtros/i})).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('Verifica filtro por digitação de nome', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(({
      status: 200, 
      ok: true, 
      json: async () => swPlanets,
    }) as Response);

    render(<PlanetsProvider><App /></PlanetsProvider>);

    const inputPlanetSearch = screen.getByRole('textbox');
    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    screen.debug();

    await userEvent.type(inputPlanetSearch, 'o');
        
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Hoth')).toBeInTheDocument();

    await userEvent.clear(inputPlanetSearch);
    await userEvent.type(inputPlanetSearch, 'oo');

    expect(screen.queryByText('Hoth')).not.toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();

  });


  test('Verifica filtros numéricos',  async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(({
      status: 200, 
      ok: true, 
      json: async () => swPlanets,
    }) as Response);
    render(<PlanetsProvider><App /></PlanetsProvider>)
    
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByRole('combobox', {  name: /operator/i});
    const comparisonValue = screen.getByTestId('value-filter');
    const filterBtn = screen.getByRole('button', {  name: /filter/i});

    await userEvent.selectOptions(column, 'population');
    await userEvent.selectOptions(comparison, 'maior que');
    await userEvent.type(comparisonValue, '4500000000');
    await userEvent.click(filterBtn);
    
    expect(screen.getByText('population maior que 4500000000')).toBeInTheDocument();
    expect(await screen.findByText('Coruscant')).toBeInTheDocument();
    
    const clearAllBtn = screen.getByRole('button', {  name: /remover filtros/i});
    
    await userEvent.click(clearAllBtn);
    expect(screen.queryByText('population maior que 4500000000')).not.toBeInTheDocument();
    expect(await screen.findByText(/yavin iv/i)).toBeInTheDocument();
    
    const removeFilter = screen.getByRole('button', {  name: /remover filtro/i});
    
    await userEvent.clear(comparisonValue);
    await userEvent.selectOptions(column, 'surface_water');
    await userEvent.selectOptions(comparison, 'menor que');
    await userEvent.type(comparisonValue, '20');
    await userEvent.click(filterBtn);
    
    
    expect(screen.getByText('surface_water menor que 20')).toBeInTheDocument();
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    
    await userEvent.clear(comparisonValue);
    await userEvent.selectOptions(column, 'rotation_period');
    await userEvent.selectOptions(comparison, 'menor que');
    await userEvent.type(comparisonValue, '20');
    await userEvent.click(filterBtn);
    
    expect(screen.getByText('surface_water menor que 20')).toBeInTheDocument();
    expect(screen.getByText('rotation_period menor que 20')).toBeInTheDocument();
    expect(await screen.findByText('Bespin')).toBeInTheDocument();
    expect(await screen.queryByText(/tatooine/i)).not.toBeInTheDocument();
    
    await userEvent.click(removeFilter);
    expect(screen.queryByText(/rotation_period menor que 20/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    await userEvent.click(removeFilter);
    expect(await screen.findByText(/alderaan/i)).toBeInTheDocument();
    
  
  });


});
