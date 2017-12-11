import { setInterval } from 'timers';

import { sendTwilioMessage } from 'libs/twilio/twilio';
import { DataValueModel } from 'models/dataValue.model';
import { DeviceModel } from 'models/device.model';
import { UserModel } from 'models/user.model';

const generateMessage = (deviceName: string) => {
  return  `Your pet health toy ${deviceName} has shown no activity in the last 100 seconds. Let's turn on some lights and sounds!`;
};

// Not scalable
export const setNotifications = () => {
  setInterval(async () => {
    const users = await UserModel.find({});

    users.forEach(async (user, index) => {
      const userDevices = await DeviceModel.find({ user: user._id });

      userDevices.forEach(async (device) => {
        const dataValues = await DataValueModel.find({
          device: device
        })
          .sort('-publishedDate')
          .limit(10)
          .exec();

        let activityCounter = 0;

        if (dataValues.length !== 10) {
          return false;
        }

        dataValues.forEach((dataValue) => {
          activityCounter += dataValue.value > 0 ? 1 : 0;
        });

        if (activityCounter === 0) {
          sendTwilioMessage(generateMessage(device.name), user.phoneNumber);
        }
      });
    });
  }, 10000);
};
