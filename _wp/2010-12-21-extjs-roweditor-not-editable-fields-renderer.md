---
layout: post
title: ExtJS RowEditor not editable fields renderer
permalink: /214
tags: [extjs, javascript]
----

RowEditor  не использует рендерер таблицы, а вызывает Ext.form.DisplayField,
для  того чтобы исправить ситуацию, необходимо изменить метод startEditing в
файле RowEditor.js

    
    <code>startEditing: function(rowIndex, doFocus) {
        --//--
               for(var i = 0, len = cm.getColumnCount(); i < len; i++) {
    
    val = this.preEditValue(record, cm.getDataIndex(i));
    
    f = fields[i];
    
    /////////////////////////////////////////////////////
    
    var column = cm.getColumnById(cm.getColumnId(i));                
    
                   ed = column.getEditor();
    
    if(!ed){
                  val = column.renderer.call(column, val, {}, record);
              }
    
    /////////////////////////////////////////////////////
    
    f.setValue(val);
    
    this.values[f.id] = Ext.isEmpty(val) ? '' : val;
               }
               --//--
    }</code>


так же для того чтобы не вылазило боков при редактировании необходимо
подправить метод stopEditing

    
    <code>stopEditing : function(saveChanges){
        --//--
           for(var i = 0, len = cm.getColumnCount(); i < len; i++){
    
    /////////////////////////////////////////////////////
    
    var column = cm.getColumnById(cm.getColumnId(i));                
    
    ed = column.getEditor();            
    
    if(!cm.isHidden(i) && ed){
    
    /////////////////////////////////////////////////////
    
    //if(!cm.isHidden(i)){
    
    var dindex = cm.getDataIndex(i);
    
    if(!Ext.isEmpty(dindex)){
                --//--
    }</code>

