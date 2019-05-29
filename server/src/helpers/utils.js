// ***** (9) za konverziju se koristi pakage big-integer
import bigInt from 'big-integer';


// ***** (9) id se konvertira iz uuid16 u base62
// ***** Za to je napravljena funkcija convert16to62
export function convert16to62(uuid) {
  const alphabet62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabet16 = '0123456789abcdef';
  const base16 = bigInt(uuid.replace(/-/g, ''), 16, alphabet16, true);

  return base16.toString(62, alphabet62);
}


// ***** (9) id se konvertira iz base62 u uuid16
// ***** Za to je napravljena ova funkcija convert62to16
export function convert62to16(value62) {
  const alphabet62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabet16 = '0123456789abcdef';
  const base62 = bigInt(value62, 62, alphabet62, true);
  let base16 = base62.toString(16, alphabet16).padStart(32, '0');

  base16 = `${base16.slice(0,8)}-${base16.slice(8,12)}-${base16.slice(12,16)}-${base16.slice(16,20)}-${base16.slice(20)}`;

  return base16;
}
