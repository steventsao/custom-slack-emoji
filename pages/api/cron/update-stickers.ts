import { getStickers } from "utils/getStickers";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";

// Cache key for storing stickers data
const STICKERS_CACHE_KEY = 'recent_stickers';
export const dynamic = 'force-dynamic'; // static by default, unless reading the request


export default async function handler(req: NextRequest, res: NextApiResponse) {
    try {
        // Get fresh data
        const stickersData = await getStickers();

        // Store in KV cache
        await kv.set(STICKERS_CACHE_KEY, stickersData, { ex: 35 }); // 35 seconds TTL

        return NextResponse.json({
            success: true,
            message: 'Stickers cache updated',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Failed to update stickers cache:', error);
        return NextResponse.json(
            { error: 'Failed to update stickers cache' },
            { status: 500 }
        );
    }
}
