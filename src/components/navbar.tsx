"use client"
import Link from 'next/link';
import React from 'react';
import { cn } from '@zero/utils';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@zero/components/ui/navigation-menu';
import { Button } from '@zero/components/ui/button';

type NavItem = { title: string; href?: string; description?: string, list?: Array<NavItem> };

const NavItems: Array<NavItem> = [
    {
        title: "Tools",
        description: "",
        list: [
            {
                title: "Invoice Builder",
                href: "/generate/invoices",
                description:
                    "For Freelancers & people on the go.",
            },
            {
                title: "Testimonial Generator",
                href: "/generate/testimonial",
                description:
                    "For Freelancers & people on the go.",
            },
        ]
    },
    {
        title: "Experiments",
        description: "",
        list: [
            {
                title: "Lightbox",
                href: "/experiments/lightbox",
                description:
                    "For Freelancers & people on the go.",
            },
            {
                title: "Hover Card",
                href: "/experiments/hover-card",
                description:
                    "For Freelancers & people on the go.",
            },
            {
                title: "Events page",
                href: "/experiments/events",
                description:
                    "For Freelancers & people on the go.",
            }
        ]
    },

]

type Props = {
    className?: string,
    menu?: Array<NavItem>,
}
export function Navbar(props: Props) {
    const { className, menu = NavItems } = props;

    return <header className={cn("flex items-center w-full text-primary", className)}>
        <NavigationMenu className='grow max-w-full justify-start'>
            <NavigationMenuList className='grow flex gap-2'>
                {menu.map(nav => {
                    return <NavigationMenuItem key={nav.title}>
                        <NavigationMenuItem>
                            {nav.href && <Link href={nav.href} legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {nav.title}
                                </NavigationMenuLink>
                            </Link>}
                        </NavigationMenuItem>
                    </NavigationMenuItem>
                })}
            </NavigationMenuList>
        </NavigationMenu >
        <Link href="https://madeofzero.com/" target="_blank"><Button>madeofzero.com</Button></Link>
    </header >
}


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
