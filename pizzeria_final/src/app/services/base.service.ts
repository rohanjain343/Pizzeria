import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


type HttpRequestOptions = Parameters<typeof HttpClient.prototype.get>[1];
export type JsonValue = null | string | number | boolean | JsonObject | JsonArray;
export type JsonArray = JsonValue[];
export interface JsonObject {
    [key: string]: JsonValue;
}

@Injectable({
    providedIn: 'root'
})
export abstract class BaseApi {
    constructor(
        protected http: HttpClient
    ) { }

    /**
     * @param endpoint 
     * @param options 
     * @returns 
     */
    protected get(
        endpoint: string,
        options?: HttpRequestOptions
    ): Observable<any> {
        return this.http.get(endpoint, options);
    }

    protected post(
        endpoint: string,
        value: JsonValue,
        options?: HttpRequestOptions
    ): Observable<any> {
        return this.http.post(endpoint, value, options)
    }

    protected put(
        endpoint: string,
        value: JsonValue,
        options?: HttpRequestOptions
    ): Observable<any> {
        return this.http.put(endpoint, value, options)
    }

    protected delete(
        endpoint: string,
        value?: JsonValue,
        options?: HttpRequestOptions
    ): Observable<any> {
        return this.http.request('delete', endpoint, {
            ...options,
            body: value
        })
    }

}


