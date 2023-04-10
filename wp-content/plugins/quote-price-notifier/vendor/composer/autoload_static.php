<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc6fe43f5612b96e6addac94ec78d3954
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'Artio\\QuotePriceNotifier\\' => 25,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Artio\\QuotePriceNotifier\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc6fe43f5612b96e6addac94ec78d3954::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc6fe43f5612b96e6addac94ec78d3954::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitc6fe43f5612b96e6addac94ec78d3954::$classMap;

        }, null, ClassLoader::class);
    }
}
