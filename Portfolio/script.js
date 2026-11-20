// Loading Screen Function
function initializeLoader() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('slide-up');
            
            
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 1000); 
        }
    }, 5000); 
}


const timelineLight = document.querySelector('.timeline-light');
const experiences = document.querySelectorAll('.experience');
const timeline = document.querySelector('.timeline');

function updateTimelineLight() {
    if (!timeline || !timelineLight) return;
    
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = scrollTop + timelineRect.top;
    const timelineHeight = timelineRect.height;
    
    
    if (timelineRect.bottom < -100 || timelineRect.top > windowHeight + 100) {
        timelineLight.style.display = 'none';
        return;
    } else {
        timelineLight.style.display = 'block';
    }
    
    
    const timelineStart = timelineTop - windowHeight * 0.8; 
    const timelineEnd = timelineTop + timelineHeight - windowHeight * 0.2; 
    
    
    const scrollProgress = Math.max(0, Math.min(1, (scrollTop - timelineStart) / (timelineEnd - timelineStart)));
    
    
    const padding = 50;
    const lightStartPos = timelineTop + padding;
    const lightEndPos = timelineTop + timelineHeight - padding;
    const currentLightPos = lightStartPos + (scrollProgress * (lightEndPos - lightStartPos));
    
    
    const viewportPos = currentLightPos - scrollTop;
    
    
    timelineLight.style.top = `${viewportPos}px`;
    
    
    const glowIntensity = Math.min(1, Math.abs((window.lastScrollY || 0) - scrollTop) / 10);
    timelineLight.style.boxShadow = `0 0 ${30 + glowIntensity * 20}px rgb(75, 254, 126), 0 0 ${60 + glowIntensity * 40}px rgb(75, 254, 126)`;
    
    window.lastScrollY = scrollTop;
}

function checkExperienceVisibility() {
    const windowHeight = window.innerHeight;
    
    experiences.forEach((experience, index) => {
        const rect = experience.getBoundingClientRect();
        const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
        
        if (isVisible && !experience.classList.contains('visible')) {
            setTimeout(() => {
                experience.classList.add('visible');
            }, index * 200);
        }
    });
}

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const scrollPosition = window.scrollY;
        const triggerHeight = 200;

        if (scrollPosition > triggerHeight) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }
}

let ticking = false;

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateTimelineLight();
            checkExperienceVisibility();
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
}


window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
    updateTimelineLight();
    checkExperienceVisibility();
});

window.addEventListener('DOMContentLoaded', () => {
   
    initializeLoader();
    
   
    updateTimelineLight();
    checkExperienceVisibility();
    updateNavbar();
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navbar-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            console.log('Clicked:', buttonText);
        });
    });
});


if (document.readyState === 'loading') {
    
} else {
    
    initializeLoader();
    updateTimelineLight();
    checkExperienceVisibility();
    updateNavbar();
}