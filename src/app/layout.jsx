import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { BreadcrumbProvider } from '@/context/bread-crumb-context'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-roboto',
    display: 'swap',
})

const fontGothamHTF = localFont({
    src: [
        {
            path: '../fonts/gotham-htf-regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/gotham-htf-regular.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-gotham-heading',
    display: 'swap',
})

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${roboto.variable} ${fontGothamHTF.variable} antialiased`}
        >
            <body>
                <BreadcrumbProvider>
                    <main>{children}</main>
                </BreadcrumbProvider>
            </body>
        </html>
    )
}
