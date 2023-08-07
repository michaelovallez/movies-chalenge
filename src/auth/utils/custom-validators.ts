import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormatConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    // Verificar si el valor es una cadena de fecha con el formato YYYY-MM-DD
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  defaultMessage() {
    return 'Invalid date format. Date must be in the format YYYY-MM-DD';
  }
}

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateFormatConstraint,
    });
  };
}