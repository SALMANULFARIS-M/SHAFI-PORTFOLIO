import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,HeaderComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Shafi Shoukath';
  isBrowser: boolean;
  private scrollListeners: any[] = [];
  private observer: IntersectionObserver | null = null;
  public mobileMenuOpen = false;
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  isSubmitted = false;
  isSubmitting = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    // Initialize smooth scroll
    this.initSmoothScroll();

    // Initialize active nav highlighting
    this.initActiveNavHighlighting();

    // Initialize intersection observer
    this.initIntersectionObserver();

    // Initialize parallax effect
    this.initParallaxEffect();
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // Initialize typing animation for hero text
    this.initTypingAnimation();
  }

  ngOnDestroy() {
    // Clean up all event listeners
    this.scrollListeners.forEach(listener => {
      if (listener && typeof listener === 'function') {
        listener();
      }
    });

    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  private initActiveNavHighlighting() {
    const scrollHandler = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-item');

      let current = '';
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', scrollHandler);
    this.scrollListeners.push(() => window.removeEventListener('scroll', scrollHandler));
  }

  private initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.slide-in').forEach(el => {
      if (this.observer) {
        this.observer.observe(el);
      }
    });
  }

  private initParallaxEffect() {
    const scrollHandler = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-animation');

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        (element as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', scrollHandler);
    this.scrollListeners.push(() => window.removeEventListener('scroll', scrollHandler));
  }

  private initTypingAnimation() {
    const heroHeadline = document.querySelector('h1');
    if (heroHeadline && heroHeadline.textContent) {
      const text = heroHeadline.textContent;
      heroHeadline.textContent = '';
      let index = 0;

      const typeWriter = () => {
        if (index < text.length) {
          heroHeadline.textContent += text.charAt(index);
          index++;
          setTimeout(typeWriter, 100);
        }
      };

      setTimeout(typeWriter, 1000);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    this.isSubmitting = true;

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;

      setTimeout(() => {
        this.isSubmitted = false;
        this.formData = { name: '', email: '', phone: '', message: '' };
      }, 3000);
    }, 1000);
  }
}
