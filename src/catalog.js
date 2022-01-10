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

  // ! MODAL start
  $(document).on("click", "#joinButton", function (e) {
    e.preventDefault();
    var joinName = $("#joinName").val();
    var joinEmail = $("#joinEmail").val();
    if (!$("#joinName").val()) {
      $("#alertJoinFirst").removeClass("d-none");
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertJoinFirst").addClass("d-none");
      }
    }
    if (!$("#joinEmail").val()) {
      $("#alertJoinSecond").removeClass("d-none");
      setTimeout(() => alertSettimeoutFunc(), 1500);
      function alertSettimeoutFunc() {
        $("#alertJoinSecond").addClass("d-none");
      }
    }
    console.log(joinName, joinEmail);
    if ($("#joinName").val() && $("#joinEmail").val()) {
      pushJoinDB(joinName, joinEmail)($("#joinName").val(""))(
        $("#joinEmail").val("")
      );
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
  // ! MODAL end

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
    $(".slickUl").html(
      globalData.map((data, i) => {
        console.log(data.inputData);
        return `
      <li class="nav-item">
      <a class="slickBooktype nav-link" data-categorytype=${data.inputData} href="#">${data.inputData}</a>
    </li>
      `;
      })
    );
  });

  let globalData = null;

  $(document).on("click", ".slickBtn", function () {
    $("#DIVBIG").addClass("d-none");
    $("#aboutstoreContainer").removeClass("d-none");
    let value = $(this).data("prodid");
    chooseCategory(value);
  });

  function chooseCategory(data) {
    console.log(data)
    db.ref("/bookList").on("value", function (snap) {
      let obj = snap.child(`${data}`).val();
      console.log(obj);
      renderChoosenCategory(obj);
    });
  }
  function renderChoosenCategory(obj) {
    $("#aboutCardTitle").html(obj.bookName);
    $("#aboutCardImg").attr("src", obj.bookUrl);
    $("#yearBadge").html(obj.publishYear);
    $("#aboutCardText").html(obj.bookDesc);
  }

  $(document).on("click", "#backButton", function () {
    window.location.reload();
  });

  function startFunction() {
    db.ref("/bookList").on("value", function (snap) {
      let data = snap.val();
      console.log(data)
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
      console.log(globalData)
      localStorage.setItem("bookContainer", JSON.stringify(globalData));
      $(".your-class").html(
        globalData.map((data) => {
          return `
        <div>
    <div class="cardSlick" style="position:relative">
    <span class="badge badge-danger badge-custom" style="position: absolute; left: 0; top: 0;">${data.formNew == true ? "new" : ""}</span> 
      <img src="${data.bookUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${data.bookName.length < 12
              ? data.bookName
              : data.bookName.slice(0, 15) + "..."
            }</h5>
        <p class="card-text">${data.authorName.length < 14
              ? data.authorName
              : data.authorName.slice(0, 15) + "..."
            }</p>
        <button href="#" data-prodid="${data.id}" class="btn slickBtn btn-group">Read More</button>
      </div>
    </div>
    </div>
    `;
        })
      );
      $(".your-class").slick({
        infinite: true,
        autoplaySpeed: 1000,
        slidesToShow: 5,
        slidesToScroll: 4,
        variableWidth: true,
        autoplay: true,
        // visibility: hidden,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
        prevArrow: $("#leftSlick"),
        nextArrow: $("#rightSlick"),
      });
    });
  }
  startFunction();

  $(document).on("click", ".slickBooktype", function () {
    // $(".your-class").slick("refresh");
    // $('.your-class').slick('refresh');
    // $("#loadingDiv").removeClass("d-none")
    // setTimeout(() => yasar(), 1500);
    // function yasar(){
    //     window.location.reload()
    //     $("#loadingDiv").addClass("d-none")
    //   }
    // $(".your-class").empty()
    // $(".your-class").removeClass("slick-initialized")
    let data = $(this).data("categorytype");
    console.log(data);
    setCatalogType(data);
  });
  function setCatalogType(datax) {
    $(".your-class").removeClass("slick-initialized");
    localStorage.setItem("bookFilter", datax);
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
      let bookLocal = JSON.parse(localStorage.getItem("bookContainer"));
      let globalFilter = bookLocal.filter((item) => item.bookType == datax);

      $(".your-class").html(
        globalFilter.map((data) => {
          return `
          <div>
      <div class="cardSlick" style="position:relative">
      <span class="badge badge-danger badge-custom" style="position: absolute; left: 0; top: 0;">${data.formNew == true ? "new" : ""}</span> 
        <img src="${data.bookUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.bookName.length < 12
              ? data.bookName
              : data.bookName.slice(0, 15) + "..."
            }</h5>
          <p class="card-text">${data.authorName.length < 14
              ? data.authorName
              : data.authorName.slice(0, 15) + "..."
            }</p>
          <button href="#" class="btn slickBtn btn-group">Read More</button>
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
          autoplaySpeed: 1000,
          slidesToShow: 5,
          slidesToScroll: 4,
          autoplay: true,
          variableWidth: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
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
          prevArrow: $("#leftSlick"),
          nextArrow: $("#rightSlick"),
        });
    });
  }

  db.ref("/bookList").on("value", function (snap) {
    let bookLocal = JSON.parse(localStorage.getItem("bookContainer"));
    let globalFilter = bookLocal.filter((item) => item.bookType == "Bestseller");
    console.log(globalFilter);
    $(".your-class2").html(
      globalFilter.map((data) => {
        return `
          <div>
      <div class="cardSlick" style="position: relative;">
  <span class="badge badge-danger badge-custom" style="position: absolute; left: 0; top: 0;">${data.formNew == true ? "new" : ""
          }</span> 

        <img src="${data.bookUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.bookName.length < 12
            ? data.bookName
            : data.bookName.slice(0, 15) + "..."
          }</h5>
          <p class="card-text">${data.authorName.length < 14
            ? data.authorName
            : data.authorName.slice(0, 15) + "..."
          }</p>
          <button href="#"  data-prodid="${data.id
          }" class="btn slickBtn btn-group">Read More</button>
        </div>
      </div>
      </div>
      `;
      })
    );
    $(document).ready(function () {
      $(".your-class2").slick({
        infinite: true,
        autoplaySpeed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
        prevArrow: $("#leftSlick2"),
        nextArrow: $("#rightSlick2"),
      });
    });
  });

  db.ref("/bookList").on("value", function (snap) {
    let bookLocal = JSON.parse(localStorage.getItem("bookContainer"));
    console.log(bookLocal)
    let globalFilter = bookLocal.filter((item) => item.formNew == true);
    console.log(globalFilter)
    console.log(globalFilter);
    $(".your-class3").html(
      globalFilter.map((data) => {
        return `
      <div>
  <div class="cardSlick" style="position: relative;">
  <span class="badge badge-danger" style="position: absolute; left: 0; top: 0;">New</span> 
    <img src="${data.bookUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.bookName.length < 12
            ? data.bookName
            : data.bookName.slice(0, 15) + "..."
          }</h5>
      <p class="card-text">${data.authorName.length < 14
            ? data.authorName
            : data.authorName.slice(0, 15) + "..."
          }</p>
      <button href="#" data-prodid="${data.id
          }"  class="btn slickBtn btn-group">Read More</button>
    </div>
  </div>
  </div>
  `;
      })
    );
    $(document).ready(function () {
      $(".your-class3").slick({
        infinite: true,
        autoplaySpeed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
             
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              centerMode: true,
             
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
        prevArrow: $("#leftSlick3"),
        nextArrow: $("#rightSlick3"),
      });
    });
  });
});


// HEADER SECTION STARTED
document.getElementById("headerHamburgerWrapper").addEventListener("click", function () {
  document.body.classList.toggle("openMenu")
})
// HEADER SECTION END

/* BTN TOP STARTED */
var mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

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