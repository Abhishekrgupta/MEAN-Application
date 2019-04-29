import { AbstractControl } from '@angular/forms';

export class SelectionValidator{

  static checkSelection(opt: AbstractControl): any {
      const selectedopt = opt.value;
      //console.log("Opt : "+selectedopt);

      if (selectedopt !== '' && selectedopt !== 0 ){
         return null;
      }
      else {
          return { selecrequired: true };
      }
  }
}
