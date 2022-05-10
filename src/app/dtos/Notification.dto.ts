import { v4 } from "uuid";

export enum NotificationSeverityEnum {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "danger",
}

export class NotificationDto {
  public id: string;
  constructor(
    public severity: NotificationSeverityEnum,
    public message: string,
    public header?: string
  ) {
    this.id = v4();
  }

  public static Success(message: string, header?: string) {
    return new NotificationDto(
      NotificationSeverityEnum.Success,
      message,
      header
    );
  }

  public static Info(message: string, header?: string) {
    return new NotificationDto(NotificationSeverityEnum.Info, message, header);
  }

  public static Warning(message: string, header?: string) {
    return new NotificationDto(
      NotificationSeverityEnum.Warning,
      message,
      header
    );
  }

  public static Error(message: string, header?: string) {
    return new NotificationDto(NotificationSeverityEnum.Error, message, header);
  }
}
