
(function(global){
  function getUser(){
    try{
      const s = localStorage.getItem("user");
      return s ? JSON.parse(s) : null;
    }catch(e){ return null; }
  }
  function isLoggedIn(){
    return localStorage.getItem("loggedIn")==="true" && !!getUser();
  }
  function isBuyer(){
    return localStorage.getItem("isBuyer")==="true";
  }
  function isPaperOwner(){
    return localStorage.getItem("isPaperOwner")==="true";
  }
  function routeGuard(opts){
    const {
      needLogin=false,
      needBuyer=false,
      needPaperOwner=false,
      onBlocked
    } = opts || {};

    if(needLogin && !isLoggedIn()){
      onBlocked && onBlocked("not_logged_in");
      return false;
    }
    if(needBuyer && !isBuyer()){
      onBlocked && onBlocked("not_buyer");
      return false;
    }
    if(needPaperOwner && !isPaperOwner()){
      onBlocked && onBlocked("not_paper_owner");
      return false;
    }
    return true;
  }

  function mountOverlay(state){
    const overlay = document.createElement("div");
    overlay.style.cssText = [
      "position:fixed","inset:0","background:rgba(0,0,0,0.6)",
      "backdrop-filter:blur(3px)","z-index:99999","display:flex",
      "align-items:center","justify-content:center","padding:20px"
    ].join(";");

    const box = document.createElement("div");
    box.style.cssText = [
      "max-width:720px","width:92%","background:#111","color:#eee",
      "border:1px solid #444","border-radius:14px","padding:28px",
      "line-height:1.7","font-family:'標楷體','Times New Roman',serif",
      "text-align:center"
    ].join(";");

    const h = document.createElement("div");
    h.style.cssText = "font-size:1.4rem;margin-bottom:10px;color:#ff8844";
    const p = document.createElement("div");
    p.style.cssText = "white-space:pre-wrap;font-size:1.05rem";

    if(state==="not_logged_in"){
      h.textContent = "這裡的舞台仍然緊閉……";
      const btn = document.createElement("a");
      btn.href = "main.html";
      btn.textContent = "回到首頁登入並購買";
      btn.style.cssText = "display:inline-block;margin-top:12px;border:1px solid #ff8844;padding:8px 14px;border-radius:10px;text-decoration:none;color:#ffbb88";
      p.appendChild(btn);
    }else if(state==="not_buyer"){
      h.textContent = "請您先成為種子的見證者";
      const btn = document.createElement("a");
      btn.href = "main.html";
      btn.textContent = "回到首頁購買";
      btn.style.cssText = "display:inline-block;margin-top:12px;border:1px solid #ff8844;padding:8px 14px;border-radius:10px;text-decoration:none;color:#ffbb88";
      p.appendChild(btn);
    }else if(state==="not_paper_owner"){
      h.textContent = "我是實體書讀者";
      const btn = document.createElement("a");
      btn.href = "witness.html";
      btn.textContent = "前往認證網頁";
      btn.style.cssText = "display:inline-block;margin-top:12px;border:1px solid #ff8844;padding:8px 14px;border-radius:10px;text-decoration:none;color:#ffbb88";
      p.appendChild(btn);
    }

    box.appendChild(h);
    box.appendChild(p);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    return overlay;
  }

  global.Auth = { getUser, isLoggedIn, isBuyer, isPaperOwner, routeGuard, mountOverlay };
})(window);
