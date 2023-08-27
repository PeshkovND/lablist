export const dateMaker = (date: string) => {
    const strDay: string = date.substring(8, 10);

    const strMonth: string = date.substring(5, 7);

    const strYear: string = date.substring(0, 4);

    return strDay + "." + strMonth + "." + strYear;
  };