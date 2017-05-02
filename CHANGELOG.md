# 0.0.3 (2017.5.02)

#### Fix

- **BUG:** organization tree will not get duplicate keys.

#### Features

- **UI:** organization tree, buttons, login window, dialoag history list, background

# 0.0.2 (2017.4.25)

#### Fix

- **BUG:** talk window now will get only one message when another user send only one.
- **BUG:** talk window now will only show messages from the user talking to.
- **BUG:** message time tag had been fixed to normally display.



# 0.0.1 (2017.4.19)

#### Features

- **UI:** login,stem and talk window
- **Function:** login with id&psw ; get department and all user tree ; p2p message send & recieve (After open the corresponding talk window)
- **Package:** windows platform.

#### To Be Continued

- **Electron-Redux:** Refactor the *Electron-Redux* package to adapt multi renderer processes situations
- **More complex message-processer:** message notifications, group message, history message retrieve
- **child_process:** So far, protocal buffer encode/decode tasks and tcp tasks are still handled in main process, considerring to handler these in *child_process*.
