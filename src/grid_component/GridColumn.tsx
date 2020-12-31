import React, { ReactNode } from 'react'

interface PType {
    children?: JSX.Element[] | JSX.Element
    width?: number
    fluid?: boolean
}

export default class GridColumn 
    extends React.Component<PType> {

    /* 
        If the with of a column is undefined
        it can expand and stretch according to
        the "Grid Manager" desires.

        If the width is defined, it's treated
        as fixed if the fluid attribute is false
        or minimum if the fluid attribute is true
        thus growing in size when filling is needed.
    */
    width : number | undefined = undefined

    /**
     * If the column is fluid, it can expand beyond
     * the set width, otherwise the witdh is expected
     * to be fixed and the column cannot be stretched.
     */
    fluid : boolean = false

    constructor(props : PType) {

        super(props)

        this.width = props.width || undefined;
        this.fluid = props.fluid || true;

    }

    render() : ReactNode {
        if (this.props.children)
            return this.props.children

        return <small>Empty Base Column</small>;
    }
}