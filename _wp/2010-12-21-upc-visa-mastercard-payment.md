---
layout: post
title: UPC &#8212; visa/mastercard payment
permalink: /191
tags: [online, pay, php, plugin, service, upc, visa]
----

Номер тестовой карточки: 4999999999990011


[https://secure.upc.ua/ecgtest/merchant](http://www.google.com/url?q=https%3A%
2F%2Fsecure.upc.ua%2Fecgtest%2Fmerchant&sa=D&sntz=1&usg=AFQjCNF5Z3PAO0wgFfdh-
3qyWQQtFF_LDg)

## Задача


Реализовать оплату кредиткой

## Шаг 1. Регистрация


Скачиваем и заполняем заявку на регистрацию [http://ecommerce.upc.ua/site/docs
.html](http://www.google.com/url?q=http%3A%2F%2Fecommerce.upc.ua%2Fsite%2Fdocs
.html&sa=D&sntz=1&usg=AFQjCNGD8JK1cUSSaWvUePMLR_HY7fusVg), после чего
отправляем заявку на [ec@upc.ua](mailto:ec@upc.ua)


Через некоторое время получаем письмо с логином\паролем приблизительно
следующего вида:

> Добрый день


Тестовые данные:


Адрес шлюза :[ ](http://www.google.com/url?q=https%3A%2F%2Fecgtest.upc.ua%2Fgo
%2Fenter&sa=D&sntz=1&usg=AFQjCNFXPfwtfhrRwSzwJwF9-WeCUzpUlQ)[https://secure.up
c.ua/ecgtest/enter](http://www.google.com/url?q=https%3A%2F%2Fecgtest.upc.ua%2
Fgo%2Fenter&sa=D&sntz=1&usg=AFQjCNFXPfwtfhrRwSzwJwF9-WeCUzpUlQ)


MerchantID=1753019


TerminalID=E7881019


Интерфейс торговца :[https://secure.upc.ua/ecgtest/merchant](http://www.google
.com/url?q=https%3A%2F%2Fsecure.upc.ua%2Fecgtest%2Fmerchant&sa=D&sntz=1&usg
=AFQjCNF5Z3PAO0wgFfdh-3qyWQQtFF_LDg)


Логин / Пароль : 1753019 / 1753019


Сертификат сервера - в аттаче


Также необходимо, чтобы Вы выслали сертификат торговца (файл с именем
1753019.crt) на адрес ec@upc.ua


Вся необходимая документация: здесь:[ ](http://www.google.com/url?q=http%3A%2F
%2Fecommerce.upc.ua%2Fsite%2Fdocs.html&sa=D&sntz=1&usg=AFQjCNGD8JK1cUSSaWvUePM
LR_HY7fusVg)[http://ecommerce.upc.ua/site/docs.html](http://www.google.com/url
?q=http%3A%2F%2Fecommerce.upc.ua%2Fsite%2Fdocs.html&sa=D&sntz=1&usg=AFQjCNGD8J
K1cUSSaWvUePMLR_HY7fusVg)


[ ](http://www.google.com/url?q=http%3A%2F%2Fecommerce.upc.ua%2Fsite%2Fdocs.ht
ml&sa=D&sntz=1&usg=AFQjCNGD8JK1cUSSaWvUePMLR_HY7fusVg)


Тестовые карты здесь:[ ](http://www.google.com/url?q=http%3A%2F%2Fecommerce.up
c.ua%2Fdocs%2FTesting.pdf&sa=D&sntz=1&usg=AFQjCNFQO4Sd3vkKpjkNVoAx8PgKv2x7UQ)[
http://ecommerce.upc.ua/docs/Testing.pdf](http://www.google.com/url?q=http%3A%
2F%2Fecommerce.upc.ua%2Fdocs%2FTesting.pdf&sa=D&sntz=1&usg=AFQjCNFQO4Sd3vkKpjk
NVoAx8PgKv2x7UQ)


(See attached file: test-server.cert)


В архиве batch.rar документация и примеры по формированию подписи.


(See attached file: batch.rar)


В архиве image.rar логотипы.


(See attached file: image.rar)


Переходим на страницу [https://secure.upc.ua/ecgtest/merchant/](http://www.goo
gle.com/url?q=https%3A%2F%2Fsecure.upc.ua%2Fecgtest%2Fmerchant%2F&sa=D&sntz=1&
usg=AFQjCNF9oWp3QtsGAbMDzDuzT9wRFab9hA) и меняем пароль на странице профиля.


![](http://mac-blog.org.ua/wp-content/uploads/image3.png)


На странице “Терминалы” выбираем наш сайт и указываем URL, для страниц
успешной и неудачных транзакций.


![](http://mac-blog.org.ua/wp-content/uploads/image2.png)


Так же необходимо сгенерировать и выслать им сертификат, для этого качаем
openssl [http://www.slproweb.com/products/Win32OpenSSL.html](http://www.google
.com/url?q=http%3A%2F%2Fwww.slproweb.com%2Fproducts%2FWin32OpenSSL.html&sa=D&s
ntz=1&usg=AFQjCNEIn6i69ahM4FK1WpaEoVevSL_t5w) и прописываем путь к папке bin
вPATH, далее в консоли переходим к папке batch (приатаченой к письму) и
запускаем run.bat #MERCHANT_ID# (с правами администратора)


![](http://mac-blog.org.ua/wp-content/uploads/image0.png)


Теперь необходимо выслать файл 1753019.crt на [ec@upc.ua](mailto:ec@upc.ua) и
дождаться ответа от них (пока не будет ответа, ничего работать не будет).


В ответ они присылают простой ответ, типа “Сертификат подгружен” и все.


На сервере нам понадобятся как минимум:


test-server.cert - файл который они выслали в письме подтверждении регистрации
(используется для проверки ответа)


1753019.pem - файл (приватный ключ) который мы сгенерировали (используется для
создания сигнатуры отправляемых данных)

## Шаг 2. Страница заказа


Код страницы заказа:

    
    <code><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Buy</title>
    </head>
    <body>
    
    <?php
    $MerchantID = '1753019';
    $TerminalID = 'E7881019';
    $OrderID = 19;
    $PurchaseTime = date("ymdHis") ;
    $TotalAmount = 242;
    $CurrencyID = 980;
    $data = "$MerchantID;$TerminalID;$PurchaseTime;$OrderID;$CurrencyID;$TotalAmount;;";
    $fp = fopen("$MerchantID.pem", "r");
    $priv_key = fread($fp, 8192);
    fclose($fp);
    $pkeyid = openssl_get_privatekey($priv_key);
    openssl_sign( $data , $signature, $pkeyid);
    openssl_free_key($pkeyid);
    $b64sign = base64_encode($signature);
    ?>
    
    <form action="https://secure.upc.ua/ecgtest/enter" method="post" >
       <input name="Version" type="hidden" value="1" />
       <input name="MerchantID" type="hidden" value="<?php echo $MerchantID?>" />
       <input name="TerminalID" type="hidden" value="<?php echo $TerminalID?>" />
       <input name="TotalAmount" type="hidden" value="<?php echo $TotalAmount?>" />
       <input name="Currency" type="hidden" value="<?php echo $CurrencyID?>" />
       <input name="locale" type="hidden" value="RU" />
       <input name="PurchaseTime" type="hidden" value="<?php echo $PurchaseTime ?>" />
       <input name="OrderID" type="hidden" value="<?php echo $OrderID?>" />
       <input name="Signature" type="hidden" value="<?php echo "$b64sign" ?>"/>
       Sum: <?php echo $TotalAmount?> <input type="submit"/>
    </form>
    
    </body>
    </html></code>


Примечание:


$data генериться следующим образом


MerchantId;TerminalId;PurchaseTime;OrderId,Delay;CurrencyId,AltCurrencyId;


Amount,AltAmount;SessionData(SD);


Количество знаков ; должно оставаться постоянным. Если какое то поле


отсутствует, то ставится ;;. Например, если отсутствует SessionData(SD),


то datafile будет выглядеть следующим образом:


MerchantId;TerminalId;PurchaseTime;OrderId,Delay;CurrencyId,AltCurrencyId;


Amount,AltAmount;;


Если отсутствуют поля Delay или AltCurrency, AltAmount то запятая перед


этими полями опускается. Например:


MerchantId;TerminalId;PurchaseTime;OrderId;CurrencyId,AltCurrencyId;Amount,


AltAmount;;


MerchantId;TerminalId;PurchaseTime;OrderId,Delay;CurrencyId;Amount;;


MerchantId;TerminalId;PurchaseTime;OrderId;CurrencyId;Amount;;


в нашем случае использовался последний пример. Важно соблюдать порядок иначе
ничего работать не будет, в коде использован самый простой рабочий пример.

## Шаг 3. Страница удачной авторизации


Код страницы:

    
    <code><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Buy</title>
    </head>
    
    <body>
    
    <h1>SUCCESS</h1>
    
    <h2>$_POST</h2>
    <pre><code><?php print_r($_POST)?></code></pre>
    
    <h2>Proccessing</h2>
    
    <?php
    
    $MerchantID = $_POST['MerchantID'];
    $TerminalID = $_POST['TerminalID'];
    $OrderID = $_POST['OrderID'];
    $PurchaseTime = $_POST['PurchaseTime'];
    $TotalAmount = $_POST['TotalAmount'];
    $CurrencyID = $_POST['Currency'];
    $XID = $_POST['XID'];
    $SD = $_POST['SD'];
    $TranCode = $_POST['TranCode'];
    $ApprovalCode = $_POST['ApprovalCode'];
    
    $data = "$MerchantID;$TerminalID;$PurchaseTime;$OrderID;$XID;$CurrencyID;$TotalAmount;$SD;$TranCode;$ApprovalCode;";
    
    echo 'data: '.$data.'<br />';
    
    $signature = $HTTP_POST_VARS["Signature"];
    $signature = base64_decode($signature) ;
    $fp = fopen("test-server.cert", "r");
    $cert = fread($fp, 8192);
    fclose($fp);
    $pubkeyid = openssl_get_publickey($cert);
    
    $ok = openssl_verify($data, $signature, $pubkeyid);
    if ($ok == 1) {
       echo "good";
    } elseif ($ok == 0) {
       echo "bad";
    } else {
       echo "ugly, error checking signature";
    }
    openssl_free_key($pubkeyid);
    ?>
    
    </body>
    </html></code>


Если все прошло успешно скрипт вернет good что говорит о том что проплата
прошла успешно.


Примечание:


Тут тоже очень важно не напортачить с переменной $data, которая генериться
следующим образом:

    
    <code>MerchantId;TerminalId;PurchaseTime;OrderId,Delay;Xid;CurrencyId,AltCurrencyId;Amount,AltAmount;SessionData;TranCode;ApprovalCode;</code>


Правила те же самые если полей типа Delay, AltCurrencyId, AltAmount нет -
запятая перед ними удаляется


В идеале на странице success.php должна будет выглядеть так:


![](http://mac-blog.org.ua/wp-content/uploads/image1.png)

## Шаг 4. Страница ошибки


Собственно здесь и делать нечего, из полученных данных отменяем заказ по
OrderID и в зависимости от кода ответа показываем соотв. сообщение.

## Тестовые карточки


Для тестирования можно использовать тестовые кредитки из документации [(http:/
/ecommerce.upc.ua/site/docs.html)](file:///C:/Users/mac/Desktop/2blog/UPC.html
)


На момент моих экспериментов они были следующими:




Обобщенные коды ответа для магазина


Примерная интерпретация ответа на странице возврата электронного магазина


Номер карты (срок действия 12/2012; CVV2 – 999)




000


Сделка авторизована


4999999999990011









105


Тразакция не разрешена банком-эмитентом


4999999999990029




116


Недостаточно средств


4999999999990037




111


Несуществующая карта


4999999999990045




108


Карта утеряна или украдена


4999999999990052




101


Неверный срок действия карты


4999999999990060




130


Превышен допустимый лимит расходов


4999999999990078









290


Банк-издатель недоступен


4999999999990086




291


Техническая или коммуникационная проблема


4999999999990094









401


Ошибка формата


*



402


Ошибки в параметрах Acquirer/Merchant


*



403


Ошибки при соединении с ресурсом платежной системы (DS)


4999999999990102




404


Ошибка аутентификации покупателя


4999999999990110




405


Ошибка подписи


*



501


Транзакция отменена пользователем


*



502


Сессия браузера устарела


*




## Данне которые мы передаем


Все данные передаются POST запросом на адрес [https://secure.upc.ua/ecgtest/en
ter](http://www.google.com/url?q=https%3A%2F%2Fsecure.upc.ua%2Fecgtest%2Fenter
&sa=D&sntz=1&usg=AFQjCNHfqWTMoGCDVDC3A6kFmxWhrEz3_w)




Параметр


Название (назначение)


Комментарий




Version


Значение версии интерфейса SG


Версия протокола взаимодействия. Действующая версия в данный момент – 1ю


Этот параметр является справочным для обработчика взодных данных шлюза.




MerchantID


Идентификатор торговца


Выдается при регистрации




TerminalID


Идентификатор терминала


Выдается при регистрации, завязан на кокнретный сайт




TotalAmount


Сумма заказа


В мелких единицах валюты (копейки, центы)




Currency


Валюта


Определяется договором с обслуживающим банком


643 руб.


840 у.е.


978 eur.


980 грн.




AltTotalAmount (опционально)


Сумма заказа (альтернативная валюта)





AltCurrency (опционально)


Альтернативная Валюта





PurchaseTime


Время запроса в формате


yyMMddHHmmss


или


yyMMddHHmmssZ


100921113510


Или


100921113510+0300


Если зона не указана используется та же что и у шлюза




locale


Язык интерфейса (en, ru, uk)


Язык страницы шлюза




OrderID


Номер заказа длиной до 20 байт





SD (опционально)


Session Data – данные сессии





PurchaseDesc (опционально)


Краткое описание покупки товара (utf-8)





Signature


Значение сгенерированной сигнатуры


См. примечание




Delay


Идентификатор платежа пре-авторизация


Для преавторизации, значение должно быть равно 1, иначе 0 или пусто


Хз, что это за хрень для работы не нужно





Примечание: Генерация сигнатуры

    
    <code><?php
    $MerchantID = '1753019';
    $TerminalID = 'E7881019';
    $OrderID = 19;
    $PurchaseTime = date("ymdHis") ;
    $TotalAmount = 242;
    $CurrencyID = 980;
    $data = "$MerchantID;$TerminalID;$PurchaseTime;$OrderID;$CurrencyID;$TotalAmount;;";
    $fp = fopen("$MerchantID.pem", "r");
    $priv_key = fread($fp, 8192);
    fclose($fp);
    $pkeyid = openssl_get_privatekey($priv_key);
    openssl_sign( $data , $signature, $pkeyid);
    openssl_free_key($pkeyid);
    $b64sign = base64_encode($signature);
    ?></code>


Данные которые получаем в ответ


Все данные передаются POST на страницу success.php (указаную в шаге 1)




Параметр


Название (назначение)


Комментарий




MerchantID


Идентификатор торговца





TerminalID


Идентификатор терминала





TotalAmount


Сумма заказа





Currency


Валюта





AltTotalAmount (опционально)


Сумма заказа (альтернативная валюта)





AltCurrency (опционально)


Альтернативная Валюта





PurchaseTime


Время запроса в формате


yyMMddHHmmss





OrderID


Номер заказа длиной до 20 байт





XID


Идентификатор транзакции (номер заказа, дополненный до 20 символов)





SD


Session Data – данные сессии





ApprovalCode


Код авторизации хоста





Rrn


Retrieval Reference Number


Уникальный номер транзакции в системе авторизации и расчетов обслуживающего
банка




ProxyPan


4 последние цифры номера карты.


Пример:


499999******0011




TranCode


Код завершения тразакции





Signature



см. примечание




Delay






Email



Email – введенный пользователем на странице шлюза





Примечание:


Проверка данный ответа

    
    <code><?php
    
    $MerchantID = $_POST['MerchantID'];
    $TerminalID = $_POST['TerminalID'];
    $OrderID = $_POST['OrderID'];
    $PurchaseTime = $_POST['PurchaseTime'];
    $TotalAmount = $_POST['TotalAmount'];
    $CurrencyID = $_POST['Currency'];
    $XID = $_POST['XID'];
    $SD = $_POST['SD'];
    $TranCode = $_POST['TranCode'];
    $ApprovalCode = $_POST['ApprovalCode'];
    
    $data = "$MerchantID;$TerminalID;$PurchaseTime;$OrderID;$XID;$CurrencyID;$TotalAmount;$SD;$TranCode;$ApprovalCode;";
    
    echo 'data: '.$data.'<br />';
    
    $signature = $HTTP_POST_VARS["Signature"];
    $signature = base64_decode($signature) ;
    $fp = fopen("test-server.cert", "r");
    $cert = fread($fp, 8192);
    fclose($fp);
    $pubkeyid = openssl_get_publickey($cert);
    
    $ok = openssl_verify($data, $signature, $pubkeyid);
    if ($ok == 1) {
       echo "good";
    } elseif ($ok == 0) {
       echo "bad";
    } else {
       echo "ugly, error checking signature";
    }
    openssl_free_key($pubkeyid);
    ?></code>

