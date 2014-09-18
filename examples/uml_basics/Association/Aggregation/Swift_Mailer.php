<?php
namespace UML\Basics\Association\Aggregation;

class Swift_Mailer
{
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
