# Oculus Controller

## Notes For Developers:
- WebVr is supported in Chrome and Firefox. In Chrome you need to activate WebVR by enabling some flags.
  - chrome://flags/#enable-webvr
  - chrome://flags/#enable-gamepad-extensions
  - chrome://flags/#openvr
- Depending on your browser and depending if you are using a VR headset, gamepads were detected under different names.

### PC

|             | Xbox360 Controller                            | Oculus Touch (left) | Oculus Touch (right) |
|-------------|-----------------------------------------------|---------------------|----------------------|
| Chrome      | Xbox 360 Controller (XInput STANDARD GAMEPAD) | -                   | -                    |
| Chrome (VR) | Xbox 360 Controller (XInput STANDARD GAMEPAD) | OpenVR Gamepad      | OpenVR Gamepad       |
| Firefox     | Xbox 360 Controller (XInput STANDARD GAMEPAD) | -                   | -                    |
| Firefox (VR)| Xinput                                        | Oculus Touch Left   | Oculus Touch Right   |

### Mac

|             | Xbox360 Controller                            | Oculus Touch (left) | Oculus Touch (right) |
|-------------|-----------------------------------------------|---------------------|----------------------|
| Chrome      | ?                                             | ?                   | ?                    |
| Chrome (VR) | ?                                             | ?                   | ?                    |
| Firefox     | ?                                             | ?                   | ?                    |
| Firefox (VR)| ?                                             | ?                   | ?                    |

## Common Issues:

### Controllers Were Not Detected At All
Another application (e.g another webbrowser) is currently using the controllers. Close those supposed troublemakers. If this does not help, restart your PC/Mac.

Calling *navigator.getGamepads()* in Firefox to early, is  another reason why controllers might not be detected. One solution is to [scan for changes](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API) contiuously. See code below! 
```javascript
var scangamepads = function () {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  console.log(gamepads);
};
    
setInterval(scangamepads, 500);
```



