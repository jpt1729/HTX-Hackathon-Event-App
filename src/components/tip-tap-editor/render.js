export default function Render({ html }){
    return (
        <div className="content" dangerouslySetInnerHTML={{__html: html}}/>
    )
}