function loadMSG(){
  Ammount = 25
  ref1 = firebase.database().ref("Feedbacks").limitToLast(Ammount)
  ref1.on("value", function(snapshot) {
      document.getElementById("Feedbacks").innerHTML = ""
      snapshot.forEach(function(Feedbacks){
          addFeedback(Feedbacks)
      });
  })

  ref2 = firebase.database().ref("Reports").limitToLast(Ammount)
  ref2.on("value", function(snapshot) {
      document.getElementById("Reports").innerHTML = ""
      snapshot.forEach(function(Reports){
          addReport(Reports)
      });
  })

  ref3 = firebase.database().ref("Announcements").limitToLast(Ammount)
  ref3.on("value", function(snapshot) {
      document.getElementById("Announcements").innerHTML = ""
      snapshot.forEach(function(subject){
          addAnn(subject)
      });
  })

}

function countAll(){
  countBC()
  countFeedback()
  countReports()
}

function countFeedback(){
  counter = firebase.database().ref("Feedbacks")
  counter.on("value", function(snapshot) {
      document.getElementById("Feedcount").innerText = 0
      snapshot.forEach(function(rep){
        document.getElementById("Feedcount").innerText = Number(document.getElementById("Feedcount").innerText) + 1
      });
  })
}

function countReports(){
  counter = firebase.database().ref("Reports")
  counter.on("value", function(snapshot) {
      document.getElementById("Reportcount").innerText = 0
      snapshot.forEach(function(rep){
        document.getElementById("Reportcount").innerText = Number(document.getElementById("Reportcount").innerText) + 1
      });
  })
}

function countBC(){
  counter = firebase.database().ref("Announcements")
  counter.on("value", function(snapshot) {
      document.getElementById("BroadcastCount").innerText = 0
      snapshot.forEach(function(rep){
        document.getElementById("BroadcastCount").innerText = Number(document.getElementById("BroadcastCount").innerText) + 1
      });
  })
}

function addReport(msg){
    document.getElementById("Reports").innerHTML += `
    <!-- Card Start -->
    <br>
      <div class="content">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              “`+ msg.val().key +`”
            </p>
            <a href="#" onclick="RemoveReport('`+ msg.key +`')" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="far fa-times-circle" aria-hidden="true"></i>
              </span>
            </a>  
          </div>
        </div>
      </div>
    <!-- Card End -->
    `
}

function addFeedback(msg){
  document.getElementById("Feedbacks").innerHTML += `
  <!-- Card Start -->
  <br>
    <div class="content">
      <div class="card">
        <div class="card-content">
          <p class="title is-5">
            “`+ msg.val().key +`”
          </p>
        </div>
      </div>
    </div>
  <!-- Card End -->
  `
}

function addAnn(msg){
    document.getElementById("Announcements").innerHTML += `
    <!-- Card Start -->
    <br>
      <div class="content">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              “`+ msg.val().key +`”
            </p>
            <a href="#" onclick="RemoveBroad('`+ msg.key +`')" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="far fa-times-circle" aria-hidden="true"></i>
              </span>
            </a>  
          </div>
        </div>
      </div>
    <!-- Card End -->
    `
}

function RemoveReport(ref){
  if(confirm("Confirm Deletation")){
    report = firebase.database().ref("Reports/" + ref)
    report.remove();
    alert("Remove Request Accepted")
  }else {
    alert("Remove Request Declined")
  }
}

function RemoveBroad(ref){
  if(confirm("Confirm Deletation")){
    BC = firebase.database().ref("Announcements/" + ref)
    BC.remove();
    alert("Remove Request Accepted")
  }else {
    alert("Remove Request Declined")
  }
}

function init(){
    document.getElementById("DataEntry").style.display = ""
    document.getElementById("Feedbacks").style.display = "none"
    document.getElementById("Reports").style.display = "none"
    document.getElementById("Announcements").style.display = "none"
    document.getElementById("SubjectResources").style.display = "none"
    document.getElementById("DE").className = "is-active"
    document.getElementById("FB").className = ""
    document.getElementById("RE").className = ""
    document.getElementById("AN").className = ""
    document.getElementById("SR").className = ""
}

function feedback(){
    document.getElementById("DataEntry").style.display = "none"
    document.getElementById("Feedbacks").style.display = ""
    document.getElementById("Reports").style.display = "none"
    document.getElementById("Announcements").style.display = "none"
    document.getElementById("SubjectResources").style.display = "none"
    document.getElementById("DE").className = ""
    document.getElementById("FB").className = "is-active"
    document.getElementById("RE").className = ""
    document.getElementById("AN").className = ""
    document.getElementById("SR").className = ""
}

function reports(){
    document.getElementById("DataEntry").style.display = "none"
    document.getElementById("Feedbacks").style.display = "none"
    document.getElementById("Reports").style.display = ""
    document.getElementById("Announcements").style.display = "none"
    document.getElementById("SubjectResources").style.display = "none"
    document.getElementById("DE").className = ""
    document.getElementById("FB").className = ""
    document.getElementById("RE").className = "is-active"
    document.getElementById("AN").className = ""
    document.getElementById("SR").className = ""
}

function announcements(){
  document.getElementById("DataEntry").style.display = "none"
  document.getElementById("Feedbacks").style.display = "none"
  document.getElementById("Reports").style.display = "none"
  document.getElementById("Announcements").style.display = ""
  document.getElementById("SubjectResources").style.display = "none"
  document.getElementById("DE").className = ""
  document.getElementById("FB").className = ""
  document.getElementById("RE").className = ""
  document.getElementById("AN").className = "is-active"
  document.getElementById("SR").className = ""
}

function resources(){
  document.getElementById("DataEntry").style.display = "none"
  document.getElementById("Feedbacks").style.display = "none"
  document.getElementById("Reports").style.display = "none"
  document.getElementById("Announcements").style.display = "none"
  document.getElementById("SubjectResources").style.display = ""
  document.getElementById("DE").className = ""
  document.getElementById("FB").className = ""
  document.getElementById("RE").className = ""
  document.getElementById("AN").className = ""
  document.getElementById("SR").className = "is-active"
  loadSub()
}

function postData(){
  SUB = document.getElementById("SUB").value.replace(/\s+/g,' ').trim()
  RES = document.getElementById("RES").value.replace(/\s+/g,' ').trim()
  TYP = document.getElementById("TYP").value.replace(/\s+/g,' ').trim()
  DES = document.getElementById("DES").value.replace(/\s+/g,' ').trim()
  LIN = document.getElementById("LIN").value.replace(/\s+/g,' ').trim()
  wrightResources(SUB, RES, TYP, DES, LIN)
}

function postCred(){
  CNAM = document.getElementById("CNAM").value.replace(/\s+/g,' ').trim().toUpperCase()
  CSUB = document.getElementById("CSUB").value.replace(/\s+/g,' ').trim().toUpperCase()
  CLIN = document.getElementById("CLIN").value.replace(/\s+/g,' ').trim()
  writeDB("Creditors/" + CSUB + "/" + CNAM, "SN", CLIN)
  alert("Creditro Added Successfully")
}

function broadcast(){
  BRDC = document.getElementById("BRDC").value.replace(/\s+/g,' ').trim()
  pushDB("Announcements/", BRDC)
  alert("Announcement Sent Successfully")
}

function login(){
  var email = document.getElementById("EMA").value
  var passw = document.getElementById("PAS").value
  var autho = 1
  firebase.auth().signInWithEmailAndPassword(email.toString(), passw.toString()).catch(function(error){
      autho = 0
  })
  firebase.auth().onAuthStateChanged(user => {
      if(autho === 1){
        hideLogin()
      }else{
        alert("Please Login Again")
      }
  })
}

function hideLogin(){
  document.getElementById("TitleBar").innerHTML = "Welcome Administrator"
  document.getElementById("navBar").style.display = ""
  init()
  loadMSG()
  countAll()
}

function wrightResources(SUB, RES, TYP, DES, LIN) {
  d = new Date()
  date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear()
  firebase.database().ref( ("Odyssey/" + SUB.toLowerCase() + "/" + TYP + "/" + RES.toUpperCase() + "/") ).set({
    "link": LIN,
    "description": DES,
    "date": date
  });
}

function pushDB(path,value){
  firebase.database().ref(path + "/" ).push({
      key: value
  });
}

function writeDB(path,key,value){
  firebase.database().ref(path + "/" + key).set({
      key: value
  });
}

function searchQue(){
  input = document.getElementById("searchString");
  que = input.value.toUpperCase();
  mainContainer = document.getElementById("cardFillSub");
  searchItem = document.getElementsByTagName("card");
  for (i = 0; i < searchItem.length; i++) {
      title = searchItem[i].getElementsByTagName("p")[0];
      txtValue = title.textContent || title.innerText;
      if (txtValue.toUpperCase().indexOf(que) > -1) {
          searchItem[i].style.display = "";
      } else {
          searchItem[i].style.display = "none";
      }
  }
}

//populate Resources
function loadSub(){
  DB = firebase.database()
  DB.ref('Odyssey').on("value", function(data){
      document.getElementById("cardFillSub").innerHTML = ""
      document.getElementById("ResourceCount").innerHTML = "0"
      for(property in data.val()){
        DB.ref('Odyssey/' + property).on("value", function(data){
              for(prop in data.val()){
                DB.ref('Odyssey/' + property + "/" + prop).on("value", function(data){
                  for(res in data.val()){
                    addSub(res, 'Odyssey/' + property + "/" + prop + "/" + res)
                    document.getElementById("ResourceCount").innerText = Number(document.getElementById("ResourceCount").innerText) + 1
                  }
                })
              }
          })
      }
  })
}

function addSub(msg, path){
  document.getElementById("cardFillSub").innerHTML += `
  <!-- Card Start -->
  <card><br>
    <div class="content">
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">
            “`+ msg +`”
          </p>
          <a href="#" onclick="RemoveSub('`+ path +`')" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="far fa-times-circle" aria-hidden="true"></i>
            </span>
          </a>  
        </div>
      </div>
    </div>
  </card>
  <!-- Card End -->
  `
}

function RemoveSub(key){
  if(confirm("Confirm Deletation")){
    report = firebase.database().ref(key)
    report.remove();
    alert("Remove Request Accepted")
  }else {
    alert("Remove Request Declined")
  }
}

document.getElementById("DataEntry").style.display = "none"
document.getElementById("Feedbacks").style.display = "none"
document.getElementById("Reports").style.display = "none"
document.getElementById("navBar").style.display = "none"
document.getElementById("Announcements").style.display = "none"
document.getElementById("SubjectResources").style.display = "none"