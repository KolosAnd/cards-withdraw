"use client";

import {BalanceIndicator} from "@/app/components/balanceIndicator/BalanceIndicator";
import Link from "next/link";
import {usePathname} from "next/navigation";


export const Header = () => {
    const pathname = usePathname();

    return (
        <div className="w-full py-6 border-b-2 border-gray-200 px-4 md:py-4 sm:py-2 sm:px-2 sm:text-xs md:text-lg text-xl">
            <div className="flex items-center justify-between">
                <div className="flex">
                    <Link className={`mr-6 sm:mr-3 xs:mr-2 duration-300  ${pathname == '/' ? 'text-buttonPrimary cursor-default' : 'hover:text-borderSelectedCard' }  `}
                          href="/">Home
                    </Link>
                    <Link className={`mr-6 sm:mr-2 xs:mr-0 duration-300  ${pathname == '/change-balance' ? 'text-buttonPrimary cursor-default' : 'hover:text-borderSelectedCard' }  `}
                          href="/change-balance">Change Balance
                    </Link>
                </div>
                <BalanceIndicator />
            </div>
        </div>
    )
}
