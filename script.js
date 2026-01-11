function toggleTheme(){
  document.body.dataset.theme =
    document.body.dataset.theme==="light"?"dark":"light";
}

/* ADMIN ACCESS */
const ADMIN_PASSKEY="alexshee@2026";
let isAdmin=false;

document.addEventListener("keydown",e=>{
  if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()==="a"){
    const pass=prompt("Enter admin passkey:");
    if(pass===ADMIN_PASSKEY){
      isAdmin=true;
      document.getElementById("adminPanel").style.display="block";
      renderJobs();
      alert("Admin access granted");
    }else alert("Wrong passkey");
  }
});

/* JOB SYSTEM */
let jobs=JSON.parse(localStorage.getItem("jobs"))||[];

function renderJobs(){
  const list=document.getElementById("jobList");
  list.innerHTML="";
  jobs.forEach((job,i)=>{
    list.innerHTML+=`
      <div class="job">
        <img src="${job.image}">
        <div>
          <h3>${job.title}</h3>
          <p>${job.desc}</p>
          ${isAdmin?`<button onclick="deleteJob(${i})">Delete</button>`:""}
        </div>
      </div>`;
  });
}

function addJob(){
  const reader=new FileReader();
  reader.onload=()=>{
    jobs.push({
      title:jobTitle.value,
      desc:jobDesc.value,
      image:reader.result
    });
    localStorage.setItem("jobs",JSON.stringify(jobs));
    renderJobs();
    jobTitle.value="";jobDesc.value="";jobImage.value="";
  };
  reader.readAsDataURL(jobImage.files[0]);
}

function deleteJob(i){
  if(confirm("Delete this job?")){
    jobs.splice(i,1);
    localStorage.setItem("jobs",JSON.stringify(jobs));
    renderJobs();
  }
}

renderJobs();
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}
let touchStartY = 0;

document.addEventListener("touchstart", e => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let touchEndY = e.changedTouches[0].clientY;

  if (touchEndY - touchStartY > 150) {
    const pass = prompt("Enter admin passkey:");
    if (pass === "admin123") {
      document.querySelector(".admin").style.display = "block";
      document.querySelector(".admin").scrollIntoView({ behavior: "smooth" });
    }
  }
});
