import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class wishService{
constructor(private http: Http){
    console.log('wish service has been activated');
}

getWish(){
    return this.http.get('/wishlist/wishlist').map(res => res.json());
}
getSingleWish(wish){
    return this.http.get('/wishlist/wish/'+wish._id).map(res => res.json());
}

updateWish(wish){
    var headers = new Headers;
    headers.append('content-type','application/json');
    return this.http.put('/wishlist/wish/'+wish._id, JSON.stringify(wish),{headers:headers}).map(res => res.json());
}

deleteWish(id){
    return this.http.delete('/wishlist/wish/'+id).map(res => res.json());
}
addWish(newWish){
    var headers = new Headers();
    headers.append('content-type','application/json');
    return this.http.post('/wishlist/wish',JSON.stringify(newWish),{headers:headers}).map(res => res.json());
}
}