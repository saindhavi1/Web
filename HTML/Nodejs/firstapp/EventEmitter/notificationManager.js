const EventEmitter = require('events');

class notificationManager extends EventEmitter {
    subscribe(type, callback) {
        this.on(type, callback);
    }

    unsubscribe(type, callback){
        this.removeListener(type, callback);
    }

    sendNotification(type, message) {
        this.emit(type, message);
    }
}

//Create a new notification manager instance
const NotificationManager = new notificationManager();

//User 1 subscribes to 'email' notifications
NotificationManager.subscribe('email', (message) => {
    console.log('User 1 recevied an email notification:', message);
});

//User 2 subscribes to 'sms' notifications
NotificationManager.subscribe('sms', (message) => {
    console.log('User 2 recevied an SMS notification:', message);
});

//User 3 subscribes to both 'email' and 'sms' notifications
NotificationManager.subscribe('email', (message) => {
    console.log('User 3 recevied an email notification:', message);
});

NotificationManager.subscribe('sms', (message) => {
    console.log('User 3 recevied an SMS notification:', message);
});

//Send notidications
NotificationManager.sendNotification('email', 'New email recevied.');
NotificationManager.sendNotification('sms', 'You have a new SMS.');

//User 2 unsubscribed from 'sms' notifications
NotificationManager.unsubscribe('sms', (message) => {
    console.log('User 2 has unsubscribed:', message);
});

//Send another notification after unsubscribing
NotificationManager.sendNotification('sms', 'This SMS will not be received by User 2');