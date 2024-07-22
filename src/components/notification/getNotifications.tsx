type notificationType = "success" | "warning" | "info" | "error" | "default";

export const getNotifications = (
  type: notificationType,
  t: any,
  message?: string,
  title?: string
) => {
  switch (type) {
    case "success":
      notifications.show({
        ...config,
        color: "green",
      });
      break;
    case "warning":
      notifications.show({
        ...config,
        color: "orange",
      });
      break;
    case "error":
      notifications.show({
        ...config,
        color: "red",
      });
      break;
    case "info":
      notifications.show({
        ...config,
        color: "blue",
      });
      break;
    default:
      notifications.show({
        ...config,
        color: "blue",
      });
      break;
  }
};
