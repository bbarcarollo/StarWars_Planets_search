import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';

function App() {
  return (
    <section>
      <h1>Projeto Star Wars - Trybe</h1>
      <PlanetsProvider>
        <Table />
      </PlanetsProvider>
    </section>
  );
}

export default App;
