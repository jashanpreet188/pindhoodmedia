
var page1Content = document.querySelector("#page1-content");
var cursor = document.querySelector("#cursor");

// Smooth and optimized mousemove cursor
page1Content.addEventListener("mousemove", function(dets) {
  gsap.to(cursor, {
    x: dets.clientX,
    y: dets.clientY,
    duration: 0.2,
    ease: "power2.out",
    overwrite: "auto" // avoids stacking animations
  });
});

// On enter, scale and fade in
page1Content.addEventListener("mouseenter", function() {
  gsap.to(cursor, {
    scale: 1,
    opacity: 1,
    duration: 0.3,
    ease: "power2.out"
  });
});

// On leave, scale down and fade out
page1Content.addEventListener("mouseleave", function() {
  gsap.to(cursor, {
    scale: 0,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out"
  });
});

// Page 2 animation - made smoother and consistent
function page2animation() {
  gsap.from("#page2 h1", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from("#page2 p", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4, // slight delay for better sync
    ease: "power2.out"
  });
}

page2animation();

