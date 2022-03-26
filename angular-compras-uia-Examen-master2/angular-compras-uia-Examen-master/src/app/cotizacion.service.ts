import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ISolicitud } from "./iSolicitud"
import { map, tap, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { ICotizacion } from "./iCotizacion";

@Injectable({
    providedIn: 'root'
  })
export class CotizacionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  cotizacionUrl = "http://localhost:8080/solicitudesOC";
  itemsUrl = "http://localhost:8080/item-cotizacion";
  private cotizacion$ = new BehaviorSubject<ICotizacion[]>([]);

    constructor(private http: HttpClient) {        
    }

    public getCotizacion(id:number)
    {
        this.cotizacionUrl = "http://localhost:8080/solicitudesOC"+`?id=`+id;
        this.http.get<ICotizacion[]>(this.cotizacionUrl).subscribe((pozos) => this.cotizacion$.next(pozos));
        return this.cotizacion$;
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead      
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

      /** POST: add a new Solicitud to the server */
  public agregaCotizacion(Cotizacion: ICotizacion): Observable<ISolicitud>  {
    return this.http.post<ICotizacion>(this.itemsUrl, Cotizacion, this.httpOptions).pipe(
      tap((newCotizacion: ICotizacion) => console.log(`added Solicitud w/ id=${newCotizacion.id}`)),
      catchError(this.handleError<ICotizacion>('addSolicitud'))
    );
 }
}