"use client"
import { useModal } from "@/utils/context/ModalContext"
export default function Test({}){
    const {showModal} = useModal()
    return (
        <main>
            <button onClick = {() => {
                showModal(<>
                    <p>Test test test</p>
                </>)
            }}>
                Show Modal
            </button>
        </main>
    )
}