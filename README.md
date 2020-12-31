# Columnist

This project implements two React components: a Grid and a GridColumn.

You can see a quick video of it in action here:

https://vimeo.com/496057671

The first one is a cointainer of columns which can have a fixed or variable total width, also,
each column can have a variable with and a _fluid_ property that determines
whether it can grow inside the grid.

Both components can be found in the src/grid_component directory, and the rest
of the project is just a sample wrapper to test out the components.

## Getting started

In order to have a quick running demo locally, first you have
to install the dependencies with:

`yarn`

This will ensure all the deps in node_modules are properly installed.

Then in the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Tech Stack

- React: chosen for composability and flexibility.
- TypeScript: chosen for enforcing types in columns.
- TailWind CSS: chosen to avoid writing long CSS.
## Design considerations

The project has been conceived since the beginning with the idea
of fullfilling all the requirements, even the ones stated at the
end of the exercise, such as JSON export and grid mutability.

However, stemming from the immutabilitu philosophy of React
and the _pure functions_ and _pure components_ to avoid
unnecessary side-effects, I used a common react pattern and
added the columns as children of the grid, such as:

```html
    <Grid>
        <GridColumn key={1} width={3} fluid={true}>
            <p> Column Content </p>
        </GridColumn>
        <GridColumn key={2} width={1} fluid={false}>
            <p> Column Content </p>
        </GridColumn>

        ...

    </Grid>
```

So technically, when we add/remove a column, the whole component
is re-rendered making the "mutable" grid effectively _immutable_.

Furthermore, I introduced the concept of _fluid_ columns, which can grow
to occupy the full with of the grid if necessary, for instance:

```html
    <Grid>
        <GridColumn key={1} width={1} fluid={true}>
            <p> ↔️ This will grow to 12 cols ↔️ </p>
        </GridColumn>
    </Grid>
```

As you can see, fluid is a prop of the `GridColumn` component
and, if set to false, does not allow the column to grow.

Finally, for simplicity and to avoid as often as possible invalid
states of the grid, when no columns are present or all the columns
are non-fluid and don't take up the whole width of the grid, an
automatic "padding" column is added at the end to stretch the
grid to 12 columns.

## Answers to the additional questions
### Adding a new type of column / different content
Given the adopted approach, you can either create a class component that
inherits from `GridColumn` or simply just inject the renderable content
as children of the `GridColumn` component.

See for example the App.tsx file where GridColumns are rendered with
different JSX elements as children. The `Grid` JSON serialization code will
make sure they're all properly exported.

### Changing the grid size

The project already includes the possibility to change the grid size
by leveraging the "gridSize" property of the grid, for instance:

```html
    <Grid gridSize={24}>
        <GridColumn key={1} width={1} fluid={true}>
            <p> ↔️ This will grow to 24 cols ↔️ </p>
        </GridColumn>
    </Grid>
```

However, this will effectively divide the total grid space in 24
columns and they will definitely be smaller if they take up 1 element
in width.

In short, the 100% of the space available to the grid will be divided
by `gridSize` columns, and the injected columns laid out properly.

### HTML Export

Given the fact that React renders into HTML and there is even
the possibility to render the whole component tree into a string,
with the following function:

```tsx
import { renderToString } from 'react-dom/server'
const html = renderToString(<ComponentTree />);
```

I decided not to implement an HTML exporter because even in the
simplest case it can be copied from the browser.

## TODO

The following has been left out due to lack of time:

- Improve UI
- Unit Tests with Jest
- JSON grid import function: it would be a simple loop creating GridColumns and injecting the innerHTML, unless we want to parse all components during export.


