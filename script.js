// EASY SETTINGS — CHANGE ONLY THESE
const currentStatus = 1; // 1=online, 2=updates, 0=offline
const serverUpSince = "Monday 15:30"; // ← Change day + time here

// Days starting Monday
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// Live clock with day
setInterval(() => {
    const n = new Date();
    const day = days[(n.getDay() + 6) % 7];
    const t = n.toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit',hour12:false});
    document.getElementById('currentTime').textContent = `${day} ${t}`;
}, 1000);

// Online since
document.getElementById('upSince').textContent = serverUpSince;

// Status circle
const circle = document.getElementById('statusCircle');
const txt = document.getElementById('statusText');
if(currentStatus===1){
    circle.style.cssText="background:radial-gradient(circle,#00ff00,#008800);box-shadow:0 0 90px #00ff00";
    txt.innerHTML='Server is <span style="color:#0f0">ONLINE</span>';
}else if(currentStatus===2){
    circle.style.cssText="background:radial-gradient(circle,#ffff00,#cccc00);box-shadow:0 0 90px #ffff00";
    txt.innerHTML='Server is <span style="color:#ff0">UPDATING</span>';
}else{
    circle.style.cssText="background:radial-gradient(circle,#ff0000,#aa0000);box-shadow:0 0 90px #ff0000";
    txt.innerHTML='Server is <span style="color:#f00">OFFLINE</span>';
}

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click',()=>{
    document.body.classList.toggle('light-theme');
    this.innerHTML = document.body.classList.contains('light-theme') 
        ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Music Panel Toggle
document.getElementById('musicToggle').addEventListener('click',()=>{
    document.getElementById('musicPanel').classList.toggle('hidden');
});

// Volume Slider
document.getElementById('volumeSlider').addEventListener('input', (e)=>{
    const vol = e.target.value;
    document.querySelector('iframe').contentWindow.postMessage(
        `{"event":"command","func":"setVolume","args":[${vol}]}`, '*');
});

// APPLICATION FORMS (staff + whitelist)
if(document.getElementById('staffForm')){
    document.getElementById('staffForm').onsubmit = function(e){
        e.preventDefault();
        let apps = JSON.parse(localStorage.getItem("staffApps")|| "[]");
        apps.push({
            ign:this[0].value, age:this[1].value, discord:this[2].value,
            why:this[3].value, exp:this[4].value, time:new Date().toLocaleString()
        });
        localStorage.setItem("staffApps", JSON.stringify(apps));
        alert("Staff application sent!");
        this.reset();
    };
}
if(document.getElementById('whitelistForm')){
    document.getElementById('whitelistForm').onsubmit = function(e){
        e.preventDefault();
        let apps = JSON.parse(localStorage.getItem("whitelistApps")|| "[]");
        apps.push({
            ign:this[0].value, age:this[1].value, discord:this[2].value,
            why:this[3].value, time:new Date().toLocaleString()
        });
        localStorage.setItem("whitelistApps", JSON.stringify(apps));
        alert("Whitelist application sent!");
        this.reset();
    };
}


