/**
 * Kept apart from `theme.ts` because that module is client-only, and the
 * root layout — a server component — needs this as a plain string.
 */

export const STORAGE_KEY = 'sofisam:theme';

/** The browser's own bar colour for each theme — the header's glass. */
const CHROME = { dark: '#0B0B0C', light: '#F5F1EA' } as const;

/**
 * Runs before first paint, inlined into the document head, so the page is
 * never painted in the wrong theme and never flashes into the right one.
 *
 * A choice the visitor has made is kept in localStorage and always wins.
 * Until there is one, the page follows the operating system — including when
 * the system changes its mind while the page is open.
 *
 * It also installs the one function that changes the theme, so a change from
 * the switch and a change from the system take the same path: the colour
 * eases across, the browser's bar follows, and nothing is animated that
 * would move.
 */
export const themeInitScript = `(function(){
var d=document.documentElement,k='${STORAGE_KEY}',c=${JSON.stringify(CHROME)},t=0;
function stored(){try{var v=localStorage.getItem(k);return v==='light'||v==='dark'?v:null;}catch(e){return null;}}
var m=window.matchMedia?window.matchMedia('(prefers-color-scheme: light)'):null;
function apply(v,ease){
if(ease&&d.dataset.theme&&d.dataset.theme!==v&&!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
d.classList.add('theme-switching');void d.offsetWidth;clearTimeout(t);
t=setTimeout(function(){d.classList.remove('theme-switching');},520);}
d.dataset.theme=v;d.style.colorScheme=v;
var metas=document.querySelectorAll('meta[name="theme-color"]');
for(var i=0;i<metas.length;i++)metas[i].setAttribute('content',c[v]);
}
window.__sofisamTheme={apply:apply,key:k};
apply(stored()||(m&&m.matches?'light':'dark'),false);
if(m){var f=function(e){if(!stored())apply(e.matches?'light':'dark',true);};
if(m.addEventListener)m.addEventListener('change',f);else if(m.addListener)m.addListener(f);}
})();`.replace(/\n/g, '');
