
// MENU CLIKED start

var hamburger = document.getElementById("hamburger");
var clikedFunctionFirst1 = document.getElementById("clikedFunctionFirst1")
var clikedFunctionFirst2 = document.getElementById("clikedFunctionFirst2")
hamburger.addEventListener("click",function(){
  document.body.classList.add("OpenMenuSTART")
  clikedFunctionFirst1.classList.add("opavisib")
  clikedFunctionFirst2.classList.add("opavisib")
})
var closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click",function(){
  document.body.classList.remove("OpenMenuSTART")
})
$(document).on("click", ".customNavMblink", function () {
  $("body").removeClass("OpenMenuSTART")
});




// MENU CLIKED end

$(document).ready(function () {
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
  // $(document).on("click", ".btn-custom", function (e) {
  //   e.preventDefault();
  //   setTimeout(() => {
  //     $(".result-section").removeClass("d-none");
  //   }, 3000);
  //   inputData = $(".input-custom").val();
  //   console.log(inputData);
  //   getBooks(inputData);
  // });

  $(document).on("keyup", ".input-custom", function (e) {
    let inputData = e.target.value;
    console.log(inputData.length);
    if (inputData.length < 3) {
      $(".spinner-custom").removeClass("d-none");
    }
    if (inputData.length > 3) {
      $(".result-section").removeClass("d-none");
      console.log(inputData);
      getBooks(inputData);
    } else if (inputData.length < 3) {
      $(".result-section").addClass("d-none");
    }
  });

  function getBooks(data) {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://goodreads-books.p.rapidapi.com/search?q=${data}&page=1`,
      data,
      method: "GET",
      headers: {
        "x-rapidapi-host": "goodreads-books.p.rapidapi.com",
        "x-rapidapi-key": "9d9588302emsh58804fa5a30d4d9p1b947ajsn659ea6ae2269",
      },
    };

    $.ajax(settings).then((response) => {
      console.log(response);
      if (!response) {
        $(".spinner-custom").removeClass("d-none");
      }
      $(".result-section").html(
        response.map((book) => {
          return `
              <div class="result-div d-flex">
                <img class="result-logo" src="./photos/clock.svg" alt="">
                <div data-book="${book.title}" class="result-name">${book.title}</div>
              </div>
              `;
        })
      );
    });

    $(document).on("click", ".result-name", function () {
      $(".input-custom").val("");
      let value = $(this).data("book");
      $(".result-section").addClass("d-none");
      console.log(value);
      setBooks(value);
    });
  }

  function setBooks(bookdata) {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://goodreads-books.p.rapidapi.com/search?q=${bookdata}`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "goodreads-books.p.rapidapi.com",
        "x-rapidapi-key": "9d9588302emsh58804fa5a30d4d9p1b947ajsn659ea6ae2269",
      },
    };
    $.ajax(settings).then((response) => {
      console.log(response);
      for (var i in response) {
        if (bookdata == response[i].title) {
          $("#bookName").attr("value", `${response[i].title}`);
          $("#authorName").attr("value", `${response[i].author}`);
          $("#publishYear").attr("value", `${response[i].publicationYear}`);
          $("#bookUrl").attr("value", `${response[i].url}`);
        }
      }
    });
  }

  $(document).on("click", ".dropdown-button", function (e) {
    e.preventDefault();
    let inputData = $(".dropdown-input").val();
    setBookTypeDb(inputData);
  });

  function setBookTypeDb(inputData) {
    db.ref("/bookType").push().set({
      inputData,
    });
  }
  let globalData = null;
  db.ref("/bookType").on("value", function (snap) {
    let data = snap.val();
    let newArray = Object.entries(data).map((littleArray) => {
      for (i in littleArray) {
        newObject = {
          id: littleArray[0],
          ...littleArray[1],
        };
      }
      return newObject;
    });
    globalData = newArray;
    console.log(globalData);
    $(".book-input-custom").html(
      globalData.map((data) => {
        console.log(data.inputData);
        return `
        <option>${data.inputData}</option>
        `;
      })
    );
  });

  $(document).on("click", "#form-btn-custom", function (e) {
    // e.preventDefault()
    let bookName = $("#bookName").val()
    let authorName = $("#authorName").val()
    let publishYear = $("#publishYear").val()
    let bookUrl = $("#bookUrl").val()
    let bookDesc = $("#bookDesc").val()
    let formNew = $("#form-check-custom").is(":checked");
    let bookType = $("#bookType").val()

    let bookData = {
      bookName,
      authorName,
      publishYear,
      bookUrl,
      bookDesc,
      formNew,
      bookType,
    }

    db.ref("/bookList").push().set(bookData)
    // $("#bookName").val("")
    // $("#authorName").val("")
    // $("#bookUrl").val("")
    // $("#bookDesc").val("")
    // $("#check-btn").is(":not(:checked)");
    // $("#bookType").val("")
  })

 // =============================================ABOUT US START=============================================

 db.ref("/aboutUs/").once("value", snap => {
  let aboutTitle = snap.val().aboutUsTitle
  let aboutUrl = snap.val().aboutUsUrl
  let aboutDesc = snap.val().aboutUsDesc
  console.log(aboutTitle);
  $("#aboutUsTitle").attr("value", aboutTitle)
  $("#aboutUsUrl").attr("value", aboutUrl)
  $("#aboutUsDesc").text(aboutDesc)
})

$("#aboutUsBtn").on("click", function (e) {
  e.preventDefault();
  let aboutUsTitle = document.querySelector("#aboutUsTitle").value.trim();
  let aboutUsUrl = document.querySelector("#aboutUsUrl").value.trim();
  let aboutUsDesc = document.querySelector("#aboutUsDesc").value.trim();

  if (aboutUsTitle == "" || aboutUsUrl == "" || aboutUsDesc == "") {
    alert("Xanaları düzgün doldurun")
  } else {
    db.ref("/aboutUs/").set({
      aboutUsTitle,
      aboutUsUrl,
      aboutUsDesc
    })
    alert("Məlumatlar daxil edildi")
  }

})


// =============================================ABOUT US END=============================================

  var signInBtn = document.getElementById("signInBtn")
  var adminPanelDashboard = $("#adminPanelDashboard");
  var adminPanelSignIn = $("#adminPanelSignIn");
  
  if (localStorage.getItem('pa') == localStorage.getItem('yourPass') && localStorage.getItem('ad') == localStorage.getItem("yourName")) {
    adminPanelSignIn.css("display", "none")
    adminPanelDashboard.css("display", "block")
  } if (localStorage.getItem("pa") === null) {
    adminPanelSignIn.css("display", "block")
    adminPanelDashboard.css("display", "none")
  }
  
  console.log(localStorage);
  
  $(document).on("click", "#buttonxx", function () {
    localStorage.clear()
    location.reload()
  })
  
  $(document).on('click', '#signInBtn', function () {
    var userNameb = document.querySelector("#userName").value;
    var passworda = document.querySelector("#password").value;
    var alertSingIn = $("#alertSingIn");
    let UserBudagi = db.ref("/admin/");
  
    let userNameLocal = localStorage.setItem("yourName", userNameb)
    let userPassLocal = localStorage.setItem("yourPass", passworda)
  
    //   first = a
    UserBudagi.once("value", function (snap) {
      var l = snap.val().password;
      var t = snap.val().userName;
  
      console.log(userNameb);
      console.log(passworda);
      console.log(l);
      console.log(t);
      // function asd(){
      if (userNameb == t && passworda == l) {
        localStorage.setItem('pa', snap.val().password);
        localStorage.setItem('ad', snap.val().userName);
        adminPanelSignIn.css("display", "none")
        $(".loader").removeClass("d-none")
        function loadingbarFunc() {
          adminPanelDashboard.css("display", "block")
          $(".loader").addClass("d-none")
        }
        dd();
      }
      else {
        alertSingIn.removeClass("d-none")
        alertSingIn.addClass("d-block")
      }
      setTimeout(() => loadingbarFunc(), 1500);
  
      // second = b
      function dd() {
        if (localStorage.getItem('ad') == userNameLocal || localStorage.getItem('pa') == userPassLocal) {
          adminPanelSignIn.css("display", "none")
          adminPanelDashboard.css("display", "block")
        }
      }
    })
  })
  



  /** Table js */
  //   ! Join
  let joinButton = $("#joinButton")
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
      // ($("#joinName").val(""))
      // ($("#joinEmail").val(""))
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

  //   ? Contact US
  let contactButton = $("#contactButton")
  $(document).on("click", "#contactButton", function (e) {
    e.preventDefault();
    // var contactBudagi = db.ref("/ContactUs/")
    var contactName = $("#contactName").val()
    var contactEmail = $("#contactEmail").val()
    var contactAddress = $("#contactAddress").val()
    var contactPhone = $("#contactPhone").val()
    if (!($("#contactName").val())) {
      $("#alertContact1").removeClass("d-none")
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertContact1").addClass("d-none")
      }
    }
    if (!($("#contactEmail").val())) {
      $("#alertContact2").removeClass("d-none")
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertContact2").addClass("d-none")
      }
    }
    if (!($("#contactAddress").val())) {
      $("#alertContact3").removeClass("d-none")
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertContact3").addClass("d-none")
      }
    }
    if (!($("#contactPhone").val())) {
      $("#alertContact4").removeClass("d-none")
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertContact4").addClass("d-none")
      }
    }
    if (($("#contactName").val()) && ($("#contactEmail").val()) && ($("#contactAddress").val()) && ($("#contactPhone").val())) {
      pushContactDB(contactName, contactEmail, contactAddress, contactPhone)
    }
  });
  function pushContactDB(contactName, contactEmail, contactAddress, contactPhone) {
    db.ref("/ContactUs/").push().set({
      contactName, contactEmail, contactAddress, contactPhone
    })
    $("#contactName").val("")
    $("#contactEmail").val("")
    $("#contactAddress").val("")
    $("#contactPhone").val("")
  }
  db.ref("/ContactUs/").on("value", function (snap) {
    var snapVal = snap.val()
    var snapArray = Object.entries(snapVal).map((q) => {
      // for(i=0;i<q.length;i++){
      snapObject = {
        id: q[0],
        ...q[1]
      }
      // }
      return snapObject
    })
    console.log(snapArray)
    tBodyContactUs = $("#tBodyContactUs")
    console.log(tBodyContactUs)
    tBodyContactUs.html(
      snapArray.map((q, i) => {
        // console.log(q)
        return `
                          <tr>
                              <th scope="row">${i + 1}</th>
                              <td>${q.contactName}</td>
                              <td>${q.contactAddress}</td>
                              <td>${q.contactEmail}</td>
                              <td>${q.contactPhone}</td>
                          </tr>
        `
      })
    )
  })
});


$("")


// var customNavMblink = document.querySelector(".customNavMblink")
// customNavMblink.addEventListener("click",function(){
//   document.body.classList.remove("OpenMenuSTART")
// })


