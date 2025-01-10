Syslog is a term used to describe a standard. It is also used to describe the protocol developed for that standard. The syslog protocol was developed for UNIX systems in the 1980s but was first documented as [[RFC 3164]] by IETF in 2001. Syslog uses` UDP port 514` to send event notification messages across IP networks to event message collectors, as shown in the figure.

![../images/Pasted image 20250102112444.png](../images/Pasted%20image%2020250102112444.png)

![../images/Pasted image 20250106002357.png](../images/Pasted%20image%2020250106002357.png)

```
%facility-severity-MNEMONIC: description
```