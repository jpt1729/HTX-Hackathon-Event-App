import { MDXRemote } from 'next-mdx-remote/rsc'
import ThemedText from '../ThemedText'
import Link from 'next/link'
import Image from 'next/image'

import styles from './markdown.module.css'

// Todo fix list elements so that they look like how they look in figma. Where overflowing text does NOT go under the dot/number
const components = {
    h1: (props) => {
        return (
            <ThemedText type='heading' {...props}/>
        )
    },
    h2: (props) => {
        return (
            <ThemedText type='subheading' {...props}/>
        )
    },
    p: (props) => {
        return (
            <ThemedText type='paragraph' {...props}/>
        ) 
    },
    a: (props) => {
        return (
            <Link className = 'text-red-accent transition-colors underline' {...props}/>
        )
    },
    img: (props) => {
        return (
            <Image alt={props.alt ? props.alt : 'No alternate text added'} {...props}/>
        )
    },
    ul: (props) => {
        return (
            <ul className='list-disc list-inside leading-7' {...props}/>
        )
    },
    ol: (props) => {
        return (
            <ol className='list-decimal list-inside leading-7' {...props}/>
        )
    },
    li: (props) => {
        return (
            <li className={`${styles.li}`}{...props}/>
        )
    }
}

export default function CustomMarkdown({ source, ...props}){
    return (
        <MDXRemote source = {source} components={components} {...props}/>
    )
}