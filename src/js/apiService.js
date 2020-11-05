  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '18966103-245a37f9e820c36a1856c1db9';


export default class ApiService {
    constructor() {
        this.query = '';
        this.page = 1;
}
  async fetchImages() {
    const srchQuery = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${API_KEY}`;
    
    try {
      const response = await fetch(`${BASE_URL}/${srchQuery}`);
      const data = await response.json();
      this.incrementPage();

      return data.hits;
    } catch (err) {
      return error('Some error in fetch');
    }
  }

  get searchQuery() {
    return this.query;
  }
  set searchQuery(newQuery) {
    this.query = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
};