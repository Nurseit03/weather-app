import { Module } from 'vuex';

interface Notification {
  id: number;
  message: string;
  date: Date;
}

interface NotificationsState {
  notifications: Notification[];
}

const notificationsModule: Module<NotificationsState, any> = {
  state: {
    notifications: [],
  },
  mutations: {
    addNotification(state, notification: Notification) {
      state.notifications.push(notification);
    },
    removeNotification(state, notificationId: number) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationId
      );
    },
  },
  actions: {
    addNotification({ commit }, notification: Notification) {
      commit('addNotification', notification);
    },
    removeNotification({ commit }, notificationId: number) {
      commit('removeNotification', notificationId);
    },
  },
  getters: {
    allNotifications(state) {
      return state.notifications;
    },
  },
};

export default notificationsModule;
