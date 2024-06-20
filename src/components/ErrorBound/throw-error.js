"use client";

export default function ThisComponentThrowsAnError({}){
    throw Error('this should happen...')
    return (<>
        <p>I need tho throw an error</p>
    </>)
}