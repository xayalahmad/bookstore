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

  $(document).on("click", "#searchDiv-btn", function (e) {
    e.preventDefault();
    $("#leftSlick").removeClass("d-none");
    $("#rightSlick").removeClass("d-none");
    let inputData = $("#searchDiv-input").val();
    console.log(inputData);
    getFilteredBooks(inputData);
  });

  let globalData = null;
  function getFilteredBooks(databook) {
    $(".your-class").removeClass("slick-initialized");
    db.ref("/bookList").on("value", function (snap) {
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
      let lowerDatabook = databook.toLowerCase();
      const filteredBooks = globalData.filter((item) =>
        item.bookName.toLowerCase().includes(lowerDatabook)
      );
      console.log(filteredBooks);
      $(".your-class").html(
        filteredBooks.map((book) => {
          return `
            <div>
                  <div class="bookContentSlick d-flex justify-content-lg-between">
                      <div class="bookContentImage ">
                        <img src="${book.bookUrl}" style="width: 220px;" alt="">
                      </div>
                      <div class="bookContent">
                        <div class="bookContent-title">${book.bookName}</div>
                        <div class="bookContent-author">${book.authorName}</div>
                        <p class="bookContent-para">${book.bookDesc}</p>
                      </div>
                  </div>
            </div>
            `;
        })
      );
      $(".your-class")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          autoplaySpeed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
          // centerMode: true,
          prevArrow: $("#leftSlick"),
          nextArrow: $("#rightSlick"),
        });
    });
  }

  let joinButton = $("#joinButton");
  $(document).on("click", "#joinButton", function (e) {
    e.preventDefault();
    // var joinBudagi = db.ref("/JoinUsers/")
    var joinName = $("#joinName").val();
    var joinEmail = $("#joinEmail").val();
    if (!$("#joinName").val()) {
      $("#alertJoinFirst").removeClass("d-none");
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertJoinFirst").addClass("d-none");
      }
    }
    // else{
    //   pushJoinDB(joinName,joinEmail)
    // }
    if (!$("#joinEmail").val()) {
      $("#alertJoinSecond").removeClass("d-none");
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertJoinSecond").addClass("d-none");
      }
    }
    // else{
    //   pushJoinDB(joinName,joinEmail)
    // }
    console.log(joinName, joinEmail);
    if ($("#joinName").val() && $("#joinEmail").val()) {
      pushJoinDB(joinName, joinEmail);
      // ($("#joinName").val(""))
      // ($("#joinEmail").val(""))
    }
  });
  function pushJoinDB(joinName, joinEmail) {
    db.ref("/JoinUsers/").push().set({
      joinName,
      joinEmail,
    });
    $("#joinName").val("");
    $("#joinEmail").val("");
  }
  var global = null;
  db.ref("/JoinUsers/").on("value", function (snap) {
    var snapVal = snap.val();
    var snapArray = Object.entries(snapVal).map((q) => {
      for (i in q) {
        snapObject = {
          id: q[0],
          ...q[1],
        };
      }
      return snapObject;
    });
    global = snapArray;
    tBodyJoin = $("#tBodyJoin");
    $("#tBodyJoin").html(
      global.map((q, i) => {
        // console.log(q)
        return `
                                <tr>
                                  <th scope="row">${i + 1}</th>
                                  <td>${q.joinName}</td>
                                  <td>${q.joinEmail}</td>
                                </tr>
          `;
      })
    );
  });
});

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