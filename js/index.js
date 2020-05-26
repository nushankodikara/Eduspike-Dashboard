function loadMSG(){
  Ammount = 25

  ref3 = firebase.database().ref("Announcements").limitToLast(Ammount)
  ref3.on("value", function(snapshot) {
      document.getElementById("Announcements").innerHTML = ""
      snapshot.forEach(function(subject){
          addAnn(subject)
      });
  })

  loadSub()

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

function addAnn(msg){
    document.getElementById("Announcements").innerHTML += `
    <!-- Card Start -->
    <br>
      <div class="content">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">“`+ msg.val().key +`”</p>
            <a href="#" onclick="RemoveBroad('`+ msg.key +`')" class="button is-danger card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-trash-alt" aria-hidden="true"></i>
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
    document.getElementById("Announcements").style.display = "none"
    document.getElementById("SubjectResources").style.display = "none"
    document.getElementById("DE").className = "is-active"
    document.getElementById("AN").className = ""
    document.getElementById("SR").className = ""
}

function feedback(){
    document.getElementById("DataEntry").style.display = "none"
    document.getElementById("Announcements").style.display = "none"
    document.getElementById("SubjectResources").style.display = "none"
    document.getElementById("DE").className = ""
    document.getElementById("AN").className = ""
    document.getElementById("SR").className = ""
}

function reports(){
    document.getElementById("DataEntry").style.display = "none"
    document.getElementById("Announcements").style.display = "none"
    document.getElementById("SubjectResources").style.display = "none"
    document.getElementById("DE").className = ""
    document.getElementById("AN").className = ""
    document.getElementById("SR").className = ""
}

function announcements(){
  document.getElementById("DataEntry").style.display = "none"
  document.getElementById("Announcements").style.display = ""
  document.getElementById("SubjectResources").style.display = "none"
  document.getElementById("DE").className = ""
  document.getElementById("AN").className = "is-active"
  document.getElementById("SR").className = ""
}

function resources(){
  document.getElementById("DataEntry").style.display = "none"
  document.getElementById("Announcements").style.display = "none"
  document.getElementById("SubjectResources").style.display = ""
  document.getElementById("DE").className = ""
  document.getElementById("AN").className = ""
  document.getElementById("SR").className = "is-active"
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
  countBC()
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
  searchItem = document.getElementsByTagName("tr");
  for (i = 0; i < searchItem.length; i++) {
      title = searchItem[i].getElementsByTagName("td")[0];
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
      msgArr = []
      patArr = []
      document.getElementById("ResourceCount").innerHTML = "0"
      for(property in data.val()){
        DB.ref('Odyssey/' + property).on("value", function(data){
              for(prop in data.val()){
                DB.ref('Odyssey/' + property + "/" + prop).on("value", function(data){
                  for(res in data.val()){
                    addArray(prop + " : " + res, 'Odyssey/' + property + "/" + prop + "/" + res)
                    document.getElementById("ResourceCount").innerText = Number(document.getElementById("ResourceCount").innerText) + 1
                  }
                })
              }
          })
      }
      Addpaginate(50,1)
  })
}

msgArr = []
patArr = []

function addArray(msg,path){
  msgArr.push(msg)
  patArr.push(path)
}

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function Addpaginate(pagesize, page){
  document.getElementById("SubSection").innerHTML = `
  <table id="cardFillSub" class="table is-fullwidth"></table>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <ul id="pages" class="pagination-list">
    </ul>
  </nav>
  `

  pagelenth = (Math.floor(msgArr.length/pagesize)+1).toString()
  pageddata = paginate(msgArr, pagesize, page);
  pagedpath = paginate(patArr, pagesize, page);

  for (var abc=0 ; pagelenth > abc ; abc++ ){
    document.getElementById("pages").innerHTML += `<li class="pagination-link" onclick="Addpaginate(` + pagesize + `, ` + (abc+1) + `)">` + (abc+1) + `</li>`
  }

  for (i in pageddata){
    document.getElementById("cardFillSub").innerHTML += `<tr><td>`+pageddata[i]+`</td><td class="button is-danger" onclick="RemoveSub('`+pagedpath[i]+`')"><i class="fas fa-trash-alt"></i></td></tr>` 
  }
}

function RemoveSub(key){
  if(confirm("Confirm Deletation")){
    report = firebase.database().ref(key)
    report.remove();
    alert("Remove Request Accepted")
  }else {
    alert("Remove Request Declined")
  }
  location.reload();
}

document.getElementById("DataEntry").style.display = "none"
document.getElementById("navBar").style.display = "none"
document.getElementById("Announcements").style.display = "none"
document.getElementById("SubjectResources").style.display = "none"