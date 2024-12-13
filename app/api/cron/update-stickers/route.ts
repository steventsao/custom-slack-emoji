import { getStickers } from "utils/getStickers";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = 'edge';

// Cache key for storing stickers data
const STICKERS_CACHE_KEY = 'recent_stickers';

export async function GET(request: Request) {
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
