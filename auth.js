// Shared Firebase Auth helpers (no design changes)
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

function fillUserInfo(user){
  const nickEl = document.getElementById('userNickname');
  const emailEl = document.getElementById('userEmail');
  const nickname = user.displayName || (user.email ? user.email.split('@')[0] : '讀者');
  if(nickEl) nickEl.textContent = nickname;
  if(emailEl) emailEl.textContent = user.email || '';
  // sync legacy localStorage for old UI logic
  try{
    localStorage.setItem('user', JSON.stringify({ displayName: nickname, email: user.email || '' }));
    localStorage.setItem('loggedIn','true');
  }catch(e){}
}

function bindLogout(){
  const btn = document.getElementById('logoutBtn');
  if(!btn) return;
  btn.addEventListener('click', async (e)=>{
    e.preventDefault();
    try{
      await signOut(auth);
    }catch(e){ console.warn(e); }
    // clean legacy state
    try{ localStorage.clear(); }catch(e){}
    localStorage.removeItem("fire_unlocked");
    window.location.href = "login.html";
  });
}

// Guard: redirect to login if not signed in
function guard(){
  onAuthStateChanged(auth, (user)=>{
    if(!user){
      try{ localStorage.setItem('loggedIn','false'); localStorage.removeItem('user'); }catch(e){}
      if(!location.pathname.endsWith('login.html') && !location.pathname.endsWith('register.html')){
        localStorage.removeItem("fire_unlocked");
    window.location.href = "login.html";
      }
      return;
    }
    fillUserInfo(user);
    bindLogout();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', guard);
} else {
  guard();
}
