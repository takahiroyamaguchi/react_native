# Description
***
OS: Ubuntu 15.04

***
## Set up
***
### Necessary package
***
```
sudo apt-get install automake
sudo apt-get install autoconf
sudo apt-get install python-dev
sudo apt-get install sqlite
```

***
### React Native install
***
https://facebook.github.io/react-native/docs/getting-started.html

***
### React Native server setup
***

```
react-native start
```

***
### Need module
***
- [react-native-navbar](https://github.com/react-native-fellowship/react-native-navbar)
- [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage)

***
### node of
***
Watchman may possibly doesn't work.

In such run the following command.

```
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
```