---
layout: post
title: Zend Partial
permalink: /183
tags: [mvc, php, zend]
----

[http://framework.zend.com/manual/ru/zend.view.helpers.html](http://framework.
zend.com/manual/ru/zend.view.helpers.html)



Controller (controllers/IndexController.php)

    
    <code>class IndexController extends Zend_Controller_Action {
    
    	public function indexAction() {
        	$cache = Zend_Controller_Front::getInstance()
                        		->getParam('bootstrap')
                        	->getPluginResource('cachemanager')
                        	->getCacheManager()
                        	->getCache('file');
    
        		if (!($actors = $cache->load('ALL_ACTORS'))) {
            	$actors_db = new Application_Model_Actor();
            	$actors = $actors_db->fetchAll($actors_db->select());
            	$cache->save($actors, 'ALL_ACTORS');
        	}
    
        		$this->view->actors = $actors;
    	}
    }</code>


View (views/scripts/index/index.phtml)

    
    <code><?php echo $this->partial('partials/all_actors_table.phtml', array('actors' => $this->actors) )?></code>


Partial View (views/scripts/partials/all_actors_table.phtml)

    
    <code><table>
    	<?php echo $this->partial('partials/all_actors_th.phtml')?>
    	<?php echo $this->partialLoop('partials/all_actors_tr.phtml', $this->actors)?>
    </table></code>


Partial View (views/scripts/partials/all_actors_th.phtml)

    
    <code><tr>
    	<th>#</th>
    	<th>First name</th>
    	<th>Last name</th>
    </tr></code>


Partial View (views/scripts/partials/all_actors_tr.phtml)

    
    <code><tr>
    	<td><?php echo $this->escape($this->actor_id) ?></td>
    	<td><?php echo $this->escape($this->first_name) ?></td>
    	<td><?php echo $this->escape($this->last_name) ?></td>
    </tr></code>

