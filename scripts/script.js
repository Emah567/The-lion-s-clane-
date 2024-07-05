document.addEventListener("DOMContentLoaded", () => {
    const reviewWrap = document.getElementById("reviewWrap");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    const imgDiv = document.getElementById("imgDiv");
    const personName = document.getElementById("personName");
    const profession = document.getElementById("profession");
    const description = document.getElementById("description");
    const surpriseMeBtn = document.getElementById("surpriseMeBtn");
    const chicken = document.querySelector(".chicken");

    let isChickenVisible = false; // Initialize the variable
    
    
    
    

    let people = [
        {
            photo: 'url("../img/img1.jpg")',
            name: "Alex",
            profession: "Web 3 Enthusiast",
            description: "The Lion's Clan expanded my network and taught me Web 3 essentials. It's been a game-changer for my career!"
        },
        {
            photo: 'url("../img/img2.jpg ")',
            name: "Maria",
            profession: "Web 3 Learner",
            description: "I learned so much about DeFi and blockchain. The resources and workshops are top-notch!"
        },
        {
            photo: 'url("../img/img3.jpg ")',
            name: "John",
            profession: "Innovator",
            description: "The community is incredible. I’ve connected with industry leaders and found amazing collaboration opportunities."
        },
        {
            photo: 'url("../img/img4.jpg ")',
            name: "Sara",
            profession: "Web 3 Developer",
            description: "Thanks to The Lion's Clan, my Web 3 skills have improved drastically. Highly recommend it!"
        },
        {
            photo: 'url("../img/img5.jpg ")',
            name: "David",
            profession: "Blockchain Enthusiast",
            description: "Being part of The Lion's Clan has opened doors to new projects and innovative ideas."
        },
        {
            photo: 'url("../img/img6.jpg ")',
            name: "Emily",
            profession: "Networking Professional",
            description: "The networking opportunities here are unmatched. I've met so many talented individuals."
        },
        {
            photo: 'url("../img/img7.jpg ")',
            name: "Michael",
            profession: "NFT Specialist",
            description: "The workshops and materials are excellent. My understanding of NFTs has deepened greatly."
        },
        {
            photo: 'url("../img/img8.jpg ")',
            name: "Jessica",
            profession: "Web 3 Explorer",
            description: "This community has been pivotal in my Web 3 journey. The support and knowledge shared are invaluable."
        },
        {
            photo: 'url("../img/img9.jpg ")',
            name: "Tom",
            profession: "Web 3 Advocate",
            description: "Joining The Lion's Clan was the best decision. It’s a fantastic place to grow and learn."
        },
        {
            photo: 'url("../img/img10.jpg ")',
            name: "Lauren",
            profession: "Web 3 Developer",
            description: "I’ve gained so much confidence and skill in Web 3 development, all thanks to The Lion's Clan."
        }
    ];

    imgDiv.style.backgroundImage = people[0].photo;
    personName.innerText = people[0].name;
    profession.innerText = people[0].profession;
    description.innerText = people[0].description;
    let currentPerson = 0;

    // Select the side where you want to slide
    function slide(whichSide, personNumber) {
        let reviewWrapWidth = reviewWrap.offsetWidth + "px";
        let descriptionHeight = description.offsetHeight + "px";
        // (+ or -)
        let side1symbol = whichSide === "left" ? "" : "-";
        let side2symbol = whichSide === "left" ? "-" : "";

        let tl = gsap.timeline();

        if (isChickenVisible) {
            tl.to(chicken, {
                duration: 0.4,
                opacity: 0
            });
        }

        tl.to(reviewWrap, {
            duration: 0.4,
            opacity: 0,
            translateX: `${side1symbol + reviewWrapWidth}`
        });

        tl.to(reviewWrap, {
            duration: 0,
            translateX: `${side2symbol + reviewWrapWidth}`
        });

        setTimeout(() => {
            imgDiv.style.backgroundImage = people[personNumber].photo;
        }, 400);
        setTimeout(() => {
            description.style.height = descriptionHeight;
        }, 400);
        setTimeout(() => {
            personName.innerText = people[personNumber].name;
        }, 400);
        setTimeout(() => {
            profession.innerText = people[personNumber].profession;
        }, 400);
        setTimeout(() => {
            description.innerText = people[personNumber].description;
        }, 400);

        tl.to(reviewWrap, {
            duration: 0.4,
            opacity: 1,
            translateX: 0
        });

        if (isChickenVisible) {
            tl.to(chicken, {
                duration: 0.4,
                opacity: 1
            });
        }
    }

    function setNextCardLeft() {
        currentPerson = (currentPerson + 1) % people.length;
        slide("left", currentPerson);
    }

    function setNextCardRight() {
        currentPerson = (currentPerson - 1 + people.length) % people.length;
        slide("right", currentPerson);
    }

    leftArrow.addEventListener("click", setNextCardLeft);
    rightArrow.addEventListener("click", setNextCardRight);

    surpriseMeBtn.addEventListener("click", () => {
        if (chicken.style.opacity === "0" || chicken.style.opacity === "") {
            chicken.style.opacity = "1";
            imgDiv.classList.add("move-head");
            surpriseMeBtn.innerText = "Remove the chicken";
            surpriseMeBtn.classList.remove("surprise-me-btn");
            surpriseMeBtn.classList.add("hide-chicken-btn");
            isChickenVisible = true;
        } else {
            chicken.style.opacity = "0";
            imgDiv.classList.remove("move-head");
            surpriseMeBtn.innerText = "Surprise me";
            surpriseMeBtn.classList.add("surprise-me-btn");
            surpriseMeBtn.classList.remove("hide-chicken-btn");
            isChickenVisible = false;
        }
    });

    window.addEventListener("resize", () => {
        description.style.height = "100%";
        description.style.width = "100%";
    });
});



const sectionsContainer = document.querySelector('.page-sections');
const sections = document.querySelectorAll('.page-section');
const nav = document.querySelector('.nav-sections');
const menu = nav.querySelector('.menu');
const links = nav.querySelectorAll('.menu-item-link');
const activeLine = nav.querySelector('.active-line');
const sectionOffset = nav.offsetHeight + 24;
const activeClass = 'active';
let activeIndex = 0;
let isScrolling = true;
let userScroll = true;

const setActiveClass = () => {
  links[activeIndex].classList.add(activeClass);
};

const removeActiveClass = () => {
  links[activeIndex].classList.remove(activeClass);
};

const moveActiveLine = () => {
  const link = links[activeIndex];
  const linkX = link.getBoundingClientRect().x;
  const menuX = menu.getBoundingClientRect().x;

  activeLine.style.transform = `translateX(${(menu.scrollLeft - menuX) + linkX}px)`;
  activeLine.style.width = `${link.offsetWidth}px`;
}

const setMenuLeftPosition = position => {
  menu.scrollTo({
    left: position,
    behavior: 'smooth',
  });
};

const checkMenuOverflow = () => {
  const activeLink = links[activeIndex].getBoundingClientRect();
  const offset = 30;
  
  if (Math.floor(activeLink.right) > window.innerWidth) {
    setMenuLeftPosition(menu.scrollLeft + activeLink.right - window.innerWidth + offset);
  } else if (activeLink.left < 0) {
    setMenuLeftPosition(menu.scrollLeft + activeLink.left - offset)
  }
}

const handleActiveLinkUpdate = current => {
  removeActiveClass();
  activeIndex = current;
  checkMenuOverflow();
  setActiveClass();
  moveActiveLine();
};

const init = () => {
  moveActiveLine(links[0]);
  document.documentElement.style.setProperty('--section-offset', sectionOffset);
}

links.forEach((link, index) => link.addEventListener('click', () => {
  userScroll = false;
  handleActiveLinkUpdate(index);
}))

window.addEventListener("scroll", () => {
  const currentIndex = sectionsContainer.getBoundingClientRect().top < 0
    ? (sections.length - 1) - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - sectionOffset * 2)
    : 0;
  
  if (userScroll && activeIndex !== currentIndex) {
    handleActiveLinkUpdate(currentIndex);
  } else {
   	window.clearTimeout(isScrolling);
	  isScrolling = setTimeout(() => userScroll = true, 100); 
  }
});

init();
