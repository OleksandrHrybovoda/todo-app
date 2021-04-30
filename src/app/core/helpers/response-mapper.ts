import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Ctor<T> {
  constructor(private type: new () => T) { }

  public getNew(): T {
    return new this.type();
  }
}

export type FieldsMap<K, T> = {
  [key: string]: string | ((entity: T, entityResponse: K, key: string) => void)
};

export class ResponseMapper<T, K> {

  constructor(
    private ctor: Ctor<T>,
    private fields: FieldsMap<K, T>
  ) { }

  public mapEntities(responseSource: Observable<K[]>): Observable<T[]> {
    return responseSource.pipe(
      map(entities => entities.map(entity => this.mapEntity(entity)))
    );
  }

  public mapEntity(responseEntity: K): T {
    let entity: T = this.ctor.getNew();

    Object.keys(this.fields).forEach(keyT => {
      const keyK = this.fields[keyT];

      if (typeof keyK === "string") {
        entity[keyT] = responseEntity[keyK];
      } else {
        keyK(entity, responseEntity, keyT);
      }
    });

    return entity;
  }

}
