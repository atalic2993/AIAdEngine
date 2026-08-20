import Script from "next/script";

/**
 * Tracking framework. Every pixel is switched on by an environment variable,
 * so nothing loads (and no cookies are set) until the real IDs are added.
 *
 * NEXT_PUBLIC_META_PIXEL_ID   - Meta (Facebook + Instagram) Pixel
 * NEXT_PUBLIC_GA4_ID          - Google Analytics 4 / Google Ads tag
 * NEXT_PUBLIC_TIKTOK_PIXEL_ID - TikTok Pixel
 */
export function Analytics() {
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const tiktokId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

  return (
    <>
      {metaId ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${metaId}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}

      {ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${ga4Id}');`}
          </Script>
        </>
      ) : null}

      {tiktokId ? (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];
ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=r+"?sdkid="+e+"&lib="+t;
var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
ttq.load('${tiktokId}');ttq.page();}(window,document,'ttq');`}
        </Script>
      ) : null}
    </>
  );
}
