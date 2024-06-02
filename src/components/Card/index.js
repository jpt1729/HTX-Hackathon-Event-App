export default function Card({ children }){
    return (
        <div className="flex gap-3">
            <div className="min-w-1 rounded-full min-h-full bg-red-accent"/>
            <div className="flex flex-col gap-1">
                {children}
            </div>
        </div>
    )
}