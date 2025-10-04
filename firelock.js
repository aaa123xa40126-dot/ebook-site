
// firelock.js — 控制封印是否顯示
(function(){
  function mountOverlay(opts){
    var home = opts && opts.home || 'main.html';
    var unlock = opts && opts.unlock || 'unlock.html';
    var msg = (opts && opts.message) || '燃起心之火者，方能窺見此地的低語。';

    // 若已解鎖則不顯示
    try{
      if(localStorage.getItem('fireUnlocked') === 'true'){ return; }
    }catch(e){ /* 忽略 */ }

    var ov = document.createElement('div');
    ov.className = 'firelock-overlay fl-fade';
    ov.innerHTML = ''
      + '<div class="firelock-stage">'
      + '  <div class="firelock-ring fl-spin-slow"></div>'
      + '  <div class="firelock-ring2 fl-spin-mid"></div>'
      + '  <div class="firelock-chain fl-spin-mid"></div>'
      + '  <div class="firelock-embers fl-embers"></div>'
      + '  <div class="firelock-center">'
      + '    <div class="firelock-title">'+ msg +'</div>'
      + '    <div class="firelock-actions">'
      + '      <a class="firelock-btn" href="'+ home +'">回到首頁購買</a>'
      + '      <a class="firelock-btn" href="'+ unlock +'">輸入火種序號</a>'
      + '    </div>'
      + '  </div>'
      + '</div>';

    document.body.appendChild(ov);
  }

  window.Firelock = {
    init: function(opts){
      if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', function(){ mountOverlay(opts); });
      }else{
        mountOverlay(opts);
      }
    }
  };
})();
