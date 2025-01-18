import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CarouselService } from '../services/carousel.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  intervalTime = 8000; // 8 seconds
  countdownTime = this.intervalTime / 1000; // Convert to seconds
  currentTime = this.countdownTime;
  interval: any;
  countdownInterval: any;
  products: Product[] = []; 
  constructor(private renderer: Renderer2 , private carouselService: CarouselService , private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const gender = params['gender'];
      this.loadProducts(gender); // Load products based on gender
    });

    this.startAutoSlide(); // Start the auto-slide interval
    this.resetCountdown(); // Initialize the countdown timer
    this.setupEventListeners(); // Set up event listeners for next/prev buttons
  }


  loadProducts(gender: string): void {
    this.carouselService.getCarouselProducts(gender).subscribe({
      next: (fetchedProducts) => {
        this.products = fetchedProducts.map(product => ({
          ...product,
          image: `http://localhost:3000/images/${product.image}` 
        }));
        this.resetCountdown(); 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
    

  ngOnDestroy(): void {
    // Clear intervals to avoid memory leaks
    clearInterval(this.interval);
    clearInterval(this.countdownInterval);
  }

  resetCountdown(): void {
    const countdownDom = document.querySelector('.countdown') as HTMLElement;
    const progressCircle = document.querySelector('.counter circle') as SVGCircleElement;

    // Reset the countdown time
    this.currentTime = this.countdownTime;
    countdownDom.textContent = this.currentTime.toString();

    // Reset the progress circle animation
    this.renderer.setStyle(progressCircle, 'transition', 'none');
    this.renderer.setStyle(progressCircle, 'strokeDashoffset', '0');

    // Clear the existing countdown interval
    clearInterval(this.countdownInterval);

    // Start a new countdown interval
    this.countdownInterval = setInterval(() => {
      this.currentTime--;
      countdownDom.textContent = this.currentTime.toString();

      // Stop the countdown when it reaches 0
      if (this.currentTime <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);

    // Restart the progress circle animation after a short delay
    setTimeout(() => {
      this.renderer.setStyle(progressCircle, 'transition', `stroke-dashoffset ${this.intervalTime}ms linear`);
      this.renderer.setStyle(progressCircle, 'strokeDashoffset', '126');
    }, 50);
  }

  showSlider(type: 'next' | 'prev'): void {
    const listItemDom = document.querySelector('.carousel .list') as HTMLElement;
    const thumbnailDom = document.querySelector('.carousel .thumnail') as HTMLElement;
    const itemSlider = document.querySelectorAll('.carousel .list .item');
    const imgThumbnail = document.querySelectorAll('.carousel .thumnail .item');
    const carouselDom = document.querySelector('.carousel') as HTMLElement;

    if (type === 'next') {
      // Move the first item to the end of the list
      listItemDom.appendChild(itemSlider[0]);
      thumbnailDom.appendChild(imgThumbnail[0]);
      carouselDom.classList.add('next');
      carouselDom.classList.remove('prev');
    } else {
      // Move the last item to the beginning of the list
      const positionLastItem = itemSlider.length - 1;
      listItemDom.prepend(itemSlider[positionLastItem]);
      thumbnailDom.prepend(imgThumbnail[positionLastItem]);
      carouselDom.classList.add('prev');
      carouselDom.classList.remove('next');
    }

    // Remove the transition classes after the animation is complete
    setTimeout(() => {
      carouselDom.classList.remove('next', 'prev');
    }, 1000);

    // Reset the countdown and auto-slide interval
    this.resetCountdown();
    this.resetAutoSlideInterval();
  }

  startAutoSlide(): void {
    // Start the auto-slide interval
    this.interval = setInterval(() => {
      this.showSlider('next');
    }, this.intervalTime);
  }

  resetAutoSlideInterval(): void {
    // Clear the existing auto-slide interval
    clearInterval(this.interval);
    // Start a new auto-slide interval
    this.startAutoSlide();
  }

  setupEventListeners(): void {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    // Add event listeners for next and prev buttons
    nextBtn?.addEventListener('click', () => this.showSlider('next'));
    prevBtn?.addEventListener('click', () => this.showSlider('prev'));
  }
}