import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Ctor<T> {
  constructor(private type: new () => T) { }

  public getNew(): T {
    return new this.type();
  }
}

export type FieldsMap = {
  [key: string]: string | ((targetEntity: any, sourceEntity: any, key: string) => void)
};

@Injectable()
export class EntityMapperService {

  public mapEntities<T>(
    source: Observable<any[]>,
    fields: FieldsMap,
    ctor: Ctor<T>
  ): Observable<T[]> {
    return source.pipe(
      map(entities => entities.map(entity => this.createEntity(entity, fields, ctor)))
    );
  }

  public mapEntity<T>(
    source: Observable<any>,
    fields: FieldsMap,
    ctor: Ctor<T>
  ): Observable<T> {
    return source.pipe(
      map(entity => this.createEntity(entity, fields, ctor))
    );
  }

  public mapSingleEntity<T>(
    entity: any,
    fields: FieldsMap,
    ctor: Ctor<T>
  ): any {
    return this.createEntity(entity, fields, ctor);
  }

  public createEntity(sourceEntity: any, fields: FieldsMap, ctor?: Ctor<any>): any {
    const entity: any = ctor ? ctor.getNew() : {};

    Object.keys(fields).forEach(keyT => {
      const keyK = fields[keyT];

      if (typeof keyK === 'string') {
        entity[keyT] = sourceEntity[keyK];
      } else {
        keyK(entity, sourceEntity, keyT);
      }
    });

    return entity;
  }

}
