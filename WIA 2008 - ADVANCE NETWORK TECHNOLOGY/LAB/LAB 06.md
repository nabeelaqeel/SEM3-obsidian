![[Pasted image 20241203192515.png]]
1. DHCP for NET105 (private ip)
- R3
```
ip dhcp excluded-address 142.71.2.1 142.71.2.10

ip dhcp pool DHCP_NET105
network 192.168.0.0 255.255.255.128
default-router 142.71.5.1
dns-server 142.71.5.1
domain-name lab6.com
```
- DSW5
```
service dhcp

int vlan 104
ip helper-address 142.71.3.25
```
2. ACL 
```

```

``