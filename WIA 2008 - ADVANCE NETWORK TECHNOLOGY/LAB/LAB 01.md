![[../../images/Pasted image 20241112002848.png|Pasted image 20241112002848.png]]

## Configuration

1.  Setup VLAN 101,102,103
```
VLAN 3
1st address : 142.71.0.1
Last address : 142.71.1.254
Broadcast : 142.71.1.255

ipv6 : 2001:142:71:3::/64

VLAN 2:
network : 142.71.2.0
1st address : 142.71.2.1
last addresss : 142.71.2.126
broadcast : 142.71.2.127

ipv6 : 2001:142:71:2::/64

VLAN 1:
network : 142.71.2.128
1st address : 142.71.2.129
last address : 142.71.2.254
broadcast : 142.71.2.255

ipv6 : 2001:142:71:1::/64
```
2. Configure IPv4 and IPv6

- DSW1
```
int range f3/0 - 2
sw mode trunk
int f3/0
sw trunk allowed vlan 1-1005

int f3/2
sw trunk allowed vlan 1-1005

vlan database
vlan 101
vlan 102
vlan 103
apply
abort

int vlan 101
ip address 142.71.2.129 255.255.255.128

int vlan 102
ip address 142.71.2.1 255.255.255.128

int vlan 103
ip address 142.71.0.1 255.255.254.0

ip routing

int vlan 101
ipv6 addr 2001:142:71:1::1/64

int vlan 102
ipv6 addr 2001:142:71:2::1/64 

int vlan 103
ipv6 addr 2001:142:71:3::1/64

ipv6 unicast-routing


```
- DSW2
```
int range f3/0 - 2
sw mode trunk

int f3/2
sw trunk allowed vlan 1-1005

int f3/1
sw trunk allowed vlan 1-1005

vlan database
vlan 101
vlan 102
vlan 103

apply
abort

int vlan 101
ip address 142.71.2.130 255.255.255.128

int vlan 102
ip address 142.71.2.2 255.255.255.128

int vlan 103
ip address 142.71.0.2 255.255.254.0

ip routing 

int vlan 101
ipv6 addr 2001:142:71:1::2/64

int vlan 102
ipv6 addr 2001:142:71:2::2/64 

int vlan 103
ipv6 addr 2001:142:71:3::2/64

ipv6 unicast-routing
```

- Verification 
```
sh int tru
sh current #in vlan mode
sh ip route
sh ipv6 route
sh span bridge br
```
3. Enable VTP for all switches . DSW1 , DSW2 in Server mode . DSW3 , DSW4 in Client mode

- DSW1
```
vtp mode server
vtp domain DSW
vtp password cisco
```

- DSW2
```
vtp mode server
vtp domain DSW
vtp password cisco
```

- DSW3
```
vtp mode client
vtp domain DSW
vtp password cisco
```

- DSW4
```
vtp mode client
vtp domain DSW
vtp password cisco
```
- Verification
```
sh vtp status
```

4. Setup pc

```
----------------PC1---------------

ip 142.71.2.133 255.255.255.128 142.71.2.129
ip 2001:142:71:1::5/64 2001:142:71:1::1

----------------PC2 ---------------

ip 142.71.0.5 255.255.254.0 142.71.0.1
ip 2001:142:71:3::5/64 2001:142:71:3::1

----------------PC3----------------

ip 142.71.0.6 255.255.254.0 142.71.0.1
ip 2001:142:71:3::6/64 2001:142:71:3::1

----------------PC4------------------

ip 142.71.2.5 255.255.255.128 142.71.2.1
ip 2001:142:71:2::5/64 2001:142:71:2::2
```

## Issue Found

1. `sh ip int br` : check whether the int is up first
	- if not up use `sh` then `no shut`
