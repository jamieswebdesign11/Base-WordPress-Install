<?php


/**
 * Pantheon Rewrites provides a way for you to create Apache redirects and mod_rewrites in
 * Drupal and Wordpress. Since Pantheon leverages Nginx for HTTP/HTTPS, redirects and rewrites in
 * your .htaccess file will not work.
 *
 * Installation
 *
 * Drupal:
 *
 *    Place this pantheon_rewrites.php file in sites/default
 *    Add the following to line 2 of settings.php
 *          // Include line for settings.php or wp-config.php
            $pantheon_rewrite_file = __DIR__ .  '/pantheon_rewrites.php';
            if(file_exists($pantheon_rewrite_file)) {
              include 'pantheon_rewrites.php';
            }
 *
 * Wordpress:
 *
 *    Place this pantheon_rewrites.php file in the same directory as wp-config.php, typically your docroot
 *    Add the following to line 2 of wp-config.php
 *          // Include line for settings.php or wp-config.php
            $pantheon_rewrite_file = __DIR__ .  '/pantheon_rewrites.php';
            if(file_exists($pantheon_rewrite_file)) {
              include 'pantheon_rewrites.php';
            }
 *
 *
 * DISCLAIMER: Use this file at your own risk. Pantheon makes no warranties against this file
 *
 */


/**
 * Page Redirects
 *
 * The following code provides redirect capabilities for your site. It should be noted that both Drupal and Wordpress
 * have modules and plugins that can replicate this capability, and we recommend using one of those, however, if your
 * use case will not allow that, here is an alternative for redirects.
 *
 * Usage:
 *
 *  To use page redirects, edit the $redirects array as follows, one redirect per line:
 *
 *    $redirects = [
 *        '/OLD_PATH' => '/NEW_PATH',
 *       '/SECOND_OLD_PATH' => '/SECOND_NEW_PATH',
 *    ]
 *
 *
 *
 */


/**
 * Array of page redirects. This is what you edit.
 */
$redirects = [
'/new-editions' => '/art/editions',
'/catalogues' => '/art/catalogues',
'/alex-katz-the-artist-of-the-immediate' => '/news/alex-katz-the-artist-of-the-immediate',
'/studio-visit-with-kenny-scharf' => '/news/studio-visit-with-kenny-scharf',
'/john-crash-matos-celebrating-45-years-at-joanne-artman-gallery' => '/news/john-crash-matos-celebrating-45-years-at-joanne-artman-gallery',
'/nicole-wittenberg-sunday-kind-of-love-at-nina-johnson-gallery-9-10-2020-10-10-2020' => '/news/nicole-wittenberg-sunday-kind-of-love-at-nina-johnson-galery',
'/deborah-kass-painting-and-sculpture-at-kavi-gupta-gallery-09-10-2020-12-26-2020' => '/news/deborah-kass-painting-and-sculpture-at-kavi-gupta-gallery',
'/alex-katz-guggenheim-museum-retrospective-announcement' => '/news/alex-katz-guggenheim-museum-retrospective-announcement',
'/hangin-with-kenny' => '/news/hangin-with-kenny-scharf',
'/dont-miss-this-alex-katz-exhibition-in-shanghai-through-the-summer' => '/news/dont-miss-this-alex-katz-exhibition-in-shanghai-through-the-summer',
'/deb-kass-at-the-cantor-arts-center' => '/news/deb-kass-at-the-cantor-arts-center',
'/the-originals-alex-katz-w-magazine' => '/news/the-originals-alex-katz-w-magazine',
'/donald-sultan-and-donald-baechler-featured-in-pop-power-at-the-taubman-museum-of-art' => '/news/donald-sultan-and-donald-baechler-featured-in-pop-power-at-the-taubman-museum-of-art',
'/kenny-sharfs-optimistically-melting-at-honor-fraser-in-los-angeles' => '/news/kenny-sharfs-optimistically-melting-at-honor-fraser-in-los-angeles',
'/old-art-new-art-according-to-alex-katz-nad-now' => '/news/old-art-new-art-according-to-alex-katz-nad-now',
'/fixed-contained-group-exhibition-featuring-carlos-rolon' => '/news/fixed-contained-group-exhibition-featuring-carlos-rolon',
'/donald-sultan-dark-objects-at-huxley-parlour-gallery-june-2019' => '/news/donald-sultan-dark-objects-at-huxley-parlour-gallery-june-2019',
'/sculpture-milwaukee-gild-the-lily-caribbean-hybrid-i-ii-iii-installationtion' => '/news/sculpture-milwaukee-gild-the-lily-caribbean-hybrid-i-ii-iii-installation',
'/still-peter-halley-and-ugo-rondinone' => '/news/still-peter-halley-and-ugo-rondinone',
'/kenny-scharfs-blue-blood' => '/news/kenny-scharfs-blue-blood',
'/ross-bleckner-on-his-comeback' => '/news/ross-bleckner-on-his-comeback',
'/donald-sultan-mimosa-paintings-and-drawings-at-ryan-lee' => '/news/donald-sultan-mimosa-paintings-and-drawings-at-ryan-lee',
'/hong-kong-hosts-first-major-exhibition-by-painter-alex-katz' => '/news/hong-kong-hosts-first-major-exhibition-by-painter-alex-katz',
'/sothebys-rediscover-alex-katz' => '/news/sothebys-rediscover-alex-katz',
'/alex-katz-interview-with-dodie-kazanjian-and-calvin-tomkins' => '/news/alex-katz-interview-with-dodie-kazanjian-and-calvin-tomkins',
'/eric-fischl' => '/news/eric-fischl-octavio-art-gallery',
'/joe-andoe-timeless-calamity' => '/news/joe-andoe-timeless-calamity',
'/aros-aarhus-art-museum-40-gigantic-works-by-julian-schnabel' => '/news/aros-aarhus-art-museum-40-gigantic-works-by-julian-schnabel',
'/4422-2' => '/news/alex-katzs-life-in-art',
'/the-neuberger-museum-of-art-presents-brand-new-terrific-alex-katz-in-the-1950s' => '/news/the-neuberger-museum-of-art-presents-brand-new-terrific-alex-katz-in-the-1950s',
'/meet-carlos-rolon-the-og-visionary' => '/news/meet-carlos-rolon-the-og-visionary-changing-the-art-game-with-urban-artifacts',
'/kenny-scharf-inner-and-outer-space' => '/news/kenny-scharf-inner-and-outer-space',
'/alex-katz-cut-outs-exhibition' => '/news/alex-katz-cut-outs-exhibition',
'/alex-katz-sticks-to-his-artistic-convictions' => '/news/alex-katz-sticks-to-his-artistic-convictions',
'/golden-eyes-alex-katz-at-ninety' => '/news/golden-eyes-alex-katz-at-ninety',
'/snapchat-debuts-six-new-augmented-reality-artworks-at-art-basel-miami' => '/news/snapchat-debuts-six-new-augmented-reality-artworks-at-art-basel-miami',
'/seen-on-the-street-in-williamsburg-plus-a-shoreline-sight-or-two' => '/news/seen-on-the-street-in-williamsburg-plus-a-shoreline-sight-or-two',
'/were-all-jealous-of-alex-katzs-undeniably-chic-subjects' => '/news/were-all-jealous-of-alex-katzs-undeniably-chic-subjects',
'/eric-fischl-i-dont-think-of-my-work-as-erotic-i-think-of-it-as-sexual' => '/news/eric-fischl-i-dont-think-of-my-work-as-erotic-i-think-of-it-as-sexual',
'/documentary-everybody-knows-elizabeth-murray-brings-the-artists-work-boldly-to-life' => '/news/documentary-everybody-knows-elizabeth-murray-brings-the-artists-work-boldly-to-life',
'/at-90-still-raising-the-bar-for-himself-and-the-other-guys' => '/news/at-90-still-raising-the-bar-for-himself-and-the-other-guys',
'/the-jubilance-of-julian-the-feng-shui-of-schnabel' => '/news/the-jubilance-of-julian-the-feng-shui-of-schnabel',
'/alex-katz-on-the-cover-new-york-magazines-50th-anniversary-issue' => '/news/alex-katz-on-the-cover-new-york-magazines-50th-anniversary-issue',
'/alex-katz-exhibition-shares-upbeat-artists-mood-of-endless-summer' => '/news/alex-katz-exhibition-shares-upbeat-artists-mood-of-endless-summer',
'/layers-donald-baechler-at-cheim-read-new-york' => '/news/layers-donald-baechler-at-cheim-read-new-york',
'/desert-scenes-awash-with-colour-in-painter-enoc-perezs-first-dubai-show' => '/news/desert-scenes-awash-with-colour-in-painter-enoc-perezs-first-dubai-show',
'/were-stripping-away-all-the-noise-the-great-julian-schnabel-reboot-continues-at-frieze-masters' => '/news/were-stripping-away-all-the-noise-the-great-julian-schnabel-reboot-continues-at-frieze-masters',
'/alex-katz-at-timothy-taylor-gallery' => '/news/alex-katz-at-timothy-taylor-gallery',
'/the-desert-bloom-by-enoc-perez' => '/news/the-desert-bloom-by-enoc-perez',
'/james-hd-brown-life-and-work-in-mexico' => '/news/james-hd-brown-life-and-work-in-mexico',
'/disaster-was-his-message-but-then-catastrophes-became-commonplace' => '/news/disaster-was-his-message-but-then-catastrophes-became-commonplace',
'/visionary-painting-curated-by-alex-katz' => '/news/visionary-painting-curated-by-alex-katz'
];

/**
 * Redirect Loop code. DO NOT EDIT UNLESS YOU KNOW WHAT YOU ARE DOING!
 */
// Loop through requests for partial matching
foreach ($redirects as $source => $target) {
  if (strpos($_SERVER['REQUEST_URI'], $source) !== false) {
    // Check for static requests
    $prefix = (strpos($target, 'http') == 0) ? '' : "https://" . $_SERVER['HTTP_HOST'];
    // Grab any args from the URL so we can append them to the redirect
    $url_args = "?" . $_SERVER['QUERY_STRING'];
    // Redirect
    header("Location: " . $prefix . $target . $url_args, TRUE,301);
    exit();
  }
}


/**
 * URL Rewrites
 *
 * The following code provides mod_rewrite capabilities for your site. The following code will loop through the $mod_rewrite array
 * and proxy the new page without redirecting the user.
 *
 * Usage:
 *
 *  To use page rewrites, edit the mod_rewrites array as follows, one rewrite per line:
 *
 *    $mod_rewrites = [
 *        '/OLD_PATH' => '/NEW_PATH',
 *       '/SECOND_OLD_PATH' => '/SECOND_NEW_PATH',
 *    ]
 *
 *
 *
 */

/**
 * Array of URL rewrites. This is what you edit.
 */
$mod_rewrites = [
];

/**
 * Rewrite Loop code. DO NOT EDIT UNLESS YOU KNOW WHAT YOU ARE DOING!
 */
foreach ($mod_rewrites as $source => $target) {
  if (strpos($_SERVER['REQUEST_URI'], $source) !== false) {
    // Build URL
    $url = "http://" . $_SERVER['HTTP_HOST'] . $target;
    // Grab any args from the URL so we can append them to the rewrite
    $url_args = "?" . $_SERVER['QUERY_STRING'];
    // Fetch the proxy page markup and output as response.
    $page = get_proxy_site_page($url . $url_args);
    echo $page['content'];
    exit();
  }
}


/**
 * Proxy page request function. DO NOT EDIT OR REMOVE THIS FUNCTION!
 *
 * @param [string] $url
 * @return void
 */
function get_proxy_site_page($url)
{
  $options = [
    CURLOPT_RETURNTRANSFER => true,     // return web page
    CURLOPT_HEADER         => false,     // return headers
    CURLOPT_FOLLOWLOCATION => true,     // follow redirects
    CURLOPT_ENCODING       => "",       // handle all encodings
    CURLOPT_AUTOREFERER    => true,     // set referer on redirect
    CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
    CURLOPT_TIMEOUT        => 120,      // timeout on response
    CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
  ];
  $ch = curl_init($url);
  curl_setopt_array($ch, $options);
  $remoteSite = curl_exec($ch);
  $header = curl_getinfo($ch);

  curl_close($ch);
  $header['content'] = $remoteSite;
  return $header;
}