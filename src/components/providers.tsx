'use client'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types";

type Props = {
    children: React.ReactNode;
} & ThemeProviderProps

export function Providers({ children, ...props }: Props) {
    return (
        <>
            <NextThemesProvider attribute="class" {...props}>
                {children}
            </NextThemesProvider>
        </>
    )
}
