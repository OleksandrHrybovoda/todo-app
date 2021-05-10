import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Ctor<T> {
  constructor(private type: new () => T) { }

  public getNew(): T {
    return new this.type();
  }
}

export type FieldsMap<T> = {
  [key: string]: string | ((entity: T, key: string) => void)
};

export class EntityMapper<T> {

  constructor(
    private ctor: Ctor<T>,
    private fields: FieldsMap<T>
  ) { }

  public mapEntities(entitySource: Observable<object[]>): Observable<T[]> {
    return entitySource.pipe(
      map(entities => entities.map(entity => this.mapEntity(entity)))
    );
  }

  public mapSingleEntity(entitySource: Observable<object>): Observable<T> {
    return entitySource.pipe(
      map(entity => this.mapEntity(entity))
    );
  }

  public mapEntity(baseEntity: object): T {
    const entityItem: T = this.ctor.getNew();

    Object.keys(this.fields).forEach(keyT => {
      const keyK = this.fields[keyT];

      if (typeof keyK === 'string') {
        entityItem[keyT] = baseEntity[keyK];
      } else {
        keyK(entityItem, keyT);
      }
    });

    return entityItem;
  }

}

