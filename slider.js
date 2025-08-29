document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('infinite-slider');
    const slidesContainer = slider.querySelector('.slides');
    const slides = slidesContainer.children;
    const indicators = slider.querySelectorAll('.slider-indicator');
    const slideCount = slides.length;
    const slideWidth = 500 + 20; // px (500px + 20px gap)

    // Clone first and last slide for infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slideCount - 1].cloneNode(true);

    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

    let index = 1;
    slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;

    function moveToSlide(i, updateIndicator = true) {
        slidesContainer.style.transition = 'transform 0.6s';
        slidesContainer.style.transform = `translateX(-${slideWidth * i}px)`;
        if (updateIndicator) updateIndicators(i);
    }

    function updateIndicators(i) {
        let realIndex = i - 1;
        if (realIndex < 0) realIndex = slideCount - 1;
        if (realIndex >= slideCount) realIndex = 0;
        indicators.forEach((radio, idx) => {
            radio.checked = idx === realIndex;
        });
    }

    slidesContainer.addEventListener('transitionend', () => {
        if (index === slideCount + 1) {
            slidesContainer.style.transition = 'none';
            index = 1;
            slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
            updateIndicators(index);
        }
        if (index === 0) {
            slidesContainer.style.transition = 'none';
            index = slideCount;
            slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
            updateIndicators(index);
        }
    });

    indicators.forEach((radio, idx) => {
        radio.addEventListener('change', () => {
            index = idx + 1;
            moveToSlide(index, false);
        });
    });

    // Инициализация индикаторов
    updateIndicators(index);

    // Автопереключение
    setInterval(() => {
        index++;
        moveToSlide(index);
    }, 5000);
});
            index = idx + 1;
            moveToSlide(index, false);
        });
    });

    // Инициализация индикаторов
    updateIndicators(index);

    // Optional: auto-slide
    // setInterval(() => {
    //     nextBtn.click();
    // }, 4000);
});


