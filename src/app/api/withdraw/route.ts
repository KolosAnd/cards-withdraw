
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { finalPrice } = await req.json();

    console.log('The user has successfully withdrawn the money ' + finalPrice);

    return NextResponse.json({ message: 'Withdrawal successful' });
}
