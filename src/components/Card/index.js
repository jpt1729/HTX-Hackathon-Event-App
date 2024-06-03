export default function Card({ children, className, ...props }){
    return (
        <div className={`flex gap-3 ${className}`} {...props}>
            <div className="min-w-1 rounded-full min-h-full bg-red-accent"/>
            <div className="flex flex-col gap-1">
                {children}
            </div>
        </div>
    )
}