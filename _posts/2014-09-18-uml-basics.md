---
layout: post
title: UML basics
tags: [uml]
---

Here is simples ever UML basics

Association
===========


Unidirectional
--------------

One object store other

![Unidirectional Association](http://yuml.me/diagram/scruffy/class/[Car|-engine:Engine]has-[Engine].svg)

    class Engine {}

    class Car {
        /**
        * @var Engine
        */
        protected $engine;
    }


Bidirectional
-------------

Both objects know about each other

![Bidirectional Association](http://yuml.me/diagram/scruffy/class/[Person|-books:Books]has-has[Book|-person:Person].svg)

    class Book {
        /**
        * @var Person
        */
        protected $person;
    }

    class Person {
        /**
        * @var array Books[]
        */
        protected $books;
    }


Composition
-----------

Coupling (dependency) - object not only knowing about its dependency but also creates it. Todays trend is Dependency Injection which expects that all that objects will be passed to constructors or methods (Dependency Association)

![Composition Association](http://yuml.me/diagram/scruffy/class/[Slim|-container:Set|__construct();getContainer()]owns++-[Set].svg)

    class Set {}

    class Slim {
        /**
        * @var Set
        */
        protected $container;

        function __construct() {
            $this->container = new Set();
        }

        // -- OR --

        /**
        * @return Set
        */
        public function getContainer() {
            if ($this->container == null) {
                $this->container = new Set();
            }
            return $this->container;
        }
    }


Aggregation
-----------

Object knows about its children but does not create them, it recieves them through methods and/or constructor

![Aggregation Association](http://yuml.me/diagram/scruffy/class/[Swift_Mailer|-transport:Swift_Transport|__constructor(transport:Swift_Transport);newInstance(transport:Swift_Transport)]has<>-[Swift_Transport].svg)

    class Swift_Transport {}

    class Swift_Mailer {
        /**
        * @var Swift_Transport
        */
        protected $transport;

        /**
        * @param Swift_Transport $transport
        */
        public function __construct(Swift_Transport $transport)
        {
            $this->transport = $transport;
        }

        // -- OR --

        /**
        * @param Swift_Transport $transport ;
        * @return Swift_Mailer
        */
        public static function newInstance(Swift_Transport $transport)
        {
            return new self($transport);
        }
    }


Dependency
==========

One object uses another, but not store it

![Dependency](http://yuml.me/diagram/scruffy/class/[HomeController|indexAction(request:Request)]uses-.->[Request].svg)

    class Request {}

    class HomeController {
        public function indexAction(Request $request) {}
    }


Realization (Implementation)
============================

![Implementation](http://yuml.me/diagram/scruffy/class/[<<LoggerInterface>>]^-.-realizes[ConsoleLogger].svg)

    interface LoggerInterface {}

    class ConsoleLogger implements LoggerInterface {}


Generalization (Inheritance)
============================

![Inheritance](http://yuml.me/diagram/scruffy/class/[Response]^-is a[HttpResponse].svg)

    class Response {}

    class HttpResponse extends Response {}
