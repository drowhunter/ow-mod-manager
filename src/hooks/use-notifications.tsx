import React, { useContext, useState, useCallback } from 'react';
import { uniqueId } from 'lodash';

import { LogType } from '../types';

type NotificationsState = {
  notifications: AppNotification[];
};

type BaseNotification = {
  message: string;
  severity: LogType;
};

export interface AppNotification extends BaseNotification {
  id: string;
}

interface NotificationsContext extends NotificationsState {
  pushNotification: (notification: BaseNotification) => void;
  popNotification: () => void;
}

const defaultState: NotificationsState = {
  notifications: [],
};

const Notifications = React.createContext<NotificationsContext>({
  ...defaultState,
  pushNotification: () => {},
  popNotification: () => {},
});

export const useNotifications = () => useContext(Notifications);

export const NotificationsProvider: React.FunctionComponent = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const pushNotification = useCallback((notification: BaseNotification) => {
    setNotifications((prevNotifications) => {
      const existing = prevNotifications.find(
        ({ message }) => message === notification.message,
      );
      if (existing) {
        return prevNotifications;
      }
      return [
        ...prevNotifications,
        {
          ...notification,
          id: uniqueId(),
        },
      ];
    });
  }, []);

  const popNotification = useCallback(() => {
    setNotifications((prevNotifications) =>
      prevNotifications.slice(0, prevNotifications.length - 1),
    );
  }, []);

  return (
    <Notifications.Provider
      value={{ pushNotification, notifications, popNotification }}
    >
      {children}
    </Notifications.Provider>
  );
};
