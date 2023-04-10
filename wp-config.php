<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */
  
$pantheon_rewrite_file = __DIR__ .  '/pantheon_rewrites.php';
if(file_exists($pantheon_rewrite_file)) {
    include 'pantheon_rewrites.php';
}

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'db_name' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'password' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'W@B99O+mv55eRhr;}cXAGYw25BX/#-S$v~-w N|]cPgUvS1IQTQce{rta(nsT7Ar');
define('SECURE_AUTH_KEY',  '99To|<P>i[_;K^+p~:9Lx Wj[4v,=}h}#~1ryp723j#iN<Ps5}fKSx@Iy87l~L=+');
define('LOGGED_IN_KEY',    '4H/EF|A98v0,o(StG57DcAP!iMg$2+{;@<||I92_Q0KS+Ze_:1S%KPE.=jK6X!gF');
define('NONCE_KEY',        'ql7+1H$Us8dDcu?[RpA=e.T<IHND:^@rj%s*0`R:-y,,#|Q5~--?0+[t}Jw(?D|0');
define('AUTH_SALT',        '=WaqXglWYsS0*SCzwZRCBT2-iY(=q6*)gDt^1{yd:BwocAvz2 {r9+s-s>cwG/+P');
define('SECURE_AUTH_SALT', 'j-x@^~k^oB_i#BZxmnf@i>8S]R{c|*Wb.9%-B|+)&fc-U*OU4.:*=]3he?m<V8y&');
define('LOGGED_IN_SALT',   '5Vexih8jV{?[B:+E!Xi$gOR~SPrM+oW` QA5et$s?PEY(=-=E9I%u[M<i:.T2smp');
define('NONCE_SALT',       '-1 f_v[+)(ncqqY$p`UW+:6i}K5`_]3ciTm5st0dOvO`v0~p_jW#p`-|^)V>QRJ|');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
define ('WP_CACHE', false );
/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
