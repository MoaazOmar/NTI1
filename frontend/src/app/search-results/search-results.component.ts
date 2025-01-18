import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Product } from '../../interfaces/product.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  query: string = '';
  results: Product[] = [];

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['query'];
      this.searchService.getSuggestions(this.query).subscribe(data => {
        this.results = data.map(product => ({
          ...product,
          image: `http://localhost:3000/images/${product.image}`
        }));
      });
    });
  }
}
