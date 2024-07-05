const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
const personName = document.getElementById("personName");
const profession = document.getElementById("profession");
const description = document.getElementById("description");
const surpriseMeBtn = document.getElementById("surpriseMeBtn");
const chicken = document.querySelector(".chicken");

let isChickenVisible;

let people = [
	{
		photo:
			'url("https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843_960_720.jpg")',
		name: "Susan Smith",
		profession: "WEB DEVELOPER",
		description:
			"Cheese and biscuits chalk and cheese fromage frais. Cheeseburger caerphilly cheese slices chalk and cheese cheeseburger mascarpone danish fontina rubber "
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2019/02/11/20/20/woman-3990680_960_720.jpg')",
		name: "Anna Grey",
		profession: "UFC FIGHTER",
		description:
			"I'm baby migas cornhole hell of etsy tofu, pickled af cardigan pabst. Man braid deep v pour-over, blue bottle art party thundercats vape. Yr waistcoat"
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg')",
		name: "Branson Cook",
		profession: "ACTOR",
		description:
			"Radio telescope something incredible is waiting to be known billions upon billions Jean-François Champollion hearts of the stars tingling of the spine. "
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2014/10/30/17/32/boy-509488_960_720.jpg')",
		name: "Julius Grohn",
		profession: "PROFESSIONAL CHILD",
		description:
			"Biscuit chocolate pastry topping lollipop pie. Sugar plum brownie halvah dessert tiramisu tiramisu gummi bears icing cookie. Gummies gummi bears pie apple pie sugar plum jujubes. "
	}
];

imgDiv.style.backgroundImage = people[0].photo;
personName.innerText = people[0].name;
profession.innerText = people[0].profession;
description.innerText = people[0].description;
let currentPerson = 0;

//Select the side where you want to slide
function slide(whichSide, personNumber) {
	let reviewWrapWidth = reviewWrap.offsetWidth + "px";
	let descriptionHeight = description.offsetHeight + "px";
	//(+ or -)
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
	if (currentPerson === 3) {
		currentPerson = 0;
		slide("left", currentPerson);
	} else {
		currentPerson++;
	}

	slide("left", currentPerson);
}

function setNextCardRight() {
	if (currentPerson === 0) {
		currentPerson = 3;
		slide("right", currentPerson);
	} else {
		currentPerson--;
	}

	slide("right", currentPerson);
}

leftArrow.addEventListener("click", setNextCardLeft);
rightArrow.addEventListener("click", setNextCardRight);

surpriseMeBtn.addEventListener("click", () => {
	if (chicken.style.opacity === "0") {
		chicken.style.opacity = "1";
		imgDiv.classList.add("move-head");
		surpriseMeBtn.innerText = "Remove the chicken";
		surpriseMeBtn.classList.remove("surprise-me-btn");
		surpriseMeBtn.classList.add("hide-chicken-btn");
		isChickenVisible = true;
	} else if (chicken.style.opacity === "1") {
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
