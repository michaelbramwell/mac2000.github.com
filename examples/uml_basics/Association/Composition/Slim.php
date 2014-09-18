<?php
namespace UML\Basics\Association\Composition;

class Slim
{
    /**
     * @var Set
     */
    protected $container;

    function __construct()
    {
        $this->container = new Set();
    }

    // -- OR --

    /**
     * @return Set
     */
    public function getContainer()
    {
        if ($this->container == null) {
            $this->container = new Set();
        }
        return $this->container;
    }
}
