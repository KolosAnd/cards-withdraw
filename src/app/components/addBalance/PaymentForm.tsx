'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch} from "@/app/store";
import {changeBalance, frozeBalance, selectIsFrozen} from "@/app/utils/slices/userBalance";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

type Input = {
    balance: string
}

export const PaymentForm = () => {
    const dispatch = useDispatch();

    const isFrozen = useSelector(selectIsFrozen);
    const [frozenBalance, setFrozenBalance] = useState<boolean>(false);
    useEffect(()=>{
        setFrozenBalance(isFrozen)
    },[isFrozen])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = (data) => {
        if(parseFloat(data.balance) > 0) {
            dispatch(changeBalance(parseFloat(data.balance)));
            reset();
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/[^0-9.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        if (parts[1]?.length > 2) {
            parts[1] = parts[1].slice(0, 2);
            value = parts.join('.');
        }
        event.target.value = value;
    }

    const handleCheckboxFrozenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
        setFrozenBalance(event.target.checked);
        dispatch(frozeBalance(event.target.checked));
    }


    return (
        <div className="flex md:flex-wrap md:px-2.5">
            <div className="border-2 border-amazonCard py-4 px-6 my-4 rounded-lg mr-4 md:px-3 md:py-3 md:my-3">
                <form className="flex sm:flex-wrap" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mr-2 flex-col h-12 sm:h-14">
                        <input className="mr-2 border-1 border-buttonPrimary px-4 py-1 rounded-lg"
                               {...register("balance", {required: true})}
                               onInput={handleInput}
                        />
                        {errors.balance &&
                            <p className="text-warning text-xs mt-1">This field is required</p>
                        }
                    </div>
                    <button type="submit"
                            className="bg-buttonPrimary disabled:bg-buttonDisabled hover:opacity-70 duration-300 px-4 py-1 text-white rounded-lg h-fit">
                        Change balance
                    </button>
                </form>
            </div>
            <div className="border-2 border-amazonCard py-4 px-6 my-4 rounded-lg mr-4 md:px-3 md:py-3 md:my-3">
                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={frozenBalance}
                            onChange={handleCheckboxFrozenChange}
                            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <span className="text-gray-700 font-medium">
                            Balance frozen
                        </span>
                    </label>
                </div>

            </div>
        </div>


    )
}
