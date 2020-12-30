import React from 'react';
import './App.css';
import Grid from './grid_component/Grid'
import GridColumn from './grid_component/GridColumn'

function App() {
  return (
    <div className="w-screen h-screen dark:bg-gray-800 dark:text-white">
      <header className="text-center h-16 flex justify-center items-center">
        <h1 className="font-bold text-3xl">Adaptive Grid Experiment</h1>
      </header>
      <article className="w-screen flex justify-center items-center h-full">
        <Grid>
          <GridColumn key="1" />
        </Grid>
      </article>
    </div>
  );
}

export default App;
