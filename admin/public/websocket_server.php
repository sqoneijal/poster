<?php

error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

// Make sure composer dependencies have been installed
require_once __DIR__ . '/../vendor/autoload.php';

/**
 * chat.php
 * Send any incoming messages to all connected clients (except sender)
 */
class Event implements MessageComponentInterface
{
   protected $clients;

   public function __construct()
   {
      $this->clients = new \SplObjectStorage;
   }

   public function onOpen(ConnectionInterface $conn)
   {
      $this->clients->attach($conn);
   }

   public function onMessage(ConnectionInterface $from, $msg)
   {
      foreach ($this->clients as $client) {
         if ($from != $client) {
            $client->send($msg);
         }
      }
   }

   public function onClose(ConnectionInterface $conn)
   {
      $this->clients->detach($conn);
   }

   public function onError(ConnectionInterface $conn, \Exception $e)
   {
      $conn->close();
   }
}

// Run the server application through the WebSocket protocol on port 8080
$app = new Ratchet\App('localhost', 8888);
$app->route('/', new Event, array('*'));
$app->run();
