"use client"
import { useState } from 'react'
import TipTapEditor from '@/components/tip-tap-editor'
import Render from '@/components/tip-tap-editor/render'
import { action } from './action'
export default function Test({}){
    const [content, setContent] = useState("")
    const testAction = action.bind(null, content)
    return (
        <main>
            <form action={testAction}>
                <TipTapEditor content={content} changeContent={setContent}/>
            </form>
            <Render html={content}/>
        </main>
    )
}