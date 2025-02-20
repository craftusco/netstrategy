import { NextResponse } from 'next/server';

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico') || pathname.startsWith('/favicon')) {
    return NextResponse.next()
  }

  // Normalizza il pathname
  const normalizedPathname = normalizeString(decodeURIComponent(pathname));

  // Se l'URL richiesto è diverso dall'URL normalizzato, reindirizza
  if (pathname !== normalizedPathname) {
    const url = req.nextUrl.clone();
    url.pathname = normalizedPathname;
    return NextResponse.redirect(url);
  }

  // Continua con la gestione della richiesta se non è necessario reindirizzare
  return NextResponse.next();
}