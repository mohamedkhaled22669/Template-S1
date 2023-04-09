// Check If There is Local Storage Color option
let mainColors = localStorage.getItem('color_option');


if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', mainColors);


    // Remove Active Class From All Childrens list itme
    document.querySelectorAll('.colors-list li').forEach(element => {
      element.classList.remove('active');


      
      // add active class on Element with data-Color === local Storage item
      if (element.dataset.color === mainColors) {
        // add Active Class
        element.classList.add('active');
      };
    });
}

// Random Background Option 
let backgroundOption = true;

// variable to control the interval
let backgroundInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");


// check if random background local storagei is not empty 
if (backgroundLocalItem !== null) {
  if(backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class from All Span
  document.querySelectorAll('.random-backgrounds span').forEach(element => {
  element.classList.remove('active');


  if (backgroundLocalItem === "true") {
    document.querySelector('.random-backgrounds .yes').classList.add('active');

  } else {
    document.querySelector('.random-backgrounds .no').classList.add('active');

  }
});
  


}





// Toggel spin Class On Icon
document.querySelector('.toggle-settings .fa-gear').onclick = function () {
    // toggle Class Fa-spin For Rotation on Self
    this.classList.toggle('fa-spin');


    // Toggle Class Open On Main Settings Box
    document.querySelector('.settings-box').classList.toggle('open');
}



// Switch color
const colorsLi = document.querySelectorAll('.colors-list li');

// loop On All List Items
colorsLi.forEach(li => { 

  // Click On Every List Item
  li.addEventListener('click', (e) => {

    // Set color On Root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // Set Color On Root
    localStorage.setItem('color_option', e.target.dataset.color);


    // // Remove Active Class From All Childrens
    // e.target.parentElement.querySelectorAll('.active').forEach(element => {
    //   element.classList.remove('active');
    // });


    // // Add Active Class On Self
    // e.target.classList.add('active');
    handleActive(e);
  })
})



// Switch Random Background Option
const randomBackEl = document.querySelectorAll('.random-backgrounds span');

// loop On All span
randomBackEl.forEach(span => { 

  // Click On Every Span
  span.addEventListener('click', (e) => {

    // // Remove Active Class From All Childrens
    // e.target.parentElement.querySelectorAll('.active').forEach(element => {
    //   element.classList.remove('active');
    // });

    // // Add Active Class On Self
    // e.target.classList.add('active');

    handleActive(e);


    if(e.target.dataset.background === "yes") {
      
      
      backgroundOption = true;
      randomizeImgs();

      localStorage.setItem("background_option", true);


    } else {

      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false); 
    }
  })
})

// Select Landing Page 

let landingPage = document.querySelector(".landing-page");


// Get Array of Imgs
let imgsArray = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];


// Function to Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval( () => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change background images URl
      landingPage.style.backgroundImage = "url('imgs/" + imgsArray[randomNumber] + "')";

    },3000);
  }
}


randomizeImgs();


// select Skills Selector
let ourSkills = document.querySelector('.skills');

window.onscroll = function () {

  // Skills offset Top
  let skillOffsetTop = ourSkills.offsetTop;

  // Skkills outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Windows Height
  let windowHeight = this.innerHeight;

  // window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillOffsetTop + skillsOuterHeight - windowHeight)) {

    let allSkill = document.querySelectorAll('.skills-box .skill-progress span');

    allSkill.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}

// Create  Popup With The image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach( img => {

  img.addEventListener('click', (e) => {

    // Create Overlay Element
    let overlay = document.createElement('div');

    // Add Class To Overlay
    overlay.className = 'popup-overlay';

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement('div');
    
    // Add Class To The Popup Box
    popupBox.className = 'popup-box';


    if(img.alt !== null) {

      // Create Heading
      let imgHeading = document.createElement('h3');

      // Create Text for Heading 
      let imgText = document.createTextNode(img.alt);

      // Append the text to the heading 
      imgHeading.appendChild(imgText);

      // Append the heading to The popup Box
      popupBox.appendChild(imgHeading);

    }

    // Create Image 
    let popupImage = document.createElement('img');


    // Set Image Src
    popupImage.src = img.src;

    // Add Image To popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body 
    document.body.appendChild(popupBox)


    // Craete the Close Span
    let closeButton = document.createElement('span');

    // Create Close Button Text
    let closeButtonText = document.createTextNode('X');

    // Append Text to Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class to Close Button
    closeButton.className = "close-button";

    // Add Class Button To Popup Box
    popupBox.appendChild(closeButton);

  });
});


// Close Popup
document.addEventListener("click" ,function (e) {

  if (e.target.className == 'close-button') {

    // Remove The Current Popup 
    e.target.parentNode.remove();

    // Remove Popup overlay 
    document.querySelector('.popup-overlay').remove();

  }
});


// Select All Bullets 
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

// Select All Links

const allLinks = document.querySelectorAll('.links a');

// functure scroll To SameWhere xD

function scrollToAnySection(elements) {

  elements.forEach(ele => {

    ele.addEventListener('click', (e) => {

      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

      });
    });
  });
};

// allBullets.forEach(bullets => {
//   bullets.addEventListener('click', (e) => {
//     console.log("ddd");
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: 'smooth'
//     })
//   })
// });

scrollToAnySection(allBullets);
scrollToAnySection(allLinks);

// Handle Active State
function handleActive(ev) {

  // Remove Class Active from All 
  ev.target.parentElement.querySelectorAll('.active').forEach(element => {

    element.classList.remove('active');
  })

  // Add Class Active on self
  ev.target.classList.add('active');


};


// control >> show or hide bullets
let bulletSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets_option');

if (bulletLocalItem !== null) {


  bulletSpan.forEach(span => {

    span.classList.remove('active');
  });

  if (bulletLocalItem === 'block') {

    bulletsContainer.style.display = 'block';

    document.querySelector('.bullets-option .yes').classList.add('active');

  } else {

    bulletsContainer.style.display = 'none';

    document.querySelector('.bullets-option .no').classList.add('active');


  }

}


bulletSpan.forEach( span => {

  span.addEventListener('click', (e) => {

    if(span.dataset.display === 'show') {

      bulletsContainer.style.display = 'block';

      localStorage.setItem('bullets_option', 'block');

    } else {

      bulletsContainer.style.display = 'none';

      localStorage.setItem('bullets_option', 'none');

    } 

    handleActive(e)
  })
})



// Reset Button
document.querySelector('.reset-options').onclick = function() {

  // localStorage.clear();

  localStorage.removeItem('color_option');
  localStorage.removeItem('background_option');
  localStorage.removeItem('bullets_option');


  // Reload Window
  window.location.reload();


}


// Toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function(e) {

  // Stop Propagation
  e.stopPropagation();  


  // Toggle Class "menu-active"  on Button
  this.classList.toggle('menu-active');

  // Toggle Class "open" on Links
  tLinks.classList.toggle('open');
}

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener('click', (e) => {
  
  if (e.target !== toggleBtn && e.target !== tLinks) {

    if(tLinks.classList.contains('open')) {
      // Toggle Class "menu-active"  on Button
      toggleBtn.classList.toggle('menu-active');

      // Toggle Class "open" on Links
      tLinks.classList.toggle('open');
    }
  }
})


// Stop Propagation On Menu 
tLinks.onclick = function (e) {
  e.stopPropagation();
}