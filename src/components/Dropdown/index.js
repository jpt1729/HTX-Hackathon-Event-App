export default function DropDown({ children, className, ...props}){
    return (
        <div className={`${className} absolute bg-white rounded -bottom-[100%] translate-y-1/2 p-5 drop-shadow`} {...props}>
            {children}
        </div>
    )
}