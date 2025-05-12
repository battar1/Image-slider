const imgsContainer = document.querySelector(".carousel-inner");
const galleryContainer = document.querySelector(".gallery");

const next = document.querySelector(".carousel-control-next");
const prev = document.querySelector(".carousel-control-prev");

let slide = 0;
function createImgs() {
  for (let i = 0; i < 8; i++) {
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${i === slide ? "active" : ""}`;
    const img = document.createElement("img");
    img.src = `https://picsum.photos/300?random=${i}`;
    img.alt = `Image ${i}`;
    img.style.width = "100%";

    carouselItem.appendChild(img);
    imgsContainer.appendChild(carouselItem);
  }
}

function goToSlide(n) {
  const imgs = imgsContainer.querySelectorAll(".carousel-item");
  const galleryImgs = galleryContainer.querySelectorAll("img");

  imgs[slide].classList.remove("active");
  galleryImgs[slide].classList.remove("active");
  slide = (n + imgs.length) % imgs.length;
  imgs[slide].classList.add("active");
  galleryImgs[slide].classList.add("active");
}

function galleryImgs() {
  const carouselItems = imgsContainer.children;
  let index = 0;
  Array.from(carouselItems).forEach((item) => {
    const imgs = item.children;
    Array.from(imgs).forEach((img) => {
      const imgsClone = img.cloneNode();
      imgsClone.dataset.index = index;
      galleryContainer.appendChild(imgsClone);
      imgsClone.style.maxWidth = "40px";
      index++;
      if (parseInt(imgsClone.dataset.index, 10) === slide) {
        imgsClone.classList.add(`active`);
      }

      imgsClone.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        goToSlide(index);
      });
    });
  });
}
createImgs();
galleryImgs();
next.addEventListener("click", () => {
  goToSlide(slide + 1);
});

prev.addEventListener("click", () => {
  goToSlide(slide - 1);
});
