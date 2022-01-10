const firebaseConfig = {
  apiKey: "AIzaSyD_jiyiZJr03o07fUGdfKOoBOWc81O_E9Q",
  authDomain: "library-561d1.firebaseapp.com",
  databaseURL: "https://library-561d1-default-rtdb.firebaseio.com",
  projectId: "library-561d1",
  storageBucket: "library-561d1.appspot.com",
  messagingSenderId: "120531793762",
  appId: "1:120531793762:web:720d9e687c0a3f5edd1e3b",
};
firebase.initializeApp(firebaseConfig);
let db = firebase.database();

let globalData = null;
db.ref("/aboutUs").on("value", function (snap) {
  let data = snap.val();

  globalData = data;
  console.log(globalData);
  $("#aboutstoreContainer").html(
    `
      <div class=" mb-3 col-12 bg-0">
      <div class="row no-gutters" id="aboutCard">
          <div class="col-md-8" id="aboutCardTextSection">
              <div class="card-body ContentWrappperAboutUs" id="aboutCart-custom">
                  <h5 class="card-title aboutCardh5" id="aboutCardTitle">${globalData.aboutUsTitle}</h5>
                  <p class="card-text aboutCardtext" id="aboutCardText">${globalData.aboutUsDesc}</p>
              </div>
          </div>
          <div class="col-md-4 imgWrappperAboutUs" id="aboutCardImgSection">
            <img id="aboutCardImg" src="${globalData.aboutUsUrl}" alt="...">
          </div>
      </div>
    </div>
    `
  );
});


// ! MODAL start
// let joinButton = $("#joinButton")
$(document).on("click", "#joinButton", function (e) {
  e.preventDefault();
  // var joinBudagi = db.ref("/JoinUsers/")
  var joinName = $("#joinName").val()
  var joinEmail = $("#joinEmail").val()
  if (!($("#joinName").val())) {
    $("#alertJoinFirst").removeClass("d-none")
    setTimeout(() => alertSettimeoutFunc(), 1500);
    function alertSettimeoutFunc() {
      $("#alertJoinFirst").addClass("d-none")
    }
  }
  // else{
  //   pushJoinDB(joinName,joinEmail)
  // }
  if (!($("#joinEmail").val())) {
    $("#alertJoinSecond").removeClass("d-none")
    setTimeout(() => alertSettimeoutFunc(), 1500);
    function alertSettimeoutFunc() {
      $("#alertJoinSecond").addClass("d-none")
    }
  }
  // else{
  //   pushJoinDB(joinName,joinEmail)
  // }
  console.log(joinName, joinEmail)
  if (($("#joinName").val()) && ($("#joinEmail").val())) {
    pushJoinDB(joinName, joinEmail)
      ($("#joinName").val(""))
      ($("#joinEmail").val(""))
  }
});
function pushJoinDB(joinName, joinEmail) {
  db.ref("/JoinUsers/").push().set({
    joinName, joinEmail
  })
  $("#joinName").val("")
  $("#joinEmail").val("")
}
var global = null
db.ref("/JoinUsers/").on("value", function (snap) {
  var snapVal = snap.val()
  var snapArray = Object.entries(snapVal).map((q) => {
    for (i in q) {
      snapObject = {
        id: q[0],
        ...q[1]
      }
    }
    return snapObject
  })
  global = snapArray
  tBodyJoin = $("#tBodyJoin")
  $("#tBodyJoin").html(
    global.map((q, i) => {
      // console.log(q)
      return `
                                <tr>
                                  <th scope="row">${i + 1}</th>
                                  <td>${q.joinName}</td>
                                  <td>${q.joinEmail}</td>
                                </tr>
          `
    })
  )
})
// ! MODAL end


// HEADER SECTION STARTED
document.getElementById("headerHamburgerWrapper").addEventListener("click", function () {
  document.body.classList.toggle("openMenu")
})
// HEADER SECTION END

/* BTN TOP STARTED */
var mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
topFunction();
/* BTN TOP END */