import React, { ReactNode } from 'react'
import GridColumn from './GridColumn';

interface PType {
    gridSize?: number
    children?: React.ReactElement<GridColumn>[] | React.ReactElement<GridColumn> // <-- Our children are our columns! :)
}

interface SType {
    columns: React.ReactElement<GridColumn>[]
    widths: number[]
    isError: boolean
}

export default class Grid
    extends React.Component<PType, SType> {

    readonly DEFAULT_COLUMNS = 12

    /**
     * This variable defines the size of the grid in columns.
     */
    gridSize : number = this.DEFAULT_COLUMNS


    constructor(props : PType)
    {
        super(props)

        this.gridSize = props.gridSize || this.DEFAULT_COLUMNS
        this.state = {
            columns: [ 
                    <GridColumn width={this.DEFAULT_COLUMNS} fluid={true} />, 
                    <GridColumn width={this.DEFAULT_COLUMNS} fluid={true} />,
                    <GridColumn width={this.DEFAULT_COLUMNS} fluid={true} />
                ],
            widths: [ 3, 3, 3 ],
            isError: false
        }
    }

    render() : ReactNode
    {
        if (!this.state.columns.length)
            return <h2 className="text-lg">Grid Empty</h2>;

        if (this.state.isError)
            return <h2 className="text-lg">Check the added columns, they don't respect the constraints.</h2>;
        
        return (
        <div className={`grid grid-flow-col w-screen h-full`}>
        {this.state.columns.map((Elem : React.ReactElement<GridColumn>, i) => {
            console.log('Element', Elem);
            return (<div className={`col-span-${this.state.widths[i]}`}>
                    <div className="w-full bg-blue-200 dark:text-black text-center border-solid border-2 border-blue-900">Size {this.state.widths[i]}</div>
                    {Elem}
                </div>)
        })}
        </div>);
    }
}