import moment from "moment";

export class ValueFormatter {
  private static currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  public static formatCurrency(value: number) {
    return ValueFormatter.currencyFormatter.format(value);
  }

  public static formatDateTime(value: Date) {
    return moment(value).format("M/D/YYYY h:mm A");
  }

  public static formDateTimeFormString(value: Date) {
    return moment(value).format("YYYY-MM-DDThh:mm");
  }

  public static formatDate(value: Date) {
    return moment(value).format("MMM Do YYYY");
  }

  public static formatTime(value: Date) {
    return moment(value).format("h:mm A");
  }

  public static formatDateTimeRange(start: Date, end: Date) {
    return `${ValueFormatter.formatDate(start)} ${ValueFormatter.formatTime(
      start
    )}-${ValueFormatter.formatTime(end)}`;
  }
}
