![[Pasted image 20241209181249.png]]

![[Pasted image 20241209181336.png]]
1. ip addressing
```
LAN 1 

network : 10.10.71.0 /25 
1st ip : 10.10.71.1
last ip : 10.10.71.126
broadcast : 10.10.71.127

ipv6 : 2001:db8:71::1/64

LAN 2 
network : 10.10.71.128 /25 
1st ip : 10.10.71.129
last ip : 10.10.71.254
broadcast : 10.10.71.255

ipv6 : 2001:db8:71::2/64
```

2. ip addressing table

| Device  | Interface | IPV4        | IPV6 | Subnet mask | Default gateways |
| ------- | --------- | ----------- | ---- | ----------- | ---------------- |
| PC3     | NIC       | 203.0.113.6 | -    | 255.255.255 |                  |
| Switch4 | f3/0      | -           | -    | -           | -                |
|         | f0/0      | 203.0.113.6 |      |             |                  |