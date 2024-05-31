export function scrollToElement(className) {
    const stepsContent = document.querySelector(className);
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: stepsContent.offsetTop
    });
}

export async function scrollToTop() {
    window.scroll(0, 0);
}

export function addFixedOnScrolling(className) {
    if (!className) return
    const element = document.querySelector('.' + className)
    const wrapper = element.querySelector('.' + className + '__wrapper')
    const rec = element.getBoundingClientRect()

    let elementPosition = rec.top;
    element.style.height = wrapper.getBoundingClientRect().height + 'px';
    if(window.pageYOffset > (elementPosition + 150)){
        wrapper.classList.add(className + '__wrapper--fixed')
    } else {
        wrapper.classList.remove(className + '__wrapper--fixed')
    }

    window.addEventListener('resize', () => {

        element.style.height = wrapper.getBoundingClientRect().height + 'px';
    })
}