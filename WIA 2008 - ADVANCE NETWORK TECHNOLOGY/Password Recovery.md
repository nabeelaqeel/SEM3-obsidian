1. Turn on and off the Router
2. Ctrl + Break (fn + b) 

### Reference 
- https://www.cisco.com/c/en/us/support/docs/routers/2800-series-integrated-services-routers/112033-c2900-password-recovery-00.html

----
USB setup 

```
copy usbflash [09:filenamedestination-url]
boot config file-system-prefix :[directory/]filename [nvbypass]
```

```
copy usbflash0:
boot config usbflash0:
```

```
sh file systems
show usb controllers
```
### Reference
- chrome-extension://kdpelmjpfafjppnhbloffcjpeomlnpah/https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ifs/configuration/15-s/ifs-15-s-book/ifs-usb.pdf

---
Remove password 

```
no enable password
no enable secret
line con 0
no login
no password
end
```

---

ROMMON Mode

### Reference
- [Cisco](https://www.cisco.com/en/US/docs/routers/access/800/850/software/configuration/guide/rommon.html)