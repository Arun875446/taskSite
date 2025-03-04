document.addEventListener("DOMContentLoaded", () => {
  const riceBagHero = document.getElementById("rice-bag-hero");
  const productsSection = document.querySelector(".products");
  const productsContainer = document.querySelector(".products-container");

  const productItemSmall = document.getElementById("product-item-small");
  const productItemMedium = document.getElementById("product-item-medium");
  const productItemLarge = document.getElementById("product-item-large");

  const productSizeSmall = productItemSmall.querySelector(".product-size");
  const productSizeMedium = productItemMedium.querySelector(".product-size");
  const productSizeLarge = productItemLarge.querySelector(".product-size");

  let isHeroFixed = false;

  window.addEventListener("scroll", () => {
    const productsSectionTop = productsSection.offsetTop;
    const scrollPosition = window.scrollY;
    const heroHeight = riceBagHero.offsetHeight;
    const offset = 500;

    if (scrollPosition < productsSectionTop - heroHeight) {
      const maxTop = productsContainer.offsetTop + productsContainer.offsetHeight - heroHeight;
      let newTop = Math.min(30 + scrollPosition * 0.2, maxTop);

      gsap.to(riceBagHero, {
        top: `${newTop}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    } else if (!isHeroFixed) {
      isHeroFixed = true;
      riceBagHero.style.position = "fixed";

      const startTop = riceBagHero.getBoundingClientRect().top;
      const endTop = productItemSmall.getBoundingClientRect().top;
      const startLeft = riceBagHero.getBoundingClientRect().left;

      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;

        const progress = Math.min((currentTime - startTime) / 500, 1);
        const newTop = startTop + (endTop - startTop) * progress;

        riceBagHero.style.top = `${newTop}px`;
        riceBagHero.style.left = `${startLeft}px`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Finalize the positioning
          riceBagHero.style.position = "absolute";
          riceBagHero.style.top = `${productItemSmall.offsetTop - productsSection.offsetTop}px`;
          riceBagHero.style.left = `${productItemSmall.offsetLeft}px`;

          riceBagHero.style.maxWidth = "220px";
          riceBagHero.style.height = "auto";

          // Delay the display of subsequent elements
          setTimeout(() => {
            riceBagHero.style.display = "none"; // Ensure hero image is hidden

            productItemSmall.style.display = "flex";
            productSizeSmall.style.display = "block";

            setTimeout(() => {
              productItemMedium.style.display = "flex";
              productSizeMedium.style.display = "block";
              gsap.to(productItemMedium, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to(productSizeMedium, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
              });
              setTimeout(() => {
                productItemLarge.style.display = "flex";
                productSizeLarge.style.display = "block";
                gsap.to(productItemLarge, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
                gsap.to(productSizeLarge, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }, 800);
            }, 800);
          }, 50);
        }
      };

      requestAnimationFrame(animate);
    }

    // Reset
    if (scrollPosition < productsSectionTop - heroHeight - offset && isHeroFixed) {
      productSizeLarge.style.display = "none";
      productItemLarge.style.display = "none";
      setTimeout(() => {
        productSizeMedium.style.display = "none";
        productItemMedium.style.display = "none";
        setTimeout(() => {
          productSizeSmall.style.display = "none";
          productItemSmall.style.display = "none";

          riceBagHero.style.display = "block";
          riceBagHero.style.position = "fixed";
          riceBagHero.style.maxWidth = "40%";
          riceBagHero.style.height = "35%";
          gsap.to(riceBagHero, {
            top: "30%",
            left: "20%",
            duration: 0.3,
            onComplete: () => {
              isHeroFixed = false;
            },
          });
        }, 300);
      }, 300);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const truck = document.querySelector(".truck");

  setTimeout(() => {
    truck.classList.add("animate");
  }, 1500);
});
