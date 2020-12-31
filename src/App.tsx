import React, { useState } from 'react';
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


  const [columns, setColumns] = useState([
   /* {
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
    }, */
    {
      width: 2,
      fluid: true,
      content: <AudioColumn />
    }

  ])

  const removeColumn = (c : React.ReactElement<GridColumn>) => {
      console.log('Removing column', c)
      if (c.key)
      {
        columns.splice(c.key as number, 1)
        setColumns([...columns])
        console.log('new columns', columns)
      }
  }


  return (
    <div className="w-screen h-screen dark:bg-gray-800 dark:text-white">
      <header className="text-center h-16 flex justify-center items-center">
        <h1 className="font-bold text-3xl">Adaptive Grid Experiment</h1>
      </header>
      <article className="w-screen flex justify-center items-center h-full">
        <Grid onRemove={(c) => removeColumn(c)}>
          {
            columns.map((c, i) => <GridColumn key={i} width={c.width} fluid={c.fluid}>{c.content}</GridColumn>)
          }
        </Grid>
      </article>
    </div>
  );
}

export default App;
