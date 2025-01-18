import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-searchinput',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.css']
})
export class SearchinputComponent {
  @Input() isClicked: boolean = false;
  suggestions: Product[] = [];
  query: string = '';
  constructor(private searchService: SearchService, private router: Router) { }

  onSearch(event: any) {
    const query = event.target.value;
    if (query.length > 1) {
      this.searchService.getSuggestions(query).subscribe(data => {
        // Map the image URLs
        this.suggestions = data.map(product => {
          return {
            ...product,
            image: `http://localhost:3000/images/${product.image}`
          };
        });
      });
    } else {
      this.suggestions = [];
    }
  }
  search() {
    if (this.query.trim()) {
      this.router.navigate(['/search-results', this.query]);
    }
  }
  
}
