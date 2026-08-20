import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }
const Icon = ({ size = 24, children, ...props }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>

export const ArrowUpRight = (p: IconProps) => <Icon {...p}><path d="M7 17 17 7M8 7h9v9" /></Icon>
export const ArrowDownRight = (p: IconProps) => <Icon {...p}><path d="m7 7 10 10M17 8v9H8" /></Icon>
export const AtSign = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M16 8v5a2 2 0 0 0 4 0v-1a8 8 0 1 0-4.3 7.1" /></Icon>
export const Braces = (p: IconProps) => <Icon {...p}><path d="M8 3H7a3 3 0 0 0-3 3v3a3 3 0 0 1-2 3 3 3 0 0 1 2 3v3a3 3 0 0 0 3 3h1M16 3h1a3 3 0 0 1 3 3v3a3 3 0 0 0 2 3 3 3 0 0 0-2 3v3a3 3 0 0 1-3 3h-1" /></Icon>
export const Code2 = (p: IconProps) => <Icon {...p}><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></Icon>
export const Command = (p: IconProps) => <Icon {...p}><path d="M18 9a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12Z" /></Icon>
export const Layers3 = (p: IconProps) => <Icon {...p}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></Icon>
export const Menu = (p: IconProps) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>
export const Sparkles = (p: IconProps) => <Icon {...p}><path d="m12 3-1.2 4.3L7 8.5l3.8 1.2L12 14l1.2-4.3L17 8.5l-3.8-1.2L12 3ZM19 15l-.6 2.4L16 18l2.4.6L19 21l.6-2.4L22 18l-2.4-.6L19 15ZM5 15l-.6 2.4L2 18l2.4.6L5 21l.6-2.4L8 18l-2.4-.6L5 15Z" /></Icon>
export const X = (p: IconProps) => <Icon {...p}><path d="m6 6 12 12M18 6 6 18" /></Icon>
export const Github = (p: IconProps) => <Icon {...p}><path d="M15 22v-3.8c0-1 .1-1.5-.5-2.1 3.5-.4 5.5-1.7 5.5-5.3 0-1-.4-2-1.1-2.8.1-.5.5-1.6-.1-2.8 0 0-1-.3-3 1.1a10.3 10.3 0 0 0-5.5 0c-2-1.4-3-1.1-3-1.1-.6 1.2-.2 2.3-.1 2.8A4.3 4.3 0 0 0 6 10.9c0 3.6 2 4.9 5.5 5.3-.6.6-.5 1.4-.5 2.1V22" /><path d="M9 19.5c-2 .6-3.5-.4-4-2" /></Icon>
export const Linkedin = (p: IconProps) => <Icon {...p}><path d="M7 9v8M7 6v.01M11 17v-4.2a3 3 0 0 1 6 0V17M3.5 3.5h17v17h-17z" /></Icon>
export const Send = (p: IconProps) => <Icon {...p}><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></Icon>
