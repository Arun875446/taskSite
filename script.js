document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const riceBagHero = document.getElementById("rice-bag-hero");
  const productsSection = document.querySelector(".products");
  const productsContainer = document.querySelector(".products-container");
  const productItemSmall = document.getElementById("product-item-small");
  const productItemMedium = document.getElementById("product-item-medium");
  const productItemLarge = document.getElementById("product-item-large");

  const containerHeight = 400;
  productsContainer.style.minHeight = `${containerHeight}px`;

  productItemSmall.style.display = "none";
  productItemMedium.style.display = "none";
  productItemLarge.style.display = "none";

  let state = {
    heroActive: true,
    smallVisible: false,
    mediumVisible: false,
    largeVisible: false,
  };

  const initialLeft = window.getComputedStyle(riceBagHero).left;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const triggerPoint = productsSection.offsetTop - window.innerHeight / 2;

    if (state.heroActive) {
      riceBagHero.style.left = initialLeft;

      if (scrollY < triggerPoint) {
        const newTopPercentage = 30 + scrollY * 0.05;
        riceBagHero.style.top = `${newTopPercentage}%`;
      } else {
        state.heroActive = false;
        state.smallVisible = true;

        riceBagHero.style.display = "none";
        productItemSmall.style.display = "flex";

        gsap.from(productItemSmall, {
          opacity: 0,
          y: 20,
          duration: 0.5,
        });
      }
    }

    const mediumTrigger = triggerPoint + 200;
    if (
      !state.mediumVisible &&
      state.smallVisible &&
      scrollY >= mediumTrigger
    ) {
      state.mediumVisible = true;
      productItemMedium.style.display = "flex";

      gsap.from(productItemMedium, {
        opacity: 0,
        y: 20,
        duration: 0.5,
      });
    }

    const largeTrigger = mediumTrigger + 200;
    if (!state.largeVisible && state.mediumVisible && scrollY >= largeTrigger) {
      state.largeVisible = true;
      productItemLarge.style.display = "flex";

      gsap.from(productItemLarge, {
        opacity: 0,
        y: 20,
        duration: 0.5,
      });
    }

    if (state.largeVisible && scrollY < largeTrigger - 50) {
      productItemLarge.style.display = "none";
      state.largeVisible = false;
    }

    if (state.mediumVisible && scrollY < mediumTrigger - 50) {
      productItemMedium.style.display = "none";
      state.mediumVisible = false;
    }

    if (state.smallVisible && scrollY < triggerPoint - 50) {
      productItemSmall.style.display = "none";
      state.smallVisible = false;

      riceBagHero.style.display = "block";
      state.heroActive = true;
    }
  });

  // Animate truck
  const truck = document.querySelector(".truck");
  setTimeout(() => {
    truck.classList.add("animate");
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const whySection = document.querySelector(".why-section");
  const whyTitle = document.querySelector(".why-title");
  const bagIcon = document.querySelector(".bag-icon");

  const bgImages = [
    "./images/ellipse.png",
    "./images/why1.png",
    "./images/why2.png",
    "./images/why3.png",
    "./images/why4.png",
  ];

  let currentBgIndex = 0;
  let lastScrollY = window.scrollY;

  const getSectionPositionDetails = () => {
    const rect = whySection.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    const sectionBottom = sectionTop + sectionHeight;
    const sectionVisible =
      window.scrollY + window.innerHeight > sectionTop &&
      window.scrollY < sectionBottom;

    return {
      sectionTop,
      sectionHeight,
      sectionBottom,
      sectionVisible,
      viewportMiddle: window.scrollY + window.innerHeight / 2,
    };
  };

  const style = document.createElement("style");
  style.textContent = `
    .why-section {
      transition: background-image 0.3s ease-in-out;
    }
    .why-title, .bag-icon {
      transition: opacity 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  const updateContentVisibility = (index) => {
    if (index === 0) {
      whyTitle.style.opacity = "1";
      whyTitle.style.visibility = "visible";
      bagIcon.style.opacity = "1";
      bagIcon.style.visibility = "visible";
    } else {
      whyTitle.style.opacity = "0";
      whyTitle.style.visibility = "hidden";
      bagIcon.style.opacity = "0";
      bagIcon.style.visibility = "hidden";
    }
  };

  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;

    const { sectionTop, sectionHeight, sectionVisible, viewportMiddle } =
      getSectionPositionDetails();

    if (!sectionVisible) return;

    const progressInSection = (viewportMiddle - sectionTop) / sectionHeight;
    const newIndex = Math.min(
      Math.max(Math.floor(progressInSection * 5.4), 0),
      4
    );

    if (newIndex !== currentBgIndex) {
      currentBgIndex = newIndex;
      whySection.style.backgroundImage = `url("${bgImages[currentBgIndex]}")`;

      updateContentVisibility(currentBgIndex);
    }
  });
});
