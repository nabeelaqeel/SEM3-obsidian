![[Pasted image 20241107144722.png]]




1.  Setup Net 105
```
192.168.0.0 : 2^7 : 128 - 2 :126 /25

network      :  192.168.0.0
1st ip       :  192.168.0.1
last ip      :  192.168.0.126
broadcast    :  192.168.0.127
```

2.  Configure PAT on R3

```
int g4/0
ip nat inside

int port 1 
ip nat outside

ip nat pool pool1 142.71.5.65 142.71.5.65 prefix 30
ip nat pool pool2 142.71.5.66 142.71.5.66 prefix 30

access-list 1 permit 192.168.0.0 0.0.0.63
access-list 2 permit 192.168.0.0 0.0.0.63

ip nat inside source list 1 pool pool1 overload
ip nat inside source list 2 pool pool2 overload

int loopback 1
ip add 142.71.5.65 255.255.255.252
```

```
sh access-lists
sh ip nat tranlations
```

- Previous R4
```
int g0/1
ip add 100.100.71.2 255.255.255.252
ipv6 add 2001:100:100:71::1/127
no shut

int lo0
ip add 150.100.4.1 255.255.255.255
ipv6 add 2001:150:100:9::1/128

```

- Mistake : when using 1 pool only it will utilize one 1ip first until all port run out. So the other ip didnt use
```
no ip nat pool pool1 142.71.5.65 142.71.5.66 prefix 30
no access-list 1 permit 192.168.0.0 0.0.255.255
no ip nat inside source list 1 pool pool1 overload 
```

3. Remove Static Route

-  R2 (R1)
```console 
no ip route 150.100.0.0 255.255.0.0 100.100.71.2 
no ip route 150.100.0.0 255.255.0.0 g4/0
no ipv6 route 2001:150:100::/48 2001:100:100:71::1

```
- R4 (ISP)
```console
no ip route 142.71.0.0 255.255.0.0 100.100.71.1
no ip route 142.71.0.0 255.255.0.0 g1/0
no ipv6 route 2001:142:71::/48 g1/0
no ipv6 route 2001:142:71::/48 2001:100:100:71::
```

4. Configure eBGP ipv4

- R2 (R1)
```
router bgp 20
bgp router-id 1.1.1.1
neighbor 100.100.71.2 remote-as 21
network 142.71.0.0 mask 255.255.0.0 
```
- R4(ISP)
```
router bgp 21
bgp router-id 4.4.4.4
neighbor 100.100.71.1 remote-as 20
network 150.100.0.0 mask 255.255.0.0

ip route 150.100.0.0 255.255.0.0 null0
```

> `Note : ip route is needed for bgp to learn the route`

- Verifying
```
sh run | section bgp
sh ip bgp neighbors | include BGP
sh ip bgp
sh ip bgp summary
sh ip bgp neighbors
```

5. Configure eBGP IPv6

- R2(R1)
```
router bgp 20

bgp log-neighbor-changes
address-family ipv6
neighbor 2001:100:100:71::1 remote-as 21
network 2001:142:71::/48
```
- R4(ISP)
```
router bgp 21

bgp log-neighbor-changes
neighbor 2001:100:100:71:: remote-as 20
address-family ipv6
neighbor 2001:100:100:71:: activate
network 2001:150:100::/48

ipv6 route 2001:150:100::/48 null0
```

> `Note : ip route is needed for bgp to learn the route`

- Verifying
```
sh bgp ipv6 unicast
sh bgp ipv6 neighbors
```

6. Check redistribution
```
sh ip route
sh ipv6 route
show running-config | include redistribute
```

7. Additional Setup
- DSW6
```
int f0/0
ip add 192.168.100.2 255.255.255.252
no shut

int range f3/0 - 1
no shut

int vlan 1
ip add 192.168.0.1 255.255.255.128

ip routing
ip route 0.0.0.0 0.0.0.0 192.168.100.1

```
- R3
```
router ospf 1
network 142.71.5.64 255.255.255.252 area 50
passive-interface g4/0

int g4/0
ip add 192.168.100.1 255.255.255.252
no shut

ip route 192.168.0.0 255.255.0.0 192.168.100.2
no ip route 142.71.5.64 255.255.255.252 192.168.100.2

```
- PC6
```
ip 192.168.0.2 255.255.255.128 192.168.0.1
```
