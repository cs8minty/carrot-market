import {
    NextFetchEvent,
    NextRequest,
    NextResponse,
    userAgent,
} from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    // if (!req.nextUrl.pathname.match('/')) {
    //     if (!userAgent(req).isBot) {
    //         req.nextUrl.pathname = '/';
    //         return NextResponse.redirect(req.nextUrl);
    //     }
    // }

    // if (req.nextUrl.pathname.startsWith('/chats')) {
    //     console.log('chats ONLY middleware');
    // }
    if (!req.url.includes('/api')) {
        if (!req.url.includes('/enter') && !req.cookies.get('carrotsession')) {
            return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
        }
    }
    console.log(req.geo?.region);
}
