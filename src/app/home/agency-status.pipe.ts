import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "agencyStatus",
})
export class AgencyStatusPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    console.log("pipe", value);
    return value.toLowerCase();
  }
}
