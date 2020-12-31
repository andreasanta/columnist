import React, { useState, useRef } from 'react';
import './App.css';

import Grid from './grid_component/Grid'
import GridColumn from './grid_component/GridColumn'

function App() {

  const VideoColumn = () => {
    return <iframe width="100%" height="315px" src="https://www.youtube.com/embed/mIYzp5rcTvU" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  }

  const AudioColumn = () => {
    return (
        <iframe width="100%" height="300" 
                scrolling="no" frameBorder="no" allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/219349097&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
    )
  }

  const GifColumn = () => {
    return (
      <><iframe src="https://giphy.com/embed/VekcnHOwOI5So" width="100%" height="300" frameBorder="0" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/digital-VekcnHOwOI5So">via GIPHY</a></p></>
    )
  }

  const TextColumn = () => {
    return (
      <div className="w-full h-full justify-center content-center flex flex-col"><p className="text-center text-2xl block">Lorem ipsum...</p></div>
    )
  }

  const sampleState = [{
    width: 2,
    fluid: false,
    content: <TextColumn />
  },
  {
    width: 2,
    fluid: false,
    content: <GifColumn />
  },
  {
    width: 2,
    fluid: true,
    content: <VideoColumn />
  },
  {
    width: 2,
    fluid: true,
    content: <AudioColumn />
  }]

  const [columns, setColumns] = useState(sampleState)
  const [colType, setColType] = useState('Text')
  const [colSize, setColSize] = useState(2)
  const [colFluid, setColFluid] = useState(true)
  const gridRef = useRef(null)

  const removeColumn = (c : React.ReactElement<GridColumn>) => {
      console.log('Removing column', c)
      if (c.key)
      {
        columns.splice(c.key as number, 1)
        setColumns([...columns])
        console.log('new columns', columns)
      }
  }

  const addColumn = () => {
    let component = null;
    switch (colType)
    {
      case 'Text':
        component = <TextColumn />
        break
      case 'Image':
        component = <GifColumn />
        break
      case 'Audio':
      component = <AudioColumn />
      break
      case 'Video':
      component = <VideoColumn />
      break
    }

    if (!component)
      return

    let newCols = [...columns]
    newCols.push({
      width: colSize,
      fluid: colFluid,
      content: component
    })
    
    setColumns(newCols)
  }

  const jsonSerialize = () => {
    // @ts-ignore
    const jsonGrid = gridRef.current?.jsonSerialize()

    console.log('jsonGrid', jsonGrid)

    const blob = new Blob([JSON.stringify(jsonGrid, null, 2)], {type: "application/json"});
    const url  = URL.createObjectURL(blob);

    window.open(url)
  }

  return (
    <div className="w-screen h-screen dark:bg-gray-800 dark:text-white">
      <header className="text-center h-16 flex justify-center items-center">
        <h1 className="font-bold text-3xl">Adaptive Grid Experiment</h1>
      </header>
      <div className="w-screen h-20 text-center">
      <button className="bg-blue-400 rounded p-2 m-2" onClick={(e) => jsonSerialize()}>JSON</button>
      <button className="bg-blue-400 rounded p-2 m-2" onClick={(e) => setColumns(sampleState)}>Reset</button>
      <button className="bg-blue-400 rounded p-2 m-2" onClick={(e) => addColumn()}>Add</button>
        <select className="text-black p-2 m-2" value={colType} onChange={(e) => setColType(e.target.value)}>
          <option>Text</option>
          <option>Image</option>
          <option>Audio</option>
          <option>Video</option>
        </select>
        <input className="text-black w-20 m-2 p-2" type="number" value={colSize} onChange={(e) => setColSize(parseInt(e.target.value))} min="1" max="12" /><span className="text-lg">WIDTH</span>
        <input className="text-black m-2" type="checkbox" checked={colFluid} onChange={(e) => setColFluid(e.target.checked)}/>&nbsp;Fluid (auto expands)
      </div>
      <article className="w-screen flex justify-center items-center h-full">
        <Grid onRemove={(c) => removeColumn(c)} ref={gridRef}>
          {
            columns.map((c, i) => <GridColumn key={i} width={c.width} fluid={c.fluid}>{c.content}</GridColumn>)
          }
        </Grid>
      </article>
    </div>
  );
}

export default App;
