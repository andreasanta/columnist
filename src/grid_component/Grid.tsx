import React, { ReactNode } from 'react'
import memoize from 'memoize-one'
import GridColumn from './GridColumn'

interface PType {
    gridSize?: number
    children?: React.ReactElement<GridColumn>[] | React.ReactElement<GridColumn> // <-- Our children are our columns! :)
    onRemove?(evt: React.ReactElement<GridColumn>): void;
}

interface SType {
    columns: React.ReactElement<GridColumn>[]
    widths: number[]
    isError: boolean
    gridSize: number    
}

export default class Grid
    extends React.Component<PType, SType> {

    static readonly DEFAULT_COLUMNS = 12

    constructor(props : PType)
    {
        super(props)

        this.state = {
            columns:[  ],
            widths: [  ],
            isError: false,
            gridSize: Grid.DEFAULT_COLUMNS
        }
    }

    /**
     * 
     * Intercepts when our children props change
     * and re-renders all the columns.
     * 
     * @param props New props
     * @param state Old state
     */
    static getDerivedStateFromProps(props : PType, state : SType) {
        if (props.children)
        {
            
            // convert into array of elements, then double check, before transferring to state
            const columns : React.ReactElement<GridColumn>[] = 
                props.children instanceof Array ? props.children as React.ReactElement<GridColumn>[] : [props.children as React.ReactElement<GridColumn>]

            console.log('got derived columns', props.children)

            return Grid.calculateSizes(columns, state.gridSize)
        }

        return null
    }

    /**
     * 
     * This is the core of our calculating algorithm, where
     * we check whether we have enough room and pad away
     * the rest.
     * 
     * @param columns A list of columns passed down as props from the parent.
     */
    static calculateSizes(columns : React.ReactElement<GridColumn>[], gridSize : number = Grid.DEFAULT_COLUMNS) : object {

        let destinationColumns = gridSize;
        let hasFluidColumns = false

        // Loop over the columns and determine how much space they take
        const takenSpace : number = columns.reduce((space : number, c : React.ReactElement<GridColumn>) : number => {

            if (c.props.fluid)
                hasFluidColumns = true
            
            // cols with no width can be reduced to 1
            if (!c.props.width)
                return space + 1
            else
                return space + c.props.width
        }, 0);

        if (takenSpace > destinationColumns)
        {
            return {
                isError: true
            }
        }
        
        // This is the perfect case, we just accept each col size as it is
        const calculatedSizes = columns.map<number>((c : React.ReactElement<GridColumn>) => {
            if (!c.props.width)
                return 1
            else
                return c.props.width
        })

        if (takenSpace == destinationColumns)
        {
            return {
                columns,
                widths: calculatedSizes
            }
        }

        // Now if the taken space is LESS than the objective we do the following
        // 1) Check for fluid columns to expand them, we distribute the delta equally from left to right
        // 2) Add a padding column at the end to reach the max

        let delta = destinationColumns - takenSpace
        let newlyCalculatedSizes = calculatedSizes;
        
        while (hasFluidColumns && delta > 0)
            for (let ind in columns)
            {
                const curCol = columns[ind]

                // hand out one "item of size"
                if (curCol.props.fluid)
                {
                    newlyCalculatedSizes[ind] += 1
                    delta -= 1
                }
                
            }

        if (!hasFluidColumns)
        {
            // No fluid columns, we just pad with one at the end
            columns.push(<GridColumn width={delta} fluid={true}><p className="text-center text-lg">Auto filler column</p></GridColumn>);
            newlyCalculatedSizes.push(delta);
        }

        return {
            columns,
            widths: newlyCalculatedSizes
        }
    }

    render() : ReactNode
    {
        if (this.state.isError)
            return <h2 className="text-lg">Check the added columns, they don't respect the constraints ({Grid.DEFAULT_COLUMNS} max cols).</h2>;


        if (!this.state.columns.length)
            return <h2 className="text-lg">Grid Empty, please add columns.</h2>;

        
        return (
        <div className={`grid grid-flow-col w-screen h-full`} style={{gridAutoColumns:'1fr'}}>
        {this.state.columns.map((Elem : React.ReactElement<GridColumn>, i) => {
            return (<div className={`col-span-${this.state.widths[i]}`}>
                    <div className="w-full bg-blue-200 dark:text-black text-center border-solid border-2 border-blue-500 relative">
                        Size {Elem.props.fluid && `${Elem.props.width}↔️`}{this.state.widths[i]}{!Elem.props.fluid && '🔒'}
                        <button
                            className="absolute right-5 outline-none hover:bg-gray-700"
                            title="Delete Column"
                            onClick={(e) => { this.props.onRemove && this.props.onRemove(this.state.columns[i])}}>❌</button>
                    </div>
                    <div className="h-full border-dotted border-l border-blue-300">
                        {Elem}
                    </div>
                </div>)
        })}
        </div>);
    }
}