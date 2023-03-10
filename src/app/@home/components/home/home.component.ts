import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/@core/services/http/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allCategories:any;
  taskBarItems:any[]=[];
  slides:any[]=[];
  images:any[]=[];
  titles:any[]=[];
	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

	

  constructor(private httpService:HttpService) {

	}

  ngOnInit(): void {
    this.getAllCategories();
	this.getTaskbar(); 
	this.getSliders();
  }
  getAllCategories() {
  
    this.httpService.getCategories().subscribe((data: any) => {
     this.allCategories=data.data;
    }, (err: any) => {
  
    });
  
  }
  getSliders() {
  
    this.httpService.getSliders().subscribe((data: any) => {
     this.slides=data.data;
	 for(let i=0;i<this.slides.length;i++)
	 {this.images.push(this.slides[i].image);
		this.titles.push(this.slides[i].title)
	 }
	 
    }, (err: any) => {
  
    });
  
  }
  
  getTaskbar() {
  
	this.httpService.getTopTaskbar().subscribe((data: any) => {
	 this.taskBarItems=data.data;
	}, (err: any) => {
  
	});
  
  }
  
}
