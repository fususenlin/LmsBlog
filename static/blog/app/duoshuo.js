function toggleDuoshuoComments(container, id, url, title){
  if(jQuery(container).has("div").length>0){
    jQuery(container).empty();
    return;
  }
  var el = document.createElement('div');
  el.setAttribute('data-thread-key', id);
  el.setAttribute('data-url', url);
  el.setAttribute('data-title', title);
  DUOSHUO.EmbedThread(el);
  jQuery(container).append(el);
}