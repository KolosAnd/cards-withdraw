import {selectBalance} from "@/app/utils/slices/userBalance";
import {useAppSelector} from "@/app/store";
import {priceConverterToToken} from "@/app/utils/priceConvert";


export const BalanceIndicator = () => {
    const balance = useAppSelector(selectBalance);

    return (
        <div className="flex items-center justify-end text-lg lg:text-sm xs:text-xs">
            <div className="mr-2">
                <p>Balance: </p>
            </div>

            <div className="flex justify-end items-center sm:flex-wrap">
                <div className="flex justify-end">
                    <p> ${balance.toFixed(2).toString()}</p>
                </div>
                <div className="flex items-center ml-2">(
                    <img className="mr-1" src="/coin-scrambly.svg" alt=''/>
                    <p>{priceConverterToToken(balance).toFixed(0).toString()})</p>
                </div>
            </div>


        </div>
    )
}
