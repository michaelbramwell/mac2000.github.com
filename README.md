mac2000.github.com
==================

https://github.com/mojombo/jekyll/wiki/Template-Data

https://github.com/shopify/liquid/wiki/liquid-for-designers

https://github.com/mojombo/jekyll/wiki/Blog-Migrations

https://gist.github.com/2870636

https://gist.github.com/2890453

http://getsimpleform.com/

http://joevennix.com/2011/05/25/How-I-Implement-Static-Site-Search.html

https://gist.github.com/939713

http://www.juev.ru/2012/01/07/jekyll/


To test your files use:

    jekyll --safe
    ruby _inspect.rb

TODO: move this files:

    ./yui-custom-celleditor.html
    ./yuicss.zip
    ./wysiwyg.zip
    ./gwe.zip
    ./WinSnapper.zip
    ./Hosts.zip
    ./RunHiddenConsole.zip
    ./TabbedLinesTree.tar.gz
    ./TDGi.iconMgr.zip
    ./bg.zip
    ./jsdiff.zip
    ./simplecrud.zip

### Windows

Before running jekyll on windows, run this command `chcp 65001` as mentioned in [issue](https://github.com/mojombo/jekyll/issues/188)

# Build scripts

## Windows

    copy jquery.js+autolink.js+page.js scripts.js /b
    java -jar C:\yuicompressor\build\yuicompressor-2.4.7.jar -o scripts.min.js scripts.js


