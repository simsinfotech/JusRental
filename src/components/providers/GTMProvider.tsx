'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export function GTMProvider() {
  const [gtmId, setGtmId] = useState('');

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowser();
      const { data } = await supabase
        .from('js_site_settings')
        .select('value')
        .eq('key', 'seo')
        .single();

      if (data?.value) {
        const val = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
        if (val.gtmContainerId) {
          setGtmId(val.gtmContainerId);
        }
      }
    };
    load();
  }, []);

  if (!gtmId) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
